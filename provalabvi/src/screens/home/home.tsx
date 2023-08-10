import * as React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import { Image } from 'expo-image';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { NavegacaoPrincipalParams } from "../../navigations";
import { useState, useEffect } from 'react';
import { Cabecalho } from '../../components/cabecalho';
import { collection, getDocs, getFirestore, DocumentData } from '@firebase/firestore';


export function Home(props:any) {

  type navProp = StackNavigationProp<NavegacaoPrincipalParams, "home">;
  const navigation = useNavigation<navProp>();
  
  let db = getFirestore();

  const [produtos, setProdutos] = useState<DocumentData[]>([]);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Produtos'));
          
        const documents: DocumentData[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as DocumentData),
        }));
  
        setProdutos(documents);
      } catch(error) {
        console.error(error)
      }
    };
  
      fetchData();
}, [])

  return (
  <View style={styles.background}>

    <Cabecalho tela="Home"/>

  <View style={{flexDirection: 'row', marginTop: 15, justifyContent: 'space-evenly'}}>
    <View style={styles.itemCategorias}>
      <TouchableOpacity onPress={() => {navigation.navigate('categoria', {categoria: 'Consoles'});}}>
        <Image style={styles.categorias} source={require("../../../assets/imgs/consoles.png")}/>
      </TouchableOpacity>
      <Text style={styles.texto}>Consoles</Text>
    </View>
    
    <View style={styles.itemCategorias}>
      <TouchableOpacity onPress={() => {navigation.navigate('categoria', {categoria: 'Acessórios'});}}>
        <Image style={styles.categorias} source={require('../../../assets/imgs/acessorios.png')}/>
      </TouchableOpacity>
      <Text style={styles.texto}>Acessorios</Text>
    </View>
    
    <View style={styles.itemCategorias}>
      <TouchableOpacity onPress={() => {navigation.navigate('categoria', {categoria: 'Periféricos'});}}>
        <Image style={styles.categorias} source={require('../../../assets/imgs/teclado.png')}/>
        <Text style={styles.texto}>Periféricos</Text>
      </TouchableOpacity>
    </View>
  </View>


    <FlatList
      style={styles.flatlist}
      data={produtos}
      renderItem={({item}:DocumentData) => (
      <View style={styles.container}>
        <View style={styles.itemContainer}>
          <Image style={styles.image} source={item.imagem}/>
	        <Text key={item.index} style={styles.texto}>{item.nome}</Text>
          <Text key={item.index} style={styles.texto}>Preço: {item.preco}</Text>
          <Text key={item.index} style={styles.texto}>Categoria: {item.categoria}</Text>

          <TouchableOpacity onPress={() => {
            navigation.navigate('produto', {image: item.imagem, nome: item.nome, descricao: item.descricao, preco: item.preco});
          }}>
          <Text style={styles.botao} >COMPRAR</Text>
          </TouchableOpacity>

        </View>
      </View>
        )} 
        />
  </View>
      );
}

const styles = StyleSheet.create({
  botao:{
    marginTop: 7,
    marginBottom: 10,
    borderRadius: 10, 
    padding: 10, 
    alignItems: 'center',
    backgroundColor: 'purple',
    color: 'white',
  },
  flatlist:{
    marginTop: 20,
    marginBottom: 190
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10
  },
  itemContainer: {
    flex: 1,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 9
  },
  texto: {
    fontSize: 15,
    textAlign: 'center',
    color: 'purple'
  },
  background: {
    width: '100%',
    heigth: '100%',
  },
  itemCategorias: {
    flexDirection: 'column',
    justifyContent: 'center'
  },
  categorias: {
    width:50,
    height: 50,
    borderRadius: 25,
    borderColor: 'purple',
    borderWidth: 2,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10
  },
  image: {
    width:300,
    height: 300,
    marginBottom: 10,
  },
});

