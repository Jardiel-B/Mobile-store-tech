import * as React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { Cabecalho } from '../../components/cabecalho';
import { collection, getDocs, query, where, getFirestore, DocumentData } from '@firebase/firestore';
import { getAuth } from '@firebase/auth';



export function Compras() {

  const navigation = useNavigation();

  const auth = getAuth();
  
  let db = getFirestore();

  const [compras, setCompras] = useState<DocumentData[]>([]);
  
    useEffect(() => {

        const fetchData = async () => {
          try {
            const q = query(collection(db, 'Compras'), where('idUsuario', '==', auth.currentUser?.uid));
            
            const querySnapshot = await getDocs(q)

            const documentos: DocumentData[] = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...(doc.data() as DocumentData),
            }));
      
            setCompras(documentos);
          } catch(error) {
            console.error(error)
          }
        };
      
          fetchData();
    }, [])

  return (
  <View style={styles.background}>

    <Cabecalho tela="Minhas Compras"/>

    <FlatList
      style={styles.flatlist}
      data={compras}
      renderItem={({item}:DocumentData) => (
      <View style={styles.container}>
        <View style={styles.itemContainer}>
                <Text style={styles.texto}>Produto: {item.produto}</Text>
                <Text style={styles.texto}>Forma de Pagamento: {item.formaDePagamento}</Text>
                {item.formaDePagamento == 'Boleto' ? <Text style={styles.texto}>Valor: {(item.valor).toFixed(2)}</Text> :
                <Text style={styles.texto}>Valor: 10 x {(item.valor).toFixed(2)}</Text>}
                <Text style={styles.texto}>Dia: {item.data}</Text>
                <Text style={styles.texto}>Hora: {item.hora}</Text>
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
    padding: 9,
    flexDirection: 'column'
  },
  texto: {
    fontSize: 25,
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
});

