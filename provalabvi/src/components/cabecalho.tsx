import * as React from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { Image } from 'expo-image';
import { useNavigation } from '@react-navigation/native';



export function Cabecalho(props: any) {

  const navigation = useNavigation();

  return (
    <ImageBackground style={{position: 'relative', top: 0, zIndex: 1}} source={{uri:'https://th.bing.com/th/id/R.1c23ab9a68cf086f40ca5636aadb756f?rik=6Z2vfHBx862NxA&pid=ImgRaw&r=0'}}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image style={styles.voltar} source={require('../../assets/imgs/voltar.png')}/>
        </TouchableOpacity>
        <Text style={styles.texto}> {props.tela} </Text>
        <View style={{flex: 1}}>
          <TouchableOpacity onPress={() => {navigation.navigate('configuracao')}}>
            <Image style={styles.configs} source={require("../../assets/imgs/config.png")}/>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 25,
    paddingBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  texto: {
    fontSize: 35,
    color: 'white',
    zIndex: -1,
    marginLeft: 30,
    marginTop: 5,
  },
  voltar: {
    width: 25,
    height: 25,
    position: 'absolute',
    marginLeft: 5,
    marginTop: 13,
  },
  configs: {
    width: 30,
    height: 30,
    position: 'absolute',
    marginTop: 11,
    alignSelf: 'flex-end',
  }
});

