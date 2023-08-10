import { StyleSheet, Text, View, Image, FlatList, ImageBackground, TouchableOpacity, Button } from 'react-native';
import { useNavigation} from '@react-navigation/native';

export function Agradecimento() {

  const navigation = useNavigation();

  return (
      <View style={styles.container}>

          <Text style={styles.texto}>Agradecemos pela preferência de comprar em nossa loja, aproveite para adquirir mais itens do nosso catálogo navegue por nosso app e escolha o que melhor atende às suas necessidades e desejos
          </Text>

          <TouchableOpacity onPress={() => {
            navigation.navigate('home')
          }}>
          <Text style={styles.botao} >Voltar às compras</Text>
          </TouchableOpacity>

      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 5,
  },
  texto: {
    fontSize: 20,
    textAlign: 'center',
    color: 'purple',
    backgroundColor: 'white',
    padding: 10,
    width: '90%',
    borderRadius: 10,
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
});

