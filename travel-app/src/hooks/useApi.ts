import { useState, useEffect, useCallback } from 'react';
import { apiService, Bus, Student, ApiResponse } from '../services/api';

export const useBuses = (page = 1, limit = 10, search?: string) => {
  const [buses, setBuses] = useState<Bus[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<any>(null);

  const fetchBuses = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiService.getBuses(page, limit, search);
      setBuses(response.data);
      setPagination(response.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch buses');
    } finally {
      setLoading(false);
    }
  }, [page, limit, search]);

  useEffect(() => {
    fetchBuses();
  }, [fetchBuses]);

  const updateBusOccupancy = async (id: string, occupancy: number) => {
    try {
      const updatedBus = await apiService.updateBusOccupancy(id, occupancy);
      setBuses(prev => prev.map(bus => bus.id === id ? updatedBus : bus));
      return updatedBus;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update bus occupancy');
      throw err;
    }
  };

  const updateBusLocation = async (id: string, location: string) => {
    try {
      const updatedBus = await apiService.updateBusLocation(id, location);
      setBuses(prev => prev.map(bus => bus.id === id ? updatedBus : bus));
      return updatedBus;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update bus location');
      throw err;
    }
  };

  return {
    buses,
    loading,
    error,
    pagination,
    refetch: fetchBuses,
    updateBusOccupancy,
    updateBusLocation,
  };
};

export const useStudents = (page = 1, limit = 10, search?: string) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<any>(null);

  const fetchStudents = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiService.getStudents(page, limit, search);
      setStudents(response.data);
      setPagination(response.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch students');
    } finally {
      setLoading(false);
    }
  }, [page, limit, search]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const createStudent = async (student: Partial<Student>) => {
    try {
      const newStudent = await apiService.createStudent(student);
      setStudents(prev => [newStudent, ...prev]);
      return newStudent;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create student');
      throw err;
    }
  };

  const updateStudent = async (id: string, student: Partial<Student>) => {
    try {
      const updatedStudent = await apiService.updateStudent(id, student);
      setStudents(prev => prev.map(s => s.id === id ? updatedStudent : s));
      return updatedStudent;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update student');
      throw err;
    }
  };

  const deleteStudent = async (id: string) => {
    try {
      await apiService.deleteStudent(id);
      setStudents(prev => prev.filter(s => s.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete student');
      throw err;
    }
  };

  return {
    students,
    loading,
    error,
    pagination,
    refetch: fetchStudents,
    createStudent,
    updateStudent,
    deleteStudent,
  };
};

export const useBus = (id: string) => {
  const [bus, setBus] = useState<Bus | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBus = useCallback(async () => {
    if (!id) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const busData = await apiService.getBusById(id);
      setBus(busData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch bus');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchBus();
  }, [fetchBus]);

  return {
    bus,
    loading,
    error,
    refetch: fetchBus,
  };
};

export const useStudent = (id: string) => {
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStudent = useCallback(async () => {
    if (!id) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const studentData = await apiService.getStudentById(id);
      setStudent(studentData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch student');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchStudent();
  }, [fetchStudent]);

  return {
    student,
    loading,
    error,
    refetch: fetchStudent,
  };
};