import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, Text, TextInput, Button} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {SelectDropdown} from 'react-native-select-dropdown';
import DropdownComponent from '../../../component/card_dropdown_formula';

import styles from './peracikan_style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getFirstResepPupuk} from '../../../redux/action';

const PeracikanScreen = props => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [phValue, onChangePHValue] = React.useState('');
  const [ppmValue, onChangePPMValue] = React.useState('');
  const [Nama, onChangeNama] = React.useState('');
  const [Volume, onChangeVolumeValue] = React.useState('');

  const dispatch = useDispatch();
  const {dataResepPupuk} = useSelector(state => state.userReducer);

  const getApi = () => {
    AsyncStorage.getItem('token').then(respons => {
      dispatch(getFirstResepPupuk(respons));
      setLoading(false);
    });
  };

  useEffect(() => {
    getApi();
  }, []);

  const [selectedFormula, setSelectedFormula] = useState(null);

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

  // Check if dataResepPupuk.data is defined before mapping
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

  console.log('ini data resep', dropdownData);

  return (
    <View>
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
            setSelectedFormula(item); // Added to set selected formula
            // Update input values based on selected formula
            onChangeNama(item.label);
            onChangePHValue(String(item.ph));
            onChangePPMValue(String(item.ppm));
            onChangeVolumeValue(String(item.volume));
            setIsFocus(false);
          }}
        />
      </View>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nama</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeNama}
            value={Nama}
            keyboardType="string"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>PH</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangePHValue}
            value={phValue}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>PPM</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangePPMValue}
            value={ppmValue}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Volume</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeVolumeValue}
            value={Volume}
            keyboardType="numeric"
          />
        </View>
        <Button color="#09322D" title="Racik" />
      </View>
    </View>
  );
};

export default PeracikanScreen;
