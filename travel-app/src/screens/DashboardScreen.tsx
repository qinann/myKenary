<<<<<<< HEAD
import React from 'react';
=======
import React, { useEffect, useState, useCallback } from 'react';
>>>>>>> e895365 (feat(web): My Kenary branding & logo)
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Linking,
  Dimensions,
  StatusBar,
<<<<<<< HEAD
=======
  Alert,
>>>>>>> e895365 (feat(web): My Kenary branding & logo)
} from 'react-native';
import {
  Bus,
  Hotel,
  MapPin,
  Calendar,
  Users,
  User,
  BookOpen,
  Image as ImageIcon,
  FileText,
  Phone,
  Search,
  Youtube,
  Instagram,
  LogOut,
  Shield,
} from 'lucide-react-native';
import {useAuth} from '../contexts/AuthContext';
<<<<<<< HEAD
=======
import { apiService, TourLeader as ApiTourLeader, Bus as ApiBus } from '../services/api';
>>>>>>> e895365 (feat(web): My Kenary branding & logo)

const {width} = Dimensions.get('window');

interface MenuCard {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  color: string;
  onPress: () => void;
}

<<<<<<< HEAD
interface TourGuide {
  id: string;
  name: string;
  phone: string;
=======
interface UiLead {
  id: string;
  name: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  busId?: string | null;
  busName?: string;
>>>>>>> e895365 (feat(web): My Kenary branding & logo)
}

const DashboardScreen = ({navigation}: any) => {
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  const menuCards: MenuCard[] = [
    {
      id: '1',
      title: 'Info Bus',
      icon: Bus,
      color: '#4A90E2',
      onPress: () => navigation.navigate('BusInfo'),
    },
    {
      id: '2',
      title: 'Info Hotel',
      icon: Hotel,
      color: '#4A90E2',
      onPress: () => navigation.navigate('Hotel'),
    },
    {
      id: '3',
      title: 'Live Location',
      icon: MapPin,
      color: '#4A90E2',
      onPress: () => navigation.navigate('LiveLocation'),
    },
    {
      id: '4',
      title: 'Jadwal',
      icon: Calendar,
      color: '#4A90E2',
      onPress: () => navigation.navigate('Schedule'),
    },
    {
      id: '5',
      title: 'Daftar Siswa',
      icon: Users,
      color: '#4A90E2',
      onPress: () => navigation.navigate('StudentList'),
    },
    {
      id: '6',
      title: 'Booklet',
      icon: BookOpen,
      color: '#4A90E2',
<<<<<<< HEAD
      onPress: () => navigation.navigate('Booklet'),
=======
      onPress: async () => {
        const viewUrl = 'https://drive.google.com/file/d/1suMIjM43hPwqdqv4cQDDJ6ll8UTi9lZc/view?usp=sharing';
        const downloadUrl = 'https://drive.google.com/uc?export=download&id=1suMIjM43hPwqdqv4cQDDJ6ll8UTi9lZc';
        try {
          // Beberapa perangkat mengembalikan false untuk canOpenURL pada https.
          // Buka langsung link view; jika gagal, coba direct download.
          await Linking.openURL(viewUrl);
        } catch (e) {
          try {
            await Linking.openURL(downloadUrl);
          } catch (err) {
            Alert.alert('Tidak bisa membuka link', 'Pastikan perangkat memiliki aplikasi browser/Google Drive, lalu coba lagi.');
          }
        }
      },
>>>>>>> e895365 (feat(web): My Kenary branding & logo)
    },
    {
      id: '7',
      title: 'Galeri',
      icon: ImageIcon,
      color: '#4A90E2',
      onPress: () => navigation.navigate('Gallery'),
    },
    {
      id: '8',
      title: 'Lembar Kerja',
      icon: FileText,
      color: '#4A90E2',
      onPress: () => navigation.navigate('Worksheet'),
    },
    {
      id: '9',
      title: 'Auth Test',
      icon: Shield,
      color: '#059669',
      onPress: () => navigation.navigate('AuthTest'),
    },
  ];

<<<<<<< HEAD
  const tourGuides: TourGuide[] = [
    {
      id: '1',
      name: 'Ahmad Wijaya',
      phone: '+62 812-3456-7890',
    },
    {
      id: '2',
      name: 'Siti Nurhaliza',
      phone: '+62 813-4567-8901',
    },
    {
      id: '3',
      name: 'Budi Santoso',
      phone: '+62 814-5678-9012',
    },
  ];
=======
  // State for Tour Leaders fetched from backend
  const [loadingTL, setLoadingTL] = useState(false);
  const [errorTL, setErrorTL] = useState<string | null>(null);
  const [busMap, setBusMap] = useState<Record<string, string>>({});
  const [leads, setLeads] = useState<UiLead[]>([]);

  const fetchLeads = useCallback(async () => {
    setLoadingTL(true);
    setErrorTL(null);
    try {
      const [leadersRes, busesRes] = await Promise.all([
        apiService.getTourLeaders(1, 100),
        apiService.getBuses(1, 100),
      ]);

      const buses: ApiBus[] = busesRes.data || [];
      const busNameMap: Record<string, string> = {};
      buses.forEach((b) => { busNameMap[b.id] = b.name; });
      setBusMap(busNameMap);

      const leaders: ApiTourLeader[] = leadersRes.data || [];
      const leadsUi: UiLead[] = leaders.map((tl) => ({
        id: String(tl.id),
        name: tl.name,
        phone: tl.phone,
        whatsapp: tl.whatsapp,
        email: tl.email,
        busId: tl.bus ?? null,
        busName: tl.bus ? (busNameMap[tl.bus] || tl.bus) : 'Tidak ada bus',
      }));
      setLeads(leadsUi);
    } catch (e: any) {
      setErrorTL(e?.message || 'Gagal memuat kontak TL');
    } finally {
      setLoadingTL(false);
    }
  }, []);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);
>>>>>>> e895365 (feat(web): My Kenary branding & logo)

  const openSocialMedia = (url: string) => {
    Linking.openURL(url);
  };

  const callTourGuide = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  const renderMenuCard = (item: MenuCard) => {
    const IconComponent = item.icon;
    
    return (
      <TouchableOpacity
        key={item.id}
        style={[styles.menuCard, {backgroundColor: item.color}]}
        onPress={item.onPress}>
        <IconComponent
          size={32}
          color="white"
          style={styles.menuIcon}
        />
        <Text style={styles.menuTitle}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

<<<<<<< HEAD
  const renderTourGuide = (guide: TourGuide) => (
    <TouchableOpacity
      key={guide.id}
      style={styles.guideCard}
      onPress={() => callTourGuide(guide.phone)}>
=======
  const renderTourGuide = (guide: UiLead) => (
    <TouchableOpacity
      key={guide.id}
      style={styles.guideCard}
      onPress={() => guide.phone ? callTourGuide(guide.phone) : undefined}>
>>>>>>> e895365 (feat(web): My Kenary branding & logo)
      <View style={styles.guideImageContainer}>
        <User size={32} color="#4A90E2" />
      </View>
      <View style={styles.guideInfo}>
        <Text style={styles.guideName}>{guide.name}</Text>
<<<<<<< HEAD
        <Text style={styles.guidePhone}>{guide.phone}</Text>
=======
        <Text style={styles.guidePhone}>
          {(guide.phone || guide.whatsapp || guide.email || '—')}
        </Text>
        {guide.busName ? (
          <Text style={styles.guidePhone}>Bus: {guide.busName}</Text>
        ) : null}
>>>>>>> e895365 (feat(web): My Kenary branding & logo)
      </View>
      <Phone size={20} color="#4A90E2" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={styles.headerLeft}>
              <Text style={styles.headerTitle}>Explore</Text>
              <Text style={styles.welcomeText}>Welcome, {user?.name || 'User'}</Text>
            </View>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <LogOut size={20} color="#dc2626" />
            </TouchableOpacity>
          </View>
          <View style={styles.searchContainer}>
            <View style={styles.searchInputContainer}>
              <Search size={16} color="#95A5A6" style={styles.searchIcon} />
              <Text style={styles.searchPlaceholder}>Cari destinasi...</Text>
            </View>
          </View>
        </View>

        {/* Filter Tabs */}
        <View style={styles.filterContainer}>
          <TouchableOpacity style={[styles.filterTab, styles.activeTab]}>
            <Text style={[styles.filterText, styles.activeFilterText]}>Semua</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterTab}>
            <Text style={styles.filterText}>Guru</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterTab}>
            <Text style={styles.filterText}>Orangtua</Text>
          </TouchableOpacity>
        </View>

        {/* Menu Cards Grid */}
        <View style={styles.menuGrid}>
          {menuCards.map(renderMenuCard)}
        </View>

        {/* Social Media Links */}
        <View style={styles.socialContainer}>
          <TouchableOpacity
            style={[styles.socialButton, {backgroundColor: '#FF0000'}]}
            onPress={() => openSocialMedia('https://youtube.com')}>
            <Youtube size={20} color="#FFFFFF" style={styles.socialIcon} />
            <Text style={styles.socialText}>YouTube</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.socialButton, {backgroundColor: '#E4405F'}]}
            onPress={() => openSocialMedia('https://instagram.com')}>
            <Instagram size={20} color="#FFFFFF" style={styles.socialIcon} />
            <Text style={styles.socialText}>Instagram</Text>
          </TouchableOpacity>
        </View>

<<<<<<< HEAD
        {/* Tour Guides Section */}
        <View style={styles.guidesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>KONTAK</Text>
            <Text style={styles.teamName}>team myKenary</Text>
          </View>
          {tourGuides.map(renderTourGuide)}
=======
        {/* Kontak Tour Leader */}
        <View style={styles.guidesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Kontak Tour Leader</Text>
            <Text style={styles.teamName}>{loadingTL ? 'Memuat...' : ''}</Text>
          </View>
          {errorTL ? (
            <Text style={{ color: '#E74C3C', marginBottom: 8 }}>{errorTL}</Text>
          ) : null}
          {leads.map(renderTourGuide)}
>>>>>>> e895365 (feat(web): My Kenary branding & logo)
        </View>

        {/* Bottom Spacing for Floating Navigation */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  headerLeft: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  welcomeText: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  logoutButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#fee2e2',
  },
  searchContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchPlaceholder: {
    color: '#95A5A6',
    fontSize: 14,
    flex: 1,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  filterTab: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#FFFFFF',
  },
  activeTab: {
    backgroundColor: '#4A90E2',
  },
  filterText: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  activeFilterText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  menuCard: {
    width: (width - 60) / 4, // 4 cards per row with 20px padding on each side and spacing
    height: (width - 60) / 4,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  menuIcon: {
    marginBottom: 8,
  },
  menuTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    paddingHorizontal: 4,
    lineHeight: 14,
  },
  socialContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 30,
    justifyContent: 'space-between',
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 25,
    marginHorizontal: 5,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  socialIcon: {
    marginRight: 10,
  },
  socialText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  guidesSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  teamName: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  guideCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  guideImageContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  guideInfo: {
    flex: 1,
  },
  guideName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 4,
  },
  guidePhone: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  bottomSpacing: {
    height: 100,
  },
});

export default DashboardScreen;