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
import {Dropdown, MultiSelect} from 'react-native-element-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../../component/loading';

const FormPenjadwalanPage = ({route, navigation}) => {
  const [formulaValue, setFormulaValue] = useState(null);
  const [hariValue, setHariValue] = useState([]);
  const [greenhouseValue, setGreenhouseValue] = useState(null);

  const [isFormulaFocus, setIsFormulaFocus] = useState(false);
  const [isGreenhouseFocus, setIsGreenhouseFocus] = useState(false);
  const [formulaLabel, setFormulaLabel] = useState(null);
  const [greenhouseLabel, setGreenhouseLabel] = useState(null);
  const {dataResepPupuk} = useSelector(state => state.userReducer);

  const dispatch = useDispatch();

  const getApi = () => {
    AsyncStorage.getItem('token').then(respons => {
      dispatch(getFirstResepPupuk(respons));
      setLoading(false);
    });
  };

  const renderFormulaLabel = () => {
    if (formulaLabel || isFormulaFocus) {
      return (
        <Text style={[styles.labelDropdown, isFormulaFocus && {color: 'blue'}]}>
          Formula
        </Text>
      );
    }
    return null;
  };

  const renderGreenhouseLabel = () => {
    if (greenhouseLabel || isGreenhouseFocus) {
      return (
        <Text
          style={[styles.labelDropdown, isGreenhouseFocus && {color: 'blue'}]}>
          Greenhouse
        </Text>
      );
    }
    return null;
  };

  const dataPupuk =
    dataResepPupuk.data !== undefined
      ? dataResepPupuk.data.map(item => ({
          label: item.nama,
          value: item.id,
          ph: item.ph,
          ppm: item.ppm,
          volume: item.volume,
        }))
      : [];

  const dataHari = [
    {label: 'Senin', value: 1},
    {label: 'Selasa', value: 2},
    {label: 'Rabu', value: 3},
    {label: 'Kamis', value: 4},
    {label: 'Jumat', value: 5},
    {label: 'Sabtu', value: 6},
    {label: 'Minggu', value: 0},
  ];
  const dataGreenhouse = [
    {label: 'Iterahero', value: 1},
    {label: 'Wanayasa', value: 2},
  ];

  useEffect(() => {
    getApiById();
  }, []);
  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <ScrollView style={{flex: 1}}>
          <View style={styles.container}>
            {renderFormulaLabel()}
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={dataPupuk}
              labelField="label"
              valueField="value"
              placeholder="Select item"
              placeholder={!isFormulaFocus ? 'Pilih Formula' : '...'}
              value={formulaValue}
              itemContainerStyle={{}}
              itemTextStyle={{color: 'black', fontSize: 14}}
              onFocus={() => setIsFormulaFocus(true)}
              onBlur={() => setIsFormulaFocus(false)}
              onChange={item => {
                setFormulaLabel(item.label);
                setFormulaValue(item.value);
                setIsFormulaFocus(false);
              }}
            />
          </View>
          <View style={styles.container}>
            {renderWaktuInputs()}
            <View style={styles.buttonAddField}>
              <TouchableOpacity onPress={handleTambahWaktu}>
                <View style={styles.buttonAdd}>
                  <Icon name="my-library-add" size={23} color="#3DB35F" />
                  <Text style={(stylesGlobal.header1, stylesGlobal.secondary)}>
                    Tambah Waktu
                  </Text>
                </View>
              </TouchableOpacity>
              {waktuInputs.length > 1 && (
                <TouchableOpacity onPress={handleDelete}>
                  <View style={styles.buttonAdd}>
                    <Icon name="delete" size={23} color="#B00020" />
                  </View>
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View style={styles.container}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Durasi</Text>
              <TextInput style={styles.input} keyboardType="string" />
            </View>
          </View>
          <View style={styles.container}>
            <MultiSelect
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              iconStyle={styles.iconStyle}
              data={dataHari}
              labelField="label"
              valueField="value"
              placeholder="Select item"
              placeholder="Pilih Hari"
              value={hariValue}
              itemContainerStyle={{}}
              itemTextStyle={{color: 'black', fontSize: 14}}
              onChange={item => {
                setHariValue(item);
                // setIsHariFocus(false);
              }}
              selectedStyle={styles.selectedStyle}
            />
          </View>
          <View style={styles.container}>
            {renderGreenhouseLabel()}
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={dataGreenhouse}
              labelField="label"
              valueField="value"
              placeholder="Select item"
              placeholder={!isGreenhouseFocus ? 'Pilih Greenhouse' : '...'}
              value={greenhouseValue}
              itemContainerStyle={{}}
              itemTextStyle={{color: 'black', fontSize: 14}}
              onFocus={() => setIsGreenhouseFocus(true)}
              onBlur={() => setIsGreenhouseFocus(false)}
              onChange={item => {
                setGreenhouseValue(item.value);
                setGreenhouseLabel(item.label);
                setIsGreenhouseFocus(false);
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
