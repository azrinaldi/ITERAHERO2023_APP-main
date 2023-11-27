import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Switch,
    ScrollView,
    StatusBar,
    SafeAreaView,
    ImageBackground,
} from 'react-native';
import styles from "./penjadwalan_style";
import stylesGlobal from "../../../utils/style_global";


const PenjadwalanScreen = (props) => {
    const [switchData, setSwitchData] = useState([
        { id: 1, formula: 'Formula: Melon 1', jam: 'Jam: 08.00', isEnabled: false },
        { id: 2, formula: 'Formula: Melon 2', jam: 'Jam: 09.00', isEnabled: false },
        { id: 3, formula: 'Formula: Melon 3', jam: 'Jam: 17.00', isEnabled: false },
        { id: 1, formula: 'Formula: Melon 1', jam: 'Jam: 08.00', isEnabled: false },
        { id: 2, formula: 'Formula: Melon 2', jam: 'Jam: 09.00', isEnabled: false },
        { id: 3, formula: 'Formula: Melon 3', jam: 'Jam: 17.00', isEnabled: false },
        { id: 2, formula: 'Formula: Melon 2', jam: 'Jam: 09.00', isEnabled: false },
        { id: 3, formula: 'Formula: Melon 3', jam: 'Jam: 17.00', isEnabled: false },
        { id: 1, formula: 'Formula: Melon 1', jam: 'Jam: 08.00', isEnabled: false },
        { id: 2, formula: 'Formula: Melon 2', jam: 'Jam: 09.00', isEnabled: false },
        { id: 3, formula: 'Formula: Melon 3', jam: 'Jam: 17.00', isEnabled: false },
    ]);

    const toggleSwitch = (index) => {
        const updatedSwitchData = [...switchData];
        updatedSwitchData[index].isEnabled = !updatedSwitchData[index].isEnabled;
        setSwitchData(updatedSwitchData);
    };

    const handleLongPress = (id) => {
        Alert.alert(
            'Konfirmasi Hapus',
            'Yakin ingin menghapus jadwal ini?',
            [
                {
                    text: 'Batal',
                    style: 'cancel',
                },
                {
                    text: 'Hapus',
                    onPress: () => handleDelete(id),
                },
            ],
            { cancelable: false }
        );
    };

    const handleDelete = (id) => {
        const updatedSwitchData = switchData.filter((data) => data.id !== id);
        setSwitchData(updatedSwitchData);
    };

    return (
        <View style={{height:'70%', width: '100%'}}>
            <ScrollView>
            <View>
                {switchData.map((data, index) => (
                    <TouchableOpacity
                        key={data.id}
                        style={styles.card}
                        onLongPress={() => handleLongPress(data.id)}
                    >
                        <View style={styles.switch}>
                            <Text style={[stylesGlobal.header2, stylesGlobal.primer]}>{data.formula}</Text>
                            <Switch
                                trackColor={{ false: "#767577", true: "#D3D3D3" }}
                                thumbColor={data.isEnabled ? "green" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={() => toggleSwitch(index)}
                                value={data.isEnabled}
                            />
                        </View>
                        <Text style={[stylesGlobal.header3, stylesGlobal.primaryVariant]}>{data.jam}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
        </View>
    );
};

export default PenjadwalanScreen