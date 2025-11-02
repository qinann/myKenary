import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Modal,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {Bus, ArrowLeft, User, UserCheck} from 'lucide-react-native';
import QRCodeScanner from '../components/QRCodeScanner';
import { useBuses } from '../hooks/useApi';
import { Bus as BusType, SeatAssignment, apiService, TourLeader } from '../services/api';

interface BusData {
  id: string;
  name: string;
  driver: string;
  plateNumber: string;
  capacity: number;
  occupancy: number;
  occupiedSeats: number[];
  seatAssignments: SeatAssignment[];
  tourLeader?: string;
}

interface StudentData {
  no: string;
  id: string;
  nama: string;
  kelas: string;
  sekolah: string;
}

interface SeatData {
  id: number;
  isOccupied: boolean;
  studentData?: StudentData;
}

const BusInfoScreen = ({navigation}: any) => {
  const [selectedBus, setSelectedBus] = useState<BusData | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [qrScannerVisible, setQrScannerVisible] = useState(false);
  const [selectedSeatNumber, setSelectedSeatNumber] = useState<number | null>(null);
  const [clickedSeatInfo, setClickedSeatInfo] = useState<SeatAssignment | null>(null);
  const [loadingSeatInfo, setLoadingSeatInfo] = useState(false);
  const [loadingSeatLayout, setLoadingSeatLayout] = useState(false);
  const seatAssignmentsCache = useRef<Record<string, SeatAssignment[]>>({});
  const [tourLeadersByBus, setTourLeadersByBus] = useState<Record<string, string[]>>({});
  
  // Use API hook to fetch buses
  const { buses, loading, error, updateBusOccupancy, refetch } = useBuses();

  // Convert API bus data to component format
  const convertBusData = (apiBus: BusType, seatAssignments: SeatAssignment[] = []): BusData => {
    // Get occupied seats from actual seat assignments
    const occupiedSeats = seatAssignments.map(assignment => assignment.seatNumber);
    const occupancy = seatAssignments.length > 0 ? seatAssignments.length : apiBus.occupancy;
    const mappedTLs = tourLeadersByBus[apiBus.id];
    
    return {
      id: apiBus.id,
      name: apiBus.name,
      driver: apiBus.driver || 'Driver tidak tersedia',
      plateNumber: apiBus.plateNumber || 'Plat tidak tersedia',
      capacity: apiBus.capacity,
      occupancy,
      occupiedSeats,
      seatAssignments,
      tourLeader: Array.isArray(mappedTLs) && mappedTLs.length > 0
        ? mappedTLs.join(', ')
        : (Array.isArray((apiBus as any).tourLeaders) && (apiBus as any).tourLeaders.length > 0
            ? (apiBus as any).tourLeaders.join(', ')
            : (apiBus.tourLeader || 'Tour leader tidak tersedia')),
    };
  };

  // Convert buses from API (we'll load seat assignments when a bus is selected)
  const busData: BusData[] = buses.map(bus => convertBusData(bus));

  // Fetch tour leaders and build mapping by bus id/name
  useEffect(() => {
    let cancelled = false;
    const fetchTourLeaders = async () => {
      try {
        const res = await apiService.getTourLeaders(1, 100);
        const tlList: TourLeader[] = res.data || [];
        const map: Record<string, string[]> = {};

        tlList.forEach((tl) => {
          const assignedBus = tl.bus || null;
          if (!assignedBus) return;
          const key = assignedBus;
          if (!map[key]) map[key] = [];
          map[key].push(tl.name);
        });

        // Also merge any single tourLeader in bus to ensure inclusion
        buses.forEach((b) => {
          const existing = map[b.id] || [];
          if (b.tourLeader) {
            if (!existing.includes(b.tourLeader)) existing.push(b.tourLeader);
          }
          if (existing.length) {
            map[b.id] = existing;
          }
        });

        if (!cancelled) {
          setTourLeadersByBus(map);
        }
      } catch (e) {
        console.error('Gagal memuat tour leaders:', e);
      }
    };

    fetchTourLeaders();
    return () => {
      cancelled = true;
    };
  }, [buses]);



  const generateSeats = (bus: BusData): SeatData[] => {
    const seats: SeatData[] = [];
    for (let i = 1; i <= 52; i++) {
      const seatAssignment = bus.seatAssignments.find(assignment => assignment.seatNumber === i);
      const isOccupied = !!seatAssignment;
      
      let studentData: StudentData | undefined;
      if (seatAssignment) {
        studentData = {
          no: seatAssignment.seatNumber.toString(),
          id: seatAssignment.student.id,
          nama: seatAssignment.student.name,
          kelas: seatAssignment.student.grade,
          sekolah: seatAssignment.student.school,
        };
      }
      
      seats.push({
        id: i,
        isOccupied,
        studentData,
      });
    }
    return seats;
  };

  const handleSeatPress = async (seatNumber: number, isOccupied: boolean) => {
    if (isOccupied) {
      // Get seat assignment info from API
      if (!selectedBus) return;
      
      setLoadingSeatInfo(true);
      try {
        const seatInfo = await apiService.getSeatAssignment(selectedBus.id, seatNumber);
        setClickedSeatInfo(seatInfo);
        
        // Show options for occupied seat: View info or Remove student
        Alert.alert(
          'Bangku Terisi',
          `Bangku nomor ${seatNumber} sudah ditempati oleh ${seatInfo.student.name} dari Kelas ${seatInfo.student.grade}.\n\nApa yang ingin Anda lakukan?`,
          [
            {text: 'Batal', style: 'cancel'},
            {text: 'Hapus Siswa', style: 'destructive', onPress: () => handleRemoveStudent(seatNumber)},
          ]
        );
      } catch (error) {
        console.error('Error fetching seat info:', error);
        Alert.alert(
          'Error',
          'Gagal mengambil informasi bangku. Silakan coba lagi.',
          [{text: 'OK'}]
        );
      } finally {
        setLoadingSeatInfo(false);
      }
      return;
    }
    
    setSelectedSeatNumber(seatNumber);
    setQrScannerVisible(true);
  };

  const handleRemoveStudent = async (seatNumber: number) => {
    if (!selectedBus) return;

    Alert.alert(
      'Konfirmasi Hapus',
      `Apakah Anda yakin ingin menghapus siswa dari bangku nomor ${seatNumber}?`,
      [
        {text: 'Batal', style: 'cancel'},
        {
          text: 'Hapus', 
          style: 'destructive', 
          onPress: async () => {
            try {
              // Delete seat assignment via API
              await apiService.deleteSeatAssignment(selectedBus.id, seatNumber);
              
              // Refresh bus data with updated seat assignments
              const refreshedBus = await loadBusWithSeatAssignments(selectedBus);
              setSelectedBus(refreshedBus);

              Alert.alert(
                'Berhasil!',
                `Siswa berhasil dihapus dari bangku nomor ${seatNumber}. Bangku sekarang kosong.`,
                [{text: 'OK'}]
              );
            } catch (error) {
              console.error('Error removing student:', error);
              Alert.alert(
                'Error',
                'Gagal menghapus siswa. Silakan coba lagi.',
                [{text: 'OK'}]
              );
            }
          }
        }
      ]
    );
  };

  const handleQRScanSuccess = async (studentData: StudentData) => {
    if (!selectedBus || !selectedSeatNumber) return;

    // Check if seat is already occupied
    if (selectedBus.occupiedSeats.includes(selectedSeatNumber)) {
      Alert.alert(
        'Error',
        'Bangku ini sudah terisi. Silakan pilih bangku lain.',
        [{text: 'OK'}]
      );
      return;
    }

    try {
      // Create seat assignment using the student ID from QR code
      // Include student data for auto-creation if student doesn't exist
      await apiService.createSeatAssignment(
        selectedBus.id, 
        selectedSeatNumber, 
        studentData.id,
        {
          name: studentData.nama,
          grade: studentData.kelas,
          school: studentData.sekolah
        }
      );
      
      // Refresh bus data with updated seat assignments
      const refreshedBus = await loadBusWithSeatAssignments(selectedBus);
      setSelectedBus(refreshedBus);

      Alert.alert(
        'Berhasil!',
        `Siswa ${studentData.nama} (${studentData.kelas}) berhasil didaftarkan ke bangku nomor ${selectedSeatNumber}.`,
        [{text: 'OK'}]
      );

      setSelectedSeatNumber(null);
    } catch (error) {
      console.error('Error creating seat assignment:', error);
      const status = (error as any)?.status;
      const message = (error as any)?.message || 'Terjadi kesalahan';

      if (status === 409) {
        try {
          // Ambil penugasan kursi terbaru untuk memberikan pesan yang lebih informatif
          const latestAssignments = await apiService.getSeatAssignments(selectedBus.id);
          const occupiedSeat = latestAssignments.find(a => a.seatNumber === selectedSeatNumber);
          const currentSeatForStudent = latestAssignments.find(a => a.student.id === studentData.id);

          if (occupiedSeat) {
            Alert.alert(
              'Bangku Sudah Terisi',
              `Bangku nomor ${selectedSeatNumber} sudah ditempati oleh ${occupiedSeat.student.name} (${occupiedSeat.student.grade}). Pilih bangku lain atau hapus siswa dari bangku tersebut terlebih dahulu.`,
              [{ text: 'OK' }]
            );
            return;
          }

          if (currentSeatForStudent) {
            Alert.alert(
              'Siswa Sudah Terdaftar',
              `Siswa ${currentSeatForStudent.student.name} sudah memiliki bangku nomor ${currentSeatForStudent.seatNumber} di bus ini.\n\nApakah ingin memindahkan ke bangku nomor ${selectedSeatNumber}?`,
              [
                { text: 'Batal', style: 'cancel' },
                {
                  text: 'Pindahkan',
                  onPress: async () => {
                    try {
                      // Pastikan bangku tujuan masih kosong sebelum memindahkan
                      const latestAgain = await apiService.getSeatAssignments(selectedBus.id);
                      const stillEmpty = !latestAgain.find(a => a.seatNumber === selectedSeatNumber);
                      if (!stillEmpty) {
                        Alert.alert('Bangku Terisi', `Bangku ${selectedSeatNumber} tidak lagi kosong. Silakan pilih bangku lain.`);
                        return;
                      }

                      await apiService.deleteSeatAssignment(selectedBus.id, currentSeatForStudent.seatNumber);
                      await apiService.createSeatAssignment(
                        selectedBus.id,
                        selectedSeatNumber,
                        studentData.id
                      );

                      const refreshedBus = await loadBusWithSeatAssignments(selectedBus);
                      setSelectedBus(refreshedBus);
                      setSelectedSeatNumber(null);

                      Alert.alert('Berhasil!', `Siswa dipindahkan ke bangku nomor ${selectedSeatNumber}.`);
                    } catch (moveErr) {
                      console.error('Failed to relocate student:', moveErr);
                      Alert.alert('Error', 'Gagal memindahkan siswa. Coba lagi atau hubungi administrator.');
                    }
                  }
                }
              ]
            );
            return;
          }

          // Jika tidak dapat ditentukan, tampilkan pesan dari server
          Alert.alert('Konflik', message || 'Bangku atau siswa sudah terdaftar.');
        } catch (infoErr) {
          console.error('Failed to fetch latest assignments for conflict handling:', infoErr);
          Alert.alert('Error', 'Gagal mendaftarkan siswa (409). Silakan coba lagi.');
        }
      } else {
        Alert.alert(
          'Error',
          'Gagal mendaftarkan siswa. Silakan coba lagi atau hubungi administrator.',
          [{text: 'OK'}]
        );
      }
    }
  };

  const loadBusWithSeatAssignments = async (bus: BusData): Promise<BusData> => {
    try {
      const seatAssignments = await apiService.getSeatAssignments(bus.id);
      return convertBusData(buses.find(b => b.id === bus.id)!, seatAssignments);
    } catch (error) {
      console.error('Error loading seat assignments:', error);
      return bus; // Return original bus data if seat assignments fail to load
    }
  };

  const handleBusSelect = async (bus: BusData) => {
    // Buka modal segera untuk mengurangi perceived delay
    setSelectedBus(bus);
    setModalVisible(true);

    // Jika kursi bus sudah dicache, gunakan segera
    const cachedSeats = seatAssignmentsCache.current[bus.id];
    if (cachedSeats) {
      const busWithCachedSeats = convertBusData(
        buses.find(b => b.id === bus.id)!,
        cachedSeats,
      );
      setSelectedBus(busWithCachedSeats);
      return;
    }

    // Jika belum ada cache, muat kursi secara async sambil menampilkan skeleton
    setLoadingSeatLayout(true);
    try {
      const busWithSeats = await loadBusWithSeatAssignments(bus);
      // Simpan ke cache untuk akses cepat berikutnya
      seatAssignmentsCache.current[bus.id] = busWithSeats.seatAssignments;
      setSelectedBus(busWithSeats);
    } catch (e) {
      // Biarkan modal tampil dengan data dasar, kursi akan kosong jika gagal
      console.error('Failed to load seat assignments:', e);
    } finally {
      setLoadingSeatLayout(false);
    }
  };

  const renderBusCard = (bus: BusData) => (
    <TouchableOpacity
      key={bus.id}
      style={styles.busCard}
      onPress={() => handleBusSelect(bus)}>
      <View style={styles.busHeader}>
        <Bus size={32} color="#4A90E2" />
        <View style={styles.busInfo}>
          <Text style={styles.busName}>{bus.name}</Text>
          <Text style={styles.busDriver}>Driver: {bus.driver}</Text>
            {/* Plate/ID dihapus sesuai permintaan */}
          {!!bus.tourLeader && (
            <Text style={styles.busDriver}>Tour Leader: {bus.tourLeader}</Text>
          )}
        </View>
        <View style={styles.occupancyInfo}>
          <Text style={styles.occupancyText}>
            {bus.occupancy}/{bus.capacity}
          </Text>
          <Text style={styles.occupancyLabel}>Terisi</Text>
        </View>
      </View>
      <View style={styles.progressBar}>
        <View
          style={[
            styles.progressFill,
            {width: `${(bus.occupancy / bus.capacity) * 100}%`},
          ]}
        />
      </View>
    </TouchableOpacity>
  );

  const renderSeatLayout = () => {
    if (!selectedBus) return null;
    
    const seats = generateSeats(selectedBus);
    
    return (
      <View style={styles.seatLayout}>
        <Text style={styles.seatLayoutTitle}>Layout Bangku {selectedBus.name}</Text>
        <View style={styles.busLayout}>
          {/* Loading overlay untuk layout kursi */}
          {loadingSeatLayout && (
            <View style={styles.seatLayoutLoadingOverlay}>
              <ActivityIndicator size="large" color="#4A90E2" />
              <Text style={styles.loadingText}>Memuat layout kursi...</Text>
            </View>
          )}
          {/* Driver area */}
          <View style={styles.driverArea}>
            <Text style={styles.driverText}>DRIVER</Text>
          </View>
          
          {/* Seats grid */}
          <View style={styles.seatsGrid}>
            {Array.from({length: 13}, (_, rowIndex) => (
              <View key={rowIndex} style={styles.seatRow}>
                {/* Left side seats */}
                <View style={styles.seatSide}>
                  {[0, 1].map(seatIndex => {
                    const seatNumber = rowIndex * 4 + seatIndex + 1;
                    const seat = seats[seatNumber - 1];
                    return (
                      <TouchableOpacity
                        key={seatNumber}
                        style={[
                          styles.seat,
                          seat.isOccupied ? styles.occupiedSeat : styles.emptySeat,
                        ]}
                        onPress={() => handleSeatPress(seatNumber, seat.isOccupied)}>
                        <Text style={[
                          styles.seatNumber,
                          seat.isOccupied ? styles.occupiedSeatNumber : styles.emptySeatNumber
                        ]}>{seatNumber}</Text>
                        {seat.isOccupied ? (
                          <UserCheck size={12} color="#FFFFFF" />
                        ) : (
                          <User size={12} color="#95A5A6" />
                        )}
                      </TouchableOpacity>
                    );
                  })}
                </View>
                
                {/* Aisle */}
                <View style={styles.aisle} />
                
                {/* Right side seats */}
                <View style={styles.seatSide}>
                  {[2, 3].map(seatIndex => {
                    const seatNumber = rowIndex * 4 + seatIndex + 1;
                    const seat = seats[seatNumber - 1];
                    return (
                      <TouchableOpacity
                        key={seatNumber}
                        style={[
                          styles.seat,
                          seat.isOccupied ? styles.occupiedSeat : styles.emptySeat,
                        ]}
                        onPress={() => handleSeatPress(seatNumber, seat.isOccupied)}>
                        <Text style={[
                          styles.seatNumber,
                          seat.isOccupied ? styles.occupiedSeatNumber : styles.emptySeatNumber
                        ]}>{seatNumber}</Text>
                        {seat.isOccupied ? (
                          <UserCheck size={12} color="#FFFFFF" />
                        ) : (
                          <User size={12} color="#95A5A6" />
                        )}
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            ))}
          </View>
        </View>
        
        {/* Legend */}
        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendSeat, styles.occupiedSeat]} />
            <Text style={styles.legendText}>Terisi</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendSeat, styles.emptySeat]} />
            <Text style={styles.legendText}>Kosong</Text>
          </View>
        </View>

        {/* Seat Information Area */}
        <View style={styles.seatInfoArea}>
          <Text style={styles.seatInfoTitle}>Keterangan Bangku</Text>
          {loadingSeatInfo ? (
            <View style={styles.seatInfoLoading}>
              <ActivityIndicator size="small" color="#4A90E2" />
              <Text style={styles.seatInfoLoadingText}>Memuat informasi...</Text>
            </View>
          ) : clickedSeatInfo ? (
            <View style={styles.seatInfoContent}>
              <Text style={styles.seatInfoText}>
                Bangku no {clickedSeatInfo.seatNumber} sudah ditempati oleh{' '}
                <Text style={styles.seatInfoHighlight}>{clickedSeatInfo.student.name}</Text>
                {' '}dari Kelas{' '}
                <Text style={styles.seatInfoHighlight}>{clickedSeatInfo.student.grade}</Text>
                {clickedSeatInfo.student.school && (
                  <>
                    {' '}({clickedSeatInfo.student.school})
                  </>
                )}
              </Text>
            </View>
          ) : (
            <Text style={styles.seatInfoPlaceholder}>
              Klik bangku yang terisi untuk melihat informasi penumpang
            </Text>
          )}
        </View>
      </View>
    );
  };

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
        <Text style={styles.headerTitle}>Info Bus</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Daftar Bus Perjalanan</Text>
          <Text style={styles.sectionSubtitle}>
            Total {busData.length} bus tersedia untuk perjalanan
          </Text>
          
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#4A90E2" />
              <Text style={styles.loadingText}>Memuat data bus...</Text>
            </View>
          ) : error ? (
             <View style={styles.errorContainer}>
               <Text style={styles.errorText}>Error: {error}</Text>
               <TouchableOpacity style={styles.retryButton} onPress={refetch}>
                 <Text style={styles.retryButtonText}>Coba Lagi</Text>
               </TouchableOpacity>
             </View>
          ) : (
            busData.map(renderBusCard)
          )}
        </View>
      </ScrollView>

      {/* Modal for seat layout */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          setClickedSeatInfo(null);
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity
              style={styles.modalBackButton}
              onPress={() => {
                setModalVisible(false);
                setClickedSeatInfo(null);
              }}>
              <ArrowLeft size={24} color="#2C3E50" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>
              {selectedBus?.name} - Layout Bangku
            </Text>
            <View style={styles.placeholder} />
          </View>
          
          <ScrollView style={styles.modalContent}>
            {renderSeatLayout()}
          </ScrollView>
        </View>
      </Modal>

      {/* QR Code Scanner */}
      <QRCodeScanner
        visible={qrScannerVisible}
        seatNumber={selectedSeatNumber || 0}
        onClose={() => {
          setQrScannerVisible(false);
          setSelectedSeatNumber(null);
        }}
        onScanSuccess={handleQRScanSuccess}
      />
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
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 5,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 20,
  },
  busCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  busHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  busInfo: {
    flex: 1,
    marginLeft: 15,
  },
  busName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  busDriver: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 2,
  },
  busPlate: {
    fontSize: 14,
    color: '#4A90E2',
    fontWeight: '600',
  },
  occupancyInfo: {
    alignItems: 'center',
  },
  occupancyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  occupancyLabel: {
    fontSize: 12,
    color: '#7F8C8D',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E8E8E8',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4A90E2',
    borderRadius: 3,
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
  modalBackButton: {
    padding: 5,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  modalContent: {
    flex: 1,
  },
  seatLayout: {
    padding: 20,
  },
  seatLayoutTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 20,
  },
  busLayout: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  seatLayoutLoadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
    backgroundColor: 'rgba(255,255,255,0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  driverArea: {
    backgroundColor: '#34495E',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  driverText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  seatsGrid: {
    gap: 10,
  },
  seatRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  seatSide: {
    flexDirection: 'row',
    gap: 8,
  },
  aisle: {
    width: 30,
  },
  seat: {
    width: 35,
    height: 35,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  occupiedSeat: {
    backgroundColor: '#4A90E2',
    borderColor: '#4A90E2',
  },
  emptySeat: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E8E8E8',
  },
  seatNumber: {
    fontSize: 8,
    fontWeight: 'bold',
    position: 'absolute',
    top: 2,
    left: 2,
  },
  occupiedSeatNumber: {
    color: '#FFFFFF',
  },
  emptySeatNumber: {
    color: '#4A90E2',
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 30,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendSeat: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
  },
  legendText: {
    fontSize: 14,
    color: '#2C3E50',
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#7F8C8D',
  },
  errorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
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
    fontWeight: 'bold',
  },
  seatInfoArea: {
    marginTop: 20,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  seatInfoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 12,
  },
  seatInfoLoading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  seatInfoLoadingText: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  seatInfoContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  seatInfoText: {
    fontSize: 14,
    color: '#2C3E50',
    lineHeight: 20,
  },
  seatInfoHighlight: {
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  seatInfoPlaceholder: {
    fontSize: 14,
    color: '#95A5A6',
    fontStyle: 'italic',
    textAlign: 'center',
    paddingVertical: 8,
  },
});

export default BusInfoScreen;
