import React, {useState} from 'react';
import {StyleSheet, View, Text, Image, Switch} from 'react-native';
import stylesGlobal from '../utils/style_global';
import axios from 'axios';
import {switchAkuatorTandon} from '../utils/api_link';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CardAktuatorTandon = props => {
  const data = props.data;
  const [status, setStatus] = useState(data.status === true);

  const toggleSwitch = async id => {
    var token = await AsyncStorage.getItem('token');
    axios
      .post(
        switchAkuatorTandon,
        {},
        {
          params: {
            id: parseInt(id),
          },
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
          <Image source={{uri: data.icon}} style={styles.imageIcon} />
          <View style={stylesGlobal.space10} />
          <Text style={[stylesGlobal.header2, stylesGlobal.primer]}>
            {data.name}
          </Text>
        </View>
        <View style={styles.toggle}>
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
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',

    backgroundColor: '#ffff',
    borderRadius: 10,
    borderColor: '#171717',
    shadowOpacity: 1,
    elevation: 1,
    shadowRadius: 1,
    marginBottom: 10,
    paddingHorizontal: 17,
    paddingVertical: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  titleAndIcon: {
    width: '80%',
    flexDirection: 'row',
    marginRight: 5,
  },
  toggle: {
    width: '20%',
  },
  imageIcon: {
    height: 24,
    width: 24,
    resizeMode: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CardAktuatorTandon;
