import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  title: {
    height: 50,
    alignItems: 'center',
    paddingTop: 15,
  },
  form: {
    height: 500,
    borderRadius: 10,
    backgroundColor: 'white',
    borderColor: '#171717',
    elevation: 1,
    shadowOpacity: 1,
    shadowRadius: 1,
    margin: 10,
    paddingTop: 10,
  },
  buttonField: {
    width: '100%',
    height: 60,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  card: {
    marginVertical: 5,
    marginHorizontal: 10,
    padding: 10,
  },
  button: {
    height: 40,
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
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
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
  label: {
    color: 'black',
    fontFamily: 'Montserrat Bold 700',
    fontSize: 14,
    width: '23%',
  },
  input: {
    color: 'black',
    width: '100%',
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  buttonAdd: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingTop: 5,
    borderRadius: 5,
    borderColor: '#09322D',
  },
  buttonAddField: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectedStyle: {
    borderRadius: 5,
  },
  inputTime: {
    color: 'black',
  },
});

export default styles;
