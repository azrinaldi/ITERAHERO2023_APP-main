import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ScrollView, View, Text, TextInput, Button, TouchableOpacity } from 'react-native';

import { Dropdown } from 'react-native-element-dropdown';

import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

import styles from './peracikan_style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirstResepPupuk } from '../../../redux/action';
import stylesGlobal from '../../../utils/style_global';
import { apiPeracikan, apiSimpanResep } from '../../../utils/api_link';
import { setMenuTandon } from '../../../redux/action';

const PeracikanScreen = props => {
  const idTandon = props.data.idData;

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [phMaxValue, onChangePHMaxValue] = React.useState('');
  const [ppmMaxValue, onChangePPMMaxValue] = React.useState('');
  const [phMinValue, onChangePHMinValue] = React.useState('');
  const [ppmMinValue, onChangePPMMinValue] = React.useState('');
  const [Nama, onChangeNama] = React.useState('');
  const [Volume, onChangeVolumeValue] = React.useState('');
  const [isDropdownDisabled, setIsDropdownDisabled] = useState(false);
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const [isNameInputVisible, setIsNameInputVisible] = useState(false);
  const [isAddList, setIsAddList] = useState(false);
  const [selectedFormula, setSelectedFormula] = useState(null);

  const { dataResepPupuk } = useSelector(state => state.userReducer);

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

  const handleSimpanResep = async (nama, phMax, phMin, ppmMax, ppmMin, volume) => {
    var token = await AsyncStorage.getItem('token');
    axios
      .post(
        apiSimpanResep,
        {
          nama: nama,
          ph_max: parseFloat(phMax),
          ppm_max: parseFloat(ppmMax),
          ph_min: parseFloat(phMin),
          ppm_min: parseFloat(ppmMin),
          volume: parseFloat(volume),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(response => {
        console.log('Formula berhasil disimpan :', response.data);
      })
      .catch(error => {
        console.error('Error menyimpan formula :', error);
      });
    getApi();
    handleDefault();
  };

  const handleRacik = async (id, idTandon) => {
    var token = await AsyncStorage.getItem('token');
    axios
      .post(
        apiPeracikan,
        {
          resep: id,
          id_tandon: idTandon,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(response => {
        console.log(response.data);
        ChangeMenu('monitoring');
      })
      .catch(err => {
        console.error(err);
      });
  };

  useEffect(() => {
    getApi();
  }, []);

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.labelDropdown, isFocus && { color: 'blue' }]}>
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
        phMin: item.ph_min,
        phMax: item.ph_max,
        ppmMin: item.ppm_min,
        ppmMax: item.ppm_max,
        volume: item.volume,
      }))
      : [];

  const handleReset = () => {
    onChangeNama('');
    onChangePHMaxValue('');
    onChangePPMMaxValue('');
    onChangePHMinValue('');
    onChangePPMMinValue('');
    onChangeVolumeValue('');
    setValue(null);
    setSelectedFormula(null);
  };

  const handleAddPress = () => {
    setIsDropdownDisabled(true);
    setIsNameInputVisible(true);
    setIsInputDisabled(true);
    setIsAddList(true);
    handleReset();
  };

  const handleDefault = () => {
    setIsDropdownDisabled(false);
    setIsNameInputVisible(false);
    setIsInputDisabled(false);
    setIsAddList(false);
    handleReset();
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <View style={styles.containerSelect}>
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
              itemTextStyle={{ color: 'black', fontSize: 14 }}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setValue(item.value);
                setSelectedFormula(item);
                onChangeNama(item.label);
                onChangePHMaxValue(String(item.phMax));
                onChangePPMMaxValue(String(item.ppmMax));
                onChangePHMinValue(String(item.phMin));
                onChangePPMMinValue(String(item.ppmMin));
                onChangeVolumeValue(String(item.volume));
                setIsFocus(false);
              }}
              disable={isDropdownDisabled}
            />
            <TouchableOpacity
              style={styles.buttonAdd}
              onPress={handleAddPress}
              disabled={isDropdownDisabled}>
              <Icon
                name="add-circle-sharp"
                size={23}
                color="#ffffff"
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.containerForm}>
          {isNameInputVisible && (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Nama</Text>
              <TextInput
                style={styles.input}
                onChangeText={onChangeNama}
                value={Nama}
                keyboardType="string"
                editable={isInputDisabled}
              />
            </View>
          )}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>PH Min</Text>
            <TextInput
              style={styles.input}
              onChangeText={onChangePHMinValue}
              value={phMinValue}
              keyboardType="numeric"
              editable={isInputDisabled}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>PH Max</Text>
            <TextInput
              style={styles.input}
              onChangeText={onChangePHMaxValue}
              value={phMaxValue}
              keyboardType="numeric"
              editable={isInputDisabled}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>PPM Min</Text>
            <TextInput
              style={styles.input}
              onChangeText={onChangePPMMinValue}
              value={ppmMinValue}
              keyboardType="numeric"
              editable={isInputDisabled}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>PPM Max</Text>
            <TextInput
              style={styles.input}
              onChangeText={onChangePPMMaxValue}
              value={ppmMaxValue}
              keyboardType="numeric"
              editable={isInputDisabled}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Volume</Text>
            <TextInput
              style={styles.input}
              onChangeText={onChangeVolumeValue}
              value={Volume}
              keyboardType="numeric"
              editable={isInputDisabled}
            />
          </View>
          <View style={styles.buttonField}>
            {isAddList ? (
              <>
                <TouchableOpacity
                  onPress={handleDefault}
                  style={[
                    styles.button,
                    { backgroundColor: '#B00020', width: '48%' },
                  ]}>
                  <Text style={styles.buttonText}>Batal</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    handleSimpanResep(Nama, phMaxValue, phMinValue, ppmMaxValue, ppmMinValue, Volume)
                  }
                  style={[
                    styles.button,
                    { backgroundColor: '#09322D', width: '48%' },
                  ]}>
                  <Text style={styles.buttonText}>Simpan</Text>
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity
                onPress={() => handleRacik(value, idTandon)}
                style={[
                  styles.button,
                  { backgroundColor: '#09322D', width: '100%' },
                ]}>
                <Text style={styles.buttonText}>Racik</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default PeracikanScreen;
