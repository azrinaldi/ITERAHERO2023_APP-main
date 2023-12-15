import React, {useState, useEffect, useCallback} from 'react';
import {View, ScrollView, RefreshControl} from 'react-native';

import styles from './controlling_style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {getAktuatorTandonById, setMenuTandon} from '../../../redux/action';
import Loading from '../../../component/loading';
import CardAktuatorTandon from '../../../component/card_aktuator_tandon';

const wait = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};

const ControllingScreenTandon = props => {
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const id = props.data.idData;

  const onRefresh = useCallback(() => {
    setLoading(true);
    setRefreshing(true);
    AsyncStorage.getItem('token').then(respons => {
      dispatch(getAktuatorTandonById(id, respons));
    });
    wait(3000).then(() => {
      setRefreshing(false);
      setLoading(false);
    });
  }, []);

  const dispatch = useDispatch();

  const {dataAktuatorTandonById, menuTandon} = useSelector(
    state => state.userReducer,
  );
  const getApiById = () => {
    AsyncStorage.getItem('token').then(respons => {
      dispatch(getAktuatorTandonById(id, respons));
      setLoading(false);
    });
  };

  console.log('Aktuator: ', dataAktuatorTandonById);
  useEffect(() => {
    getApiById();
  }, []);

  return (
    <>
      {dataAktuatorTandonById != undefined && isLoading == false ? (
        <View style={styles.container}>
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            {dataAktuatorTandonById != undefined ? (
              dataAktuatorTandonById.map(item => {
                return (
                  <CardAktuatorTandon
                    data={{
                      id: item.id,
                      icon: item.category.logo,
                      name: item.name,
                      color: item.category.color,
                      updated_at: item.updated_at,
                      status: item.status,
                    }}
                    onToggleCallback={getApiById}
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

export default ControllingScreenTandon;
