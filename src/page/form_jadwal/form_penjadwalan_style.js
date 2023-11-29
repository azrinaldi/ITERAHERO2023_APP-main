import StyleSheet from 'react-native';

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: 'white',
    borderColor: '#171717',
    elevation: 1,
    shadowOpacity: 1,
    shadowRadius: 1,
    marginVertical: 5,
    marginHorizontal: 10,
    padding: 20,
    justifyContent: 'space-between',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonField: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
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
  },
  label: {
    color: 'black',
    fontFamily: 'Montserrat Bold 700',
    fontSize: 14,
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
  buttonAdd: {
    flexDirection: 'row', // Arrange children in a row
    alignItems: 'center', // Center children vertically
    backgroundColor: '#FFFFFF', // Background color
    padding: 10, // Padding around the content
    borderRadius: 5, // Border radius for rounded corners
    borderWidth: 1, // Border width
    borderColor: '#09322D',
  },
});

export default styles;
