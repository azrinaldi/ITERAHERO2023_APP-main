import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import stylesGlobal from '../utils/style_global';
import axios from 'axios';
import {sensorBroker} from '../utils/api_link';
import {useNavigation} from '@react-navigation/native';
import {convertCreateAt} from '../utils/moment';

const ElseMonitoring = props => {
  const data = props.data;
  const [date, setDate] = useState('');
  return (
    <TouchableOpacity
      style={styles.persenData}
      onPress={() => {
        navigate.navigate('DetailMonitoringPage', {
          id: data.id,
          icon: data.icon,
          color: data.color,
          unit: data.unit,
          range_max: data.range_max,
          range_min: data.range_min,
          name: data.name,
          jenis: data.jenis,
        });
      }}>
      <View style={styles.insideCard}>
        <View style={styles.titleAndIcon}>
          <Image source={{uri: data.icon}} style={styles.imageIcon} />
          <View style={stylesGlobal.space10} />
          <Text style={[stylesGlobal.header3, {color: data.color}]}>
            {data.name}
          </Text>
        </View>

        <View style={{alignItems: 'center'}}>
          {data.value > data.range_max || data.value < data.range_min ? (
            <Text style={[stylesGlobal.header2, stylesGlobal.error]}>
              {data.value}
            </Text>
          ) : (
            <Text style={[stylesGlobal.header2, {color: data.color}]}>
              {data.value}
            </Text>
          )}
          {data.value > data.range_max || data.value < data.range_min ? (
            <Text style={[stylesGlobal.header2, stylesGlobal.error]}>
              {data.unit}
            </Text>
          ) : (
            <Text style={[stylesGlobal.header2, {color: data.color}]}>
              {data.unit}
            </Text>
          )}
        </View>

        <View style={{alignItems: 'center'}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={[stylesGlobal.caption, stylesGlobal.primer]}>
              {'Status : '}
            </Text>
            {data.status ? (
              <Text style={[stylesGlobal.caption, stylesGlobal.secondary]}>
                online
              </Text>
            ) : (
              <Text style={[stylesGlobal.caption, stylesGlobal.error]}>
                offline
              </Text>
            )}
          </View>
          <Text style={stylesGlobal.caption}>{date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  insideCard: {
    width: '100%',
    alignItems: 'center',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  persenData: {
    width: '49%',
    height: 180,
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: '#171717',
    shadowOpacity: 1,
    borderRadius: 10,
    elevation: 1,
    shadowRadius: 10,
    padding: 20,
    alignItems: 'center',
    marginBottom: 10,
  },
  titleAndIcon: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
  },
  imageIcon: {
    height: 24,
    width: 24,
    resizeMode: 'stretch',
  },
});

export default ElseMonitoring;
