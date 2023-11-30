import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: '70%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  containerInfo:{
    height: 370,
    width: '100%',
    display: 'flex',
    paddingHorizontal: 10,
  },
  containerButton:{
    height: 60,
    width: '100%',
  },
  card: {
    width: '100%',
    backgroundColor: '#ffff',
    borderRadius: 10,
    borderColor: '#171717',
    elevation: 1,
    shadowOpacity: 1,
    shadowRadius: 1,
    marginBottom: 10,
    padding: 10,
    justifyContent: 'space-between',
  },
  switch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  waktu: {
    color: '',
  },
  button: {
    height: 40, // Set height as needed
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    elevation: 1,
    shadowOpacity: 1,
    shadowRadius: 1,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  container: {},
});

export default styles;
