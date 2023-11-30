import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import styles from './tandon_page_style';
import stylesGlobal from '../../utils/style_global';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';

//Bar
import BarControlling from '../../component/bar_tandon/bar_controlling';
import BarMonitoring from '../../component/bar_tandon/bar_monitoring';
import BarPenjadwalan from '../../component/bar_tandon/bar_penjadwalan';
import BarPeracikan from '../../component/bar_tandon/bar_peracikan';

//Screen
import MonitoringScreenTandon from '../../screen/tandon_part/monitoring/monitoring_screen';
import ControllingScreenTandon from '../../screen/tandon_part/controlling/controlling_screen';
import PenjadwalanScreen from '../../screen/tandon_part/penjadwalan/penjadwalan_screen';
import PeracikanScreen from '../../screen/tandon_part/peracikan/peracikan_screen';

import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getApiListTandon} from '../../redux/action';
import Loading from '../../component/loading';

const TandonPage = ({route, navigation}) => {
  const {id, nama, isOnline, ppm, rasioA, rasioB, rasioAir, status, image} =
    route.params;

  const [isLoading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const {menuTandon, dataListTandon} = useSelector(state => state.userReducer);

  const getApiById = () => {
    AsyncStorage.getItem('token')
      .then(respons => {
        dispatch(getApiListTandon(id, respons));
      })
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    getApiById();
    return () => setLoading(true);
  }, []);

  return (
    <>
      {!isLoading && dataListTandon.status === 'success' ? (
        <SafeAreaView style={[stylesGlobal.surface, {flex: 1}]}>
          <StatusBar animated={true} backgroundColor={'#09322D'} />
          <ImageBackground
            resizeMode="cover"
            source={{uri: image}}
            style={styles.container}>
            <View style={styles.imageBackgroundPlus}>
              <TouchableOpacity
                style={styles.backView}
                onPress={() => navigation.goBack()}>
                <Icon name="arrow-back" size={24} color="#ffff" />
                <View style={stylesGlobal.space10} />
                <Text style={[stylesGlobal.header2, {color: '#ffff'}]}>
                  {nama}
                </Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>

          <View style={styles.monitoringAndControlling}>
            {menuTandon == 'monitoring' ? (
              <>
                <BarMonitoring />
                <View style={stylesGlobal.enter20} />
                <MonitoringScreenTandon
                  data={{
                    id: id,
                    nama: nama,
                    isOnline: isOnline,
                    ppm: ppm,
                    rasioA: rasioA,
                    rasioB: rasioB,
                    rasioAir: rasioAir,
                    status: status,
                  }}
                />
              </>
            ) : null}
            {menuTandon == 'controlling' ? (
              <>
                <BarControlling />
                <View style={stylesGlobal.enter20} />
                <ControllingScreenTandon data={{idData: id}} />
              </>
            ) : null}
            {menuTandon == 'peracikan' ? (
              <>
                <BarPeracikan />
                <View style={stylesGlobal.enter20} />
                <PeracikanScreen data={{idData: id}} />
              </>
            ) : null}
            {menuTandon == 'penjadwalan' ? (
              <>
                <BarPenjadwalan />
                <View style={stylesGlobal.enter20} />
                <PenjadwalanScreen data={{idData: id}} />
              </>
            ) : null}
          </View>
        </SafeAreaView>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default TandonPage;
