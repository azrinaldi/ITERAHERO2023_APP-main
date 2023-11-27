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

const MenuDetailGraphic = () => {
    const dispatch = useDispatch();

    const ChangeMenu = (data) => {
        dispatch(setGraphicAndHistory(data))
    }
    return (
        <View style={styles.grafikRiwayat}>
            <View style={styles.grafik} >
                <Text style={[stylesGlobal.header3, stylesGlobal.primer]}>
                    Grafik
                </Text>
            </View>
            <TouchableOpacity style={styles.riwayat} onPress={() => {
                ChangeMenu("history")
            }}>
                <Text style={[stylesGlobal.header3, stylesGlobal.gray]}>
                    Riwayat
                </Text>
            </TouchableOpacity>
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
        borderBottomColor: '#14453E',
        borderBottomWidth: 2,
    },
    riwayat: {
        height: '100%',
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },

});
export default MenuDetailGraphic