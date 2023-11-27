import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StatusBar,
    SafeAreaView,
    ImageBackground,
    TextInput,
    Button,
} from 'react-native';
import styles from "./peracikan_style";
import DropdownFormula from "../../../component/card_dropdown_formula";
import stylesGlobal from "../../../utils/style_global";

const PeracikanScreen = (props) => {
    
    const [phValue, onChangePHValue] = React.useState('');
    const [ppmValue, onChangePPMValue] = React.useState('');
    const [Nama, onChangeNama] = React.useState('');

    return(
        <View>
            {/* <DropdownFormula/> */}
            <View style={styles.card}>
            <View style={styles.inputContainer}>
                    <Text style={styles.label}>Nama</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeNama}
                        value={Nama}
                        keyboardType="string"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>PH</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangePHValue}
                        value={phValue}
                        keyboardType="numeric"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>PPM</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangePPMValue}
                        value={ppmValue}
                        keyboardType="numeric"
                    />
                </View>
                <Button
                    color="#09322D"
                    title="Submit"
                />
            </View>
        </View>
    );
};

export default PeracikanScreen