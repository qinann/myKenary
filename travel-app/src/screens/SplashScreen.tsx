import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const {width, height} = Dimensions.get('window');

const SplashScreen = () => {
  const navigation = useNavigation();

  const handleEnter = () => {
    navigation.navigate('Dashboard' as never);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#E8F5E8" />
      <LinearGradient
        colors={['#E8F5E8', '#C8E6C9', '#A5D6A7']}
        style={styles.gradient}>
        <View style={styles.content}>
          {/* Header Text */}
          <View style={styles.headerContainer}>
            <Text style={styles.studiText}>STUDI</Text>
            <Text style={styles.wisataText}>WISATA</Text>
            <Text style={styles.mykenaryText}>MYKENARY</Text>
            
            <Text style={styles.descriptionText}>
              Lorem ipsum dolor sit amet, consectetur{'\n'}
              adipiscing elit. Faucibus faucibus tortor,{'\n'}
              suscipit velit phasellus massa.
            </Text>
          </View>

          {/* Enter Button */}
          <TouchableOpacity style={styles.enterButton} onPress={handleEnter}>
            <Text style={styles.enterButtonText}>ENTER</Text>
          </TouchableOpacity>

          {/* Travel Illustration */}
          <View style={styles.illustrationContainer}>
            {/* Dotted circle background */}
            <View style={styles.dottedCircle} />
            
            {/* Airplane */}
            <View style={styles.airplane} />
            
            {/* Red Suitcase */}
            <View style={styles.suitcase}>
              <View style={styles.suitcaseHandle} />
              <View style={styles.suitcaseSticker} />
            </View>
            
            {/* Camera */}
            <View style={styles.camera}>
              <View style={styles.cameraLens} />
              <View style={styles.cameraFlash} />
            </View>
            
            {/* Globe */}
            <View style={styles.globe}>
              <View style={styles.globeContinent1} />
              <View style={styles.globeContinent2} />
            </View>
            
            {/* Road/Path */}
            <View style={styles.road} />
            
            {/* Location Pin */}
            <View style={styles.locationPin}>
              <View style={styles.pinHead} />
              <View style={styles.pinPoint} />
            </View>
            
            {/* Palm leaves */}
            <View style={styles.palmLeaf1} />
            <View style={styles.palmLeaf2} />
            
            {/* Photos */}
            <View style={styles.photo1} />
            <View style={styles.photo2} />
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    width: width,
    height: height,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingVertical: 60,
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 80,
  },
  studiText: {
    fontSize: 24,
    fontWeight: '300',
    color: '#2E7D32',
    letterSpacing: 2,
    marginBottom: 5,
  },
  wisataText: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#1B5E20',
    letterSpacing: 3,
    marginBottom: 5,
  },
  mykenaryText: {
    fontSize: 18,
    fontWeight: '400',
    color: '#2E7D32',
    letterSpacing: 1,
    marginBottom: 30,
  },
  descriptionText: {
    fontSize: 14,
    color: '#4A4A4A',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 20,
  },
  enterButton: {
    backgroundColor: '#2E7D32',
    paddingHorizontal: 50,
    paddingVertical: 15,
    borderRadius: 25,
    alignSelf: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginVertical: 40,
  },
  enterButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  illustrationContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginTop: 20,
  },
  dottedCircle: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 140,
    borderWidth: 2,
    borderColor: '#81C784',
    borderStyle: 'dashed',
    opacity: 0.5,
  },
  airplane: {
    position: 'absolute',
    width: 80,
    height: 30,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    right: 40,
    top: 20,
    transform: [{rotate: '15deg'}],
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  suitcase: {
    position: 'absolute',
    width: 60,
    height: 80,
    backgroundColor: '#D32F2F',
    borderRadius: 8,
    left: 30,
    top: 120,
    elevation: 4,
  },
  suitcaseHandle: {
    position: 'absolute',
    width: 30,
    height: 8,
    backgroundColor: '#B71C1C',
    borderRadius: 4,
    top: -4,
    left: 15,
  },
  suitcaseSticker: {
    position: 'absolute',
    width: 20,
    height: 15,
    backgroundColor: '#FFC107',
    borderRadius: 3,
    top: 20,
    left: 20,
  },
  camera: {
    position: 'absolute',
    width: 50,
    height: 35,
    backgroundColor: '#212121',
    borderRadius: 8,
    left: 120,
    top: 180,
    elevation: 3,
  },
  cameraLens: {
    position: 'absolute',
    width: 25,
    height: 25,
    backgroundColor: '#424242',
    borderRadius: 12.5,
    top: 5,
    left: 12.5,
  },
  cameraFlash: {
    position: 'absolute',
    width: 8,
    height: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    top: 8,
    right: 8,
  },
  globe: {
    position: 'absolute',
    width: 100,
    height: 100,
    backgroundColor: '#1976D2',
    borderRadius: 50,
    right: 50,
    top: 140,
    elevation: 4,
  },
  globeContinent1: {
    position: 'absolute',
    width: 40,
    height: 30,
    backgroundColor: '#4CAF50',
    borderRadius: 15,
    top: 20,
    left: 15,
  },
  globeContinent2: {
    position: 'absolute',
    width: 25,
    height: 20,
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    bottom: 25,
    right: 20,
  },
  road: {
    position: 'absolute',
    width: 120,
    height: 8,
    backgroundColor: '#424242',
    borderRadius: 4,
    bottom: 80,
    left: 80,
    transform: [{rotate: '25deg'}],
  },
  locationPin: {
    position: 'absolute',
    bottom: 100,
    right: 80,
  },
  pinHead: {
    width: 20,
    height: 20,
    backgroundColor: '#F44336',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  pinPoint: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderBottomWidth: 0,
    borderTopWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#F44336',
    alignSelf: 'center',
  },
  palmLeaf1: {
    position: 'absolute',
    width: 40,
    height: 60,
    backgroundColor: '#4CAF50',
    borderRadius: 20,
    left: 20,
    bottom: 40,
    transform: [{rotate: '-30deg'}],
  },
  palmLeaf2: {
    position: 'absolute',
    width: 35,
    height: 50,
    backgroundColor: '#66BB6A',
    borderRadius: 17.5,
    left: 45,
    bottom: 30,
    transform: [{rotate: '20deg'}],
  },
  photo1: {
    position: 'absolute',
    width: 30,
    height: 25,
    backgroundColor: '#FFFFFF',
    borderRadius: 3,
    left: 160,
    top: 80,
    elevation: 2,
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  photo2: {
    position: 'absolute',
    width: 25,
    height: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 3,
    left: 180,
    top: 100,
    elevation: 2,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    transform: [{rotate: '15deg'}],
  },
});

export default SplashScreen;