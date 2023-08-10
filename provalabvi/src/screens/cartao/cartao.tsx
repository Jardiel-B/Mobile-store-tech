import React from 'react';
import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { NavegacaoPrincipalParams } from "../../navigations";
import { StackNavigationProp } from '@react-navigation/stack';
import { Cabecalho } from '../../components/cabecalho'

export interface ScreenProps {
    route: RouteProp<NavegacaoPrincipalParams, "cartao">
}

export function Cartao(props: ScreenProps) {

  type navProp = StackNavigationProp<NavegacaoPrincipalParams, "cartao">;
  const navigation = useNavigation<navProp>();

  const validationSchema = Yup.object().shape({
    numero: Yup.string()
      .matches(/^[0-9]+$/, 'Deve conter apenas números')
      .required('Campo obrigatório')
      .min(16, 'Deve ter pelo menos 16 dígitos')
      .max(16, 'Deve ter no máximo 16 dígitos'),

    vencimento: Yup.string()
      .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Deve estar no formato MM/AA')
      .required('Campo obrigatório'),

    cvv: Yup.string()
      .matches(/^[0-9]+$/, 'Deve conter apenas números')
      .min(3, 'Deve ter pelo menos 3 dígitos')
      .max(4, 'Deve ter no máximo 4 dígitos')
      .required('Campo obrigatório'),

    rua: Yup.string().required('Este campo é obrigatório')
      .min(5)
      .max(200),

    cep: Yup.string()
      .matches(/^\d{5}-\d{3}$/, 'CEP inválido')
      .required('Este campo é obrigatório'),

    casa: Yup.string().matches(/^[0-9]+$/, 'Deve conter apenas números')
      .required('Este campo é obrigatório')
  });

  const [street, setStreet] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [house, setHouse] = useState('');

  const handleCadastrar = () => {
    navigation.navigate('finalizar', 
    { preco: ((props.route.params.preco)), 
      forma: 'Cartão', 
      image: props.route.params.image, 
      rua: street, 
      cep: zipcode, 
      casa: house
    })
  };

  return (
    <ImageBackground style={styles.background}>

      <Cabecalho tela="Cartão"/>

      <TouchableOpacity onPress={() => { navigation.navigate('home')}}>
        <Text style={styles.btncancelar}>Cancelar</Text>
      </TouchableOpacity>

      <View style={styles.container}>

        <Text style={styles.texto}>Insira os dados do cartão</Text>

        <Formik
          initialValues={{ numero: '', vencimento: '', cvv: '', rua:'', cep:'', casa: ''}}
          validationSchema={validationSchema}
          onSubmit={handleCadastrar}
        >
          {({handleChange, handleBlur, handleSubmit, values, errors, touched,}) => (
            <View>
              <TextInput
                style={styles.input}
                placeholder="Número do cartão"
                keyboardType="number-pad"
                onChangeText={handleChange('numero')}
                onBlur={handleBlur('numero')}
                value={values.numero}
              />
              {errors.numero && touched.numero && (
                <Text style={styles.error}>{errors.numero}</Text>
              )}

              <TextInput
                style={styles.input}
                placeholder="Vencimento (MM/AA)"
                onChangeText={handleChange('vencimento')}
                onBlur={handleBlur('vencimento')}
                value={values.vencimento}
              />
              {errors.vencimento && touched.vencimento && (
                <Text style={styles.error}>{errors.vencimento}</Text>
              )}

              <TextInput
                style={styles.input}
                placeholder="CVV"
                keyboardType="number-pad"
                onChangeText={handleChange('cvv')}
                onBlur={handleBlur('cvv')}
                value={values.cvv}
              />
              {errors.cvv && touched.cvv && (
                <Text style={styles.error}>{errors.cvv}</Text>
              )}

              <Text style={styles.texto}>Insira o Endereço de entrega</Text>

              <TextInput
                style={styles.input}
                placeholder="Rua"
                onChangeText={handleChange('rua')}
                onBlur={handleBlur('rua')}
                value={values.rua}
              />
              {touched.rua && errors.rua && <Text style={styles.error}>{errors.rua}</Text>}

              <TextInput
                style={styles.input}
                placeholder="CEP"
                onChangeText={handleChange('cep')}
                onBlur={handleBlur('cep')}
                value={values.cep}
                keyboardType="numeric"
              />
              {touched.cep && errors.cep && (
                <Text style={styles.error}>{errors.cep}</Text>
              )}

              <TextInput
                style={styles.input}
                placeholder="Número da casa"
                onChangeText={handleChange('casa')}
                onBlur={handleBlur('casa')}
                value={values.casa}
                keyboardType="numeric"
              />
              {touched.casa && errors.casa && (
                <Text style={styles.error}>{errors.casa}</Text>
              )}


              <TouchableOpacity onPress={() =>{ 
                setStreet(values.rua)
                setZipcode(values.cep)
                setHouse(values.casa)
                handleSubmit()
                }}>
                <Text style={styles.botao} >Confirmar</Text>
              </TouchableOpacity>
              </View>
          )}
        </Formik>
        </View>
      </ImageBackground>
  );
}


const styles = StyleSheet.create({
  background: {
    width: '100%',
    heigth: '100%',
    flex: 1,
  },
  btncancelar:{
    fontSize: 15, 
    alignItems: 'flex-start',
    marginLeft: 10,
    marginTop: 10,
    color: 'purple',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 10,
    marginTop: 5,
    marginBottom: 5,
    width: 385
  },
  error: {
    color: 'red',
    marginBottom: 5,
    textAlign: 'center',
    fontSize: 16
  },
  botao: {
    marginTop: 5,
    borderRadius: 10, 
    padding: 10, 
    backgroundColor: 'purple',
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    alignItems: 'center',
  },
  texto: {
    fontSize: 23,
    marginTop: 5,
    marginBottom: 10,
    color: 'purple',
    textAlign: 'center',
  },
});
