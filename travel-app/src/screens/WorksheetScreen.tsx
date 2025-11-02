import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Modal,
  Alert,
} from 'react-native';
import {
  ArrowLeft,
  FileText,
  Download,
  Eye,
  Calendar,
  Clock,
  User,
  BookOpen,
  CheckCircle,
  AlertCircle,
  Search,
  Filter,
  Share,
} from 'lucide-react-native';

interface Worksheet {
  id: string;
  title: string;
  description: string;
  subject: string;
  category: string;
  date: string;
  dueDate: string;
  fileSize: string;
  pages: number;
  status: 'available' | 'submitted' | 'graded' | 'overdue';
  grade?: number;
  teacher: string;
  instructions: string;
  // Dalam implementasi nyata, ini akan berisi URL PDF
  pdfUrl: string;
}

interface WorksheetCategory {
  id: string;
  name: string;
  count: number;
  color: string;
  icon: React.ReactNode;
}

const WorksheetScreen = ({navigation}: any) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedWorksheet, setSelectedWorksheet] = useState<Worksheet | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Dummy data untuk kategori lembar kerja
  const categories: WorksheetCategory[] = [
    {
      id: 'all',
      name: 'Semua',
      count: 15,
      color: '#4A90E2',
      icon: <FileText size={20} color="#FFFFFF" />,
    },
    {
      id: 'history',
      name: 'Sejarah',
      count: 4,
      color: '#E67E22',
      icon: <BookOpen size={20} color="#FFFFFF" />,
    },
    {
      id: 'science',
      name: 'Sains',
      count: 3,
      color: '#27AE60',
      icon: <BookOpen size={20} color="#FFFFFF" />,
    },
    {
      id: 'culture',
      name: 'Budaya',
      count: 3,
      color: '#9B59B6',
      icon: <BookOpen size={20} color="#FFFFFF" />,
    },
    {
      id: 'reflection',
      name: 'Refleksi',
      count: 5,
      color: '#F39C12',
      icon: <BookOpen size={20} color="#FFFFFF" />,
    },
  ];

  // Dummy data untuk lembar kerja
  const worksheets: Worksheet[] = [
    {
      id: 'ws-1',
      title: 'Lembar Kerja Museum Sepuluh Nopember',
      description: 'Analisis koleksi bersejarah dan makna perjuangan kemerdekaan',
      subject: 'Sejarah',
      category: 'history',
      date: '2024-03-15',
      dueDate: '2024-03-20',
      fileSize: '2.3 MB',
      pages: 4,
      status: 'submitted',
      grade: 85,
      teacher: 'Dra. Siti Nurhaliza',
      instructions: 'Kunjungi Museum Sepuluh Nopember dan jawab pertanyaan berikut berdasarkan observasi langsung terhadap koleksi museum.',
      pdfUrl: 'https://example.com/worksheet1.pdf',
    },
    {
      id: 'ws-2',
      title: 'Observasi Tugu Pahlawan',
      description: 'Studi arsitektur dan simbolisme monumen bersejarah',
      subject: 'Sejarah',
      category: 'history',
      date: '2024-03-15',
      dueDate: '2024-03-22',
      fileSize: '1.8 MB',
      pages: 3,
      status: 'available',
      teacher: 'Dr. Bambang Sutrisno',
      instructions: 'Amati detail arsitektur Tugu Pahlawan dan analisis makna simbolis dari setiap elemen yang ada.',
      pdfUrl: 'https://example.com/worksheet2.pdf',
    },
    {
      id: 'ws-3',
      title: 'Ekosistem Kebun Binatang',
      description: 'Studi keanekaragaman hayati dan konservasi satwa',
      subject: 'Biologi',
      category: 'science',
      date: '2024-03-16',
      dueDate: '2024-03-25',
      fileSize: '3.1 MB',
      pages: 6,
      status: 'available',
      teacher: 'Dr. Hendro Wibowo',
      instructions: 'Identifikasi minimal 10 spesies hewan, habitat asli, dan status konservasi masing-masing.',
      pdfUrl: 'https://example.com/worksheet3.pdf',
    },
    {
      id: 'ws-4',
      title: 'Budaya Arab di Kampung Ampel',
      description: 'Analisis akulturasi budaya Arab-Jawa di Surabaya',
      subject: 'Antropologi',
      category: 'culture',
      date: '2024-03-16',
      dueDate: '2024-03-23',
      fileSize: '2.7 MB',
      pages: 5,
      status: 'graded',
      grade: 92,
      teacher: 'Drs. Agus Salim',
      instructions: 'Dokumentasikan bentuk-bentuk akulturasi budaya yang terlihat di Kampung Arab Ampel.',
      pdfUrl: 'https://example.com/worksheet4.pdf',
    },
    {
      id: 'ws-5',
      title: 'Teknologi Jembatan Suramadu',
      description: 'Studi teknik sipil dan dampak ekonomi infrastruktur',
      subject: 'Fisika',
      category: 'science',
      date: '2024-03-16',
      dueDate: '2024-03-24',
      fileSize: '4.2 MB',
      pages: 7,
      status: 'overdue',
      teacher: 'Dra. Melati Kusuma',
      instructions: 'Analisis struktur jembatan, teknologi yang digunakan, dan dampak ekonomi bagi daerah sekitar.',
      pdfUrl: 'https://example.com/worksheet5.pdf',
    },
    {
      id: 'ws-6',
      title: 'Refleksi Hari Pertama',
      description: 'Jurnal perjalanan dan pembelajaran hari pertama',
      subject: 'Bahasa Indonesia',
      category: 'reflection',
      date: '2024-03-15',
      dueDate: '2024-03-16',
      fileSize: '1.2 MB',
      pages: 2,
      status: 'submitted',
      grade: 88,
      teacher: 'Dra. Kartini Sari',
      instructions: 'Tuliskan refleksi pribadi tentang pengalaman dan pembelajaran yang didapat pada hari pertama.',
      pdfUrl: 'https://example.com/worksheet6.pdf',
    },
    {
      id: 'ws-7',
      title: 'Sains di Jatim Park 1',
      description: 'Eksplorasi wahana edukatif dan prinsip sains',
      subject: 'IPA Terpadu',
      category: 'science',
      date: '2024-03-17',
      dueDate: '2024-03-26',
      fileSize: '3.5 MB',
      pages: 8,
      status: 'available',
      teacher: 'Dr. Hendro Wibowo',
      instructions: 'Identifikasi prinsip-prinsip sains yang diterapkan dalam wahana edukatif di Jatim Park 1.',
      pdfUrl: 'https://example.com/worksheet7.pdf',
    },
    {
      id: 'ws-8',
      title: 'Sejarah Transportasi di Museum Angkut',
      description: 'Evolusi teknologi transportasi dunia',
      subject: 'Sejarah',
      category: 'history',
      date: '2024-03-18',
      dueDate: '2024-03-27',
      fileSize: '2.9 MB',
      pages: 5,
      status: 'available',
      teacher: 'Dra. Siti Nurhaliza',
      instructions: 'Buat timeline evolusi transportasi berdasarkan koleksi Museum Angkut.',
      pdfUrl: 'https://example.com/worksheet8.pdf',
    },
    {
      id: 'ws-9',
      title: 'Ekosistem Pegunungan Selecta',
      description: 'Studi flora dan iklim dataran tinggi',
      subject: 'Geografi',
      category: 'science',
      date: '2024-03-18',
      dueDate: '2024-03-28',
      fileSize: '2.1 MB',
      pages: 4,
      status: 'available',
      teacher: 'Drs. Wahyu Santoso',
      instructions: 'Analisis karakteristik iklim dan vegetasi di kawasan Selecta, Batu.',
      pdfUrl: 'https://example.com/worksheet9.pdf',
    },
    {
      id: 'ws-10',
      title: 'Refleksi Perjalanan Lengkap',
      description: 'Evaluasi komprehensif seluruh perjalanan edukatif',
      subject: 'Bahasa Indonesia',
      category: 'reflection',
      date: '2024-03-19',
      dueDate: '2024-03-30',
      fileSize: '1.5 MB',
      pages: 3,
      status: 'available',
      teacher: 'Dra. Kartini Sari',
      instructions: 'Buat refleksi komprehensif tentang seluruh perjalanan dan pembelajaran yang didapat.',
      pdfUrl: 'https://example.com/worksheet10.pdf',
    },
  ];

  const filteredWorksheets = worksheets.filter(worksheet => {
    const matchesCategory = selectedCategory === 'all' || worksheet.category === selectedCategory;
    const matchesSearch = worksheet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         worksheet.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getStatusIcon = (status: Worksheet['status']) => {
    switch (status) {
      case 'available':
        return <FileText size={20} color="#4A90E2" />;
      case 'submitted':
        return <CheckCircle size={20} color="#27AE60" />;
      case 'graded':
        return <CheckCircle size={20} color="#9B59B6" />;
      case 'overdue':
        return <AlertCircle size={20} color="#E74C3C" />;
      default:
        return <FileText size={20} color="#95A5A6" />;
    }
  };

  const getStatusColor = (status: Worksheet['status']) => {
    switch (status) {
      case 'available':
        return '#EBF3FD';
      case 'submitted':
        return '#E8F5E8';
      case 'graded':
        return '#F4ECF7';
      case 'overdue':
        return '#FDEDEC';
      default:
        return '#F8F9FA';
    }
  };

  const getStatusText = (status: Worksheet['status']) => {
    switch (status) {
      case 'available':
        return 'Tersedia';
      case 'submitted':
        return 'Sudah Dikumpul';
      case 'graded':
        return 'Sudah Dinilai';
      case 'overdue':
        return 'Terlambat';
      default:
        return 'Unknown';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const openWorksheetDetail = (worksheet: Worksheet) => {
    setSelectedWorksheet(worksheet);
    setModalVisible(true);
  };

  const handleDownload = (worksheet: Worksheet) => {
    Alert.alert(
      'Download PDF',
      `Apakah Anda ingin mendownload "${worksheet.title}"?`,
      [
        {text: 'Batal', style: 'cancel'},
        {text: 'Download', onPress: () => {
          // Implementasi download PDF
          Alert.alert('Info', 'Fitur download akan segera tersedia');
        }},
      ]
    );
  };

  const handleView = (worksheet: Worksheet) => {
    Alert.alert(
      'Buka PDF',
      `Membuka "${worksheet.title}" untuk dibaca`,
      [
        {text: 'OK', onPress: () => {
          // Implementasi buka PDF viewer
          Alert.alert('Info', 'PDF viewer akan segera tersedia');
        }},
      ]
    );
  };

  const renderCategoryButton = (category: WorksheetCategory) => (
    <TouchableOpacity
      key={category.id}
      style={[
        styles.categoryButton,
        selectedCategory === category.id && {backgroundColor: category.color},
      ]}
      onPress={() => setSelectedCategory(category.id)}>
      <View style={[
        styles.categoryIcon,
        selectedCategory === category.id && {backgroundColor: 'rgba(255, 255, 255, 0.2)'},
      ]}>
        {category.icon}
      </View>
      <Text
        style={[
          styles.categoryButtonText,
          selectedCategory === category.id && styles.selectedCategoryText,
        ]}>
        {category.name}
      </Text>
      <Text
        style={[
          styles.categoryCount,
          selectedCategory === category.id && styles.selectedCategoryCount,
        ]}>
        {category.count}
      </Text>
    </TouchableOpacity>
  );

  const renderWorksheetCard = (worksheet: Worksheet) => (
    <TouchableOpacity
      key={worksheet.id}
      style={[styles.worksheetCard, {backgroundColor: getStatusColor(worksheet.status)}]}
      onPress={() => openWorksheetDetail(worksheet)}>
      <View style={styles.worksheetHeader}>
        <View style={styles.worksheetInfo}>
          <Text style={styles.worksheetTitle}>{worksheet.title}</Text>
          <Text style={styles.worksheetSubject}>{worksheet.subject}</Text>
        </View>
        <View style={styles.worksheetStatus}>
          {getStatusIcon(worksheet.status)}
        </View>
      </View>

      <Text style={styles.worksheetDescription} numberOfLines={2}>
        {worksheet.description}
      </Text>

      <View style={styles.worksheetMeta}>
        <View style={styles.worksheetMetaItem}>
          <User size={14} color="#7F8C8D" />
          <Text style={styles.worksheetMetaText}>{worksheet.teacher}</Text>
        </View>
        <View style={styles.worksheetMetaItem}>
          <Calendar size={14} color="#7F8C8D" />
          <Text style={styles.worksheetMetaText}>
            Deadline: {formatDate(worksheet.dueDate)}
          </Text>
        </View>
      </View>

      <View style={styles.worksheetFooter}>
        <View style={styles.worksheetDetails}>
          <Text style={styles.worksheetDetailText}>
            {worksheet.pages} halaman • {worksheet.fileSize}
          </Text>
          <Text style={styles.worksheetStatusText}>
            {getStatusText(worksheet.status)}
            {worksheet.grade && ` • Nilai: ${worksheet.grade}`}
          </Text>
        </View>
        <View style={styles.worksheetActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleView(worksheet)}>
            <Eye size={16} color="#4A90E2" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleDownload(worksheet)}>
            <Download size={16} color="#4A90E2" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

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
        <Text style={styles.headerTitle}>Lembar Kerja</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Search size={20} color="#4A90E2" />
        </TouchableOpacity>
      </View>

      {/* Summary Stats */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryNumber}>{worksheets.length}</Text>
          <Text style={styles.summaryLabel}>Total Tugas</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={[styles.summaryNumber, {color: '#27AE60'}]}>
            {worksheets.filter(w => w.status === 'submitted' || w.status === 'graded').length}
          </Text>
          <Text style={styles.summaryLabel}>Selesai</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={[styles.summaryNumber, {color: '#F39C12'}]}>
            {worksheets.filter(w => w.status === 'available').length}
          </Text>
          <Text style={styles.summaryLabel}>Pending</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={[styles.summaryNumber, {color: '#E74C3C'}]}>
            {worksheets.filter(w => w.status === 'overdue').length}
          </Text>
          <Text style={styles.summaryLabel}>Terlambat</Text>
        </View>
      </View>

      {/* Categories */}
      <View style={styles.categoriesContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.categoriesContent}>
            {categories.map(renderCategoryButton)}
          </View>
        </ScrollView>
      </View>

      {/* Worksheets List */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>
            {selectedCategory === 'all' ? 'Semua Lembar Kerja' : 
             categories.find(c => c.id === selectedCategory)?.name}
          </Text>
          {filteredWorksheets.map(renderWorksheetCard)}
        </View>
      </ScrollView>

      {/* Worksheet Detail Modal */}
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
            <Text style={styles.modalTitle}>Detail Tugas</Text>
            <TouchableOpacity style={styles.shareButton}>
              <Share size={20} color="#4A90E2" />
            </TouchableOpacity>
          </View>

          {selectedWorksheet && (
            <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
              <View style={styles.modalContentPadding}>
                <View style={[
                  styles.modalWorksheetCard,
                  {backgroundColor: getStatusColor(selectedWorksheet.status)}
                ]}>
                  <View style={styles.modalWorksheetHeader}>
                    <Text style={styles.modalWorksheetTitle}>
                      {selectedWorksheet.title}
                    </Text>
                    <View style={styles.modalWorksheetStatus}>
                      {getStatusIcon(selectedWorksheet.status)}
                      <Text style={styles.modalWorksheetStatusText}>
                        {getStatusText(selectedWorksheet.status)}
                      </Text>
                    </View>
                  </View>

                  <Text style={styles.modalWorksheetSubject}>
                    {selectedWorksheet.subject}
                  </Text>
                  <Text style={styles.modalWorksheetDescription}>
                    {selectedWorksheet.description}
                  </Text>
                </View>

                <View style={styles.modalSection}>
                  <Text style={styles.modalSectionTitle}>Instruksi</Text>
                  <Text style={styles.modalSectionContent}>
                    {selectedWorksheet.instructions}
                  </Text>
                </View>

                <View style={styles.modalSection}>
                  <Text style={styles.modalSectionTitle}>Detail Tugas</Text>
                  <View style={styles.modalDetailGrid}>
                    <View style={styles.modalDetailItem}>
                      <User size={16} color="#7F8C8D" />
                      <Text style={styles.modalDetailLabel}>Guru</Text>
                      <Text style={styles.modalDetailValue}>
                        {selectedWorksheet.teacher}
                      </Text>
                    </View>
                    <View style={styles.modalDetailItem}>
                      <Calendar size={16} color="#7F8C8D" />
                      <Text style={styles.modalDetailLabel}>Diberikan</Text>
                      <Text style={styles.modalDetailValue}>
                        {formatDate(selectedWorksheet.date)}
                      </Text>
                    </View>
                    <View style={styles.modalDetailItem}>
                      <Clock size={16} color="#7F8C8D" />
                      <Text style={styles.modalDetailLabel}>Deadline</Text>
                      <Text style={styles.modalDetailValue}>
                        {formatDate(selectedWorksheet.dueDate)}
                      </Text>
                    </View>
                    <View style={styles.modalDetailItem}>
                      <FileText size={16} color="#7F8C8D" />
                      <Text style={styles.modalDetailLabel}>File</Text>
                      <Text style={styles.modalDetailValue}>
                        {selectedWorksheet.pages} hal • {selectedWorksheet.fileSize}
                      </Text>
                    </View>
                  </View>
                </View>

                {selectedWorksheet.grade && (
                  <View style={styles.modalSection}>
                    <Text style={styles.modalSectionTitle}>Penilaian</Text>
                    <View style={styles.gradeContainer}>
                      <Text style={styles.gradeValue}>{selectedWorksheet.grade}</Text>
                      <Text style={styles.gradeLabel}>/ 100</Text>
                    </View>
                  </View>
                )}

                <View style={styles.modalActions}>
                  <TouchableOpacity
                    style={[styles.modalActionButton, styles.viewButton]}
                    onPress={() => handleView(selectedWorksheet)}>
                    <Eye size={20} color="#FFFFFF" />
                    <Text style={styles.modalActionText}>Buka PDF</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.modalActionButton, styles.downloadButton]}
                    onPress={() => handleDownload(selectedWorksheet)}>
                    <Download size={20} color="#FFFFFF" />
                    <Text style={styles.modalActionText}>Download</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
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
  searchButton: {
    padding: 5,
  },
  summaryContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  summaryCard: {
    flex: 1,
    alignItems: 'center',
  },
  summaryNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  summaryLabel: {
    fontSize: 12,
    color: '#7F8C8D',
    marginTop: 4,
  },
  categoriesContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  categoriesContent: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 10,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    backgroundColor: '#FFFFFF',
    gap: 8,
  },
  categoryIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3E50',
  },
  selectedCategoryText: {
    color: '#FFFFFF',
  },
  categoryCount: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#7F8C8D',
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    minWidth: 20,
    textAlign: 'center',
  },
  selectedCategoryCount: {
    color: '#FFFFFF',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
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
  worksheetCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  worksheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  worksheetInfo: {
    flex: 1,
    marginRight: 10,
  },
  worksheetTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  worksheetSubject: {
    fontSize: 12,
    color: '#4A90E2',
    fontWeight: '600',
  },
  worksheetStatus: {
    alignItems: 'center',
  },
  worksheetDescription: {
    fontSize: 14,
    color: '#2C3E50',
    lineHeight: 20,
    marginBottom: 12,
  },
  worksheetMeta: {
    gap: 6,
    marginBottom: 12,
  },
  worksheetMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  worksheetMetaText: {
    fontSize: 12,
    color: '#7F8C8D',
  },
  worksheetFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E8E8E8',
  },
  worksheetDetails: {
    flex: 1,
  },
  worksheetDetailText: {
    fontSize: 12,
    color: '#7F8C8D',
    marginBottom: 2,
  },
  worksheetStatusText: {
    fontSize: 12,
    color: '#4A90E2',
    fontWeight: '600',
  },
  worksheetActions: {
    flexDirection: 'row',
    gap: 10,
  },
  actionButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#F8F9FA',
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
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  shareButton: {
    padding: 5,
  },
  modalContent: {
    flex: 1,
  },
  modalContentPadding: {
    padding: 20,
  },
  modalWorksheetCard: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  modalWorksheetHeader: {
    marginBottom: 12,
  },
  modalWorksheetTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 8,
  },
  modalWorksheetStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  modalWorksheetStatusText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3E50',
  },
  modalWorksheetSubject: {
    fontSize: 14,
    color: '#4A90E2',
    fontWeight: '600',
    marginBottom: 8,
  },
  modalWorksheetDescription: {
    fontSize: 16,
    color: '#2C3E50',
    lineHeight: 24,
  },
  modalSection: {
    marginBottom: 20,
  },
  modalSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 12,
  },
  modalSectionContent: {
    fontSize: 14,
    color: '#2C3E50',
    lineHeight: 22,
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  modalDetailGrid: {
    gap: 12,
  },
  modalDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    gap: 10,
  },
  modalDetailLabel: {
    fontSize: 14,
    color: '#7F8C8D',
    flex: 1,
  },
  modalDetailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3E50',
  },
  gradeContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    justifyContent: 'center',
  },
  gradeValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#27AE60',
  },
  gradeLabel: {
    fontSize: 24,
    color: '#7F8C8D',
    marginLeft: 5,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 15,
    marginTop: 10,
  },
  modalActionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 12,
    gap: 8,
  },
  viewButton: {
    backgroundColor: '#4A90E2',
  },
  downloadButton: {
    backgroundColor: '#27AE60',
  },
  modalActionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default WorksheetScreen;