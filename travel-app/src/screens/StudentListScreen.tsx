<<<<<<< HEAD
import React, {useState} from 'react';
=======
import React, {useState, useEffect} from 'react';
>>>>>>> e895365 (feat(web): My Kenary branding & logo)
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Modal,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {
  ArrowLeft,
  Users,
  UserCheck,
  UserX,
  Search,
  Filter,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from 'lucide-react-native';
import { useStudents } from '../hooks/useApi';
<<<<<<< HEAD
import { Student as ApiStudent } from '../services/api';
=======
import { Student as ApiStudent, TourLeader, apiService } from '../services/api';
>>>>>>> e895365 (feat(web): My Kenary branding & logo)

interface Student {
  id: string;
  name: string;
  studentId: string;
  status: 'present' | 'absent' | 'late' | 'sick' | 'permission';
  checkInTime?: string;
  notes?: string;
  school?: string;
  grade?: string;
<<<<<<< HEAD
=======
  bus?: string;
  hotel?: string;
>>>>>>> e895365 (feat(web): My Kenary branding & logo)
  email?: string;
  phone?: string;
}

interface ClassData {
  id: string;
  className: string;
  teacher: string;
  totalStudents: number;
  presentCount: number;
  absentCount: number;
  lateCount: number;
  students: Student[];
}

const StudentListScreen = ({navigation}: any) => {
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
<<<<<<< HEAD
  
  // Use API hook to fetch students
  const { students: apiStudents, loading, error, refetch } = useStudents();
=======
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [tourLeaders, setTourLeaders] = useState<TourLeader[]>([]);
  const [tlByBusId, setTlByBusId] = useState<Record<string, TourLeader>>({});
  const [tlLoading, setTlLoading] = useState(false);
  const [tlError, setTlError] = useState<string | null>(null);
  
  // Use API hook to fetch students
  const { students: apiStudents, loading, error, refetch, pagination } = useStudents(page, limit);

  // Fetch tour leaders to map contact by bus
  useEffect(() => {
    let mounted = true;
    const loadTL = async () => {
      setTlLoading(true);
      setTlError(null);
      try {
        const res = await apiService.getTourLeaders(1, 200);
        if (!mounted) return;
        setTourLeaders(res.data || []);
        const map: Record<string, TourLeader> = {};
        (res.data || []).forEach((tl) => {
          if (tl.bus) {
            map[tl.bus] = tl;
          }
        });
        setTlByBusId(map);
      } catch (e: any) {
        if (!mounted) return;
        setTlError(e?.message || 'Gagal memuat tour leader');
      } finally {
        if (mounted) setTlLoading(false);
      }
    };
    loadTL();
    return () => { mounted = false; };
  }, []);
>>>>>>> e895365 (feat(web): My Kenary branding & logo)

  // Convert API students to component format
  const convertApiStudent = (apiStudent: ApiStudent): Student => {
    // Generate random status for demo
    const statuses: ('present' | 'absent' | 'late' | 'sick' | 'permission')[] = ['present', 'present', 'present', 'present', 'absent', 'late'];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    
    return {
      id: apiStudent.id,
      name: apiStudent.name,
      studentId: apiStudent.id,
      status: randomStatus,
      checkInTime: randomStatus === 'present' || randomStatus === 'late' ? 
        `0${Math.floor(Math.random() * 2) + 7}:${Math.floor(Math.random() * 6) * 10}` : undefined,
      school: apiStudent.school,
      grade: apiStudent.grade,
<<<<<<< HEAD
=======
      bus: apiStudent.assignedBus,
      hotel: apiStudent.assignedHotel,
>>>>>>> e895365 (feat(web): My Kenary branding & logo)
      email: apiStudent.email,
      phone: apiStudent.phone,
      notes: randomStatus === 'absent' ? 'Tidak hadir' : 
             randomStatus === 'late' ? 'Terlambat' : undefined,
    };
  };

  // Group students by grade/class
  const groupStudentsByGrade = (students: Student[]): ClassData[] => {
    const grouped = students.reduce((acc, student) => {
      const grade = student.grade || 'Unknown';
      if (!acc[grade]) {
        acc[grade] = [];
      }
      acc[grade].push(student);
      return acc;
    }, {} as Record<string, Student[]>);

    return Object.entries(grouped).map(([grade, students], index) => {
      const presentCount = students.filter(s => s.status === 'present').length;
      const absentCount = students.filter(s => s.status === 'absent').length;
      const lateCount = students.filter(s => s.status === 'late').length;
      
      return {
        id: `class-${index + 1}`,
        className: grade,
        teacher: `Guru Kelas ${grade}`,
        totalStudents: students.length,
        presentCount,
        absentCount,
        lateCount,
        students,
      };
    });
  };

  // Convert API students and group by class
  const convertedStudents = apiStudents.map(convertApiStudent);
  const classesData: ClassData[] = groupStudentsByGrade(convertedStudents);

<<<<<<< HEAD
=======
  // Ringkasan berdasarkan daftar siswa langsung
  const totalStudents = convertedStudents.length;
  const presentCount = convertedStudents.filter(s => s.status === 'present').length;
  const absentCount = convertedStudents.filter(s => s.status === 'absent').length;
  const lateCount = convertedStudents.filter(s => s.status === 'late').length;

>>>>>>> e895365 (feat(web): My Kenary branding & logo)
  const getStatusIcon = (status: Student['status']) => {
    switch (status) {
      case 'present':
        return <CheckCircle size={20} color="#27AE60" />;
      case 'absent':
        return <XCircle size={20} color="#E74C3C" />;
      case 'late':
        return <AlertCircle size={20} color="#F39C12" />;
      case 'sick':
        return <XCircle size={20} color="#9B59B6" />;
      case 'permission':
        return <AlertCircle size={20} color="#3498DB" />;
      default:
        return <XCircle size={20} color="#95A5A6" />;
    }
  };

  const getStatusColor = (status: Student['status']) => {
    switch (status) {
      case 'present':
        return '#E8F5E8';
      case 'absent':
        return '#FDEDEC';
      case 'late':
        return '#FEF9E7';
      case 'sick':
        return '#F4ECF7';
      case 'permission':
        return '#EBF5FB';
      default:
        return '#F8F9FA';
    }
  };

  const getStatusText = (status: Student['status']) => {
    switch (status) {
      case 'present':
        return 'Hadir';
      case 'absent':
        return 'Tidak Hadir';
      case 'late':
        return 'Terlambat';
      case 'sick':
        return 'Sakit';
      case 'permission':
        return 'Izin';
      default:
        return 'Unknown';
    }
  };

  const openClassDetail = (classData: ClassData) => {
    setSelectedClass(classData.id);
    setModalVisible(true);
  };

  const renderClassCard = (classData: ClassData) => (
    <TouchableOpacity
      key={classData.id}
      style={styles.classCard}
      onPress={() => openClassDetail(classData)}>
      <View style={styles.classHeader}>
        <View style={styles.classInfo}>
          <Text style={styles.className}>{classData.className}</Text>
          <Text style={styles.teacherName}>{classData.teacher}</Text>
        </View>
        <View style={styles.studentCount}>
          <Users size={20} color="#4A90E2" />
          <Text style={styles.totalStudents}>{classData.totalStudents}</Text>
        </View>
      </View>

      <View style={styles.attendanceStats}>
        <View style={styles.statItem}>
          <UserCheck size={16} color="#27AE60" />
          <Text style={[styles.statText, {color: '#27AE60'}]}>
            {classData.presentCount} Hadir
          </Text>
        </View>
        <View style={styles.statItem}>
          <UserX size={16} color="#E74C3C" />
          <Text style={[styles.statText, {color: '#E74C3C'}]}>
            {classData.absentCount} Tidak Hadir
          </Text>
        </View>
        <View style={styles.statItem}>
          <Clock size={16} color="#F39C12" />
          <Text style={[styles.statText, {color: '#F39C12'}]}>
            {classData.lateCount} Terlambat
          </Text>
        </View>
      </View>

      <View style={styles.attendanceBar}>
        <View
          style={[
            styles.attendanceSegment,
            {
              flex: classData.presentCount,
              backgroundColor: '#27AE60',
            },
          ]}
        />
        <View
          style={[
            styles.attendanceSegment,
            {
              flex: classData.absentCount,
              backgroundColor: '#E74C3C',
            },
          ]}
        />
        <View
          style={[
            styles.attendanceSegment,
            {
              flex: classData.lateCount,
              backgroundColor: '#F39C12',
            },
          ]}
        />
      </View>
    </TouchableOpacity>
  );

  const renderStudentItem = ({item}: {item: Student}) => (
<<<<<<< HEAD
    <View style={[styles.studentItem, {backgroundColor: getStatusColor(item.status)}]}>
=======
    <View style={styles.studentItem}>
>>>>>>> e895365 (feat(web): My Kenary branding & logo)
      <View style={styles.studentInfo}>
        <View style={styles.studentHeader}>
          <Text style={styles.studentName}>{item.name}</Text>
          <Text style={styles.studentId}>NIS: {item.studentId}</Text>
        </View>
<<<<<<< HEAD
        
        <View style={styles.statusContainer}>
          {getStatusIcon(item.status)}
          <Text style={styles.statusText}>{getStatusText(item.status)}</Text>
          {item.checkInTime && (
            <Text style={styles.checkInTime}>• {item.checkInTime}</Text>
          )}
        </View>
        
        {item.notes && (
          <Text style={styles.notesText}>📝 {item.notes}</Text>
        )}
=======

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Kelas:</Text>
          <Text style={styles.infoValue}>{item.grade || '—'}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Bus:</Text>
          <Text style={styles.infoValue}>{item.bus || '—'}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Kontak TL:</Text>
          <Text style={styles.infoValue}>{(() => {
            const tl = item.bus ? tlByBusId[item.bus] : undefined;
            return tl?.phone || tl?.whatsapp || tl?.email || '—';
          })()}</Text>
        </View>
>>>>>>> e895365 (feat(web): My Kenary branding & logo)
      </View>
    </View>
  );

  const selectedClassData = classesData.find(cls => cls.id === selectedClass);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color="#2C3E50" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Daftar Siswa</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Loading State */}
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4A90E2" />
          <Text style={styles.loadingText}>Memuat data siswa...</Text>
        </View>
      )}

      {/* Error State */}
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Gagal memuat data siswa</Text>
          <TouchableOpacity style={styles.retryButton} onPress={refetch}>
            <Text style={styles.retryButtonText}>Coba Lagi</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Content - only show when not loading and no error */}
      {!loading && !error && (
        <>
<<<<<<< HEAD
          {/* Summary Stats */}
          <View style={styles.summaryContainer}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryNumber}>
            {classesData.reduce((sum, cls) => sum + cls.totalStudents, 0)}
          </Text>
          <Text style={styles.summaryLabel}>Total Siswa</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={[styles.summaryNumber, {color: '#27AE60'}]}>
            {classesData.reduce((sum, cls) => sum + cls.presentCount, 0)}
          </Text>
          <Text style={styles.summaryLabel}>Hadir</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={[styles.summaryNumber, {color: '#E74C3C'}]}>
            {classesData.reduce((sum, cls) => sum + cls.absentCount, 0)}
          </Text>
          <Text style={styles.summaryLabel}>Tidak Hadir</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={[styles.summaryNumber, {color: '#F39C12'}]}>
            {classesData.reduce((sum, cls) => sum + cls.lateCount, 0)}
          </Text>
          <Text style={styles.summaryLabel}>Terlambat</Text>
        </View>
      </View>

      {/* Classes List */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Daftar Kelas</Text>
          {classesData.map(renderClassCard)}
=======
          {/* List only: remove summary */}

      {/* Students List */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Daftar Siswa</Text>
          <FlatList
            data={convertedStudents}
            renderItem={renderStudentItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          />
          {/* Pagination Controls */}
          <View style={styles.paginationContainer}>
            <TouchableOpacity
              style={[
                styles.paginationButton,
                (pagination?.hasPrev === false || page <= 1) && styles.paginationButtonDisabled,
              ]}
              disabled={pagination?.hasPrev === false || page <= 1}
              onPress={() => setPage((p) => Math.max(1, p - 1))}
            >
              <Text style={styles.paginationButtonText}>Sebelumnya</Text>
            </TouchableOpacity>
            <Text style={styles.paginationInfo}>
              Halaman {pagination?.page ?? page} / {pagination?.totalPages ?? '-'}
            </Text>
            <TouchableOpacity
              style={[
                styles.paginationButton,
                (pagination?.hasNext === false) && styles.paginationButtonDisabled,
              ]}
              disabled={pagination?.hasNext === false}
              onPress={() => setPage((p) => p + 1)}
            >
              <Text style={styles.paginationButtonText}>Berikutnya</Text>
            </TouchableOpacity>
          </View>
>>>>>>> e895365 (feat(web): My Kenary branding & logo)
        </View>
      </ScrollView>

      {/* Student Detail Modal */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setModalVisible(false)}>
              <ArrowLeft size={24} color="#2C3E50" />
            </TouchableOpacity>
            <View style={styles.modalTitleContainer}>
              <Text style={styles.modalTitle}>
                {selectedClassData?.className}
              </Text>
              <Text style={styles.modalSubtitle}>
                {selectedClassData?.teacher}
              </Text>
            </View>
            <View style={styles.placeholder} />
          </View>

          {selectedClassData && (
            <FlatList
              data={selectedClassData.students}
              renderItem={renderStudentItem}
              keyExtractor={(item) => item.id}
              style={styles.studentsList}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.studentsListContent}
            />
          )}
        </View>
      </Modal>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  placeholder: {
    width: 34,
  },
  summaryContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  summaryCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  summaryNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  summaryLabel: {
    fontSize: 12,
    color: '#7F8C8D',
    marginTop: 4,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 15,
  },
  classCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  classHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  classInfo: {
    flex: 1,
  },
  className: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  teacherName: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  studentCount: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  totalStudents: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  attendanceStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 12,
    fontWeight: '600',
  },
  attendanceBar: {
    flexDirection: 'row',
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
    backgroundColor: '#E8E8E8',
  },
  attendanceSegment: {
    height: '100%',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  modalTitleContainer: {
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#7F8C8D',
    marginTop: 2,
  },
  studentsList: {
    flex: 1,
  },
  studentsListContent: {
    padding: 20,
  },
  studentItem: {
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  studentInfo: {
    gap: 8,
  },
  studentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  studentName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    flex: 1,
  },
  studentId: {
    fontSize: 12,
    color: '#7F8C8D',
    fontWeight: '600',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
<<<<<<< HEAD
=======
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  infoLabel: {
    fontSize: 12,
    color: '#7F8C8D',
    width: 70,
  },
  infoValue: {
    fontSize: 12,
    color: '#2C3E50',
    fontWeight: '500',
  },
>>>>>>> e895365 (feat(web): My Kenary branding & logo)
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3E50',
  },
  checkInTime: {
    fontSize: 12,
    color: '#7F8C8D',
  },
  notesText: {
    fontSize: 12,
    color: '#4A90E2',
    fontStyle: 'italic',
    backgroundColor: '#FFFFFF',
    padding: 8,
    borderRadius: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#7F8C8D',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#E74C3C',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
<<<<<<< HEAD
=======
  paginationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingVertical: 8,
  },
  paginationButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#4A90E2',
    borderRadius: 8,
  },
  paginationButtonDisabled: {
    backgroundColor: '#A7C7FF',
  },
  paginationButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  paginationInfo: {
    fontSize: 14,
    color: '#2C3E50',
    fontWeight: '500',
  },
>>>>>>> e895365 (feat(web): My Kenary branding & logo)
});

export default StudentListScreen;