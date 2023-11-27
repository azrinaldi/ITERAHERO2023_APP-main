import {
    StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
    header: {
        width: '100%',
        // height: 90,
        padding: 20,
        flexDirection: "column-reverse",
    },
    buttonBack: {
        // justifyContent: 'center',
        alignContent: 'center',
        flexDirection: 'row',
        width: '60%'
    },
    detail: {
        width: '100%',
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // backgroundColor: 'red',
        marginBottom: 10,
    },
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

export default styles