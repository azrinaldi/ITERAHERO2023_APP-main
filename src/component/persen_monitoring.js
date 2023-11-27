import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';
import stylesGlobal from '../utils/style_global';
import ProgressCircle from 'react-native-progress-circle';
import axios from 'axios';
import { sensorBroker } from '../utils/api_link';
import { useNavigation } from '@react-navigation/native';
import { convertCreateAt } from '../utils/moment';

const PersenMonitoring = (props) => {

    let data = props.data
    const navigate = useNavigation()

    const [value, setValue] = useState(0)
    const [refresh, setRefresh] = useState(true)
    const [first, checkFirst] = useState(true)
    const [date, setDate] = useState('')
    const [status, setStatus] = useState('offline')

    const onRefreshSatu = () => {
        setTimeout(() => {
            axios.get(sensorBroker + data.id)
                .then(response => {
                    setStatus(response.data.data[0].status)
                    setValue(response.data.data[0].value)
                    setDate(() => convertCreateAt(response.data.data[0].updatedAt))
                    setRefresh(true)
                })
        }, 10000)
    }

    const onRefreshDua = () => {
        setTimeout(() => {
            axios.get(sensorBroker + data.id)
                .then(response => {
                    setStatus(response.data.data[0].status)
                    setValue(response.data.data[0].value)
                    setDate(() => convertCreateAt(response.data.data[0].updatedAt))
                    setRefresh(false)
                })
        }, 10000)
    }

    const getDataApiWebBroker = () => {
        axios.get(sensorBroker + data.id)
            .then(response => {
                setStatus(response.data.data[0].status)
                setValue(response.data.data[0].value)
                setDate(() => convertCreateAt(response.data.data[0].updatedAt))
                setRefresh(false)
            })
    }

    const onRefreshFinal = () => {
        if (refresh == false) {
            onRefreshSatu()
        }
        if (refresh == true) {
            onRefreshDua()
        }
    }

    useEffect(() => {
        if (first == true) {
            getDataApiWebBroker()
        }
        else {
            onRefreshFinal()
        }

        return () => checkFirst(false)
    }, [refresh, first])

    return (
        <TouchableOpacity style={styles.persenData} onPress={() => {
            navigate.navigate('DetailMonitoringPage', {
                id: data.id,
                icon: data.icon,
                color: data.color,
                unit: data.unit,
                range_max: data.range_max,
                range_min: data.range_min,
                name: data.name,
                jenis: data.jenis,
            })
        }}>
            <View style={styles.insideCard}>
                <View style={styles.titleAndIcon}>
                    <Image source={{ uri: data.icon }} style={styles.imageIcon} />
                    <View style={stylesGlobal.space10} />
                    <Text style={[stylesGlobal.header3, { color: data.color }]}>
                        {data.name}
                    </Text>
                </View>
                {
                    value > data.range_max || value < data.range_min ?
                        <ProgressCircle
                            percent={value}
                            radius={30}
                            borderWidth={8}
                            color={'#B00020'}
                            shadowColor="#F2F2F2"
                            bgColor="#fff"
                        >
                            <Text style={{ fontSize: 14, color: '#000' }}>{value}{'%'}</Text>
                        </ProgressCircle> :
                        <ProgressCircle
                            percent={value}
                            radius={30}
                            borderWidth={8}
                            color={data.color}
                            shadowColor="#F2F2F2"
                            bgColor="#fff"
                        >
                            <Text style={{ fontSize: 14 }}>{value}{'%'}</Text>
                        </ProgressCircle>
                }

                <View style={{ alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[stylesGlobal.caption, stylesGlobal.primer]}>
                            {'Status : '}
                        </Text>
                        {
                            status == 'online' ?
                                <Text style={[stylesGlobal.caption, stylesGlobal.secondary]}>
                                    online
                                </Text> :
                                <Text style={[stylesGlobal.caption, stylesGlobal.error]}>
                                    offline
                                </Text>
                        }

                    </View>
                    <Text style={stylesGlobal.caption}>
                        {date}
                    </Text>
                </View>

            </View>
        </TouchableOpacity>
    )
}

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
        padding : 2,
    },
    imageIcon: {
        height: 24,
        width: 24,
        resizeMode: 'stretch',
    },

});

export default PersenMonitoring;