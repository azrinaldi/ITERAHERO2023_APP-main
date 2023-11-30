import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, Switch, Touchable, TouchableOpacity } from 'react-native';
import stylesGlobal from '../utils/style_global';
import axios from 'axios';
import { apiPenjadwalan, switchAkuatorTandon } from '../utils/api_link';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CardJadwalInfo = props => {
  const data = props.data;
  const [status, setStatus] = useState(data.status === true);

  const toggleSwitch = async id => {
    var token = await AsyncStorage.getItem('token');
    axios
      .patch(
        apiPenjadwalan,
        { id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(response => {
        console.log(response.data.message);
        const updatedStatus = !status;
        setStatus(updatedStatus);
      })
      .catch(err => {
        console.error(err);
      });
  };

  return (
    <>
      <View>
        <View style={styles.card}>
          <View style={styles.info}>
            <Text style={[stylesGlobal.header2, stylesGlobal.primer]}>
              {data.name}
            </Text>
            <Text style={[stylesGlobal.body3, stylesGlobal.primer]}>
              {data.namaGreenhouse}
            </Text>
            <Text style={[stylesGlobal.header3, stylesGlobal.primer]}>
              {data.durasi}{' Menit'}
            </Text>
          </View>
          <View style={styles.waktu}>
              <Text style={[stylesGlobal.header2, stylesGlobal.secondary]}>
                {data.waktu}
              </Text>
              <Text style={[stylesGlobal.header2, stylesGlobal.primer]}>
                {' WIB'}
              </Text>
          </View>
          <View style={styles.buttonField}>
            <Switch
              trackColor={{ false: '#767577', true: '#D3D3D3' }}
              thumbColor={status ? '#28a745' : '#f4f3f4'}
              onValueChange={async () => {
                await toggleSwitch(data.id);
              }}
              value={status}
            />
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderColor: '#171717',
    shadowOpacity: 1,
    elevation: 1,
    shadowRadius: 1,
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  info: {
    width: '50%',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  waktu: {
    width: '30%',
    paddingVertical: 10,
    display: 'flex',
    flexDirection: 'row',
  },
  buttonField: {
    width: '20%',
    alignItems: 'center',
    padding: 10,
  },
});

export default CardJadwalInfo;
