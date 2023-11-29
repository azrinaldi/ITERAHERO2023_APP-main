import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  SafeAreaView,
  TextInput,
} from 'react-native';
import styles from './form_penjadwalan_style';
import stylesGlobal from '../../utils/style_global';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {useSelector, useDispatch} from 'react-redux';
import {Dropdown} from 'react-native-element-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../../component/loading';
import {getFirstResepPupuk} from '../../redux/action';

const FormPenjadwalanPage = ({route, navigation}) => {
  const [value, setValue] = useState(null);

  const [selectedFormula, setSelectedFormula] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const {dataResepPupuk} = useSelector(state => state.userReducer);

  const dispatch = useDispatch();

  const ChangeMenu = data => {
    dispatch(setMenuTandon(data));
  };

  const getApi = () => {
    AsyncStorage.getItem('token').then(respons => {
      dispatch(getFirstResepPupuk(respons));
      setLoading(false);
    });
  };
  useEffect(() => {
    getApi();
  }, []);

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.labelDropdown, isFocus && {color: 'blue'}]}>
          Formula
        </Text>
      );
    }
    return null;
  };

  const dropdownData =
    dataResepPupuk.data !== undefined
      ? dataResepPupuk.data.map(item => ({
          label: String(item.nama),
          value: item.id,
          ph: item.ph,
          ppm: item.ppm,
          volume: item.volume,
        }))
      : [];

  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <ScrollView style={{flex: 1}}>
          <View style={styles.container}>
            {renderLabel()}
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={dropdownData}
              labelField="label"
              valueField="value"
              placeholder="Select item"
              placeholder={!isFocus ? 'Pilih Formula' : '...'}
              value={value}
              itemContainerStyle={{}}
              itemTextStyle={{color: 'black', fontSize: 14}}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setValue(item.value);
                setSelectedFormula(item);
                setIsFocus(false);
              }}
            />
          </View>
          <View style={styles.container}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Waktu</Text>
              <TextInput style={styles.input} keyboardType="string" />
            </View>
            <TouchableOpacity>
              <View style={styles.buttonAdd}>
                <Icon
                  name="my-library-add"
                  size={23}
                  color="#09322D"
                  style={styles.icon}
                />
                <Text style={(stylesGlobal.header1, stylesGlobal.primer)}>
                  Tambah Waktu
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.container}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Durasi</Text>
              <TextInput style={styles.input} keyboardType="string" />
            </View>
          </View>
          <View style={styles.container}>
            {renderLabel()}
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={dropdownData}
              labelField="label"
              valueField="value"
              placeholder="Select item"
              placeholder={!isFocus ? 'Pilih Hari' : '...'}
              value={value}
              itemContainerStyle={{}}
              itemTextStyle={{color: 'black', fontSize: 14}}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setValue(item.value);
                setIsFocus(false);
              }}
            />
          </View>
          <View style={styles.container}>
            {renderLabel()}
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={dropdownData}
              labelField="label"
              valueField="value"
              placeholder="Select item"
              placeholder={!isFocus ? 'Pilih Greenhouse' : '...'}
              value={value}
              itemContainerStyle={{}}
              itemTextStyle={{color: 'black', fontSize: 14}}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setValue(item.value);
                setSelectedFormula(item);
                setIsFocus(false);
              }}
            />
          </View>
        </ScrollView>
        <View style={styles.buttonField}>
          <StatusBar animated={true} backgroundColor={'#09322D'} />
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={[styles.button, {backgroundColor: '#B00020', width: '45%'}]}>
            <Text style={styles.buttonText}>Batal</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={[styles.button, {backgroundColor: '#09322D', width: '45%'}]}>
            <Text style={styles.buttonText}>Simpan</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

export default FormPenjadwalanPage;
