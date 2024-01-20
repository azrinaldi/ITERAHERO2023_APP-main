import { StyleSheet } from 'react-native';

const SplashScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems:"center",
        height: '100%',
        backgroundColor: '#FCFFFC',
        padding: 0,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    content: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '40%',
        width: '70%',
    },
    logo: {
        // paddingHorizontal: 90
        // width: "100%",
        resizeMode: 'contain',
        width : 200,
        height: 200,
    }
});

export default SplashScreenStyle;