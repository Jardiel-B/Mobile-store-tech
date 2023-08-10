import React, { useEffect } from 'react';
import { Text, Image, StyleSheet, ImageBackground, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

export function Pagina1() {

  const navigation = useNavigation();

  useEffect(() => {
    const redirectTimeout = setTimeout(() => { navigation.navigate('login'); }, 3000);
    return () => clearTimeout(redirectTimeout);
  }, []);

  return (
    <ImageBackground style={{flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%'}}  source={require('../../../assets/imgs/fundo.png')}>
      <Animatable.Image animation='pulse' duration={3000} source={require('../../../assets/imgs/logo.png')}></Animatable.Image>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 250,
    height: 250,
  },
});

