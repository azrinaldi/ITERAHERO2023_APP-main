import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: 'white',
    borderColor: '#171717',
    elevation: 1,
    shadowOpacity: 1,
    shadowRadius: 1,
    marginHorizontal: 10,
    marginBottom: 10,
    padding: 10,
    justifyContent: 'space-between',
  },
  dropdown: {
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    color: 'black',
  },
  labelDropdown: {
    color: 'black',
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 10,
    fontSize: 10,
  },
  placeholderStyle: {
    fontSize: 14,
    color: 'black',
  },
  selectedTextStyle: {
    fontSize: 14,
    color: 'black',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    color: 'black',
    width: '20%', // Lebar label
  },
  input: {
    color: 'black',
    flex: 1, // Mengambil sisa lebar
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});

export default styles;
