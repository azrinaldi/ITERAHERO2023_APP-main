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
  const [trigger, setTrigger] = useState(true);

  const onRefresh = useCallback(() => {
    setLoading(true);
    setRefreshing(true);
    AsyncStorage.getItem('token').then(respons => {
      dispatch(firstListSensorGreenhouse(id, respons));
      dispatch(firstValueSensor(respons));
    });
    wait(3000).then(() => {
      setRefreshing(false);
      setLoading(false);
    });
  }, []);

  const {dataListSensorGreenhouse, dataValueSensor} = useSelector(
    state => state.userReducer,
  );

  const getApiById = () => {
    AsyncStorage.getItem('token').then(respons => {
      dispatch(firstListSensorGreenhouse(id, respons));
      dispatch(firstValueSensor(respons));
      setLoading(false);
    });
  };

  useEffect(() => {
    getApiById();
    const interval = setInterval(() => {
      getApiById()
    }, 3000)

    return (() => clearInterval(interval))
  }, []);

  return (
    <>
      <View style={{height: '71%', width: '100%'}}>
        <ScrollView>
          <View style={styles.container}>
            {dataListSensorGreenhouse.map((item, index) => {
              const matchedData = dataValueSensor.find(
                obj => obj.channel === item.channel || obj.gpio === item.GPIO,
              );
              const sensorValue = matchedData ? matchedData.nilai : null;
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
