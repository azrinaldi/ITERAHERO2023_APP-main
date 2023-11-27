import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        // alignItems:"center",
        height: '100%',
        width: '100%',
        flex: 1,
    },
    topBar: {
        width: '100%',
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
    },
    topBarContent: {
        marginLeft: 20,
        flexDirection: 'row'
    },
    notificationField: {
        marginTop: 20,
        // justifyContent: 'center',
        // alignContent: 'center'
    },
    notificationCard: {
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center'
    },
    arrowBackIcon: {
        marginRight: 20,
    },
    iconCard: {
        width: 60,
        height: 60,
        marginRight: 10,
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100
    },
    date: {
        width: '100%',
        height: '10%',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    scroll: {
        width: '100%',
        height: '100%',
        flex: 1,
    },
    shape: {
        width: '100%',
        height: '10%',
        position: 'relative',
        borderBottomEndRadius: 90,
        borderBottomStartRadius: 90,
        top: 0,
    },
});

export default styles;