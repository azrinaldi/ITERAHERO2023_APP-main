import {
    StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        // backgroundColor: 'red',
        paddingHorizontal: 10,
        // marginVertical: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',

    },
    cardTandon: {
        width: '60%',
        height: 200,
        backgroundColor: '#ffff',
        borderRadius: 10,
        borderColor: '#171717',
        shadowOpacity: 1,
        elevation: 1,
        shadowRadius: 1,
        marginBottom: 10,
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems:'center',
        marginRight: 5,
    },
    cardSensor: {
        width: '38%',
        height: 200,
        backgroundColor: '#ffff',
        borderRadius: 10,
        borderColor: '#171717',
        shadowOpacity: 1,
        elevation: 1,
        shadowRadius: 1,
        padding: 5,
    },
    cardFormula: {
        width: '100%',
        height: 70,
        backgroundColor: '#ffff',
        borderRadius: 10,
        borderColor: '#171717',
        shadowOpacity: 1,
        elevation: 1,
        shadowRadius: 1,
        marginBottom: 10,
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems:'center'
    },
    status:{
        padding: 4,
    },
    img: {
        marginBottom: -10,
        width: 200,
        height: 170,
    },
    activityIndicator: {
        position: 'absolute',
        top: '38%',
        left: '48%',
    },
    icon:{
        alignItems: 'center',
    }
    

});

export default styles