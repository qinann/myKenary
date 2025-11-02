import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  RefreshControl,
  Alert,
} from 'react-native';
import {
  ArrowLeft,
  MapPin,
  Navigation,
  Clock,
  Phone,
  AlertTriangle,
  RefreshCw,
  Bus,
} from 'lucide-react-native';

interface BusLocation {
  id: string;
  name: string;
  driver: string;
  phone: string;
  plateNumber: string;
  currentLocation: {
    latitude: number;
    longitude: number;
    address: string;
    timestamp: string;
  };
  status: 'moving' | 'stopped' | 'emergency' | 'offline';
  speed: number; // km/h
  lastUpdate: string;
  route: string;
  estimatedArrival?: string;
}

const LiveLocationScreen = ({navigation}: any) => {
  const [busLocations, setBusLocations] = useState<BusLocation[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<string>('');

  // Dummy data untuk live location 8 bus
  const generateBusLocations = (): BusLocation[] => {
    const locations = [
      {
        address: 'Jl. Raya Malang-Surabaya KM 15',
        latitude: -7.9666,
        longitude: 112.6326,
      },
      {
        address: 'Rest Area Pandaan, Pasuruan',
        latitude: -7.6298,
        longitude: 112.6892,
      },
      {
        address: 'Jl. Ahmad Yani, Surabaya',
        latitude: -7.2575,
        longitude: 112.7521,
      },
      {
        address: 'Terminal Bungurasih, Surabaya',
        latitude: -7.3467,
        longitude: 112.7378,
      },
      {
        address: 'Jl. Raya Gempol-Pandaan',
        latitude: -7.5447,
        longitude: 112.6789,
      },
      {
        address: 'Jl. Bypass Mojokerto',
        latitude: -7.4664,
        longitude: 112.4336,
      },
      {
        address: 'Jl. Raya Malang-Batu KM 8',
        latitude: -7.8753,
        longitude: 112.5289,
      },
      {
        address: 'Alun-alun Malang',
        latitude: -7.9826,
        longitude: 112.6306,
      },
    ];

    const statuses: BusLocation['status'][] = ['moving', 'stopped', 'moving', 'moving', 'stopped', 'moving', 'emergency', 'offline'];
    const routes = [
      'Malang - Surabaya',
      'Malang - Pandaan',
      'Surabaya - Gresik',
      'Surabaya - Sidoarjo',
      'Pandaan - Malang',
      'Mojokerto - Surabaya',
      'Batu - Malang',
      'Malang City Tour',
    ];

    return Array.from({length: 8}, (_, index) => ({
      id: `bus-${index + 1}`,
      name: `Bus ${String.fromCharCode(65 + index)}`,
      driver: `Driver ${index + 1}`,
      phone: `+62 81${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10000000).toString().padStart(7, '0')}`,
      plateNumber: `B ${Math.floor(Math.random() * 9000) + 1000} ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`,
      currentLocation: {
        ...locations[index],
        timestamp: new Date(Date.now() - Math.floor(Math.random() * 300000)).toISOString(),
      },
      status: statuses[index],
      speed: statuses[index] === 'moving' ? Math.floor(Math.random() * 60) + 20 : 0,
      lastUpdate: new Date(Date.now() - Math.floor(Math.random() * 60000)).toISOString(),
      route: routes[index],
      estimatedArrival: statuses[index] === 'moving' ? 
        new Date(Date.now() + Math.floor(Math.random() * 7200000) + 1800000).toISOString() : undefined,
    }));
  };

  useEffect(() => {
    setBusLocations(generateBusLocations());
    setLastRefresh(new Date().toLocaleTimeString('id-ID'));
    
    // Simulate real-time updates
    const interval = setInterval(() => {
      setBusLocations(prev => prev.map(bus => ({
        ...bus,
        currentLocation: {
          ...bus.currentLocation,
          timestamp: new Date().toISOString(),
        },
        lastUpdate: new Date().toISOString(),
        speed: bus.status === 'moving' ? Math.floor(Math.random() * 60) + 20 : 0,
      })));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setBusLocations(generateBusLocations());
      setLastRefresh(new Date().toLocaleTimeString('id-ID'));
      setRefreshing(false);
    }, 1000);
  };

  const getStatusColor = (status: BusLocation['status']) => {
    switch (status) {
      case 'moving':
        return '#27AE60';
      case 'stopped':
        return '#F39C12';
      case 'emergency':
        return '#E74C3C';
      case 'offline':
        return '#95A5A6';
      default:
        return '#95A5A6';
    }
  };

  const getStatusText = (status: BusLocation['status']) => {
    switch (status) {
      case 'moving':
        return 'Bergerak';
      case 'stopped':
        return 'Berhenti';
      case 'emergency':
        return 'Darurat';
      case 'offline':
        return 'Offline';
      default:
        return 'Unknown';
    }
  };

  const getStatusIcon = (status: BusLocation['status']) => {
    switch (status) {
      case 'moving':
        return <Navigation size={16} color="#FFFFFF" />;
      case 'stopped':
        return <Clock size={16} color="#FFFFFF" />;
      case 'emergency':
        return <AlertTriangle size={16} color="#FFFFFF" />;
      case 'offline':
        return <RefreshCw size={16} color="#FFFFFF" />;
      default:
        return <MapPin size={16} color="#FFFFFF" />;
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleCallDriver = (phone: string, driverName: string) => {
    Alert.alert(
      'Hubungi Driver',
      `Apakah Anda ingin menghubungi ${driverName}?`,
      [
        {text: 'Batal', style: 'cancel'},
        {text: 'Hubungi', onPress: () => console.log(`Calling ${phone}`)},
      ]
    );
  };

  const handleEmergency = (bus: BusLocation) => {
    Alert.alert(
      'Status Darurat',
      `${bus.name} dalam kondisi darurat!\nLokasi: ${bus.currentLocation.address}\nDriver: ${bus.driver}`,
      [
        {text: 'OK'},
        {text: 'Hubungi Driver', onPress: () => handleCallDriver(bus.phone, bus.driver)},
      ]
    );
  };

  const renderBusCard = (bus: BusLocation) => (
    <TouchableOpacity
      key={bus.id}
      style={[
        styles.busCard,
        bus.status === 'emergency' && styles.emergencyCard,
      ]}
      onPress={() => bus.status === 'emergency' && handleEmergency(bus)}>
      <View style={styles.busHeader}>
        <View style={styles.busInfo}>
          <View style={styles.busNameContainer}>
            <Bus size={24} color="#4A90E2" />
            <Text style={styles.busName}>{bus.name}</Text>
            <View style={[styles.statusBadge, {backgroundColor: getStatusColor(bus.status)}]}>
              {getStatusIcon(bus.status)}
              <Text style={styles.statusText}>{getStatusText(bus.status)}</Text>
            </View>
          </View>
          <Text style={styles.busDriver}>Driver: {bus.driver}</Text>
          <Text style={styles.busPlate}>{bus.plateNumber}</Text>
        </View>
        <TouchableOpacity
          style={styles.phoneButton}
          onPress={() => handleCallDriver(bus.phone, bus.driver)}>
          <Phone size={20} color="#4A90E2" />
        </TouchableOpacity>
      </View>

      <View style={styles.locationInfo}>
        <MapPin size={16} color="#7F8C8D" />
        <Text style={styles.locationText}>{bus.currentLocation.address}</Text>
      </View>

      <View style={styles.busDetails}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Rute:</Text>
          <Text style={styles.detailValue}>{bus.route}</Text>
        </View>
        {bus.status === 'moving' && (
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Kecepatan:</Text>
            <Text style={styles.detailValue}>{bus.speed} km/h</Text>
          </View>
        )}
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Update Terakhir:</Text>
          <Text style={styles.detailValue}>{formatTime(bus.lastUpdate)}</Text>
        </View>
        {bus.estimatedArrival && (
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Estimasi Tiba:</Text>
            <Text style={styles.detailValue}>{formatDate(bus.estimatedArrival)}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  const getOverallStatus = () => {
    const moving = busLocations.filter(bus => bus.status === 'moving').length;
    const stopped = busLocations.filter(bus => bus.status === 'stopped').length;
    const emergency = busLocations.filter(bus => bus.status === 'emergency').length;
    const offline = busLocations.filter(bus => bus.status === 'offline').length;

    return {moving, stopped, emergency, offline};
  };

  const status = getOverallStatus();

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
        <Text style={styles.headerTitle}>Live Location</Text>
        <TouchableOpacity style={styles.refreshButton} onPress={onRefresh}>
          <RefreshCw size={20} color="#4A90E2" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.content}>
          {/* Status Overview */}
          <View style={styles.statusOverview}>
            <Text style={styles.overviewTitle}>Status Bus Real-time</Text>
            <Text style={styles.lastRefreshText}>
              Update terakhir: {lastRefresh}
            </Text>
            
            <View style={styles.statusGrid}>
              <View style={styles.statusItem}>
                <View style={[styles.statusIndicator, {backgroundColor: '#27AE60'}]} />
                <Text style={styles.statusCount}>{status.moving}</Text>
                <Text style={styles.statusLabel}>Bergerak</Text>
              </View>
              <View style={styles.statusItem}>
                <View style={[styles.statusIndicator, {backgroundColor: '#F39C12'}]} />
                <Text style={styles.statusCount}>{status.stopped}</Text>
                <Text style={styles.statusLabel}>Berhenti</Text>
              </View>
              <View style={styles.statusItem}>
                <View style={[styles.statusIndicator, {backgroundColor: '#E74C3C'}]} />
                <Text style={styles.statusCount}>{status.emergency}</Text>
                <Text style={styles.statusLabel}>Darurat</Text>
              </View>
              <View style={styles.statusItem}>
                <View style={[styles.statusIndicator, {backgroundColor: '#95A5A6'}]} />
                <Text style={styles.statusCount}>{status.offline}</Text>
                <Text style={styles.statusLabel}>Offline</Text>
              </View>
            </View>
          </View>

          {/* Bus List */}
          <Text style={styles.sectionTitle}>Daftar Bus</Text>
          {busLocations.map(renderBusCard)}
        </View>
      </ScrollView>
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
  refreshButton: {
    padding: 5,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  statusOverview: {
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
  overviewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 5,
  },
  lastRefreshText: {
    fontSize: 12,
    color: '#7F8C8D',
    marginBottom: 15,
  },
  statusGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statusItem: {
    alignItems: 'center',
    flex: 1,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginBottom: 8,
  },
  statusCount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  statusLabel: {
    fontSize: 12,
    color: '#7F8C8D',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 15,
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
  emergencyCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#E74C3C',
  },
  busHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  busInfo: {
    flex: 1,
  },
  busNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  busName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
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
  phoneButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#E3F2FD',
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
    gap: 8,
  },
  locationText: {
    fontSize: 14,
    color: '#2C3E50',
    flex: 1,
    lineHeight: 20,
  },
  busDetails: {
    gap: 8,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3E50',
  },
});

export default LiveLocationScreen;