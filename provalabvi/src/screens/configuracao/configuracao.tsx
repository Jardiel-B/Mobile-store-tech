import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {Cabecalho} from '../../components/cabecalho'
import { getAuth } from '@firebase/auth';
export function Configuracao() {

  const navigation = useNavigation();

  const auth = getAuth()

  return (
  <View style={styles.background}>

    <Cabecalho tela="Configurações"/>

    <TouchableOpacity style={{flexDirection: 'row', marginTop: 10}} onPress = {() => {navigation.navigate('perfil')}}>
      <Image style={styles.image} source={require('./../../../assets/imgs/perfil1.png')}/>
      <Text style={styles.texto}>Editar perfil</Text>
    </TouchableOpacity>

    <TouchableOpacity style={{flexDirection: 'row'}} onPress = {() => {navigation.navigate('compras')}}>
      <Image style={styles.image} source={require('./../../../assets/imgs/compras1.png')}/>
      <Text style={styles.texto}>Minhas compras</Text>
    </TouchableOpacity>

    <TouchableOpacity style={{flexDirection: 'row'}} onPress = {() => {
      auth.signOut()
      navigation.reset({index: 0, routes: [{name: 'login'}]})
    }}>
      <Image style={styles.image} source={require('./../../../assets/imgs/sair1.png')}/>
      <Text style={styles.texto}>Logout</Text> 
    </TouchableOpacity>

  </View>
      );
}

const styles = StyleSheet.create({
  editar: {
    fontSize: 30,
    textAlign: 'left',
    color: 'white',
    marginTop: 7,
  },
  minhas: {
    fontSize: 30,
    textAlign: 'left',
    color: 'white',
    marginTop: 4.5,
  },
  logout: {
    fontSize: 30,
    textAlign: 'left',
    marginTop: 0.5,
    color: 'white',
  },
  texto : {
    marginTop: 15.5,
    fontSize: 30,
    textAlign: 'left',
    color: 'purple',
  },
  background: {
    width: '100%',
    heigth: '100%',
    flex: 1,
  },
  image: {
    width: 40,
    marginTop: 12,
    height: 40,
    marginRight: 7,
    marginLeft: 7,
  },
  perfil: {
    width: 30,
    marginTop: 12,
    height: 30,
    marginRight: 7,
    marginLeft: 7,
  },
  compras: {
    marginTop: 4,
    width: 37,
    height: 37,
    marginLeft: 3.5,
    marginRight: 3.3,
  },
  sair: {
    width: 42,
    height: 42,
    marginRight: 2.5,
  },
});
