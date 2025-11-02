import { getApiBaseUrl, API_CONFIG } from '../config/api';

const API_BASE_URL = getApiBaseUrl();

export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  school: string;
  grade: string;
  address: string;
  emergencyContact: string;
  status: string;
  joinDate: string;
  assignedBus?: string;
  assignedHotel?: string;
  medicalHistory?: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Bus {
  id: string;
  name: string;
  plateNumber?: string;
  capacity: number;
  occupancy: number;
  currentLocation?: string;
  status: string;
  driver?: string;
  tourLeader?: string;
  tourLeaders?: string[];
  route?: string;
  fuelLevel?: number;
  lastMaintenance?: string;
  nextMaintenance?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TourLeader {
  id: string;
  name: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  bus?: string | null;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SeatAssignment {
  id: string;
  busId: string;
  seatNumber: number;
  studentId: string;
  assignedAt: string;
  createdAt: string;
  updatedAt: string;
  student: {
    id: string;
    name: string;
    grade: string;
    school: string;
  };
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: {
    id: number;
    email: string;
    name: string;
    role: string;
  };
}

export interface ApiResponse<T> {
  data: T;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  // Custom error type to propagate HTTP status and server message
  public static ApiError = class ApiError extends Error {
    status: number;
    details?: any;
    constructor(status: number, message: string, details?: any) {
      super(message);
      this.name = 'ApiError';
      this.status = status;
      this.details = details;
    }
  };

  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      });

      if (!response.ok) {
        // Try to extract server error payload for better messages
        let serverMessage = `HTTP error! status: ${response.status}`;
        let details: any = undefined;
        try {
          const contentType = response.headers.get('content-type') || '';
          if (contentType.includes('application/json')) {
            const payload = await response.json();
            details = payload;
            if (payload && (payload.message || payload.error)) {
              serverMessage = Array.isArray(payload.message)
                ? payload.message.join(', ')
                : (payload.message || payload.error || serverMessage);
            }
          } else {
            serverMessage = await response.text();
          }
        } catch (_) {
          // ignore parsing errors, fall back to generic message
        }
        throw new ApiService.ApiError(response.status, serverMessage, details);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Bus API methods
  async getBuses(page = 1, limit = 10, search?: string): Promise<ApiResponse<Bus[]>> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    
    if (search) {
      params.append('search', search);
    }

    return this.request<ApiResponse<Bus[]>>(`/buses?${params}`);
  }

  async getBusById(id: string): Promise<Bus> {
    return this.request<Bus>(`/buses/${id}`);
  }

  async updateBusOccupancy(id: string, occupancy: number): Promise<Bus> {
    return this.request<Bus>(`/buses/${id}/occupancy`, {
      method: 'PATCH',
      body: JSON.stringify({ occupancy }),
    });
  }

  async updateBusLocation(id: string, currentLocation: string): Promise<Bus> {
    return this.request<Bus>(`/buses/${id}/location`, {
      method: 'PATCH',
      body: JSON.stringify({ currentLocation }),
    });
  }

  // Student API methods
  async getStudents(page = 1, limit = 10, search?: string): Promise<ApiResponse<Student[]>> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    
    if (search) {
      params.append('search', search);
    }

    return this.request<ApiResponse<Student[]>>(`/students?${params}`);
  }

  async getStudentById(id: string): Promise<Student> {
    return this.request<Student>(`/students/${id}`);
  }

  async createStudent(student: Partial<Student>): Promise<Student> {
    return this.request<Student>('/students', {
      method: 'POST',
      body: JSON.stringify(student),
    });
  }

  async updateStudent(id: string, student: Partial<Student>): Promise<Student> {
    return this.request<Student>(`/students/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(student),
    });
  }

  async deleteStudent(id: string): Promise<void> {
    return this.request<void>(`/students/${id}`, {
      method: 'DELETE',
    });
  }

  // Authentication API methods
  async login(email: string, password: string): Promise<AuthResponse> {
    return this.request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async logout(token: string): Promise<AuthResponse> {
    return this.request<AuthResponse>('/auth/logout', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  async getProfile(token: string): Promise<{ success: boolean; user: any }> {
    return this.request<{ success: boolean; user: any }>('/auth/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  // Tour Leader API methods
  async getTourLeaders(page = 1, limit = 50, search?: string): Promise<ApiResponse<TourLeader[]>> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    if (search) {
      params.append('search', search);
    }

    return this.request<ApiResponse<TourLeader[]>>(`/tour-leaders?${params}`);
  }

  // Seat Assignment API methods
  async getSeatAssignments(busId: string): Promise<SeatAssignment[]> {
    return this.request<SeatAssignment[]>(`/buses/${busId}/seat-assignments`);
  }

  async getSeatAssignment(busId: string, seatNumber: number): Promise<SeatAssignment> {
    return this.request<SeatAssignment>(`/buses/${busId}/seats/${seatNumber}`);
  }

  async createSeatAssignment(
    busId: string, 
    seatNumber: number, 
    studentId: string,
    studentData?: {
      name: string;
      grade: string;
      school: string;
    }
  ): Promise<SeatAssignment> {
    const requestBody: any = {
      busId,
      seatNumber,
      studentId,
    };

    // Add student data if provided for auto-creation
    if (studentData) {
      requestBody.studentName = studentData.name;
      requestBody.studentGrade = studentData.grade;
      requestBody.studentSchool = studentData.school;
    }

    return this.request<SeatAssignment>('/buses/seat-assignments', {
      method: 'POST',
      body: JSON.stringify(requestBody),
    });
  }

  async deleteSeatAssignment(busId: string, seatNumber: number): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/buses/${busId}/seats/${seatNumber}`, {
      method: 'DELETE',
    });
  }
}

export const apiService = new ApiService();
