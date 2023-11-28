import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, Text, TextInput, Button} from 'react-native';
import styles from './peracikan_style';

import stylesGlobal from '../../../utils/style_global';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getFirstResepPupuk} from '../../../redux/action';

const PeracikanScreen = props => {
  const dispatch = useDispatch();

  const {dataResepPupuk} = useSelector(state => state.userReducer);

  const getApiById = () => {
    AsyncStorage.getItem('token').then(respons => {
      dispatch(getFirstResepPupuk(respons));
      setLoading(false);
    });
  };

  useEffect(() => {
    getApiById();
  }, []);

  console.log('DATA RESEP: ', dataResepPupuk.data);

  return <View></View>;
};

export default PeracikanScreen;
