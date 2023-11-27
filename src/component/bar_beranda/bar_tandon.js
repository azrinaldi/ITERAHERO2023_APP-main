import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import stylesGlobal from '../../utils/style_global';
import { useDispatch, useSelector } from 'react-redux';
import { setMenuBeranda } from '../../redux/action';
import { none } from 'ol/centerconstraint';

const BarTandon = () => {
    const dispatch = useDispatch();

    const ChangeMenu = (data) => {
        dispatch(setMenuBeranda(data))
    }
    return (
        <View style={[stylesGlobal.backgroundPrimer, styles.navBar]}>
            <View style={styles.menuBar}>
                <TouchableOpacity style={styles.nonaktifBar} onPress={() => {
                    ChangeMenu("greenhouse")

                }}>
                    <Text style={[stylesGlobal.header2, stylesGlobal.surface]}>
                        GreenHouse
                    </Text>
                </TouchableOpacity>
                <View style={styles.aktifBar}>
                    <Text style={[stylesGlobal.header2, stylesGlobal.primer]}>
                        Tandon
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
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        paddingBottom: 0,
        marginRight: 10,
    },
    menuBar: {
        width: "100%",
        height: '100%',
        flexDirection: 'row',
    },
    aktifBar: {
        width: "50%",
        height: '100%',
        backgroundColor: 'white',
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    nonaktifBar: {
        width: "50%",
        height: '100%',
        // backgroundColor: 'blue',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    }

});
export default BarTandon