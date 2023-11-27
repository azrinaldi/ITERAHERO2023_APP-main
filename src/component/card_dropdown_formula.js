import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import  SelectDropdownProps from 'react-native-select-dropdown';

const data = [
  { label: 'Melon', value: '1', ph: '7', ppm: '800' },
  { label: 'Mangga', value: '2', ph: '6.8', ppm: '1000' },
  { label: 'Apel', value: '3', ph: '7', ppm: '1200' },
  { label: 'Jeruk', value: '4', ph: '7.2', ppm: '1400' },
];
const DropdownFormula = () => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: 'blue' }]}>
          Formula
        </Text>
      );
    }
    return null;
  };
  return (
    <View style={styles.container}>
      {renderLabel()}
      <SelectDropdownProps
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        textStyle={{ color: 'black' }} 
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Pilih Formula' : '...'}
        value={value}
        itemContainerStyle={{}}
        itemTextStyle={{ color: 'black', fontSize: 12 }} 
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          setIsFocus(false);
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: 'white',
    borderColor: '#171717',
    elevation: 1,
    shadowOpacity: 1,
    shadowRadius: 1,
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
    color: 'black'
  },
  label: {
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
    color: 'black'
  },
  selectedTextStyle: {
    fontSize: 14,
    color: 'black'
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
export default DropdownFormula
