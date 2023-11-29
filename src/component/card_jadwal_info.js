import React, {useState} from 'react';
import {StyleSheet, View, Text, Image, Switch, Touchable} from 'react-native';
import stylesGlobal from '../utils/style_global';
import axios from 'axios';
import {apiPenjadwalan, switchAkuatorTandon} from '../utils/api_link';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CardJadwalInfo = props => {
  const data = props.data;
  const [status, setStatus] = useState(data.status === true);

  const toggleSwitch = async id => {
    var token = await AsyncStorage.getItem('token');
    axios
      .patch(
        apiPenjadwalan,
        {id},
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
      <View style={styles.card}>
        <View style={styles.titleAndIcon}>
          <View style={stylesGlobal.space10} />
          <Text style={[stylesGlobal.header2, stylesGlobal.primer]}>
            {data.name}
          </Text>
        </View>
        <Switch
          trackColor={{false: '#767577', true: '#D3D3D3'}}
          thumbColor={status ? '#28a745' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={async () => {
            await toggleSwitch(data.id);
          }}
          value={status}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: 65,
    backgroundColor: '#ffff',
    borderRadius: 10,
    borderColor: '#171717',
    shadowOpacity: 1,
    elevation: 1,
    shadowRadius: 1,
    marginBottom: 10,
    padding: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  titleAndIcon: {
    flexDirection: 'row',
  },
  imageIcon: {
    height: 24,
    width: 24,
    resizeMode: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CardJadwalInfo;
