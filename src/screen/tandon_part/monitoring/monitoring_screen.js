import React from "react";
import {
    View,
    Text,
    ActivityIndicator,
    Image
} from 'react-native';
import styles from "./monitoring_style";
import stylesGlobal from "../../../utils/style_global";
import { ScrollView } from "react-native";



const MonitoringScreenTandon = (props) => {
    const id = props.data.id
    const nama = props.data.nama
    const isOnline = props.data.isOnline
    const ppm = props.data.ppm
    const rasioA = props.data.rasioA
    const rasioB = props.data.rasioB
    const rasioAir = props.data.rasioAir
    const status = props.data.status

    return (
        <View style={{ height: '70%', width: '100%' }}>
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.cardTandon}>
                        {(status == "Ada Isinya") ? (
                            <View style={styles.icon}>
                                <Image style={styles.img}
                                    source={require('./waterTank.png')}
                                />
                                <Text style={[
                                    stylesGlobal.primer,
                                    stylesGlobal.header3,

                                ]}>
                                    Tandon berisi
                                </Text>
                            </View>
                        ) : (status === "Kosong") ? (
                            <View style={styles.icon}>
                                <Image
                                    style={styles.img}
                                    source={require('./waterTank_Empty.png')}
                                />
                                <Text style={[
                                    stylesGlobal.primer,
                                    stylesGlobal.header3,
                                ]}>
                                    Tandon Kosong
                                </Text>
                            </View>)
                            : (
                                <View style={styles.icon}>
                                    <Image
                                        style={styles.img}
                                        source={require('./waterTank_Load.png')}
                                    />
                                    <ActivityIndicator size="large" style={styles.activityIndicator} />
                                    <Text style={[
                                        stylesGlobal.primer,
                                        stylesGlobal.header3,

                                    ]}>
                                        Sedang Meracik...
                                    </Text>
                                </View>
                            )}
                    </View>

                    <View style={styles.cardSensor}>
                        <View style={styles.status}>
                            {isOnline ? (
                                <Text>
                                    <Text style={[
                                        stylesGlobal.header3,
                                        stylesGlobal.primer,]}>
                                        Status :
                                    </Text>
                                    <Text style={[
                                        stylesGlobal.secondary,
                                        stylesGlobal.header3
                                    ]}>
                                        Online
                                    </Text>
                                </Text>)
                                : (
                                    <Text>
                                        <Text style={[
                                            stylesGlobal.header3,
                                            stylesGlobal.primer,]}>
                                            Status :
                                        </Text>
                                        <Text style={[
                                            stylesGlobal.error,
                                            stylesGlobal.header3
                                        ]}>
                                            Offline
                                        </Text>
                                    </Text>
                                )}
                        </View>
                        <Text style={[
                            stylesGlobal.primer,
                            stylesGlobal.body1,

                        ]}> PPM      : 1200</Text>

                        <Text style={[
                            stylesGlobal.primer,
                            stylesGlobal.body1,

                        ]}> PH         : 7</Text>

                        <Text style={[
                            stylesGlobal.primer,
                            stylesGlobal.body1,

                        ]}> Suhu    : 30</Text>
                    </View>

                    <View style={styles.cardFormula}>
                        <Text style={[
                            stylesGlobal.primer,
                            stylesGlobal.body1,
                        ]}>
                            Rasio Pupuk
                        </Text>
                        <Text style={[
                            stylesGlobal.secondary,
                            stylesGlobal.header4,
                        ]}>
                            {rasioA} : {rasioB} : {rasioAir} = {ppm}
                        </Text>
                    </View>
                </View>
            </ScrollView >
        </View >

    )
};

export default MonitoringScreenTandon