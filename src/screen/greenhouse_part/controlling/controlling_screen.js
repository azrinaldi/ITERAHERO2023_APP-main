import React, {useState, useEffect, useCallback} from 'react';
import {View, ScrollView, RefreshControl} from 'react-native';

import styles from './controlling_style';
import CardMonitoring from '../../../component/card_monitoring';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {
  firstListAktuatorGreenhouse,
  getListAktuatorGreenhouse,
} from '../../../redux/action';
import Loading from '../../../component/loading';

const wait = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};

const ControllingScreenGH = props => {
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const id = props.data.idData;

  const onRefresh = useCallback(() => {
    setLoading(true);
    setRefreshing(true);
    AsyncStorage.getItem('token').then(respons => {
      dispatch(firstListAktuatorGreenhouse(id, respons));
    });
    wait(3000).then(() => {
      setRefreshing(false);
      setLoading(false);
    });
  }, []);

  const dispatch = useDispatch();

  const {dataListAktuatorGreenhouse, menuMoCon} = useSelector(
    state => state.userReducer,
  );

  const getApiById = () => {
    AsyncStorage.getItem('token').then(respons => {
      dispatch(firstListAktuatorGreenhouse(id, respons));
      setLoading(false);
    });
  };

  useEffect(() => {
    getApiById();
  }, []);

  return (
    <>
      {dataListAktuatorGreenhouse != undefined && isLoading == false ? (
        <View style={styles.container}>
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            {dataListAktuatorGreenhouse != undefined ? (
              dataListAktuatorGreenhouse.map(item => {
                return (
                  <CardMonitoring
                    data={{
                      id: item.id,
                      icon: item.category.logo,
                      name: item.name,
                      color: item.category.color,
                      updated_at: item.updated_at,
                      status: item.status,
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

export default ControllingScreenGH;
