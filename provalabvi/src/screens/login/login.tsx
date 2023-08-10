import * as React from 'react';
import { useState } from 'react';
import { Text, StyleSheet, ImageBackground, TouchableOpacity, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { Input } from '@rneui/base';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { useNetInfo } from '@react-native-community/netinfo';
import { getAuth, signInWithEmailAndPassword } from '@firebase/auth';



export function Login() {
  const netInfo = useNetInfo();

  const auth = getAuth();

  const navigation = useNavigation();

  const [ resultado, setResultado ] = useState<null|'logado'|'recusado'>(null);

  const handleLogin = async ({email, senha}:any) => {
    if (netInfo.isConnected){
      await new Promise(resolve => setTimeout(resolve, 1000))
      signInWithEmailAndPassword(auth, email, senha)
      .then(usuario => {
        setResultado('logado')
        navigation.navigate('home')
      })
      .catch(erro => alert('Email ou senha incorreta'))
    }
    else{
      alert('Verifique sua conexão com a internet')
    }
  }
  return (
      <Formik
        initialValues={{email:'', senha: ''}}
        validationSchema={Yup.object({
          email: Yup.string().required('O campo email é obrigatório').email('O valor informado não é um email'),
          senha: Yup.string().required('O campo senha é obrigatório').min(6, 'A senha deve ter no míninmo 6  caracteres').max(30, 'A senha pode ter no máximo 30 caracteres')
        })}
        onSubmit={handleLogin}>
        {({errors, touched, handleBlur, handleChange, handleSubmit}) =>(
        <ImageBackground style={{flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%'}}  source={require('../../../assets/imgs/fundo.png')}>

          <Image style={styles.image} source={require('./../../../assets/imgs/logo.png')}/>

          <Text style={styles.texto}>Gold Tech{"\n"}</Text>

          <Input placeholder='Digite seu email'
            inputContainerStyle={styles.containerInput}
            leftIcon={{name:'email', color:'purple'}} 
            inputStyle={{color: 'purple'}}
            onBlur={handleBlur('email')} onChangeText={handleChange('email')}/>
            { errors.email && touched.email && <Text style={styles.erro}>{errors.email}</Text>}

          <Input placeholder='Digite sua senha'
            leftIcon={{name:'lock', color:'purple'}}
            inputContainerStyle={styles.containerInput}
            inputStyle={{color: 'purple'}}
            secureTextEntry={true} 
            onBlur={handleBlur('senha')} onChangeText={handleChange('senha')}/>
            { errors.senha && touched.senha && <Text style={styles.erro}>{errors.senha}</Text>}

          { resultado == 'logado' && <Text style={styles.sucesso}>Logado com sucesso</Text>}
          { resultado == 'recusado' && <Text style={{fontSize: 25, color: '#7FFFD4', textAlign: 'center'}}>Email ou senha incorreto</Text>}

          <TouchableOpacity onPress={() => { navigation.navigate('cadastro'); }}>
            <Text style={styles.link} >Não possui conta? Clique aqui para se cadastrar</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {handleSubmit()}}>
            <Text style={styles.entrar}>Entrar</Text>
          </TouchableOpacity>
          
        </ImageBackground>
        )}
      </Formik>
  );
}

const styles = StyleSheet.create({
  containerInput: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 5,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  texto: {
    fontSize: 60,
    color: 'white',
    textAlign: 'center',
  },
  link: {
    fontSize: 13,
    color: 'white',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  erro: {
    marginTop: -11,
    fontSize: 14,
    marginBottom: 5,
    color: 'white',
    textAlign: 'center',
  },
  sucesso: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
  image: {
    width:230,
    height: 230,
  },
  entrar: {
    marginTop: 20,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#1E90FF',
    color: 'white',
    fontSize: 18
  }
});

