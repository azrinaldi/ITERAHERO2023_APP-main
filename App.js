import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
//page
import BerandaPage from './src/page/beranda/beranda_page';
import GreenHousePage from './src/page/green_house/green_house_page';
import TandonPage from './src/page/tandon/tandon_page';
import DetailMonitoringPage from './src/page/detail_monitoring/detail_monitoring_page';
import LoginPage from './src/page/login/login_page';
import SplashScreen from './src/page/splash_screen/splash_page';
import NotifikasiPage from './src/page/notifikasi/notifikasi_page';
import FormPenjadwalanPage from './src/page/form_jadwal/form_penjadwalan';

//redux
import {Provider} from 'react-redux';
import {Store} from './src/redux/store';
// import NoHaveInternetPage from './src/page/no_have_internet/no_have_internet_page';

//notification
import Firebase from '@react-native-firebase/app';
import PushNotification from 'react-native-push-notification';

const Stack = createNativeStackNavigator();

const App = () => {
  Firebase.initializeApp();
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="LoginPage" component={LoginPage} />
          <Stack.Screen name="BerandaPage" component={BerandaPage} />
          <Stack.Screen name="GreenHousePage" component={GreenHousePage} />
          <Stack.Screen name="TandonPage" component={TandonPage} />
          <Stack.Screen
            name="FormPenjadwalanPage"
            component={FormPenjadwalanPage}
          />
          <Stack.Screen
            name="DetailMonitoringPage"
            component={DetailMonitoringPage}
          />
          <Stack.Screen name="NotifikasiPage" component={NotifikasiPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
