import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import stylesGlobal from '../../utils/style_global'
import styles from '../notifikasi/notifikasi_style'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Feather from 'react-native-vector-icons/Feather'
import { nullCount, listNotification } from '../../utils/api_link'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Loading from '../../component/loading'
import { convertnotivTime } from '../../utils/moment'

const NotifikasiPage = () => {

  const navigate = useNavigation()
  const [list, setList] = useState(null)

  const getListNotivication = (token) => {
    axios.get(listNotification, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then(respond => {
        setList(respond.data.data)
      })
  }

  const deleteCount = (token) => {
    axios.post(nullCount, {}, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
  }

  useEffect(() => {
    AsyncStorage.getItem('token')
      .then(token => {
        getListNotivication(token)
        deleteCount(token)

      })
  }, [])

  return (
    <View style={[styles.container, stylesGlobal.backgroundOnSecondary]}>
      <View style={[stylesGlobal.backgroundPrimer, styles.topBar]}>
        <TouchableOpacity style={[styles.topBarContent]} onPress={() => navigate.goBack()}>
          <MaterialIcons name="arrow-back" size={24} style={[stylesGlobal.onPrimary, styles.arrowBackIcon]} />
          <Text style={[stylesGlobal.onPrimary, stylesGlobal.header2]}>Notifikasi</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {
          list == null ? <Loading /> :
            list.map((item, index) => {
              return (
                <View style={[stylesGlobal.backgroundOnSecondary, styles.notificationField]} key={index}>
                  <View style={[styles.notificationCard]}>
                    <View style={[stylesGlobal.backgroundPrimer, styles.iconCard]} >
                      <Feather name="alert-triangle" size={30} style={[stylesGlobal.onError]} />
                    </View>
                    <View style={{ width: '78%' }}>
                      <Text style={[stylesGlobal.onBackground, stylesGlobal.header3]}>
                        {item.detail}
                      </Text>
                      <Text style={[stylesGlobal.gray, stylesGlobal.header3]}>
                        {convertnotivTime(item.created_at)}
                      </Text>
                    </View>
                  </View>
                </View>
              )
            })
        }
      </ScrollView>
    </View>
  )
}

export default NotifikasiPage;