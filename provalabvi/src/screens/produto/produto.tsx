import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { useNavigation} from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { NavegacaoPrincipalParams } from "../../navigations";
import { StackNavigationProp } from '@react-navigation/stack';
import { Cabecalho } from '../../components/cabecalho'

export interface ScreenProps {
    route: RouteProp<NavegacaoPrincipalParams, "produto">
}

export function Produto(props: ScreenProps) {

  type navProp = StackNavigationProp<NavegacaoPrincipalParams, "produto">;
  const navigation = useNavigation<navProp>();

  return (
    <View style={{flex: 1}}>
      <Cabecalho tela="Produto"/>

      <View style={styles.container}>
          
        <View style={styles.itemContainer}>
          <Image style={styles.image} source={props.route.params.image}/>
	        <Text style={styles.texto}>{props.route.params.nome}</Text>
          <Text style={styles.texto}>Preço: {props.route.params.preco}</Text>
          <Text style={{textAlign: 'left', marginTop: 10, fontSize: 18, color: 'purple'}}> Descrição: </Text>
          <Text style={styles.descricao}> {props.route.params.descricao} </Text>

          <TouchableOpacity onPress={() => {
            navigation.navigate('pagamento', {preco: props.route.params.preco, image: props.route.params.image})
          }}>
          <Text style={styles.botao} >COMPRAR</Text>
          </TouchableOpacity>

        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  descricao: {
    textAlign: 'justify',
    justifyContent: 'center', 
    width: '100%', 
    marginTop: 10, 
    fontSize: 16, 
    color: 'purple',
    borderWidth: 1,
    borderColor: 'purple',
    borderRadius: 10,
    padding: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 5,
  },
  itemContainer: {
    width: '90%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-end',
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
  image: {
    width:250,
    height: 250,
    marginBottom: 10,
  },
});

