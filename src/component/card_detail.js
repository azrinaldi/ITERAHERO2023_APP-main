import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
} from 'react-native';
import stylesGlobal from '../utils/style_global';

const CardDetail = (props) => {
    let data = props.data
    return (
        <View style={{ width: '100%', paddingHorizontal: 20 }}>
            <View style={[styles.realTime, { backgroundColor: data.color }]}>

                <View style={styles.dataRealtime}>

                    <View style={styles.iconBorder}>
                        <View style={styles.cisrcle}>
                            <Image
                                style={{ height: 24, width: 24 }}
                                source={{ uri: data.icon }}
                            />
                        </View>
                    </View>

                    <View style={styles.textBorder}>
                        <View style={styles.textRealtime}>

                            <Text style={[stylesGlobal.header3, stylesGlobal.surface]}>
                                {data.name}
                            </Text>

                            {
                                data.jenis == 'Persen' ?
                                    <Text style={[stylesGlobal.header2, { color: '#FFFF' }]}>
                                        {data.value}{'%'}
                                    </Text> : null
                            }
                            {
                                data.jenis == 'Derajat' ?
                                    <Text style={[stylesGlobal.header2, { color: '#FFFF' }]}>
                                        {data.value}{'°'}
                                    </Text> : null
                            }
                            {
                                data.jenis == 'Lainnya' ?
                                    <Text style={[stylesGlobal.header2, { color: '#FFFF' }]}>
                                        {data.value}
                                    </Text> : null
                            }

                        </View>
                    </View>

                </View>

                <View style={styles.checkOn}>
                    {
                        data.status == 'online' ?
                            <>
                                <View style={[{ height: 10, width: 10, borderRadius: 100 }, stylesGlobal.backgroundSecondary]} />
                                <Text style={[stylesGlobal.caption, stylesGlobal.primer]}> Online</Text>
                            </> :
                            <>
                                <View style={[{ height: 10, width: 10, borderRadius: 100 }, stylesGlobal.backgroundError]} />
                                <Text style={[stylesGlobal.caption, stylesGlobal.primer]}> Offline</Text>
                            </>

                    }

                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    realTime: {
        width: '100%',
        height: 100,
        borderRadius: 10,
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    dataRealtime: {
        flexDirection: 'row',
        alignItems: 'center',
        height: '100%',
        width: '75%',
        justifyContent: 'space-between',
    },
    iconBorder: {
        height: '100%',
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textBorder: {
        height: '100%',
        width: '78%',
        justifyContent: 'center'
    },
    cisrcle: {
        height: 45,
        width: 45,
        backgroundColor: '#ffff',
        borderRadius: 300,
        justifyContent: 'center',
        alignItems: 'center',

    },
    textRealtime: {
        justifyContent: 'center',
        flexDirection: 'column',
    },
    checkOn: {
        width: '25%',
        height: 25,
        backgroundColor: '#ffff',
        borderRadius: 10,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
});

export default CardDetail