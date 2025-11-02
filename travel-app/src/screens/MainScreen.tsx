import React from 'react';
import {View, StyleSheet} from 'react-native';
import DashboardScreen from './DashboardScreen';
import FloatingBottomNav from '../components/FloatingBottomNav';

const MainScreen = ({navigation}: any) => {
  const handleTabPress = (tabId: string) => {
    // Handle navigation to different screens based on tab
    switch (tabId) {
      case 'home':
        // Already on home/dashboard
        break;
      case 'absen':
        navigation.navigate('StudentList');
        break;
      case 'qr':
        // QR Camera functionality - could be implemented later
        console.log('Open QR Camera');
        break;
      case 'bus':
        navigation.navigate('BusInfo');
        break;
      case 'contact':
        navigation.navigate('Contact');
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      <DashboardScreen navigation={navigation} />
      <FloatingBottomNav activeTab="home" onTabPress={handleTabPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MainScreen;