import React, { useEffect, useState } from 'react';
import {
    ScrollView,
    View,
    Text,
} from 'react-native';
import styles from './history_style';
import stylesGlobal from '../../utils/style_global';
import SelectDropdown from 'react-native-select-dropdown'
import { riwayat, yearData } from '../../utils/api_link';
import axios from 'axios';
import Loading from '../../component/loading';

const HistoryScreen = (props) => {

    const id = props.data.id
    const name = props.data.name

    const [month, setMonth] = useState(1)
    const [year, setYear] = useState(2001)
    const [data, setData] = useState(null)
    const [constYear, setConstYear] = useState([])
    const [isHave, checkHave] = useState(true)

    const bulan = ['Januari', 'Februari', 'Maret', "April", "Mei", 'Juni', "Juli", "Agustus", "September", "Oktober", "November", "Desember"]

    const dataYear = async () => {
        await axios.get(yearData + id)
            .then(respons => {
                setYear(respons.data.data[0].data)
                for (let i = 0; i < respons.data.data.length; i++) {
                    setConstYear(oldArray => [...oldArray, (respons.data.data[i].data)])
                }
                checkHave(false)
            })
    }

    useEffect(() => {
        dataYear()

        axios.get(riwayat(id, month, year))
            .then(respons => {
                setData(respons.data)
            })
        return () => {
            setData(null)
            setConstYear([])
        }
    }, [month, year])


    return (
        <>
            {
                isHave == false ?
                    <View style={{ width: '100%' }}>
                        <View style={styles.statistik}>
                            <Text style={[stylesGlobal.header2, stylesGlobal.primer]}>
                                Rata-rata
                            </Text>
                            <View style={styles.viewBottom}>
                                <SelectDropdown
                                    data={constYear}
                                    buttonStyle={styles.buttonSelectYear}
                                    buttonTextStyle={styles.textButton}
                                    defaultValue={constYear[0]}
                                    onSelect={(selectedItem, index) => {
                                        setYear(selectedItem)
                                    }}
                                    buttonTextAfterSelection={(selectedItem, index) => {
                                        return selectedItem
                                    }}
                                    rowTextForSelection={(item, index) => {
                                        return item
                                    }}
                                />

                                <SelectDropdown
                                    data={bulan}
                                    buttonStyle={styles.buttonSelectMonth}
                                    buttonTextStyle={styles.textButton}
                                    defaultValue={bulan[0]}
                                    onSelect={(selectedItem, index) => {
                                        setMonth(index + 1)
                                    }}
                                    buttonTextAfterSelection={(selectedItem, index) => {
                                        return selectedItem
                                    }}
                                    rowTextForSelection={(item, index) => {
                                        return item
                                    }}
                                />
                            </View>
                        </View>
                        <View style={stylesGlobal.enter20} />
                        {
                            data != null ?
                                <View style={styles.scrolling}>
                                    {
                                        data.code == 200 ?
                                            <ScrollView>
                                                {
                                                    data.data.map((note) => (

                                                        <View style={styles.dataAvarage}>
                                                            <View>
                                                                <Text style={[stylesGlobal.header2, stylesGlobal.onBackground]}>
                                                                    {name}
                                                                </Text>
                                                                <Text style={[stylesGlobal.body2, stylesGlobal.onBackground]}>
                                                                    {note.label}
                                                                </Text>
                                                            </View>
                                                            <View style={[styles.valueAvarage, { backgroundColor: '#10B8DD' }]}>
                                                                <Text style={[stylesGlobal.header3, stylesGlobal.surface, { paddingHorizontal: 10 }]}>
                                                                    {note.data}
                                                                </Text>
                                                            </View>
                                                        </View>

                                                    ))
                                                }

                                            </ScrollView> : <View />
                                    }
                                </View> :
                                <Loading />
                        }

                    </View> :
                    <Loading />
            }
        </>
    );
};

export default HistoryScreen;