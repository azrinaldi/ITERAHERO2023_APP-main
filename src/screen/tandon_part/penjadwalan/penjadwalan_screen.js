import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Text,
} from 'react-native';

import styles from './penjadwalan_style';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {getFirstJadwal} from '../../../redux/action';
import Loading from '../../../component/loading';
import CardJadwalInfo from '../../../component/card_jadwal_info';

const wait = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};

const PenjadwalanScreen = props => {
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigation();
  const id = props.data.idData;

  const onRefresh = useCallback(() => {
    setLoading(true);
    setRefreshing(true);
    AsyncStorage.getItem('token').then(respons => {
      dispatch(getFirstJadwal(respons));
    });
    wait(3000).then(() => {
      setRefreshing(false);
      setLoading(false);
    });
  }, []);

  const dispatch = useDispatch();

  const {dataJadwal} = useSelector(state => state.userReducer);

  const getApiById = () => {
    AsyncStorage.getItem('token').then(respons => {
      dispatch(getFirstJadwal(respons));
      setLoading(false);
    });
  };

  useEffect(() => {
    getApiById();
  }, []);

  console.log('Data Aktuator Tandon:    ', dataJadwal);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.formField}>
        {dataJadwal != undefined && isLoading == false ? (
          <>
            <ScrollView
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }>
              {dataJadwal != undefined ? (
                dataJadwal.map(item => {
                  return (
                    <CardJadwalInfo
                      data={{
                        id: item.id,
                        name: item.resep.nama,
                        waktu: item.waktu,
                        durasi: item.durasi,
                        status: item.isActive,
                        greenhouseId: item.greenhouseId,
                      }}
                    />
                  );
                })
              ) : (
                <Loading />
              )}
            </ScrollView>
          </>
        ) : (
          <Loading />
        )}
      </ScrollView>
      <View style={styles.buttonField}>
        <TouchableOpacity
          onPress={() => navigate.navigate('FormPenjadwalanPage', {})}
          style={[styles.button, {backgroundColor: '#09322D', width: '100%'}]}>
          <Text style={styles.buttonText}>Buat Jadwal</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PenjadwalanScreen;
