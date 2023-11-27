import React from 'react';
import {
  View,
  Image,
  SafeAreaView
} from 'react-native';
import styles from './no_have_internet_style';
const NoHaveInternetPage = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image
          style={styles.gambar}
          source={
            require('../../../assets/images/gaadasinyal.png')
          } />
      </View>
    </SafeAreaView>
  );
};

export default NoHaveInternetPage;