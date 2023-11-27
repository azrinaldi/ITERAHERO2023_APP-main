import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import stylesGlobal from '../utils/style_global';

import { useDispatch } from 'react-redux';
import { setGraphicAndHistory } from '../redux/action';

const MenuDetailRiwayat = () => {
    const dispatch = useDispatch();

    const ChangeMenu = (data) => {
        dispatch(setGraphicAndHistory(data))
    }
    return (
        <View style={styles.grafikRiwayat}>
            <TouchableOpacity style={styles.grafik} onPress={() => {
                ChangeMenu("graphic")
            }}>
                <Text style={[stylesGlobal.header3, stylesGlobal.gray]}>
                    Grafik
                </Text>
            </TouchableOpacity>
            <View style={styles.riwayat} >
                <Text style={[stylesGlobal.header3, stylesGlobal.primer]}>
                    Riwayat
                </Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    grafikRiwayat: {
        width: '100%',
        height: 40,
        flexDirection: 'row'
    },
    grafik: {
        height: '100%',
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',

    },
    riwayat: {
        height: '100%',
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: '#14453E',
        borderBottomWidth: 2,
    },

});
export default MenuDetailRiwayat