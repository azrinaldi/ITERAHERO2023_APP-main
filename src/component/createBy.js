import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
} from 'react-native';
import stylesGlobal from '../utils/style_global';

const CreateBy = () => {
    return (
        <View style={[styles.contain]}>
            <Text style={[styles.text, stylesGlobal.caption]} >Kolaborasi Oleh :</Text>
            <Image source={require('../../assets/images/image_persona.png')} style={[styles.image]} />
        </View>
    )
}

const styles = StyleSheet.create({
    contain: { justifyContent: 'center', alignItems: 'center' },
    text: { color: 'black' },
    image: { height: 40, width: 173 }
});

export default CreateBy