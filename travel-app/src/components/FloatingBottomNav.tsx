import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';
import {
  Home,
  CheckCircle,
  Camera,
  Bus,
  Phone,
} from 'lucide-react-native';

const {width} = Dimensions.get('window');

interface NavItem {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  onPress: () => void;
}

interface FloatingBottomNavProps {
  activeTab?: string;
  onTabPress?: (tabId: string) => void;
}

const FloatingBottomNav: React.FC<FloatingBottomNavProps> = ({
  activeTab = 'home',
  onTabPress,
}) => {
  const [active, setActive] = useState(activeTab);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animasi saat tab berubah
    Animated.parallel([
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 0.8,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 300,
          friction: 10,
          useNativeDriver: true,
        }),
      ]),
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [active]);

  const navItems: NavItem[] = [
    {
      id: 'home',
      title: 'Home',
      icon: Home,
      onPress: () => handleTabPress('home'),
    },
    {
      id: 'absen',
      title: 'Absen',
      icon: CheckCircle,
      onPress: () => handleTabPress('absen'),
    },
    {
      id: 'qr',
      title: 'Foto',
      icon: Camera,
      onPress: () => handleTabPress('qr'),
    },
    {
      id: 'bus',
      title: 'Bus',
      icon: Bus,
      onPress: () => handleTabPress('bus'),
    },
    {
      id: 'contact',
      title: 'Kontak',
      icon: Phone,
      onPress: () => handleTabPress('contact'),
    },
  ];

  const handleTabPress = (tabId: string) => {
    setActive(tabId);
    onTabPress?.(tabId);
    console.log(`${tabId} tab pressed`);
  };

  const renderNavItem = (item: NavItem) => {
    const isActive = active === item.id;
    const IconComponent = item.icon;

    return (
      <TouchableOpacity
        key={item.id}
        style={styles.navItem}
        onPress={item.onPress}
        activeOpacity={0.7}>
        <Animated.View
          style={[
            styles.navItemContent,
            isActive && styles.activeNavItemContent,
            isActive && {
              transform: [
                {scale: scaleAnim},
                {
                  translateY: bounceAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -3],
                  }),
                },
              ],
            },
          ]}>
          <IconComponent
            size={22}
            color={isActive ? '#FFFFFF' : '#9CA3AF'}
          />
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.navContainer}>
        {navItems.map(renderNavItem)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    zIndex: 1000,
  },
  navContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 12,
    justifyContent: 'space-around',
    alignItems: 'center',
    elevation: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.15,
    shadowRadius: 20,
    alignSelf: 'center',
    maxWidth: 280,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  navItemContent: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeNavItemContent: {
    backgroundColor: '#3B82F6',
    elevation: 8,
    shadowColor: '#3B82F6',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
});

export default FloatingBottomNav;