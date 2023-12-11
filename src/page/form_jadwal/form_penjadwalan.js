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
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/id';
import styles from './form_penjadwalan_style';
import stylesGlobal from '../../utils/style_global';
import Icon from 'react-native-vector-icons/FontAwesome';

import {useSelector, useDispatch} from 'react-redux';
import {Dropdown, MultiSelect} from 'react-native-element-dropdown';
import {apiPenjadwalan} from '../../utils/api_link';
import AsyncStorage from '@react-native-async-storage/async-storage';

import DateTimePickerModal from 'react-native-modal-datetime-picker';

import Loading from '../../component/loading';

const FormPenjadwalanPage = ({route, navigation}) => {
  const {idTandon} = route.params;
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');
  const [waktuList, setWaktuList] = useState([]);
  const [formulaValue, setFormulaValue] = useState(null);
  const [hariValue, setHariValue] = useState([]);
  const [greenhouseValue, setGreenhouseValue] = useState(null);
  const [durasiValue, setDurasiValue] = useState(null);
  const [isFormulaFocus, setIsFormulaFocus] = useState(false);
  const [isGreenhouseFocus, setIsGreenhouseFocus] = useState(false);
  const [formulaLabel, setFormulaLabel] = useState(null);
  const [greenhouseLabel, setGreenhouseLabel] = useState(null);
  const {dataResepPupuk, dataListGreenHouse} = useSelector(
    state => state.userReducer,
  );

  const dispatch = useDispatch();

  const getApi = () => {
    AsyncStorage.getItem('token').then(respons => {
      dispatch(getFirstResepPupuk(respons));
      setLoading(false);
    });
  };

  const showTimePicker = () => {
    setTimePickerVisible(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisible(false);
  };

  const handleTimeConfirm = time => {
    const formattedTime = moment(time).format('HH:mm');
    setSelectedTime(formattedTime);
    hideTimePicker();
  };

  const handleTambah = () => {
    if (selectedTime) {
      setWaktuList(prevWaktuList => [...prevWaktuList, selectedTime]);
      setSelectedTime('');
    }
  };

  const handleHapus = index => {
    setWaktuList(prevWaktuList => prevWaktuList.filter((_, i) => i !== index));
  };
  const handleSimpan = async () => {
    var token = await AsyncStorage.getItem('token');
    axios
      .post(
        apiPenjadwalan,
        {
          resep: parseInt(formulaValue),
          id_tandon: parseInt(idTandon),
          waktu: waktuList,
          hari: hariValue,
          durasi: parseInt(durasiValue),
          id_greenhouse: parseInt(greenhouseValue),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(response => {
        console.log(response.data);
        setFormulaValue(null);
        setSelectedTime('');
        setWaktuList([]);
        setHariValue([]);
        setDurasiValue('');
        setGreenhouseValue(null);
        console.log('Berhasil Menyimpan');
        navigation.goBack();
      })
      .catch(err => {
        console.error(err);
      });
  };

  const renderWaktuFields = () => {
    return waktuList.map((waktu, index) => (
      <View key={index} style={styles.valueWaktu}>
        <View>
          <Text style={[stylesGlobal.body2, stylesGlobal.primer]}>
            Jadwal {index + 1}
          </Text>
          <Text style={[stylesGlobal.secondaryVariant, stylesGlobal.header2]}>
            {waktu}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.close}
          onPress={() => handleHapus(index)}>
          <Icon name="close" size={18} color="#B00020" />
        </TouchableOpacity>
      </View>
    ));
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

  const dataGreenhouse =
    dataListGreenHouse.data !== undefined
      ? dataListGreenHouse.data.map(item => ({
          label: item.name,
          value: item.id,
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

  useEffect(() => {
    getApi();
  }, []);
  return (
    <>
      <View style={styles.container}>
        <ScrollView style={styles.form}>
          <View style={styles.title}>
            <Text style={[stylesGlobal.primer, stylesGlobal.header1]}>
              Buat Penjadwalan
            </Text>
          </View>
          <View style={styles.containerInput}>
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
          <View style={styles.containerInput}>
            <View style={styles.inputWaktu}>
              <View style={styles.timePicker}>
                <TouchableOpacity onPress={showTimePicker} style={styles.input}>
                  <Text style={stylesGlobal.primer}>
                    {selectedTime || '--:--'}
                  </Text>
                </TouchableOpacity>
                <DateTimePickerModal
                  isVisible={isTimePickerVisible}
                  mode="time"
                  onConfirm={handleTimeConfirm}
                  onCancel={hideTimePicker}
                />
              </View>
              <TouchableOpacity onPress={handleTambah} style={styles.buttonAdd}>
                <Icon name="plus-square" size={23} color="#FFFFFF" />
                <Text style={[stylesGlobal.surface, stylesGlobal.header3]}>
                  Jadwal
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.listContainer}>{renderWaktuFields()}</View>
          </View>
          <View style={styles.containerInput}>
            <View style={styles.inputWaktu}>
              <Text style={styles.label}>Durasi</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Dalam menit"
                placeholderTextColor={'grey'}
                maxLength={2}
                value={durasiValue}
                onChangeText={text => setDurasiValue(text)}
              />
            </View>
          </View>
          <View style={styles.containerInput}>
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
              }}
              selectedStyle={styles.selectedStyle}
            />
          </View>
          <View style={styles.containerInput}>
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
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={[styles.button, {backgroundColor: '#B00020', width: '45%'}]}>
            <Text style={styles.buttonText}>Batal</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleSimpan}
            style={[styles.button, {backgroundColor: '#09322D', width: '45%'}]}>
            <Text style={styles.buttonText}>Simpan</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default FormPenjadwalanPage;
