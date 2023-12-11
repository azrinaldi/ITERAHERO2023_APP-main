import React, {useEffect, useState} from 'react';
import {View, ScrollView} from 'react-native';

import styles from './monitoring_style';
import PersenMonitoring from '../../../component/persen_monitoring';
import DegreeMonitoring from '../../../component/degree_monitoring';
import ElseMonitoring from '../../../component/else_monitoring';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {getMonitoringById} from '../../../redux/action';
import Loading from '../../../component/loading';

const MonitoringScreenGH = props => {
  const id = props.data.idData;

  const dispatch = useDispatch();

  const [isLoading, setIsloading] = useState(true);

  const {dataMonitoringByid, menuMoCon} = useSelector(
    state => state.userReducer,
  );

  const getApiById = () => {
    AsyncStorage.getItem('token').then(respons => {
      dispatch(getMonitoringById(id, respons));
      setIsloading(false);
    });
  };

  useEffect(() => {
    getApiById();
    return () => setIsloading(true);
  }, [menuMoCon]);

  console.log("Ini data sensor",dataMonitoringByid)

  return (
    <>
      {dataMonitoringByid != undefined && isLoading == false ? (
        <View style={{height: '71%', width: '100%'}}>
          <ScrollView>
            <View style={styles.container}>
              {dataMonitoringByid != undefined
                ? dataMonitoringByid.map(placement => {
                    if (placement.category.name == 'Persen') {
                      return (
                        <PersenMonitoring
                          data={{
                            brand: placement.brand,
                            icon: placement.icon,
                            color: placement.color,
                            name: placement.name,
                            jenis: 'Persen',
                            unit: placement.unit_measurement,
                            id: placement.id,
                            range_min: placement.range_min,
                            range_max: placement.range_max,
                          }}
                        />
                      );
                    } else if (placement.category.name == 'Derajat') {
                      return (
                        <DegreeMonitoring
                          data={{
                            brand: placement.brand,
                            icon: placement.icon,
                            color: placement.color,
                            name: placement.name,
                            jenis: 'Derajat',
                            unit: placement.unit_measurement,
                            id: placement.id,
                            range_min: placement.range_min,
                            range_max: placement.range_max,
                          }}
                        />
                      );
                    } else if (placement.category.name == 'Lainnya') {
                      return (
                        <ElseMonitoring
                          data={{
                            brand: placement.brand,
                            icon: placement.icon,
                            color: placement.color,
                            name: placement.name,
                            jenis: 'Lainnya',
                            unit: placement.unit_measurement,
                            id: placement.id,
                            range_min: placement.range_min,
                            range_max: placement.range_max,
                          }}
                        />
                      );
                    }
                  })
                : null}
            </View>
          </ScrollView>
        </View>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default MonitoringScreenGH;
