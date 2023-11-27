import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
    },
    profile: {
        width: '100%',
        height: '10%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
    },
    shape: {
        width: '100%',
        height: '10%',
        position: 'relative',
        borderBottomEndRadius: 0,
        borderBottomStartRadius: 0,
        top: 0,
        borderBottomEndRadius: 15,
        borderBottomStartRadius: 15,

    },
    greenHouseListTitleContainer: {
        marginHorizontal: '5%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    scrollContainer: {
        alignContent: 'center',
        alignItems: 'center',
        bottom: 60,
        flex: 1,
        // backgroundColor: 'red'
    },
    greenHouseCard: {
        borderRadius: 10,
        width: 337,
        height: 250,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'column', 
        borderColor: '#171717',
        shadowOpacity: 0.8,
        elevation: 1,
    },
    greenHousePicture: {
        marginVertical: 10,
        width: 312,
        height: 190,
        borderRadius: 5,
    },
    transparantBar: {
        width: '100%',
        height: '1%',
        top: 0,
        position: 'relative',
    },
});
export default styles;