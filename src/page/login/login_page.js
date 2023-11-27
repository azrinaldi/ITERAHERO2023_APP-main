import React, {useEffect, useState} from 'react';
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  BackHandler,
  Alert,
  Image,
} from 'react-native';
import stylesGlobal from '../../utils/style_global';
import styles from './login_style';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Octicons from 'react-native-vector-icons/Octicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {loginApi} from '../../utils/api_link';
import {useNavigation} from '@react-navigation/native';
import Loading from '../../component/loading';
import CreateBy from '../../component/createBy';

const LoginPage = (props) => {
  const navigation = useNavigation();
  const [isLoading, setLoading] = useState(false);

  const handleSubmitComplate = (emailValue, passwordValue) => {
    console.log(emailValue, passwordValue);
    axios
      .post(loginApi, {
        email: emailValue,
        password: passwordValue,
      })
      .then(response => {
        AsyncStorage.setItem('token', response.data.accessToken).then(() => {
          setLoading(false);
          navigation.navigate('SplashScreen');
        });
      })
      .catch(error => {
        console.log(error);
        alert('Salah browww');
      })
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    const backAction = () => {
      Alert.alert('Keluar', 'Anda yakin ingin keluar ?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <>
      {isLoading == true ? (
        <Loading />
      ) : (
        <View style={styles.container}>
          <View style={styles.content}>
            <View style={[{alignItems: 'center'}]}>
              <Text style={[stylesGlobal.primer, stylesGlobal.header1]}>
                Masuk
              </Text>
            </View>
            <Formik
              initialValues={{email: '', password: ''}}
              onSubmit={(values, actions) => {
                loginUser(values);
                actions.setSubmitting(false);
              }}
              validationSchema={Yup.object({
                email: Yup.string()
                  .required('Email dibutuhkan!')
                  .min(3, 'email'),
                password: Yup.string().required('Password dibutuhkan!'),
              })}>
              {formikProps => {
                const {handleChange, handleBlur, values, errors} = formikProps;
                return (
                  <View style={{marginTop: 20}}>
                    <View
                      style={[
                        {
                          flexDirection: 'row',
                          width: '100%',
                          borderBottomWidth: 1,
                          borderBottomColor: '#E5E5E5',
                          width: '100%',
                        },
                      ]}>
                      <Octicons
                        name="person"
                        size={20}
                        style={[
                          stylesGlobal.primer,
                          {marginRight: '5%', marginTop: '3%'},
                        ]}
                      />
                      <TextInput
                        style={[
                          stylesGlobal.primer,
                          stylesGlobal.form_input,
                          {width: '100%'},
                        ]}
                        placeholder="Email"
                        value={values.email}
                        underlineColorAndroid="transparent"
                        placeholderTextColor={'#c4c4c4'}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCompleteType="email"
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                      />
                    </View>
                    {errors.email ? (
                      <Text style={stylesGlobal.error}>{errors.email}</Text>
                    ) : (
                      <Text style={stylesGlobal.error}></Text>
                    )}
                    <View
                      style={[
                        {
                          flexDirection: 'row',
                          width: '100%',
                          borderBottomWidth: 1,
                          borderBottomColor: '#E5E5E5',
                          width: '100%',
                          marginTop: '10%',
                        },
                      ]}>
                      <Octicons
                        name="lock"
                        size={20}
                        style={[
                          stylesGlobal.primer,
                          {marginRight: '5%', marginTop: '3%'},
                        ]}
                      />
                      <TextInput
                        style={[
                          stylesGlobal.primer,
                          stylesGlobal.form_input,
                          {width: '100%'},
                        ]}
                        placeholder="Password"
                        value={values.password}
                        underlineColorAndroid="transparent"
                        placeholderTextColor={'#c4c4c4'}
                        autoCapitalize="none"
                        secureTextEntry
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                      />
                    </View>
                    {errors.password ? (
                      <Text style={stylesGlobal.error}>{errors.password}</Text>
                    ) : (
                      <Text style={stylesGlobal.error}></Text>
                    )}
                    <View
                      style={[
                        stylesGlobal.backgroundPrimer,
                        {marginTop: 80, borderRadius: 20, paddingVertical: 10},
                      ]}>
                      <TouchableOpacity
                        style={[
                          stylesGlobal.backgroundPrimer,
                          {
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 20,
                          },
                        ]}
                        mode="contained"
                        onPress={() => {
                          setLoading(true);
                          handleSubmitComplate(values.email, values.password);
                        }}>
                        <Text
                          style={[stylesGlobal.button, stylesGlobal.surface]}>
                          Masuk
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              }}
            </Formik>
          </View>
          {/* <CreateBy /> */}

          <View>
            <Image
              style={{width: 200, height: 120}}
              source={require('../../../assets/images/Logo.png')}
            />
          </View>
        </View>
      )}
    </>
  );
};
export default LoginPage;
