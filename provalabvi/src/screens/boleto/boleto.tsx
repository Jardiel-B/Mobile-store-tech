import React from 'react';
import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { NavegacaoPrincipalParams } from "../../navigations";
import {Cabecalho} from '../../components/cabecalho'

export interface ScreenProps {
    route: RouteProp<NavegacaoPrincipalParams, "boleto">
}

export function Boleto(props: ScreenProps) {

  const navigation = useNavigation();

  const validationSchema = Yup.object().shape({
    cpf: Yup.string()
      .transform((value) => (value ? value.replace(/\D/g, '') : ''))
      .matches(/^[0-9]+$/, 'Deve conter apenas números')
      .length(11, 'Deve ter 11 dígitos')
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
      forma: 'Boleto', 
      image: props.route.params.image, 
      rua: street, 
      cep: zipcode, 
      casa: house
    })
  };

  return (
    <ImageBackground style={styles.background}>

    <Cabecalho tela="Boleto"/>

    <TouchableOpacity onPress={() => { navigation.navigate('home')}}>
      <Text style={styles.btncancelar}>Cancelar</Text>
    </TouchableOpacity>

      <View style={styles.container}>

         <Text style={styles.texto}>Insira seu CPF (apenas números) para gerar o boleto{"\n"}</Text>

        <Formik
          initialValues={{ cpf: '', rua:'', cep:'', casa: ''}}
          validationSchema={validationSchema}
          onSubmit={handleCadastrar}
        >
          {({handleChange, handleBlur, handleSubmit, values, errors, touched,}) => (
            <View>
              <TextInput
                style={styles.input}
                placeholder="CPF"
                keyboardType="number-pad"
                onChangeText={handleChange('cpf')}
                onBlur={handleBlur('cpf')}
                value={values.cpf}
              />
              {errors.cpf && touched.cpf && (
                <Text style={styles.error}>{errors.cpf}</Text>
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10
  },
  btncancelar:{
    fontSize: 15, 
    alignItems: 'flex-start',
    marginLeft: 10,
    marginTop: 10,
    color: 'purple',
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

// values.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4'
