import React, {} from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import stylesGlobal from '../../utils/style_global';
import styles from './greenhouse_screen_style';

const GreenHouseScreen = (props) => {
  const navigate = useNavigation();
  const {dataListGreenHouse} = useSelector(state => state.userReducer);
  return (
    <View style={[styles.scroll]}>
      <View style={[stylesGlobal.surface, styles.scrollContainer]}>
        <ScrollView>
          {dataListGreenHouse.data.map((item, index) => {
            return (
              <>
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() =>
                    navigate.navigate('GreenHousePage', {
                      id: item.id,
                      name: item.name,
                      image: item.image,
                    })
                  }>
                  <View
                    style={[
                      stylesGlobal.backgroundOnPrimary,
                      styles.greenHouseCard,
                    ]}>
                    <Image
                      source={{uri: item.image}}
                      style={styles.greenHousePicture}
                    />
                    <Text
                      style={[
                        stylesGlobal.primer,
                        stylesGlobal.header3,
                        {bottom: 10},
                      ]}>
                      {item.name}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
                <View
                  style={[
                    stylesGlobal.backgroundBackground,
                    styles.transparantBar,
                  ]}
                />
              </>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

export default GreenHouseScreen;
