import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import {
  Phone,
  MessageCircle,
  Users,
  Bus,
  ArrowLeft,
} from 'lucide-react-native';
import { apiService, Bus as BusType, TourLeader } from '../services/api';

interface ContactScreenProps {
  navigation: any;
}

interface UiLead {
  id: string;
  name: string;
  phone?: string;
  whatsapp?: string;
  busId?: string | null;
  busName?: string;
  role?: string;
  description?: string;
}

const ContactScreen: React.FC<ContactScreenProps> = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busLeads, setBusLeads] = useState<UiLead[]>([]);
  const [busMap, setBusMap] = useState<Record<string, string>>({});

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [leadersRes, busesRes] = await Promise.all([
        apiService.getTourLeaders(1, 100),
        apiService.getBuses(1, 100),
      ]);

      const buses: BusType[] = busesRes.data || [];
      const busNameMap: Record<string, string> = {};
      buses.forEach((b) => { busNameMap[b.id] = b.name; });
      setBusMap(busNameMap);

      const leaders: TourLeader[] = leadersRes.data || [];
      const leadsUi: UiLead[] = leaders.map((tl) => ({
        id: String(tl.id),
        name: tl.name,
        phone: tl.phone,
        whatsapp: tl.whatsapp,
        busId: tl.bus ?? null,
        busName: tl.bus ? (busNameMap[tl.bus] || tl.bus) : 'Tidak ada bus',
        role: 'Tour Leader',
        description: tl.email ? `Email: ${tl.email}` : '',
      }));
      setBusLeads(leadsUi);
    } catch (e) {
      console.error('Gagal memuat kontak:', e);
      setError('Gagal memuat kontak dari server');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const openWhatsApp = (phoneNumber: string, name: string, busNumber: string) => {
    const message = `Halo ${name}, saya ingin menghubungi lead ${busNumber}`;
    const url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    
    Linking.canOpenURL(url)
      .then(supported => {
        if (supported) {
          return Linking.openURL(url);
        } else {
          Alert.alert(
            'WhatsApp tidak tersedia',
            'Aplikasi WhatsApp tidak terinstall di perangkat ini',
            [
              {
                text: 'Buka di Browser',
                onPress: () => {
                  const webUrl = `https://wa.me/${phoneNumber.replace('+', '')}?text=${encodeURIComponent(message)}`;
                  Linking.openURL(webUrl);
                }
              },
              {text: 'Batal', style: 'cancel'}
            ]
          );
        }
      })
      .catch(err => {
        console.error('Error opening WhatsApp:', err);
        Alert.alert('Error', 'Gagal membuka WhatsApp');
      });
  };

  const makePhoneCall = (phoneNumber: string) => {
    const url = `tel:${phoneNumber}`;
    Linking.canOpenURL(url)
      .then(supported => {
        if (supported) {
          return Linking.openURL(url);
        } else {
          Alert.alert('Error', 'Tidak dapat melakukan panggilan telepon');
        }
      })
      .catch(err => {
        console.error('Error making phone call:', err);
        Alert.alert('Error', 'Gagal melakukan panggilan');
      });
  };

  const renderContactCard = (lead: UiLead) => (
    <View key={lead.id} style={styles.contactCard}>
      <View style={styles.cardHeader}>
        <View style={styles.busInfo}>
          <Bus size={24} color="#4A90E2" />
          <Text style={styles.busNumber}>{lead.busName || 'Bus tidak diketahui'}</Text>
        </View>
        <View style={styles.roleContainer}>
          <Users size={16} color="#666" />
          <Text style={styles.role}>{lead.role || 'Tour Leader'}</Text>
        </View>
      </View>
      
      <View style={styles.contactInfo}>
        <Text style={styles.name}>{lead.name}</Text>
        {!!lead.phone && <Text style={styles.phone}>{lead.phone}</Text>}
        <Text style={styles.description}>Bus: {lead.busName || 'Tidak ada bus'}</Text>
        {!!lead.description && <Text style={styles.description}>{lead.description}</Text>}
      </View>
      
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.actionButton, styles.whatsappButton]}
          onPress={() => openWhatsApp(lead.whatsapp || lead.phone || '', lead.name, lead.busName || '')}
        >
          <MessageCircle size={20} color="#25D366" />
          <Text style={styles.whatsappText}>WhatsApp</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.actionButton, styles.phoneButton]}
          onPress={() => makePhoneCall(lead.phone || '')}
        >
          <Phone size={20} color="#4A90E2" />
          <Text style={styles.phoneText}>Telepon</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Kontak Lead Bis</Text>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {loading && (
          <View style={{ padding: 16 }}>
            <Text style={{ color: '#4A90E2' }}>Memuat kontak...</Text>
          </View>
        )}
        {error && (
          <View style={{ padding: 16 }}>
            <Text style={{ color: '#E74C3C', marginBottom: 8 }}>{error}</Text>
            <TouchableOpacity style={[styles.actionButton, styles.phoneButton]} onPress={fetchData}>
              <Text style={styles.phoneText}>Coba Lagi</Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Hubungi Lead Bis</Text>
          <Text style={styles.infoDescription}>
            Data kontak tour leader diambil dari backend. Anda dapat menghubungi mereka melalui WhatsApp atau telepon langsung.
          </Text>
        </View>

        <View style={styles.contactList}>
          {busLeads.map(lead => renderContactCard(lead))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#4A90E2',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  backButton: {
    marginRight: 15,
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  infoSection: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  infoDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  contactList: {
    gap: 15,
  },
  contactCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  busInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  busNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  roleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  role: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  contactInfo: {
    marginBottom: 16,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  phone: {
    fontSize: 14,
    color: '#4A90E2',
    fontWeight: '500',
    marginBottom: 8,
  },
  description: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 8,
  },
  whatsappButton: {
    backgroundColor: '#E8F5E8',
    borderWidth: 1,
    borderColor: '#25D366',
  },
  phoneButton: {
    backgroundColor: '#E8F2FF',
    borderWidth: 1,
    borderColor: '#4A90E2',
  },
  whatsappText: {
    color: '#25D366',
    fontWeight: '600',
    fontSize: 14,
  },
  phoneText: {
    color: '#4A90E2',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default ContactScreen;
