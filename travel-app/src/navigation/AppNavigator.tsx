import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {useAuth} from '../contexts/AuthContext';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import MainScreen from '../screens/MainScreen';
import BusInfoScreen from '../screens/BusInfoScreen';
import HotelScreen from '../screens/HotelScreen';
import LiveLocationScreen from '../screens/LiveLocationScreen';
import ScheduleScreen from '../screens/ScheduleScreen';
import StudentListScreen from '../screens/StudentListScreen';
import BookletScreen from '../screens/BookletScreen';
import GalleryScreen from '../screens/GalleryScreen';
import WorksheetScreen from '../screens/WorksheetScreen';
import ContactScreen from '../screens/ContactScreen';
import AuthTestScreen from '../screens/AuthTestScreen';

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Dashboard: undefined;
  BusInfo: undefined;
  Hotel: undefined;
  LiveLocation: undefined;
  Schedule: undefined;
  StudentList: undefined;
  Booklet: undefined;
  Gallery: undefined;
  Worksheet: undefined;
  Contact: undefined;
  AuthTest: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

// Loading component
const LoadingScreen = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color="#2563eb" />
  </View>
);

const AppNavigator = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isAuthenticated ? "Dashboard" : "Login"}
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          cardStyleInterpolator: ({current, layouts}) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        }}>
        {!isAuthenticated ? (
          // Auth Stack
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
          </>
        ) : (
          // App Stack
          <>
            <Stack.Screen name="Dashboard" component={MainScreen} />
            <Stack.Screen name="BusInfo" component={BusInfoScreen} />
            <Stack.Screen name="Hotel" component={HotelScreen} />
            <Stack.Screen name="LiveLocation" component={LiveLocationScreen} />
            <Stack.Screen name="Schedule" component={ScheduleScreen} />
            <Stack.Screen name="StudentList" component={StudentListScreen} />
            <Stack.Screen name="Booklet" component={BookletScreen} />
            <Stack.Screen name="Gallery" component={GalleryScreen} />
            <Stack.Screen name="Worksheet" component={WorksheetScreen} />
            <Stack.Screen name="Contact" component={ContactScreen} />
            <Stack.Screen name="AuthTest" component={AuthTestScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
});

export default AppNavigator;