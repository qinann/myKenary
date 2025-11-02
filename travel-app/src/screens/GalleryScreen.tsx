import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Modal,
  Dimensions,
  FlatList,
} from 'react-native';
import {
  ArrowLeft,
  Camera,
  Image as ImageIcon,
  Download,
  Share,
  Heart,
  Calendar,
  MapPin,
  Users,
  X,
  ZoomIn,
} from 'lucide-react-native';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

interface Photo {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  category: string;
  photographer: string;
  likes: number;
  isLiked: boolean;
  // Dalam implementasi nyata, ini akan berisi URL gambar
  // Untuk demo, kita gunakan placeholder
  imageUrl: string;
  thumbnailUrl: string;
}

interface PhotoCategory {
  id: string;
  name: string;
  count: number;
  color: string;
}

const GalleryScreen = ({navigation}: any) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Dummy data untuk kategori foto
  const categories: PhotoCategory[] = [
    {id: 'all', name: 'Semua', count: 48, color: '#4A90E2'},
    {id: 'museum', name: 'Museum', count: 12, color: '#E67E22'},
    {id: 'transport', name: 'Perjalanan', count: 8, color: '#27AE60'},
    {id: 'food', name: 'Kuliner', count: 10, color: '#F39C12'},
    {id: 'group', name: 'Grup', count: 15, color: '#9B59B6'},
    {id: 'nature', name: 'Alam', count: 3, color: '#1ABC9C'},
  ];

  // Dummy data untuk foto-foto
  const photos: Photo[] = [
    {
      id: 'photo-1',
      title: 'Foto Bersama di Tugu Pahlawan',
      description: 'Seluruh siswa kelas XII IPA 1 berfoto bersama di depan Tugu Pahlawan Surabaya',
      location: 'Tugu Pahlawan, Surabaya',
      date: '2024-03-15',
      category: 'group',
      photographer: 'Dra. Siti Nurhaliza',
      likes: 24,
      isLiked: true,
      imageUrl: 'https://via.placeholder.com/400x300/4A90E2/FFFFFF?text=Tugu+Pahlawan',
      thumbnailUrl: 'https://via.placeholder.com/200x150/4A90E2/FFFFFF?text=Tugu+Pahlawan',
    },
    {
      id: 'photo-2',
      title: 'Koleksi Museum Sepuluh Nopember',
      description: 'Siswa mengamati koleksi bersejarah di Museum Sepuluh Nopember',
      location: 'Museum Sepuluh Nopember, Surabaya',
      date: '2024-03-15',
      category: 'museum',
      photographer: 'Ahmad Rizki Pratama',
      likes: 18,
      isLiked: false,
      imageUrl: 'https://via.placeholder.com/400x300/E67E22/FFFFFF?text=Museum+Koleksi',
      thumbnailUrl: 'https://via.placeholder.com/200x150/E67E22/FFFFFF?text=Museum+Koleksi',
    },
    {
      id: 'photo-3',
      title: 'Perjalanan Bus Menuju Surabaya',
      description: 'Suasana di dalam bus saat perjalanan menuju Surabaya',
      location: 'Dalam Perjalanan',
      date: '2024-03-15',
      category: 'transport',
      photographer: 'Bella Safira Putri',
      likes: 12,
      isLiked: true,
      imageUrl: 'https://via.placeholder.com/400x300/27AE60/FFFFFF?text=Bus+Perjalanan',
      thumbnailUrl: 'https://via.placeholder.com/200x150/27AE60/FFFFFF?text=Bus+Perjalanan',
    },
    {
      id: 'photo-4',
      title: 'Makan Rawon Setan',
      description: 'Siswa menikmati kuliner khas Surabaya, Rawon Setan',
      location: 'Restoran Rawon Setan, Surabaya',
      date: '2024-03-15',
      category: 'food',
      photographer: 'Candra Wijaya',
      likes: 31,
      isLiked: false,
      imageUrl: 'https://via.placeholder.com/400x300/F39C12/FFFFFF?text=Rawon+Setan',
      thumbnailUrl: 'https://via.placeholder.com/200x150/F39C12/FFFFFF?text=Rawon+Setan',
    },
    {
      id: 'photo-5',
      title: 'Eksplorasi Kebun Binatang',
      description: 'Siswa belajar tentang satwa di Kebun Binatang Surabaya',
      location: 'Kebun Binatang Surabaya',
      date: '2024-03-16',
      category: 'nature',
      photographer: 'Dina Marlina',
      likes: 22,
      isLiked: true,
      imageUrl: 'https://via.placeholder.com/400x300/1ABC9C/FFFFFF?text=Kebun+Binatang',
      thumbnailUrl: 'https://via.placeholder.com/200x150/1ABC9C/FFFFFF?text=Kebun+Binatang',
    },
    {
      id: 'photo-6',
      title: 'Kampung Arab Ampel',
      description: 'Menjelajahi budaya Arab di Kampung Arab Ampel',
      location: 'Kampung Arab Ampel, Surabaya',
      date: '2024-03-16',
      category: 'museum',
      photographer: 'Eko Prasetyo',
      likes: 19,
      isLiked: false,
      imageUrl: 'https://via.placeholder.com/400x300/E67E22/FFFFFF?text=Kampung+Arab',
      thumbnailUrl: 'https://via.placeholder.com/200x150/E67E22/FFFFFF?text=Kampung+Arab',
    },
    {
      id: 'photo-7',
      title: 'Jembatan Suramadu',
      description: 'Foto bersama di landmark terkenal Jembatan Suramadu',
      location: 'Jembatan Suramadu',
      date: '2024-03-16',
      category: 'group',
      photographer: 'Fitri Handayani',
      likes: 35,
      isLiked: true,
      imageUrl: 'https://via.placeholder.com/400x300/9B59B6/FFFFFF?text=Jembatan+Suramadu',
      thumbnailUrl: 'https://via.placeholder.com/200x150/9B59B6/FFFFFF?text=Jembatan+Suramadu',
    },
    {
      id: 'photo-8',
      title: 'Seafood di Pantai Kenjeran',
      description: 'Makan malam seafood di Pantai Kenjeran',
      location: 'Pantai Kenjeran, Surabaya',
      date: '2024-03-16',
      category: 'food',
      photographer: 'Gilang Ramadhan',
      likes: 28,
      isLiked: false,
      imageUrl: 'https://via.placeholder.com/400x300/F39C12/FFFFFF?text=Seafood+Kenjeran',
      thumbnailUrl: 'https://via.placeholder.com/200x150/F39C12/FFFFFF?text=Seafood+Kenjeran',
    },
    // Tambahan foto lainnya...
    {
      id: 'photo-9',
      title: 'Jatim Park 1',
      description: 'Wahana edukasi dan rekreasi sains di Jatim Park 1',
      location: 'Jatim Park 1, Batu',
      date: '2024-03-17',
      category: 'group',
      photographer: 'Hana Pertiwi',
      likes: 26,
      isLiked: true,
      imageUrl: 'https://via.placeholder.com/400x300/9B59B6/FFFFFF?text=Jatim+Park+1',
      thumbnailUrl: 'https://via.placeholder.com/200x150/9B59B6/FFFFFF?text=Jatim+Park+1',
    },
    {
      id: 'photo-10',
      title: 'Museum Angkut',
      description: 'Koleksi kendaraan bersejarah di Museum Angkut',
      location: 'Museum Angkut, Batu',
      date: '2024-03-18',
      category: 'museum',
      photographer: 'Indra Kusuma',
      likes: 21,
      isLiked: false,
      imageUrl: 'https://via.placeholder.com/400x300/E67E22/FFFFFF?text=Museum+Angkut',
      thumbnailUrl: 'https://via.placeholder.com/200x150/E67E22/FFFFFF?text=Museum+Angkut',
    },
  ];

  const filteredPhotos = selectedCategory === 'all' 
    ? photos 
    : photos.filter(photo => photo.category === selectedCategory);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const openPhotoDetail = (photo: Photo) => {
    setSelectedPhoto(photo);
    setModalVisible(true);
  };

  const renderCategoryButton = (category: PhotoCategory) => (
    <TouchableOpacity
      key={category.id}
      style={[
        styles.categoryButton,
        selectedCategory === category.id && {backgroundColor: category.color},
      ]}
      onPress={() => setSelectedCategory(category.id)}>
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

  const renderPhotoGrid = ({item}: {item: Photo}) => (
    <TouchableOpacity
      style={styles.photoGridItem}
      onPress={() => openPhotoDetail(item)}>
      <View style={styles.photoPlaceholder}>
        <ImageIcon size={32} color="#BDC3C7" />
      </View>
      <View style={styles.photoOverlay}>
        <View style={styles.photoInfo}>
          <Text style={styles.photoTitle} numberOfLines={2}>
            {item.title}
          </Text>
          <View style={styles.photoMeta}>
            <View style={styles.photoMetaItem}>
              <Heart size={12} color={item.isLiked ? '#E74C3C' : '#FFFFFF'} />
              <Text style={styles.photoMetaText}>{item.likes}</Text>
            </View>
            <View style={styles.photoMetaItem}>
              <Calendar size={12} color="#FFFFFF" />
              <Text style={styles.photoMetaText}>
                {new Date(item.date).getDate()}/{new Date(item.date).getMonth() + 1}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderPhotoList = ({item}: {item: Photo}) => (
    <TouchableOpacity
      style={styles.photoListItem}
      onPress={() => openPhotoDetail(item)}>
      <View style={styles.photoListThumbnail}>
        <ImageIcon size={24} color="#BDC3C7" />
      </View>
      <View style={styles.photoListInfo}>
        <Text style={styles.photoListTitle}>{item.title}</Text>
        <Text style={styles.photoListDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.photoListMeta}>
          <View style={styles.photoListMetaItem}>
            <MapPin size={12} color="#7F8C8D" />
            <Text style={styles.photoListMetaText}>{item.location}</Text>
          </View>
          <View style={styles.photoListMetaItem}>
            <Calendar size={12} color="#7F8C8D" />
            <Text style={styles.photoListMetaText}>{formatDate(item.date)}</Text>
          </View>
        </View>
      </View>
      <View style={styles.photoListActions}>
        <View style={styles.photoListLikes}>
          <Heart size={16} color={item.isLiked ? '#E74C3C' : '#BDC3C7'} />
          <Text style={styles.photoListLikesText}>{item.likes}</Text>
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
        <Text style={styles.headerTitle}>Galeri Foto</Text>
        <TouchableOpacity
          style={styles.viewModeButton}
          onPress={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}>
          <Camera size={20} color="#4A90E2" />
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{photos.length}</Text>
          <Text style={styles.statLabel}>Total Foto</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>
            {photos.reduce((sum, photo) => sum + photo.likes, 0)}
          </Text>
          <Text style={styles.statLabel}>Total Likes</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>5</Text>
          <Text style={styles.statLabel}>Hari</Text>
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

      {/* Photos */}
      <View style={styles.photosContainer}>
        {viewMode === 'grid' ? (
          <FlatList
            data={filteredPhotos}
            renderItem={renderPhotoGrid}
            keyExtractor={(item) => item.id}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.photosGrid}
          />
        ) : (
          <FlatList
            data={filteredPhotos}
            renderItem={renderPhotoList}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.photosList}
          />
        )}
      </View>

      {/* Photo Detail Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setModalVisible(false)}>
              <X size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.modalActionButton}>
                <Share size={20} color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalActionButton}>
                <Download size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>

          {selectedPhoto && (
            <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
              <View style={styles.modalPhotoContainer}>
                <View style={styles.modalPhotoPlaceholder}>
                  <ZoomIn size={48} color="#BDC3C7" />
                  <Text style={styles.modalPhotoText}>Tap untuk zoom</Text>
                </View>
              </View>

              <View style={styles.modalPhotoInfo}>
                <Text style={styles.modalPhotoTitle}>{selectedPhoto.title}</Text>
                <Text style={styles.modalPhotoDescription}>
                  {selectedPhoto.description}
                </Text>

                <View style={styles.modalPhotoMeta}>
                  <View style={styles.modalPhotoMetaItem}>
                    <MapPin size={16} color="#7F8C8D" />
                    <Text style={styles.modalPhotoMetaText}>
                      {selectedPhoto.location}
                    </Text>
                  </View>
                  <View style={styles.modalPhotoMetaItem}>
                    <Calendar size={16} color="#7F8C8D" />
                    <Text style={styles.modalPhotoMetaText}>
                      {formatDate(selectedPhoto.date)}
                    </Text>
                  </View>
                  <View style={styles.modalPhotoMetaItem}>
                    <Users size={16} color="#7F8C8D" />
                    <Text style={styles.modalPhotoMetaText}>
                      {selectedPhoto.photographer}
                    </Text>
                  </View>
                </View>

                <View style={styles.modalPhotoActions}>
                  <TouchableOpacity style={styles.modalLikeButton}>
                    <Heart 
                      size={20} 
                      color={selectedPhoto.isLiked ? '#E74C3C' : '#BDC3C7'} 
                      fill={selectedPhoto.isLiked ? '#E74C3C' : 'none'}
                    />
                    <Text style={styles.modalLikeText}>
                      {selectedPhoto.likes} likes
                    </Text>
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
  viewModeButton: {
    padding: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  statLabel: {
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
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    backgroundColor: '#FFFFFF',
    gap: 6,
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
  photosContainer: {
    flex: 1,
  },
  photosGrid: {
    padding: 10,
  },
  photosList: {
    padding: 20,
  },
  photoGridItem: {
    flex: 1,
    margin: 5,
    aspectRatio: 1,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  photoPlaceholder: {
    flex: 1,
    backgroundColor: '#E8E8E8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10,
  },
  photoInfo: {
    gap: 6,
  },
  photoTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
    lineHeight: 16,
  },
  photoMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  photoMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  photoMetaText: {
    fontSize: 10,
    color: '#FFFFFF',
  },
  photoListItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  photoListThumbnail: {
    width: 60,
    height: 60,
    backgroundColor: '#E8E8E8',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  photoListInfo: {
    flex: 1,
    gap: 4,
  },
  photoListTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  photoListDescription: {
    fontSize: 14,
    color: '#7F8C8D',
    lineHeight: 18,
  },
  photoListMeta: {
    gap: 4,
  },
  photoListMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  photoListMetaText: {
    fontSize: 12,
    color: '#7F8C8D',
  },
  photoListActions: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoListLikes: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  photoListLikesText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3E50',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: 50,
  },
  modalCloseButton: {
    padding: 5,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 15,
  },
  modalActionButton: {
    padding: 5,
  },
  modalContent: {
    flex: 1,
  },
  modalPhotoContainer: {
    height: screenHeight * 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  modalPhotoPlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  modalPhotoText: {
    fontSize: 14,
    color: '#BDC3C7',
  },
  modalPhotoInfo: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    gap: 15,
  },
  modalPhotoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  modalPhotoDescription: {
    fontSize: 16,
    color: '#2C3E50',
    lineHeight: 24,
  },
  modalPhotoMeta: {
    gap: 10,
  },
  modalPhotoMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  modalPhotoMetaText: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  modalPhotoActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#E8E8E8',
  },
  modalLikeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  modalLikeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
  },
});

export default GalleryScreen;