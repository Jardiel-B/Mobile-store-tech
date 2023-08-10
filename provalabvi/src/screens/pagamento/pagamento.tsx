import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation} from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { Image } from 'expo-image';
import { NavegacaoPrincipalParams } from "../../navigations";
import {Cabecalho} from '../../components/cabecalho'

export interface ScreenProps {
    route: RouteProp<NavegacaoPrincipalParams, "pagamento">
}

export function Pagamento(props: ScreenProps) {

  const navigation = useNavigation();

  return (
    <View>

      <Cabecalho tela="Pagamento"/>

      <TouchableOpacity onPress={() => { navigation.navigate('home')}}>
          <Text style={styles.btncancelar}>Cancelar</Text>
      </TouchableOpacity>

      <View style={styles.container}>
        <View style={styles.itemContainer}>

          <Image style={styles.image} source={props.route.params.image}/>

          <Text style={styles.texto}>Preço: {(props.route.params.preco).toFixed(2)}</Text>
          <TouchableOpacity  onPress={() => {
            navigation.navigate('boleto', {preco: props.route.params.preco, image: props.route.params.image})
          }}>
          <Text style={styles.botao}>BOLETO</Text>
          </TouchableOpacity>

          <Text style={styles.texto}>Preço: 10 x {(props.route.params.preco/10).toFixed(2)}</Text>
          <TouchableOpacity onPress={() => {
            navigation.navigate('cartao', {preco: (props.route.params.preco/10), image: props.route.params.image})
          }}>
          <Text style={styles.botao} >CARTÃO DE CRÉDITO</Text>
          </TouchableOpacity>
        </View>          
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 180,
  },
  itemContainer: {
    width: '90%',
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 10,
    padding: 9,
  },
  texto: {
    fontSize: 20,
    textAlign: 'center',
    color: 'purple'
  },
  botao:{
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10, 
    padding: 10, 
    alignItems: 'center',
    backgroundColor: 'purple',
    color: 'white',
  },
  btncancelar:{
    fontSize: 15, 
    alignItems: 'flex-start',
    marginLeft: 10,
    marginTop: 10,
    color: 'purple',
  },
  image: {
    width:250,
    height: 250,
    marginBottom: 10,
  },
});

