import {
    StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
    card: {
        width: '100%',
        backgroundColor: '#ffff',
        borderRadius: 10,
        borderColor: '#171717',
        elevation: 1,
        shadowOpacity: 1,
        shadowRadius: 1,
        padding: 10,
        justifyContent: 'space-between',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    label: {
        color: 'black',
        width: '15%', // Lebar label
    },
    input: {
        color: 'black',
        flex: 1, // Mengambil sisa lebar
        height: 40,
        borderWidth: 1,
        borderRadius: 5
    },
});

export default styles