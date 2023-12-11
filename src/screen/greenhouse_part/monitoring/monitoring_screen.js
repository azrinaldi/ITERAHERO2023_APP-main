import React, {useEffect, useState, useCallback} from 'react';
import {View, ScrollView, Text} from 'react-native';

import styles from './monitoring_style';
import PersenMonitoring from '../../../component/persen_monitoring';
import DegreeMonitoring from '../../../component/degree_monitoring';
import ElseMonitoring from '../../../component/else_monitoring';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {
  firstListSensorGreenhouse,
  firstValueSensor,
} from '../../../redux/action';
import Loading from '../../../component/loading';
import stylesGlobal from '../../../utils/style_global';

const MonitoringScreenGH = props => {
  const id = props.data.idData;

  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const fetchSensorData = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      dispatch(firstValueSensor(token));
    } catch (error) {
      console.error('Error fetching sensor data:', error);
    }
  }, [dispatch]);

  const onRefresh = useCallback(() => {
    setLoading(true);
    setRefreshing(true);
    AsyncStorage.getItem('token').then(respons => {
      dispatch(firstListSensorGreenhouse(id, respons));
      fetchSensorData(); // Fetch real-time sensor data
    });
    wait(3000).then(() => {
      setRefreshing(false);
      setLoading(false);
    });
  }, [dispatch, id, fetchSensorData]);

  const {dataListSensorGreenhouse, dataValueSensor, menuMoCon} = useSelector(
    state => state.userReducer,
  );

  const getApiById = useCallback(() => {
    AsyncStorage.getItem('token').then(respons => {
      dispatch(firstListSensorGreenhouse(id, respons));
      fetchSensorData(); // Fetch real-time sensor data
      setLoading(false);
    });
  }, [dispatch, id, fetchSensorData]);

  useEffect(() => {
    getApiById();

    // Set up interval to fetch real-time sensor data every 30 seconds (adjust as needed)
    const intervalId = setInterval(() => {
      fetchSensorData();
    }, 3000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [menuMoCon, getApiById, fetchSensorData]);

  console.log("Ini data sensor",dataMonitoringByid)

  return (
    <>
      <View style={{height: '71%', width: '100%'}}>
        <ScrollView>
          <View style={styles.container}>
            {dataListSensorGreenhouse.map((item, index) => {
              const matchedData = dataValueSensor.find(
                obj => obj.channel === item.channel || obj.gpio === item.GPIO,
              );
              console.log('Mathced Data: ', matchedData);
              const sensorValue = matchedData ? matchedData.nilai : null;
              console.log('Sensor Data: ', sensorValue);
              if (item.greenhouseId === id) {
                if (item.category.satuan == '%') {
                  return (
                    <PersenMonitoring
                      data={{
                        brand: item.brand,
                        icon: item.category.logo,
                        color: item.category.color,
                        name: item.name,
                        jenis: '%',
                        unit: item.unit_measurement,
                        id: item.id,
                        range_min: item.range_min,
                        range_max: item.range_max,
                        value: sensorValue,
                        status: item.status,
                      }}
                    />
                  );
                } else if (item.category.satuan == '° Celsius') {
                  return (
                    <DegreeMonitoring
                      data={{
                        brand: item.brand,
                        icon: item.category.logo,
                        color: item.category.color,
                        name: item.name,
                        jenis: '° Celsius',
                        unit: item.unit_measurement,
                        id: item.id,
                        range_min: item.range_min,
                        range_max: item.range_max,
                        value: sensorValue,
                        status: item.status,
                      }}
                    />
                  );
                } else {
                  return (
                    <ElseMonitoring
                      data={{
                        brand: item.brand,
                        icon: item.category.logo,
                        color: item.category.color,
                        name: item.name,
                        jenis: 'Lainnya',
                        unit: item.unit_measurement,
                        id: item.id,
                        range_min: item.range_min,
                        range_max: item.range_max,
                        value: sensorValue,
                        status: item.status,
                      }}
                    />
                  );
                }
              }
            })}
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default MonitoringScreenGH;
