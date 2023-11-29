import React, {useState, useEffect, useCallback} from 'react';
import {View, ScrollView, RefreshControl} from 'react-native';

import styles from './penjadwalan_style';
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
    <>
      {dataJadwal != undefined && isLoading == false ? (
        <View style={styles.container}>
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
                      status: item.isActive,
                    }}
                  />
                );
              })
            ) : (
              <Loading />
            )}
          </ScrollView>
        </View>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default PenjadwalanScreen;
