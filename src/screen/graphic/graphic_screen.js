import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Dimensions
} from 'react-native';
import stylesGlobal from '../../utils/style_global';
import styles from './graphic_style';
import SelectDropdown from 'react-native-select-dropdown'
import {
    LineChart,
} from "react-native-chart-kit";
import axios from 'axios';
import { grafikSensor, subGrafikSensor } from '../../utils/api_link';
import Loading from '../../component/loading';


const GraphicScreen = (props) => {

    const id = props.data.id
    const screenWidth = Dimensions.get("window").width - 20;
    const bulan = ['Mingguan', 'Bulanan', 'Tahunan']
    const [label, setLabel] = useState([])
    const [filter, setFilter] = useState('Week')
    const [data, setData] = useState([])
    const [allData, setAllData] = useState(null)
    const [isFinish, setfinish] = useState(false)


    const getData = () => {
        axios.get(grafikSensor + id + subGrafikSensor + filter)
            .then(response => {
                setAllData(response.data.data)
                if (response.data.data.length > 0) {
                    for (let i = 0; i < response.data.data.length; i++) {
                        setLabel(oldArray => [...oldArray, (response.data.data[i].label)])
                        setData(oldArray => [...oldArray, (response.data.data[i].data)])
                    }
                    setfinish(true)
                }
            })
    }

    useEffect(() => {

        getData()
        return () => {
            setLabel([])
            setData([])
            setfinish(false)
        }
    }, [filter])
    return (
        <>
            {
                allData != null ?

                    <View style={{ width: '100%' }}>
                        <View style={styles.statistik}>
                            <Text style={[stylesGlobal.header2, stylesGlobal.primer]}>
                                Statistik
                            </Text>
                            <View style={styles.viewBottom}>

                                <SelectDropdown
                                    data={bulan}
                                    buttonStyle={styles.buttonSelectMonth}
                                    buttonTextStyle={styles.textButton}
                                    defaultValue={bulan[0]}
                                    onSelect={(selectedItem) => {
                                        if (selectedItem == 'Mingguan') {
                                            setFilter('Week')
                                        }
                                        if (selectedItem == 'Bulanan') {
                                            setFilter('Month')
                                        }
                                        if (selectedItem == 'Tahunan') {
                                            setFilter('Year')
                                        }
                                    }}
                                    buttonTextAfterSelection={(selectedItem) => {
                                        return selectedItem
                                    }}
                                    rowTextForSelection={(item) => {
                                        return item
                                    }}
                                />
                            </View>

                        </View>
                        <View style={stylesGlobal.enter20} />

                        <View style={styles.graphicbar}>
                            {
                                isFinish ?

                                    <LineChart
                                        data={{
                                            labels: label,
                                            datasets: [
                                                {
                                                    data: data,
                                                    color: (opacity = 1) => `rgba(20, 69, 62, ${opacity})`, // optional
                                                    strokeWidth: 2 // optional
                                                }
                                            ],
                                        }}
                                        width={screenWidth}
                                        height={250}
                                        verticalLabelRotation={30}
                                        chartConfig={{
                                            backgroundGradientFrom: "#ffff",
                                            backgroundGradientFromOpacity: 1,
                                            backgroundGradientTo: "#FFFF",
                                            backgroundGradientToOpacity: 0.5,
                                            color: (opacity = 1) => `rgba(20, 69, 62, ${opacity})`,
                                            strokeWidth: 2,
                                            barPercentage: 0.5,
                                            useShadowColorFromDataset: false
                                        }}
                                        style={styles.char}
                                        bezier
                                    /> :
                                    <Loading />
                            }
                        </View>
                    </View> :
                    <Loading />
            }
        </>
    );
};

export default GraphicScreen;