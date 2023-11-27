import {
    StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
    statistik: {
        width: '100%',
        height: 35,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    viewBottom: {
        height: '100%',
        width: '70%',
        flexDirection: 'row-reverse'
    },
    buttonSelectYear: {
        width: "27%",
        backgroundColor: '#14453E',
        borderRadius: 10,
        height: '100%',
        marginRight: 10,
    },
    buttonSelectMonth: {
        width: "48%",
        backgroundColor: '#14453E',
        borderRadius: 10,
        height: '100%',
        marginRight: 10,
    },
    textButton: {
        fontSize: 13,
        fontFamily: 'Montserrat SemiBold 600',
        color: '#FFFFFF',
    },
    scrolling: {
        width: '100%',
        height: '70%',
    },
    dataAvarage: {
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: 'center',
    },
    valueAvarage: {
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default styles