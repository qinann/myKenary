import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Modal,
  FlatList,
} from 'react-native';
import {Hotel, ArrowLeft, Users, User, Bed, MapPin} from 'lucide-react-native';

interface Student {
  id: string;
  name: string;
  class: string;
  gender: 'male' | 'female';
}

interface Room {
  id: string;
  number: string;
  type: 'standard' | 'deluxe' | 'suite';
  capacity: number;
  floor: number;
  students: Student[];
  gender: 'male' | 'female';
}

interface HotelData {
  id: string;
  name: string;
  address: string;
  totalRooms: number;
  occupiedRooms: number;
  rooms: Room[];
}

const HotelScreen = ({navigation}: any) => {
  const [selectedHotel, setSelectedHotel] = useState<HotelData | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [roomDetailVisible, setRoomDetailVisible] = useState(false);

  // Dummy data untuk hotel dan kamar
  const hotelData: HotelData = {
    id: '1',
    name: 'Grand Hotel Malang',
    address: 'Jl. Raya Malang No. 123, Malang, Jawa Timur',
    totalRooms: 24,
    occupiedRooms: 20,
    rooms: [
      // Lantai 2 - Kamar Putra
      {
        id: '201',
        number: '201',
        type: 'standard',
        capacity: 4,
        floor: 2,
        gender: 'male',
        students: [
          {id: '1', name: 'Ahmad Rizki', class: 'XII-1', gender: 'male'},
          {id: '2', name: 'Budi Santoso', class: 'XII-1', gender: 'male'},
          {id: '3', name: 'Candra Wijaya', class: 'XII-2', gender: 'male'},
          {id: '4', name: 'Dedi Kurniawan', class: 'XII-2', gender: 'male'},
        ],
      },
      {
        id: '202',
        number: '202',
        type: 'standard',
        capacity: 4,
        floor: 2,
        gender: 'male',
        students: [
          {id: '5', name: 'Eko Prasetyo', class: 'XII-3', gender: 'male'},
          {id: '6', name: 'Fajar Ramadhan', class: 'XII-3', gender: 'male'},
          {id: '7', name: 'Galih Permana', class: 'XII-4', gender: 'male'},
          {id: '8', name: 'Hadi Gunawan', class: 'XII-4', gender: 'male'},
        ],
      },
      {
        id: '203',
        number: '203',
        type: 'deluxe',
        capacity: 3,
        floor: 2,
        gender: 'male',
        students: [
          {id: '9', name: 'Indra Setiawan', class: 'XII-5', gender: 'male'},
          {id: '10', name: 'Joko Susilo', class: 'XII-5', gender: 'male'},
          {id: '11', name: 'Krisna Bayu', class: 'XII-6', gender: 'male'},
        ],
      },
      {
        id: '204',
        number: '204',
        type: 'standard',
        capacity: 4,
        floor: 2,
        gender: 'male',
        students: [
          {id: '12', name: 'Lukman Hakim', class: 'XII-6', gender: 'male'},
          {id: '13', name: 'Muhammad Fadil', class: 'XII-7', gender: 'male'},
          {id: '14', name: 'Nanda Pratama', class: 'XII-7', gender: 'male'},
          {id: '15', name: 'Oki Setiawan', class: 'XII-8', gender: 'male'},
        ],
      },
      // Lantai 3 - Kamar Putri
      {
        id: '301',
        number: '301',
        type: 'standard',
        capacity: 4,
        floor: 3,
        gender: 'female',
        students: [
          {id: '16', name: 'Aisyah Putri', class: 'XII-1', gender: 'female'},
          {id: '17', name: 'Bella Safitri', class: 'XII-1', gender: 'female'},
          {id: '18', name: 'Citra Dewi', class: 'XII-2', gender: 'female'},
          {id: '19', name: 'Dina Marlina', class: 'XII-2', gender: 'female'},
        ],
      },
      {
        id: '302',
        number: '302',
        type: 'standard',
        capacity: 4,
        floor: 3,
        gender: 'female',
        students: [
          {id: '20', name: 'Eka Handayani', class: 'XII-3', gender: 'female'},
          {id: '21', name: 'Fitri Rahmawati', class: 'XII-3', gender: 'female'},
          {id: '22', name: 'Gita Sari', class: 'XII-4', gender: 'female'},
          {id: '23', name: 'Hana Safitri', class: 'XII-4', gender: 'female'},
        ],
      },
      {
        id: '303',
        number: '303',
        type: 'deluxe',
        capacity: 3,
        floor: 3,
        gender: 'female',
        students: [
          {id: '24', name: 'Indira Putri', class: 'XII-5', gender: 'female'},
          {id: '25', name: 'Jihan Ayu', class: 'XII-5', gender: 'female'},
          {id: '26', name: 'Kirana Dewi', class: 'XII-6', gender: 'female'},
        ],
      },
      {
        id: '304',
        number: '304',
        type: 'standard',
        capacity: 4,
        floor: 3,
        gender: 'female',
        students: [
          {id: '27', name: 'Lina Marlina', class: 'XII-6', gender: 'female'},
          {id: '28', name: 'Maya Sari', class: 'XII-7', gender: 'female'},
          {id: '29', name: 'Nisa Rahmawati', class: 'XII-7', gender: 'female'},
          {id: '30', name: 'Olivia Putri', class: 'XII-8', gender: 'female'},
        ],
      },
    ],
  };

  const getRoomTypeColor = (type: string) => {
    switch (type) {
      case 'standard':
        return '#4A90E2';
      case 'deluxe':
        return '#F39C12';
      case 'suite':
        return '#E74C3C';
      default:
        return '#95A5A6';
    }
  };

  const getRoomTypeName = (type: string) => {
    switch (type) {
      case 'standard':
        return 'Standard';
      case 'deluxe':
        return 'Deluxe';
      case 'suite':
        return 'Suite';
      default:
        return 'Unknown';
    }
  };

  const handleRoomPress = (room: Room) => {
    setSelectedRoom(room);
    setRoomDetailVisible(true);
  };

  const renderRoomCard = (room: Room) => (
    <TouchableOpacity
      key={room.id}
      style={styles.roomCard}
      onPress={() => handleRoomPress(room)}>
      <View style={styles.roomHeader}>
        <View style={styles.roomNumberContainer}>
          <Bed size={24} color={getRoomTypeColor(room.type)} />
          <Text style={styles.roomNumber}>{room.number}</Text>
        </View>
        <View style={[styles.roomTypeBadge, {backgroundColor: getRoomTypeColor(room.type)}]}>
          <Text style={styles.roomTypeText}>{getRoomTypeName(room.type)}</Text>
        </View>
      </View>
      
      <View style={styles.roomInfo}>
        <Text style={styles.floorText}>Lantai {room.floor}</Text>
        <Text style={styles.genderText}>
          {room.gender === 'male' ? '👨 Putra' : '👩 Putri'}
        </Text>
        <Text style={styles.capacityText}>
          {room.students.length}/{room.capacity} siswa
        </Text>
      </View>

      <View style={styles.studentsPreview}>
        {room.students.slice(0, 2).map((student, index) => (
          <Text key={student.id} style={styles.studentPreviewText}>
            • {student.name} ({student.class})
          </Text>
        ))}
        {room.students.length > 2 && (
          <Text style={styles.moreStudentsText}>
            +{room.students.length - 2} siswa lainnya
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );

  const renderStudentItem = ({item}: {item: Student}) => (
    <View style={styles.studentItem}>
      <User size={20} color="#4A90E2" />
      <View style={styles.studentInfo}>
        <Text style={styles.studentName}>{item.name}</Text>
        <Text style={styles.studentClass}>{item.class}</Text>
      </View>
    </View>
  );

  const groupRoomsByFloor = () => {
    const grouped = hotelData.rooms.reduce((acc, room) => {
      if (!acc[room.floor]) {
        acc[room.floor] = [];
      }
      acc[room.floor].push(room);
      return acc;
    }, {} as Record<number, Room[]>);
    
    return Object.entries(grouped).sort(([a], [b]) => Number(a) - Number(b));
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
        <Text style={styles.headerTitle}>Info Hotel</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Hotel Info */}
          <View style={styles.hotelInfoCard}>
            <View style={styles.hotelHeader}>
              <Hotel size={32} color="#4A90E2" />
              <View style={styles.hotelInfo}>
                <Text style={styles.hotelName}>{hotelData.name}</Text>
                <View style={styles.addressContainer}>
                  <MapPin size={16} color="#7F8C8D" />
                  <Text style={styles.hotelAddress}>{hotelData.address}</Text>
                </View>
              </View>
            </View>
            
            <View style={styles.hotelStats}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{hotelData.occupiedRooms}</Text>
                <Text style={styles.statLabel}>Kamar Terisi</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{hotelData.totalRooms}</Text>
                <Text style={styles.statLabel}>Total Kamar</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>
                  {hotelData.rooms.reduce((sum, room) => sum + room.students.length, 0)}
                </Text>
                <Text style={styles.statLabel}>Total Siswa</Text>
              </View>
            </View>
          </View>

          {/* Rooms by Floor */}
          {groupRoomsByFloor().map(([floor, rooms]) => (
            <View key={floor} style={styles.floorSection}>
              <Text style={styles.floorTitle}>Lantai {floor}</Text>
              <Text style={styles.floorSubtitle}>
                {rooms[0]?.gender === 'male' ? 'Kamar Putra' : 'Kamar Putri'}
              </Text>
              {rooms.map(renderRoomCard)}
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Room Detail Modal */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={roomDetailVisible}
        onRequestClose={() => setRoomDetailVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity
              style={styles.modalBackButton}
              onPress={() => setRoomDetailVisible(false)}>
              <ArrowLeft size={24} color="#2C3E50" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>
              Kamar {selectedRoom?.number}
            </Text>
            <View style={styles.placeholder} />
          </View>
          
          {selectedRoom && (
            <View style={styles.modalContent}>
              <View style={styles.roomDetailHeader}>
                <View style={styles.roomDetailInfo}>
                  <Text style={styles.roomDetailNumber}>Kamar {selectedRoom.number}</Text>
                  <Text style={styles.roomDetailType}>
                    {getRoomTypeName(selectedRoom.type)} - Lantai {selectedRoom.floor}
                  </Text>
                  <Text style={styles.roomDetailGender}>
                    {selectedRoom.gender === 'male' ? '👨 Kamar Putra' : '👩 Kamar Putri'}
                  </Text>
                </View>
                <View style={styles.roomDetailCapacity}>
                  <Users size={24} color="#4A90E2" />
                  <Text style={styles.capacityDetailText}>
                    {selectedRoom.students.length}/{selectedRoom.capacity}
                  </Text>
                </View>
              </View>

              <Text style={styles.studentsListTitle}>Daftar Siswa</Text>
              <FlatList
                data={selectedRoom.students}
                renderItem={renderStudentItem}
                keyExtractor={(item) => item.id}
                style={styles.studentsList}
                showsVerticalScrollIndicator={false}
              />
            </View>
          )}
        </View>
      </Modal>
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
  hotelInfoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  hotelHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  hotelInfo: {
    flex: 1,
    marginLeft: 15,
  },
  hotelName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 8,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 5,
  },
  hotelAddress: {
    fontSize: 14,
    color: '#7F8C8D',
    flex: 1,
    lineHeight: 20,
  },
  hotelStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  statLabel: {
    fontSize: 12,
    color: '#7F8C8D',
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#E8E8E8',
  },
  floorSection: {
    marginBottom: 25,
  },
  floorTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 5,
  },
  floorSubtitle: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 15,
  },
  roomCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  roomHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  roomNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  roomNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  roomTypeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  roomTypeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  roomInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  floorText: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  genderText: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  capacityText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4A90E2',
  },
  studentsPreview: {
    gap: 2,
  },
  studentPreviewText: {
    fontSize: 13,
    color: '#2C3E50',
  },
  moreStudentsText: {
    fontSize: 13,
    color: '#4A90E2',
    fontStyle: 'italic',
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
    padding: 20,
  },
  roomDetailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  roomDetailInfo: {
    flex: 1,
  },
  roomDetailNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 5,
  },
  roomDetailType: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 5,
  },
  roomDetailGender: {
    fontSize: 14,
    color: '#4A90E2',
    fontWeight: '600',
  },
  roomDetailCapacity: {
    alignItems: 'center',
    gap: 5,
  },
  capacityDetailText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  studentsListTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 15,
  },
  studentsList: {
    flex: 1,
  },
  studentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 1,
  },
  studentInfo: {
    marginLeft: 12,
    flex: 1,
  },
  studentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 2,
  },
  studentClass: {
    fontSize: 14,
    color: '#7F8C8D',
  },
});

export default HotelScreen;