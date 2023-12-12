import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import styles from './green_house_style';
import stylesGlobal from '../../utils/style_global';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';

import BarMonitoring from '../../component/bar_greenhouse/bar_monitoring';
import BarControlling from '../../component/bar_greenhouse/bar_controlling';

import MonitoringScreenGH from '../../screen/greenhouse_part/monitoring/monitoring_screen';
import ControllingScreenGH from '../../screen/greenhouse_part/controlling/controlling_screen';

import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getApiGreenHouseById} from '../../redux/action';
import Loading from '../../component/loading';

const GreenHousePage = ({route, navigation}) => {
  const {id, name, image} = route.params;
  const [isLoading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const {menuMoCon, dataGreenHouseById} = useSelector(
    state => state.userReducer,
  );

  const getApiById = () => {
    AsyncStorage.getItem('token')
      .then(respons => {
        dispatch(getApiGreenHouseById(id, respons));
      })
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    getApiById();
    return () => setLoading(true);
  }, []);
  console.log('ini data GH: ', dataGreenHouseById.data);
  return (
    <>
      {!isLoading && dataGreenHouseById.status === 'success' ? (
        <SafeAreaView style={[stylesGlobal.surface, {flex: 1}]}>
          <StatusBar animated={true} backgroundColor={'#09322D'} />
          <View style={styles.header}>
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
                    {name}
                  </Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </View>
          <View style={styles.monitoringAndControlling}>
            {menuMoCon === 'monitoring' ? (
              <>
                <BarMonitoring />
                <View style={stylesGlobal.enter20} />
                <MonitoringScreenGH data={{idData: id}} />
              </>
            ) : null}
            {menuMoCon === 'controlling' ? (
              <>
                <BarControlling />
                <View style={stylesGlobal.enter20} />
                <ControllingScreenGH data={{idData: id}} />
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

export default GreenHousePage;
