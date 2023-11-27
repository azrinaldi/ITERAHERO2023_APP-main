import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StatusBar,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';
import styles from './detail_monitoring_style';
import stylesGlobal from '../../utils/style_global';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import CardDetail from '../../component/card_detail';
import MenuDetailGraphic from '../../component/menu_detail_grafik';
import MenuDetailRiwayat from '../../component/menu_detail_riwayat';
import GraphicScreen from '../../screen/graphic/graphic_screen';
import HistoryScreen from '../../screen/history/history_screen';
import { useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { sensorBroker } from '../../utils/api_link';
import { convertCreateAt } from '../../utils/moment';


const DetailMonitoringPage = () => {

    const navigate = useNavigation()
    const data = useRoute().params

    const [value, setValue] = useState(-1)
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


    const { menuGraRi } = useSelector(
        state => state.userReducer,
    );

    return (
        <SafeAreaView style={stylesGlobal.surface}>
            <StatusBar
                animated={true}
                backgroundColor={'#09322D'} />
            <View style={[styles.header, stylesGlobal.backgroundPrimer]}>
                <TouchableOpacity style={styles.buttonBack} onPress={() => navigate.goBack()}>
                    <Icon name="arrow-back" size={24} color="#ffff" />
                    <View style={stylesGlobal.space10} />
                    <Text style={[stylesGlobal.header2, { color: '#ffff' }]}>
                        {data.name}
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={stylesGlobal.enter20} />
            <View style={styles.detail}>
                <Text style={[stylesGlobal.header2, stylesGlobal.primer]}>
                    Detail
                </Text>
                <Text style={[stylesGlobal.header3, stylesGlobal.primer]}>
                    {date}
                </Text>
            </View>
            <CardDetail data={{
                icon: data.icon,
                color: data.color,
                status: status,
                value: value,
                jenis: data.jenis,
                unit: data.unit,
                name: data.name,
                range_max: data.range_max,
                range_min: data.range_min,
            }} />
            <View style={stylesGlobal.enter20} />
            <View style={{ paddingHorizontal: 20 }}>
                {
                    menuGraRi == 'history' ?
                        <>
                            <MenuDetailRiwayat />
                            <View style={stylesGlobal.enter20} />
                            <HistoryScreen data={{
                                id: data.id,
                                name: data.name
                            }} />
                        </>
                        : null
                }
                {
                    menuGraRi == 'graphic' ?
                        <>
                            <MenuDetailGraphic />
                            <View style={stylesGlobal.enter20} />
                            <GraphicScreen data={{ id: data.id }} />
                        </>
                        : null
                }
            </View>

        </SafeAreaView>
    );
};

export default DetailMonitoringPage;