<<<<<<< HEAD
import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Modal,
} from 'react-native';
import {
  ArrowLeft,
  BookOpen,
  MapPin,
  Clock,
  Users,
  AlertTriangle,
  Phone,
  Shield,
  Heart,
  Camera,
  Utensils,
  Bus,
  Info,
  CheckCircle,
} from 'lucide-react-native';

interface BookletSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  content: BookletContent[];
}

interface BookletContent {
  id: string;
  type: 'text' | 'list' | 'warning' | 'contact' | 'schedule';
  title?: string;
  content: string | string[];
  important?: boolean;
}

const BookletScreen = ({navigation}: any) => {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Data booklet dengan berbagai informasi kegiatan
  const bookletSections: BookletSection[] = [
    {
      id: 'overview',
      title: 'Gambaran Umum',
      icon: <Info size={24} color="#FFFFFF" />,
      color: '#3498DB',
      content: [
        {
          id: 'overview-1',
          type: 'text',
          title: 'Tujuan Perjalanan',
          content: 'Perjalanan edukasi ini bertujuan untuk memberikan pengalaman belajar langsung kepada siswa tentang sejarah, budaya, dan sains melalui kunjungan ke berbagai tempat bersejarah dan edukatif di Jawa Timur.',
        },
        {
          id: 'overview-2',
          type: 'text',
          title: 'Durasi Perjalanan',
          content: 'Perjalanan berlangsung selama 5 hari 4 malam, dimulai dari tanggal 15 Maret 2024 hingga 19 Maret 2024.',
        },
        {
          id: 'overview-3',
          type: 'list',
          title: 'Tujuan Wisata',
          content: [
            'Museum Sepuluh Nopember - Surabaya',
            'Tugu Pahlawan - Surabaya',
            'Kebun Binatang Surabaya',
            'Kampung Arab Ampel - Surabaya',
            'Jembatan Suramadu',
            'Jatim Park 1 - Batu',
            'Museum Angkut - Batu',
            'Selecta Recreation Park - Batu',
          ],
        },
      ],
    },
    {
      id: 'rules',
      title: 'Tata Tertib',
      icon: <Shield size={24} color="#FFFFFF" />,
      color: '#E74C3C',
      content: [
        {
          id: 'rules-1',
          type: 'warning',
          title: 'Aturan Wajib',
          content: 'Semua siswa WAJIB mengikuti seluruh rangkaian kegiatan dan tidak diperbolehkan meninggalkan grup tanpa izin guru pendamping.',
          important: true,
        },
        {
          id: 'rules-2',
          type: 'list',
          title: 'Aturan Umum',
          content: [
            'Berkumpul tepat waktu sesuai jadwal yang ditentukan',
            'Berpakaian rapi dan sopan selama perjalanan',
            'Menjaga kebersihan dan tidak membuang sampah sembarangan',
            'Tidak membawa barang berharga berlebihan',
            'Menggunakan bahasa yang sopan dan santun',
            'Menjaga nama baik sekolah di tempat wisata',
            'Tidak boleh merokok atau membawa rokok',
            'Dilarang membawa senjata tajam atau benda berbahaya',
          ],
        },
        {
          id: 'rules-3',
          type: 'list',
          title: 'Aturan di Hotel',
          content: [
            'Tidak keluar kamar setelah jam 22:00',
            'Menjaga ketenangan dan tidak berisik',
            'Tidak merusak fasilitas hotel',
            'Melaporkan jika ada kerusakan atau masalah',
            'Berkumpul di lobby sesuai waktu yang ditentukan',
          ],
        },
      ],
    },
    {
      id: 'safety',
      title: 'Keselamatan',
      icon: <Heart size={24} color="#FFFFFF" />,
      color: '#27AE60',
      content: [
        {
          id: 'safety-1',
          type: 'warning',
          title: 'Protokol Kesehatan',
          content: 'Selalu jaga kesehatan dengan mencuci tangan, memakai masker di tempat ramai, dan segera laporkan jika merasa tidak sehat.',
          important: true,
        },
        {
          id: 'safety-2',
          type: 'list',
          title: 'Tips Keselamatan',
          content: [
            'Selalu bersama kelompok, jangan terpisah',
            'Simpan nomor telepon guru pendamping',
            'Bawa obat-obatan pribadi jika ada',
            'Hindari makanan yang tidak higienis',
            'Minum air putih yang cukup',
            'Istirahat yang cukup setiap malam',
            'Laporkan segera jika merasa tidak enak badan',
          ],
        },
        {
          id: 'safety-3',
          type: 'contact',
          title: 'Kontak Darurat',
          content: [
            'Guru Pendamping 1: Dra. Siti Nurhaliza - 0812-3456-7890',
            'Guru Pendamping 2: Dr. Bambang Sutrisno - 0813-4567-8901',
            'Koordinator Perjalanan: Drs. Agus Salim - 0814-5678-9012',
            'Rumah Sakit Terdekat: RS Dr. Soetomo - (031) 5501078',
            'Polisi: 110',
            'Ambulans: 118',
          ],
        },
      ],
    },
    {
      id: 'packing',
      title: 'Perlengkapan',
      icon: <CheckCircle size={24} color="#FFFFFF" />,
      color: '#9B59B6',
      content: [
        {
          id: 'packing-1',
          type: 'list',
          title: 'Pakaian',
          content: [
            'Seragam sekolah (2 stel)',
            'Pakaian casual (3 stel)',
            'Pakaian tidur (2 stel)',
            'Jaket atau sweater',
            'Sepatu sekolah dan sepatu olahraga',
            'Sandal',
            'Pakaian dalam secukupnya',
            'Kaos kaki',
          ],
        },
        {
          id: 'packing-2',
          type: 'list',
          title: 'Perlengkapan Mandi',
          content: [
            'Sabun mandi',
            'Shampo',
            'Sikat gigi dan pasta gigi',
            'Handuk (2 buah)',
            'Deodorant',
            'Sisir',
          ],
        },
        {
          id: 'packing-3',
          type: 'list',
          title: 'Perlengkapan Lainnya',
          content: [
            'Tas ransel kecil untuk jalan-jalan',
            'Botol minum',
            'Obat-obatan pribadi',
            'Charger HP',
            'Power bank',
            'Kamera (opsional)',
            'Uang saku secukupnya',
            'Dokumen perjalanan',
          ],
        },
        {
          id: 'packing-4',
          type: 'warning',
          title: 'Barang yang Dilarang',
          content: 'DILARANG membawa: rokok, minuman beralkohol, senjata tajam, obat-obatan terlarang, dan barang berharga berlebihan.',
          important: true,
        },
      ],
    },
    {
      id: 'activities',
      title: 'Kegiatan Edukatif',
      icon: <Camera size={24} color="#FFFFFF" />,
      color: '#F39C12',
      content: [
        {
          id: 'activities-1',
          type: 'text',
          title: 'Tujuan Pembelajaran',
          content: 'Setiap lokasi yang dikunjungi memiliki nilai edukatif yang tinggi. Siswa diharapkan dapat belajar langsung tentang sejarah, budaya, sains, dan teknologi.',
        },
        {
          id: 'activities-2',
          type: 'list',
          title: 'Kegiatan di Museum',
          content: [
            'Mengikuti tur guide dengan seksama',
            'Mencatat informasi penting',
            'Mengajukan pertanyaan kepada pemandu',
            'Mengambil foto untuk dokumentasi',
            'Mengisi lembar kerja yang disediakan',
          ],
        },
        {
          id: 'activities-3',
          type: 'list',
          title: 'Tugas Siswa',
          content: [
            'Membuat laporan perjalanan',
            'Mengumpulkan foto dokumentasi',
            'Mengisi jurnal harian',
            'Presentasi hasil kunjungan',
            'Membuat karya kreatif dari perjalanan',
          ],
        },
      ],
    },
    {
      id: 'meals',
      title: 'Makanan & Minuman',
      icon: <Utensils size={24} color="#FFFFFF" />,
      color: '#E67E22',
      content: [
        {
          id: 'meals-1',
          type: 'text',
          title: 'Jadwal Makan',
          content: 'Semua waktu makan telah diatur dan disediakan oleh panitia. Siswa tidak perlu khawatir tentang makanan selama perjalanan.',
        },
        {
          id: 'meals-2',
          type: 'list',
          title: 'Menu Makanan',
          content: [
            'Sarapan: Nasi gudeg, roti, buah-buahan',
            'Makan siang: Nasi, lauk pauk, sayur, buah',
            'Makan malam: Menu lokal khas daerah',
            'Snack: Disediakan di bus dan tempat wisata',
          ],
        },
        {
          id: 'meals-3',
          type: 'warning',
          title: 'Perhatian Khusus',
          content: 'Siswa yang memiliki alergi makanan atau pantangan khusus WAJIB melaporkan kepada guru pendamping sebelum keberangkatan.',
          important: true,
        },
      ],
    },
  ];

  const openSectionDetail = (section: BookletSection) => {
    setSelectedSection(section.id);
    setModalVisible(true);
  };

  const renderContent = (content: BookletContent) => {
    switch (content.type) {
      case 'text':
        return (
          <View key={content.id} style={styles.contentItem}>
            {content.title && (
              <Text style={styles.contentTitle}>{content.title}</Text>
            )}
            <Text style={styles.contentText}>{content.content}</Text>
          </View>
        );
      
      case 'list':
        return (
          <View key={content.id} style={styles.contentItem}>
            {content.title && (
              <Text style={styles.contentTitle}>{content.title}</Text>
            )}
            {Array.isArray(content.content) && content.content.map((item, index) => (
              <View key={index} style={styles.listItem}>
                <Text style={styles.listBullet}>•</Text>
                <Text style={styles.listText}>{item}</Text>
              </View>
            ))}
          </View>
        );
      
      case 'warning':
        return (
          <View key={content.id} style={[styles.contentItem, styles.warningContainer]}>
            <View style={styles.warningHeader}>
              <AlertTriangle size={20} color="#E74C3C" />
              {content.title && (
                <Text style={styles.warningTitle}>{content.title}</Text>
              )}
            </View>
            <Text style={styles.warningText}>{content.content}</Text>
          </View>
        );
      
      case 'contact':
        return (
          <View key={content.id} style={styles.contentItem}>
            {content.title && (
              <Text style={styles.contentTitle}>{content.title}</Text>
            )}
            {Array.isArray(content.content) && content.content.map((contact, index) => (
              <View key={index} style={styles.contactItem}>
                <Phone size={16} color="#4A90E2" />
                <Text style={styles.contactText}>{contact}</Text>
              </View>
            ))}
          </View>
        );
      
      default:
        return null;
    }
  };

  const renderSectionCard = (section: BookletSection) => (
    <TouchableOpacity
      key={section.id}
      style={styles.sectionCard}
      onPress={() => openSectionDetail(section)}>
      <View style={[styles.sectionIcon, {backgroundColor: section.color}]}>
        {section.icon}
      </View>
      <View style={styles.sectionInfo}>
        <Text style={styles.sectionTitle}>{section.title}</Text>
        <Text style={styles.sectionDescription}>
          {section.content.length} item informasi
        </Text>
      </View>
      <View style={styles.sectionArrow}>
        <Text style={styles.arrowText}>›</Text>
      </View>
    </TouchableOpacity>
  );

  const selectedSectionData = bookletSections.find(section => section.id === selectedSection);
=======
import React, {useEffect, useState, useCallback} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, ActivityIndicator, Alert, Linking, Platform } from 'react-native';
import RNFS from 'react-native-fs';
import RNFetchBlob from 'react-native-blob-util';
import { ArrowLeft, BookOpen, ExternalLink } from 'lucide-react-native';

const BookletScreen = ({navigation}: any) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bookletUrl, setBookletUrl] = useState<string | null>(null);
  const [lastApiUrl, setLastApiUrl] = useState<string | null>(null);

  const fetchBooklet = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Gunakan link Google Drive yang diberikan
      const googleDriveUrl = 'https://drive.google.com/file/d/1suMIjM43hPwqdqv4cQDDJ6ll8UTi9lZc/view?usp=sharing';
      setLastApiUrl(googleDriveUrl);
      console.log('[Booklet] Google Drive URL:', googleDriveUrl);
      setBookletUrl(googleDriveUrl);
    } catch (e) {
      console.error('Error fetch booklet:', e);
      setError('Gagal memuat link booklet.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBooklet();
  }, [fetchBooklet]);

  const openBooklet = async () => {
    if (!bookletUrl) return;
    try {
      const supported = await Linking.canOpenURL(bookletUrl);
      if (supported) {
        await Linking.openURL(bookletUrl);
      } else {
        Alert.alert('Tidak bisa membuka booklet', 'Silakan gunakan tombol Unduh untuk menyimpan ke perangkat.');
      }
    } catch (e) {
      Alert.alert('Gagal membuka booklet', 'Silakan coba lagi atau cek koneksi.');
    }
  };

  const downloadToDevice = async () => {
    try {
      if (!bookletUrl) throw new Error('Booklet belum siap');
      const fileName = 'booklet.pdf';
      
      // Konversi Google Drive URL ke direct download link
      let downloadUrl = bookletUrl;
      if (bookletUrl.includes('drive.google.com')) {
        const fileId = bookletUrl.match(/\/d\/([a-zA-Z0-9-_]+)/)?.[1];
        if (fileId) {
          downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
        }
      }
      
      if (Platform.OS === 'android') {
        // Gunakan Android DownloadManager via react-native-blob-util
        const dest = `${RNFetchBlob.fs.dirs.DownloadDir}/${fileName}`;
        await RNFetchBlob.config({
          addAndroidDownloads: {
            useDownloadManager: true,
            notification: true,
            title: fileName,
            description: 'Mengunduh booklet dari Google Drive',
            mime: 'application/pdf',
            path: dest,
          },
        }).fetch('GET', downloadUrl);
        Alert.alert('Berhasil disimpan', `File tersimpan di folder Download`);
        return;
      }

      // iOS: simpan ke direktori dokumen aplikasi
      const targetDir = RNFS.DocumentDirectoryPath;
      const targetPath = `${targetDir}/${fileName}`;
      const { promise } = RNFS.downloadFile({ fromUrl: downloadUrl, toFile: targetPath });
      await promise;
      Alert.alert('Berhasil disimpan', `File tersimpan di: ${targetPath}`);
    } catch (err) {
      console.error('Download booklet error:', err);
      Alert.alert('Gagal menyimpan booklet', 'Silakan coba lagi atau periksa koneksi internet.');
    }
  };
>>>>>>> e895365 (feat(web): My Kenary branding & logo)

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
<<<<<<< HEAD
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color="#2C3E50" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Booklet Perjalanan</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Welcome Section */}
      <View style={styles.welcomeSection}>
        <View style={styles.welcomeIcon}>
          <BookOpen size={32} color="#4A90E2" />
        </View>
        <Text style={styles.welcomeTitle}>Panduan Perjalanan Edukatif</Text>
        <Text style={styles.welcomeSubtitle}>
          Informasi lengkap untuk perjalanan yang aman dan menyenangkan
        </Text>
      </View>

      {/* Sections List */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.sectionsTitle}>Daftar Informasi</Text>
          {bookletSections.map(renderSectionCard)}
        </View>
      </ScrollView>

      {/* Section Detail Modal */}
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
                {selectedSectionData?.title}
              </Text>
            </View>
            <View style={styles.placeholder} />
          </View>

          {selectedSectionData && (
            <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
              <View style={styles.modalContentPadding}>
                {selectedSectionData.content.map(renderContent)}
              </View>
            </ScrollView>
          )}
        </View>
      </Modal>
=======

      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color="#2C3E50" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Booklet</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.content}>
        <View style={styles.hero}>
          <View style={styles.heroIcon}><BookOpen size={32} color="#2563eb" /></View>
          <Text style={styles.heroTitle}>Panduan Perjalanan</Text>
          <Text style={styles.heroSub}>Akses booklet PDF dari Google Drive</Text>
        </View>

        {loading ? (
          <View style={styles.centerBox}>
            <ActivityIndicator size="large" color="#2563eb" />
            <Text style={styles.infoText}>Memuat booklet...</Text>
          </View>
        ) : error ? (
          <View style={styles.centerBox}>
            <Text style={styles.errorText}>{error}</Text>
            {lastApiUrl ? (
              <Text style={styles.hint}>URL dicoba: {lastApiUrl}</Text>
            ) : null}
            <TouchableOpacity style={styles.retryBtn} onPress={fetchBooklet}>
              <Text style={styles.retryText}>Coba lagi</Text>
            </TouchableOpacity>
          </View>
        ) : bookletUrl ? (
          <View style={styles.centerBox}>
            <Text style={styles.infoText}>Booklet tersedia di Google Drive.</Text>
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <TouchableOpacity style={styles.openBtn} onPress={openBooklet}>
                <ExternalLink size={18} color="#fff" />
                <Text style={styles.openText}>Buka Booklet</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.downloadBtn} onPress={downloadToDevice}>
                <Text style={styles.downloadText}>Unduh ke Perangkat</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.hint}>Google Drive: {bookletUrl}</Text>
          </View>
        ) : (
          <View style={styles.centerBox}>
            <Text style={styles.infoText}>Booklet belum tersedia.</Text>
          </View>
        )}
      </View>
>>>>>>> e895365 (feat(web): My Kenary branding & logo)
    </View>
  );
};

const styles = StyleSheet.create({
<<<<<<< HEAD
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
  welcomeSection: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  welcomeIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#EBF3FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  welcomeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 8,
    textAlign: 'center',
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: '#7F8C8D',
    textAlign: 'center',
    lineHeight: 20,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  sectionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 15,
  },
  sectionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sectionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  sectionInfo: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  sectionDescription: {
    fontSize: 12,
    color: '#7F8C8D',
  },
  sectionArrow: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowText: {
    fontSize: 24,
    color: '#BDC3C7',
    fontWeight: 'bold',
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
  modalContent: {
    flex: 1,
  },
  modalContentPadding: {
    padding: 20,
  },
  contentItem: {
    marginBottom: 20,
  },
  contentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 8,
  },
  contentText: {
    fontSize: 14,
    color: '#2C3E50',
    lineHeight: 22,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  listBullet: {
    fontSize: 16,
    color: '#4A90E2',
    marginRight: 8,
    marginTop: 2,
  },
  listText: {
    fontSize: 14,
    color: '#2C3E50',
    flex: 1,
    lineHeight: 20,
  },
  warningContainer: {
    backgroundColor: '#FDF2F2',
    borderLeftWidth: 4,
    borderLeftColor: '#E74C3C',
    padding: 15,
    borderRadius: 8,
  },
  warningHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  warningTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E74C3C',
    marginLeft: 8,
  },
  warningText: {
    fontSize: 14,
    color: '#2C3E50',
    lineHeight: 20,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  contactText: {
    fontSize: 14,
    color: '#2C3E50',
    marginLeft: 10,
    flex: 1,
  },
=======
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    height: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, backgroundColor: '#F8F9FA', borderBottomWidth: 1, borderBottomColor: '#EAECEF',
  },
  backButton: {
    width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#EAECEF',
  },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#2C3E50' },
  placeholder: { width: 36, height: 36 },
  content: { flex: 1, padding: 16 },
  hero: { alignItems: 'center', marginTop: 16, marginBottom: 24 },
  heroIcon: { width: 64, height: 64, borderRadius: 32, alignItems: 'center', justifyContent: 'center', backgroundColor: '#eaf2ff', marginBottom: 12 },
  heroTitle: { fontSize: 20, fontWeight: 'bold', color: '#1f2937' },
  heroSub: { fontSize: 14, color: '#6b7280', marginTop: 6, textAlign: 'center' },
  centerBox: { alignItems: 'center', justifyContent: 'center', marginTop: 24 },
  infoText: { fontSize: 14, color: '#374151', marginTop: 12 },
  errorText: { fontSize: 14, color: '#dc2626', marginTop: 12 },
  retryBtn: { marginTop: 12, paddingHorizontal: 16, paddingVertical: 10, borderRadius: 8, borderWidth: 1, borderColor: '#2563eb' },
  retryText: { color: '#2563eb', fontWeight: '600' },
  openBtn: { flexDirection: 'row', gap: 8, marginTop: 16, backgroundColor: '#2563eb', paddingHorizontal: 16, paddingVertical: 12, borderRadius: 8 },
  openText: { color: '#fff', fontWeight: '600', marginLeft: 8 },
  downloadBtn: { marginTop: 16, backgroundColor: '#10b981', paddingHorizontal: 16, paddingVertical: 12, borderRadius: 8 },
  downloadText: { color: '#fff', fontWeight: '600' },
  hint: { fontSize: 12, color: '#6b7280', marginTop: 8 },
>>>>>>> e895365 (feat(web): My Kenary branding & logo)
});

export default BookletScreen;