import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Image, Switch} from 'react-native';
import stylesGlobal from '../utils/style_global';
import axios from 'axios';
import {switchAkuator} from '../utils/api_link';
import Loading from './loading';
import {akuatorBroker} from '../utils/api_link';

const CardMonitoring = props => {
  const data = props.data;
  const [isLoading, setIsloading] = useState(false);
  const [isOnline, setIsOnlone] = useState('offline');

  const valueSwitchConvert = () => {
    if (data.status_lifecycle == 1) {
      return true;
    } else {
      return false;
    }
  };

  const getStatus = () => {
    axios.get(akuatorBroker + data.id).then(respon => {
      if (respon.data.data.length > 0) {
        setIsOnlone(respon.data.data[0].status);
      }
      if (respon.data.data.length == 0) {
        setIsOnlone('offline');
      }
    });
  };

  const [isEnabled, setIsEnabled] = useState(valueSwitchConvert);

  const toggleSwitch = () => {
    if (isEnabled == true) {
      axios
        .post(switchAkuator, {
          id_actuator: data.id,
          on_off_status: 0,
        })
        .then(response => {
          setIsloading(false);
          setIsEnabled(replace => !replace);
        });
    } else {
      axios
        .post(switchAkuator, {
          id_actuator: data.id,
          on_off_status: 1,
        })
        .then(response => {
          setIsloading(false);
          setIsEnabled(replace => !replace);
        });
    }
  };

  useEffect(() => {
    getStatus();
  }, []);

  return (
    <>
      <View style={styles.card}>
        <View style={styles.titleAndIcon}>
          <Image style={styles.imageIcon} source={{uri: data.icon}} />
          <View style={stylesGlobal.space10} />
          <Text style={[stylesGlobal.header2, stylesGlobal.primer]}>
            {data.name}
          </Text>
        </View>

        {!isLoading ? (
          <View style={styles.switch}>
            {isOnline == 'online' ? (
              <Switch
                trackColor={{false: '#767577', true: '#D3D3D3'}}
                thumbColor={isEnabled ? 'green' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => {
                  setIsloading(true);
                  toggleSwitch();
                }}
                value={isEnabled}
              />
            ) : (
              <Text style={stylesGlobal.error}> offline </Text>
            )}
          </View>
        ) : (
          <Loading />
        )}
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
  switch: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CardMonitoring;
