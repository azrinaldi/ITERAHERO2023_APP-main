import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import stylesGlobal from '../../utils/style_global';
import { useDispatch, useSelector } from 'react-redux';
import {setMenuTandon } from '../../redux/action';

const BarPenjadwalan = () => {
    const dispatch = useDispatch();

    const ChangeMenu = (data) => {
        dispatch(setMenuTandon(data))
    }
    return (
        <View style={[stylesGlobal.backgroundPrimer, styles.navBar]}>
            <View style={styles.menuBar}>
                <TouchableOpacity style={styles.nonaktifBar} onPress={() => {
                    ChangeMenu("monitoring")

                }}>
                    <Text style={[stylesGlobal.body1, stylesGlobal.surface]}>
                        Monitor
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.nonaktifBar} onPress={() => {
                    ChangeMenu("controlling")

                }}>
                    <Text style={[stylesGlobal.body1, stylesGlobal.surface]}>
                        Kontrol
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.nonaktifBar} onPress={() => {
                    ChangeMenu('peracikan')
                }}>
                    <Text style={[stylesGlobal.body1, stylesGlobal.surface]}>
                        Racik
                    </Text>
                </TouchableOpacity>
                <View style={styles.aktifBar}>
                    <Text style={[stylesGlobal.body1, stylesGlobal.primer]}>
                        Jadwal
                    </Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    navBar: {
        height: 50,
        width: '100%',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginRight: 10,
    },
    menuBar: {
        width: "100%",
        height: '100%',
        flexDirection: 'row',
    },
    nonaktifBar: {
        width: "25%",
        height: '100%',
        // backgroundColor: 'white',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    aktifBar: {
        width: "25%",
        height: '100%',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
    },

});
export default BarPenjadwalan;