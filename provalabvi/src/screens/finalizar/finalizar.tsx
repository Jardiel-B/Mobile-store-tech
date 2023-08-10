import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { RouteProp } from '@react-navigation/native';
import { NavegacaoPrincipalParams } from "../../navigations";
import { Cabecalho } from '../../components/cabecalho';
import { getDocs, collection, getFirestore, addDoc, where, query, serverTimestamp, DocumentData } from '@firebase/firestore';
import { getAuth } from '@firebase/auth';
import { format } from 'date-fns';

export interface ScreenProps {
  route: RouteProp<NavegacaoPrincipalParams, "finalizar">
}

export function Finalizar(props: ScreenProps) {

  const currentDate = new Date();

  const data = format(currentDate, 'dd-MM-yyyy'); 
  const horas = format(currentDate, 'HH:mm:ss');
  
  const navigation = useNavigation();
  
  const image  = props.route.params.image;
  const forma  = props.route.params.forma;
  const preco  = props.route.params.preco;

  const auth = getAuth(); 

  const db = getFirestore();

  const [produto, setProduto] = useState();

      useEffect(() => {
        const fetchDocumentId = async () => {
          const q = query(collection(db, 'Produtos'), where('imagem', '==', image));
          const documentos = await getDocs(q);

          const documento = documentos.docs[0];
          const dados = documento.data();
          const nome = dados.nome;
    
          setProduto(nome)
        };
    
        fetchDocumentId();
      }, []);

  return (
    <View style={styles.background}>

      <Cabecalho tela="Finalizar" />

      <TouchableOpacity onPress={() => { 
        navigation.navigate('home')}}>
        <Text style={styles.btncancelar}>Cancelar</Text>
      </TouchableOpacity>

      <View style={styles.container}>
          
        <View style={styles.itemContainer}>
          <Image style={styles.image} source={props.route.params.image}/>
          {props.route.params.forma =='Boleto' ? <Text style={styles.texto}>Preço: {(props.route.params.preco).toFixed(2)}</Text> :
          <Text style={styles.texto}>Preço: 10 x {(props.route.params.preco).toFixed(2)}</Text>}
          <Text style={styles.texto}>Forma de pagamento: {props.route.params.forma}</Text>
          <Text style={styles.texto}>Rua: {props.route.params.rua}</Text>
          <Text style={styles.texto}>Cep: {props.route.params.cep}</Text>
          <Text style={styles.texto}>N. da casa: {props.route.params.casa}</Text>

          <TouchableOpacity onPress={() => {
            addDoc(collection(db, 'Compras'),{
              idUsuario: auth.currentUser?.uid,
              produto: produto,
              formaDePagamento: forma,
              valor: preco,
              data: data,
              hora: horas
            });
            navigation.navigate('agradecimento')
          }}>
          <Text style={styles.btnfinalizar} >Finalizar Compra</Text>
          </TouchableOpacity>

        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  background: {
    height: '100%',
    width: '100%',
    flex: 1
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
    color: 'purple',
  },
  btnfinalizar:{
    marginTop: 10,
    marginBottom: 5,
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

