import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, ActivityIndicator, Image} from 'react-native';
import styles from './monitoring_style';
import stylesGlobal from '../../../utils/style_global';
import {ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {firstListSensorTandon, firstValueSensor} from '../../../redux/action';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MonitoringScreenTandon = props => {
  const id = props.data.id;
  const isOnline = props.data.isOnline;
  const ppm = props.data.ppm;
  const rasioA = props.data.rasioA;
  const rasioB = props.data.rasioB;
  const rasioAir = props.data.rasioAir;
  const status = props.data.status;

  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [trigger, setTrigger] = useState(true);

  const onRefresh = useCallback(() => {
    setLoading(true);
    setRefreshing(true);
    AsyncStorage.getItem('token').then(respons => {
      dispatch(firstListSensorTandon(id, respons));
      dispatch(firstValueSensor(respons));
    });
    wait(3000).then(() => {
      setRefreshing(false);
      setLoading(false);
    });
  }, []);

  const {dataListSensorTandon, dataValueSensor, menuTandon} = useSelector(
    state => state.userReducer,
  );

  const getApiById = () => {
    AsyncStorage.getItem('token').then(respons => {
      dispatch(firstListSensorTandon(id, respons));
      dispatch(firstValueSensor(respons));
      setLoading(false);
    });
  };

  useEffect(() => {
    getApiById();
    setTimeout(() => setTrigger(!trigger), 3000);
  }, [menuTandon, trigger]);

  return (
    <ScrollView>
      <View style={{height: 600}}>
        <View style={styles.container}>
          <View style={styles.monitor}>
            <View style={styles.tandon}>
              <View style={styles.cardTandon}>
                <View style={styles.status}>
                  {isOnline ? (
                    <Text>
                      <Text style={[stylesGlobal.header3, stylesGlobal.primer]}>
                        Status :
                      </Text>
                      <Text
                        style={[stylesGlobal.secondary, stylesGlobal.header3]}>
                        Online
                      </Text>
                    </Text>
                  ) : (
                    <Text>
                      <Text style={[stylesGlobal.header3, stylesGlobal.primer]}>
                        Status :
                      </Text>
                      <Text style={[stylesGlobal.error, stylesGlobal.header3]}>
                        Offline
                      </Text>
                    </Text>
                  )}
                </View>
                {status == 'Ada Isinya' ? (
                  <View style={styles.icon}>
                    <Image
                      style={styles.img}
                      source={require('./waterTank.png')}
                    />
                    <Text style={[stylesGlobal.primer, stylesGlobal.header3]}>
                      Tandon berisi
                    </Text>
                  </View>
                ) : status === 'Kosong' ? (
                  <View style={styles.icon}>
                    <Image
                      style={styles.img}
                      source={require('./waterTank_Empty.png')}
                    />
                    <Text style={[stylesGlobal.primer, stylesGlobal.header3]}>
                      Tandon Kosong
                    </Text>
                  </View>
                ) : (
                  <View style={styles.icon}>
                    <Image
                      style={styles.img}
                      source={require('./waterTank_Load.png')}
                    />
                    <ActivityIndicator
                      size="large"
                      style={styles.activityIndicator}
                    />
                    <Text style={[stylesGlobal.primer, stylesGlobal.header3]}>
                      Sedang Meracik...
                    </Text>
                  </View>
                )}
              </View>
            </View>
            <View style={styles.sensor}>
              {dataListSensorTandon.map((item, index) => {
                const matchedData = dataValueSensor.find(
                  obj => obj.channel === item.channel || obj.gpio === item.GPIO,
                );
                console.log('Mathced Data: ', matchedData);
                const sensorValue = matchedData ? matchedData.nilai : null;
                return (
                  <View style={styles.cardSensor}>
                    <Text style={[stylesGlobal.primer, stylesGlobal.header3]}>
                      {item.name}
                    </Text>
                    <Text style={[stylesGlobal.secondaryVariant, styles.value]}>
                      {sensorValue}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
          <View style={styles.formula}>
            <View style={styles.cardFormula}>
              <Text style={[stylesGlobal.primer, stylesGlobal.body1]}>
                Rasio Pupuk
              </Text>
              <Text style={[stylesGlobal.secondary, stylesGlobal.header4]}>
                {rasioA} : {rasioB} : {rasioAir} = {ppm}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default MonitoringScreenTandon;
