import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Camera,
  Utensils,
  Bed,
  Bus,
  Users,
  BookOpen,
} from 'lucide-react-native';

interface Activity {
  id: string;
  time: string;
  title: string;
  description: string;
  location: string;
  type: 'transport' | 'meal' | 'activity' | 'accommodation' | 'free_time';
  duration?: string;
  notes?: string;
}

interface DaySchedule {
  day: number;
  date: string;
  title: string;
  activities: Activity[];
}

const ScheduleScreen = ({navigation}: any) => {
  const [selectedDay, setSelectedDay] = useState<number>(1);

  // Dummy data untuk jadwal 5 hari
  const scheduleData: DaySchedule[] = [
    {
      day: 1,
      date: '2024-03-15',
      title: 'Hari Pertama - Keberangkatan',
      activities: [
        {
          id: '1-1',
          time: '05:00',
          title: 'Berkumpul di Sekolah',
          description: 'Siswa berkumpul di halaman sekolah untuk persiapan keberangkatan',
          location: 'SMAN 1 Malang',
          type: 'activity',
          duration: '30 menit',
          notes: 'Bawa tas dan dokumen perjalanan',
        },
        {
          id: '1-2',
          time: '05:30',
          title: 'Keberangkatan ke Surabaya',
          description: 'Perjalanan menggunakan 8 bus menuju Surabaya',
          location: 'Malang - Surabaya',
          type: 'transport',
          duration: '3 jam',
        },
        {
          id: '1-3',
          time: '09:00',
          title: 'Sarapan',
          description: 'Sarapan di Rest Area Pandaan',
          location: 'Rest Area Pandaan',
          type: 'meal',
          duration: '45 menit',
        },
        {
          id: '1-4',
          time: '10:30',
          title: 'Kunjungan Museum Sepuluh Nopember',
          description: 'Belajar sejarah perjuangan kemerdekaan Indonesia',
          location: 'Museum Sepuluh Nopember, Surabaya',
          type: 'activity',
          duration: '2 jam',
        },
        {
          id: '1-5',
          time: '13:00',
          title: 'Makan Siang',
          description: 'Makan siang di restoran lokal',
          location: 'Restoran Rawon Setan, Surabaya',
          type: 'meal',
          duration: '1 jam',
        },
        {
          id: '1-6',
          time: '15:00',
          title: 'Jelajah Tugu Pahlawan',
          description: 'Mengunjungi monumen bersejarah dan museum',
          location: 'Tugu Pahlawan, Surabaya',
          type: 'activity',
          duration: '2 jam',
        },
        {
          id: '1-7',
          time: '18:00',
          title: 'Check-in Hotel',
          description: 'Check-in dan istirahat di hotel',
          location: 'Grand Hotel Surabaya',
          type: 'accommodation',
          duration: '1 jam',
        },
        {
          id: '1-8',
          time: '19:30',
          title: 'Makan Malam',
          description: 'Makan malam bersama di hotel',
          location: 'Grand Hotel Surabaya',
          type: 'meal',
          duration: '1 jam',
        },
      ],
    },
    {
      day: 2,
      date: '2024-03-16',
      title: 'Hari Kedua - Eksplorasi Surabaya',
      activities: [
        {
          id: '2-1',
          time: '06:00',
          title: 'Sarapan',
          description: 'Sarapan di hotel',
          location: 'Grand Hotel Surabaya',
          type: 'meal',
          duration: '1 jam',
        },
        {
          id: '2-2',
          time: '08:00',
          title: 'Kunjungan Kebun Binatang Surabaya',
          description: 'Belajar tentang konservasi satwa dan ekosistem',
          location: 'Kebun Binatang Surabaya',
          type: 'activity',
          duration: '3 jam',
        },
        {
          id: '2-3',
          time: '12:00',
          title: 'Makan Siang',
          description: 'Makan siang di food court',
          location: 'Tunjungan Plaza, Surabaya',
          type: 'meal',
          duration: '1 jam',
        },
        {
          id: '2-4',
          time: '14:00',
          title: 'Wisata Kampung Arab',
          description: 'Menjelajahi budaya dan arsitektur Arab di Surabaya',
          location: 'Kampung Arab Ampel, Surabaya',
          type: 'activity',
          duration: '2 jam',
        },
        {
          id: '2-5',
          time: '16:30',
          title: 'Jembatan Suramadu',
          description: 'Foto bersama di landmark terkenal Surabaya',
          location: 'Jembatan Suramadu',
          type: 'activity',
          duration: '1.5 jam',
        },
        {
          id: '2-6',
          time: '19:00',
          title: 'Makan Malam',
          description: 'Makan malam seafood di pantai',
          location: 'Pantai Kenjeran, Surabaya',
          type: 'meal',
          duration: '1.5 jam',
        },
        {
          id: '2-7',
          time: '21:00',
          title: 'Waktu Bebas',
          description: 'Istirahat dan persiapan untuk hari berikutnya',
          location: 'Grand Hotel Surabaya',
          type: 'free_time',
          duration: '2 jam',
        },
      ],
    },
    {
      day: 3,
      date: '2024-03-17',
      title: 'Hari Ketiga - Perjalanan ke Malang',
      activities: [
        {
          id: '3-1',
          time: '07:00',
          title: 'Sarapan & Check-out',
          description: 'Sarapan dan check-out dari hotel',
          location: 'Grand Hotel Surabaya',
          type: 'meal',
          duration: '1 jam',
        },
        {
          id: '3-2',
          time: '09:00',
          title: 'Perjalanan ke Batu',
          description: 'Perjalanan menuju Kota Batu, Malang',
          location: 'Surabaya - Batu',
          type: 'transport',
          duration: '2.5 jam',
        },
        {
          id: '3-3',
          time: '12:00',
          title: 'Makan Siang',
          description: 'Makan siang di restoran lokal',
          location: 'Restoran Sari Rasa, Batu',
          type: 'meal',
          duration: '1 jam',
        },
        {
          id: '3-4',
          time: '14:00',
          title: 'Jatim Park 1',
          description: 'Wahana edukasi dan rekreasi sains',
          location: 'Jatim Park 1, Batu',
          type: 'activity',
          duration: '4 jam',
        },
        {
          id: '3-5',
          time: '18:30',
          title: 'Check-in Hotel Batu',
          description: 'Check-in di hotel dan istirahat',
          location: 'Hotel Kartika Wijaya, Batu',
          type: 'accommodation',
          duration: '30 menit',
        },
        {
          id: '3-6',
          time: '19:30',
          title: 'Makan Malam',
          description: 'Makan malam khas Malang',
          location: 'Warung Gudeg Bu Tjitro, Batu',
          type: 'meal',
          duration: '1 jam',
        },
        {
          id: '3-7',
          time: '21:00',
          title: 'Istirahat',
          description: 'Istirahat malam di hotel',
          location: 'Hotel Kartika Wijaya, Batu',
          type: 'free_time',
        },
      ],
    },
    {
      day: 4,
      date: '2024-03-18',
      title: 'Hari Keempat - Wisata Batu & Malang',
      activities: [
        {
          id: '4-1',
          time: '06:30',
          title: 'Sarapan',
          description: 'Sarapan di hotel',
          location: 'Hotel Kartika Wijaya, Batu',
          type: 'meal',
          duration: '1 jam',
        },
        {
          id: '4-2',
          time: '08:00',
          title: 'Museum Angkut',
          description: 'Belajar sejarah transportasi dunia',
          location: 'Museum Angkut, Batu',
          type: 'activity',
          duration: '3 jam',
        },
        {
          id: '4-3',
          time: '12:00',
          title: 'Makan Siang',
          description: 'Makan siang di area wisata',
          location: 'Food Court Museum Angkut',
          type: 'meal',
          duration: '1 jam',
        },
        {
          id: '4-4',
          time: '14:00',
          title: 'Selecta Recreation Park',
          description: 'Rekreasi dan foto di taman bunga',
          location: 'Selecta, Batu',
          type: 'activity',
          duration: '2.5 jam',
        },
        {
          id: '4-5',
          time: '17:00',
          title: 'Perjalanan ke Malang',
          description: 'Perjalanan menuju pusat kota Malang',
          location: 'Batu - Malang',
          type: 'transport',
          duration: '45 menit',
        },
        {
          id: '4-6',
          time: '18:00',
          title: 'Jalan Ijen Boulevard',
          description: 'Jalan-jalan di kawasan bersejarah Malang',
          location: 'Jalan Ijen, Malang',
          type: 'activity',
          duration: '1.5 jam',
        },
        {
          id: '4-7',
          time: '20:00',
          title: 'Makan Malam',
          description: 'Makan malam di Malang Town Square',
          location: 'Malang Town Square',
          type: 'meal',
          duration: '1.5 jam',
        },
        {
          id: '4-8',
          time: '22:00',
          title: 'Check-in Hotel Malang',
          description: 'Check-in dan istirahat',
          location: 'Grand Hotel Malang',
          type: 'accommodation',
        },
      ],
    },
    {
      day: 5,
      date: '2024-03-19',
      title: 'Hari Kelima - Kepulangan',
      activities: [
        {
          id: '5-1',
          time: '07:00',
          title: 'Sarapan & Check-out',
          description: 'Sarapan terakhir dan check-out dari hotel',
          location: 'Grand Hotel Malang',
          type: 'meal',
          duration: '1 jam',
        },
        {
          id: '5-2',
          time: '09:00',
          title: 'Alun-alun Malang',
          description: 'Foto bersama dan belanja oleh-oleh',
          location: 'Alun-alun Kota Malang',
          type: 'activity',
          duration: '2 jam',
        },
        {
          id: '5-3',
          time: '11:30',
          title: 'Belanja Oleh-oleh',
          description: 'Berbelanja oleh-oleh khas Malang',
          location: 'Pasar Besar Malang',
          type: 'activity',
          duration: '1.5 jam',
        },
        {
          id: '5-4',
          time: '13:00',
          title: 'Makan Siang',
          description: 'Makan siang terakhir di Malang',
          location: 'Restoran Tahu Tempe Bu Rudy',
          type: 'meal',
          duration: '1 jam',
        },
        {
          id: '5-5',
          time: '15:00',
          title: 'Perjalanan Pulang',
          description: 'Perjalanan kembali ke sekolah',
          location: 'Malang - Sekolah',
          type: 'transport',
          duration: '3 jam',
          notes: 'Estimasi tiba di sekolah pukul 18:00',
        },
        {
          id: '5-6',
          time: '18:00',
          title: 'Tiba di Sekolah',
          description: 'Tiba di sekolah dan penutupan acara',
          location: 'SMAN 1 Malang',
          type: 'activity',
          duration: '30 menit',
        },
      ],
    },
  ];

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'transport':
        return <Bus size={20} color="#4A90E2" />;
      case 'meal':
        return <Utensils size={20} color="#E67E22" />;
      case 'activity':
        return <Camera size={20} color="#27AE60" />;
      case 'accommodation':
        return <Bed size={20} color="#8E44AD" />;
      case 'free_time':
        return <Users size={20} color="#95A5A6" />;
      default:
        return <BookOpen size={20} color="#34495E" />;
    }
  };

  const getActivityColor = (type: Activity['type']) => {
    switch (type) {
      case 'transport':
        return '#E3F2FD';
      case 'meal':
        return '#FFF3E0';
      case 'activity':
        return '#E8F5E8';
      case 'accommodation':
        return '#F3E5F5';
      case 'free_time':
        return '#F5F5F5';
      default:
        return '#ECEFF1';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const renderActivity = (activity: Activity, index: number, isLast: boolean) => (
    <View key={activity.id} style={styles.activityContainer}>
      <View style={styles.timelineContainer}>
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{activity.time}</Text>
        </View>
        <View style={styles.timelineLine}>
          <View style={[styles.timelineDot, {backgroundColor: getActivityColor(activity.type)}]}>
            {getActivityIcon(activity.type)}
          </View>
          {!isLast && <View style={styles.timelineConnector} />}
        </View>
      </View>
      
      <View style={[styles.activityCard, {backgroundColor: getActivityColor(activity.type)}]}>
        <View style={styles.activityHeader}>
          <Text style={styles.activityTitle}>{activity.title}</Text>
          {activity.duration && (
            <View style={styles.durationBadge}>
              <Clock size={12} color="#7F8C8D" />
              <Text style={styles.durationText}>{activity.duration}</Text>
            </View>
          )}
        </View>
        
        <Text style={styles.activityDescription}>{activity.description}</Text>
        
        <View style={styles.locationContainer}>
          <MapPin size={14} color="#7F8C8D" />
          <Text style={styles.locationText}>{activity.location}</Text>
        </View>
        
        {activity.notes && (
          <Text style={styles.notesText}>📝 {activity.notes}</Text>
        )}
      </View>
    </View>
  );

  const selectedSchedule = scheduleData.find(day => day.day === selectedDay);

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
        <Text style={styles.headerTitle}>Jadwal Kegiatan</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Day Selector */}
      <View style={styles.daySelector}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {scheduleData.map((day) => (
            <TouchableOpacity
              key={day.day}
              style={[
                styles.dayButton,
                selectedDay === day.day && styles.selectedDayButton,
              ]}
              onPress={() => setSelectedDay(day.day)}>
              <Calendar size={16} color={selectedDay === day.day ? '#FFFFFF' : '#4A90E2'} />
              <Text
                style={[
                  styles.dayButtonText,
                  selectedDay === day.day && styles.selectedDayButtonText,
                ]}>
                Hari {day.day}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Schedule Content */}
      {selectedSchedule && (
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <View style={styles.dayHeader}>
              <Text style={styles.dayTitle}>{selectedSchedule.title}</Text>
              <Text style={styles.dayDate}>{formatDate(selectedSchedule.date)}</Text>
            </View>

            <View style={styles.activitiesList}>
              {selectedSchedule.activities.map((activity, index) =>
                renderActivity(activity, index, index === selectedSchedule.activities.length - 1)
              )}
            </View>
          </View>
        </ScrollView>
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
  daySelector: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  dayButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#4A90E2',
    gap: 6,
  },
  selectedDayButton: {
    backgroundColor: '#4A90E2',
  },
  dayButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4A90E2',
  },
  selectedDayButtonText: {
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  dayHeader: {
    marginBottom: 20,
  },
  dayTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 5,
  },
  dayDate: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  activitiesList: {
    gap: 0,
  },
  activityContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  timelineContainer: {
    alignItems: 'center',
    marginRight: 15,
  },
  timeContainer: {
    marginBottom: 10,
  },
  timeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4A90E2',
    textAlign: 'center',
    minWidth: 40,
  },
  timelineLine: {
    alignItems: 'center',
    flex: 1,
  },
  timelineDot: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  timelineConnector: {
    width: 2,
    flex: 1,
    backgroundColor: '#E8E8E8',
    marginTop: 5,
  },
  activityCard: {
    flex: 1,
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    flex: 1,
    marginRight: 10,
  },
  durationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  durationText: {
    fontSize: 11,
    color: '#7F8C8D',
    fontWeight: '600',
  },
  activityDescription: {
    fontSize: 14,
    color: '#2C3E50',
    lineHeight: 20,
    marginBottom: 10,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    marginBottom: 8,
  },
  locationText: {
    fontSize: 13,
    color: '#7F8C8D',
    flex: 1,
    lineHeight: 18,
  },
  notesText: {
    fontSize: 12,
    color: '#4A90E2',
    fontStyle: 'italic',
    backgroundColor: '#FFFFFF',
    padding: 8,
    borderRadius: 8,
    marginTop: 5,
  },
});

export default ScheduleScreen;