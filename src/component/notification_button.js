import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import stylesGlobal from '../utils/style_global';
import styles from './notification_button_style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { notificationCount } from '../utils/api_link';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const NotificationButton = () => {

    const [count, getCount] = useState(0)
    const [realTime, setRealtime] = useState(false)

    const navigation = useNavigation()

    useEffect(() => {
        AsyncStorage.getItem('token')
            .then(token => {
                axios.get(notificationCount, {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                })
                    .then(respond => {
                        getCount(respond.data.count)
                        // console.log(respond.data.count)
                        setTimeout(() => {
                            // console.log(respond.data.count)
                            setRealtime(reload => !reload)
                        }, 5000);

                    })
            })
    }, [realTime])


    return (
        <TouchableOpacity onPress={() => navigation.navigate('NotifikasiPage')}>
            {
                count > 0 && count < 9 ? (
                    <View style={[stylesGlobal.backgroundOnError, styles.backgroundNotificationNumber, { top: 19 }]}>
                        <Text style={[stylesGlobal.body1, { color: '#FFFF' }]}>{count}</Text>
                    </View>
                ) : (
                    <View style={[styles.backgroundNotificationNumber, { top: 19 }]}>
                    </View>
                )
            }
            {
                count >= 9 ? (
                    <View style={[stylesGlobal.backgroundOnError, styles.backgroundNotificationNumber]}>
                        <Text style={[stylesGlobal.body1, { color: '#FFFF' }]}>9+</Text>
                    </View>
                ) : (
                    <View style={[styles.backgroundNotificationNumber, { top: 19 }]}>
                    </View>
                )
            }
            <Ionicons name="notifications" size={24} color="#fff" style={[stylesGlobal.surface, styles.notificationIcon]} />
        </TouchableOpacity>
    )
}
export default NotificationButton;
