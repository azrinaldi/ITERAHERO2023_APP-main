import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  BackHandler,
  Alert,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import stylesGlobal from '../../utils/style_global';
import styles from '../beranda/beranda_style';
import NotificationButton from '../../component/notification_button';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  firstDashboard,
  firstListGreenHouse,
  firstListTandon,
} from '../../redux/action';
import Loading from '../../component/loading';
import {TimeBeranda} from '../../utils/moment';

import BarGreenHouse from '../../component/bar_beranda/bar_greenhouse';
import BarTandon from '../../component/bar_beranda/bar_tandon';

import GreenHouseScreen from '../../screen/greenhouse/greenhouse_screen';
import TandonScreen from '../../screen/tandon/tandon_screen';

const BerandaPage = () => {
  const navigate = useNavigation();

  const {dataListGreenHouse, dataDashboard, dataListTandon} = useSelector(
    state => state.userReducer,
  );

  const panjangDataGreenHouse = dataListGreenHouse?.data?.length || 0;
  const panjangDataTandon = dataListTandon?.data?.length || 0;

  const dispatch = useDispatch();

  const logout = () => {
    Alert.alert('Keluar', 'Anda yakin ingin keluar ?', [
      {
        text: 'Tidak',
        onPress: () => null,
        style: 'cancel',
      },
      {
        text: 'Keluar',
        onPress: () => {
          AsyncStorage.clear().then(() => navigate.navigate('LoginPage'));
        },
      },
    ]);
  };

  const CheckData = () => {
    if (
      dataDashboard.status != 'success' ||
      panjangDataGreenHouse <= 0 ||
      panjangDataTandon <= 0
    ) {
      AsyncStorage.getItem('token').then(response => {
        dispatch(firstDashboard(response));
        dispatch(firstListGreenHouse(response));
        dispatch(firstListTandon(response));
      });
    }
  };

  const {menuGreTa} = useSelector(state => state.userReducer);

  useEffect(() => {
    if (panjangDataGreenHouse <= 0 || panjangDataTandon <= 0) {
      CheckData();
    }
  }, [panjangDataGreenHouse, panjangDataTandon]);

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Menutup Aplikasi', 'Anda yakin ingin menutup aplikasi ?', [
        {
          text: 'Tidak',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'Ya', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);
  // console.log('Status Data Dashboard', dataDashboard.status);
  // console.log('Panjang Data GreenHouse: ', panjangDataGreenHouse);
  // console.log('Panjang Data Tandon: ', panjangDataTandon);

  return (
    <>
      {dataDashboard.status != 'success' ||
      panjangDataGreenHouse <= 0 ||
      panjangDataTandon <= 0 ? (
        <Loading />
      ) : (
        <SafeAreaView
          style={[stylesGlobal.backgroundBackground, styles.container]}
          accessibilityElementsHidden>
          <StatusBar animated={true} backgroundColor={'#09322D'} />
          <View
            style={[
              stylesGlobal.backgroundBackground,
              stylesGlobal.backgroundPrimer,
              styles.profile,
            ]}>
            <View style={{marginLeft: '5%'}}>
              <Text style={[stylesGlobal.onPrimary, stylesGlobal.header2]}>
                Hallo
              </Text>
              <Text style={[stylesGlobal.secondary, stylesGlobal.header2]}>
                ITERAHERO
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginRight: 20,
              }}>
              <NotificationButton />
              <TouchableOpacity onPress={logout}>
                <Icon name="logout" size={24} color="#ffff" />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={[
              stylesGlobal.backgroundBackground,
              stylesGlobal.backgroundPrimer,
              styles.date,
            ]}>
            <View style={{marginLeft: '5%'}}>
              <Text style={[stylesGlobal.onPrimary, stylesGlobal.caption]}>
                {TimeBeranda()}
              </Text>
            </View>
            {menuGreTa == 'greenhouse' ? (
              <>
                <BarGreenHouse />
              </>
            ) : null}
            {menuGreTa == 'tandon' ? (
              <>
                <BarTandon />
              </>
            ) : null}
          </View>
          <View style={styles.scroll}>
            {menuGreTa == 'greenhouse' ? (
              <>
                <View style={stylesGlobal.enter70} />
                <GreenHouseScreen />
              </>
            ) : null}
            {menuGreTa == 'tandon' ? (
              <>
                <View style={stylesGlobal.enter70} />
                <TandonScreen />
              </>
            ) : null}
          </View>
        </SafeAreaView>
      )}
    </>
  );
};
export default BerandaPage;
