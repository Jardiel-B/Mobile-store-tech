import * as React from 'react';
import { useState } from 'react';
import { Text, StyleSheet, ImageBackground, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { Input } from '@rneui/base';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { getAuth, createUserWithEmailAndPassword } from '@firebase/auth';
import { doc, setDoc, getFirestore } from '@firebase/firestore';


export function Cadastro() {
  const auth = getAuth(); 

  const db = getFirestore();

  const navigation = useNavigation();

  const [ resultado, setResultado ] = useState<null|'Cadastrado'|'Cadastro inválido'>(null);

  const handleCadastro = async ({nome, email, idade, senha}:any) => {
    if (idade.trim() != null && nome.trim() && email.trim() != null && senha.trim() != null) {
      await createUserWithEmailAndPassword(auth, email, senha)
            .then((usuario) => {
            setDoc(doc(db, 'Usuarios', usuario.user.uid),{
              email, nome, idade
            })
            navigation.goBack();
            Alert.alert('Sucesso', 'Usuário cadastrado');
            setResultado('Cadastrado')

    })
            .catch(erro => Alert.alert('Erro', 'Não foi possivel criar o usuário, tente novamente'))
    }
    else
      setResultado('Cadastro inválido')
  }

  return (
      <Formik
        initialValues={{email:'', senha: '', idade: '', nome: ''}}
        validationSchema={Yup.object({
          idade: Yup.number().required('O campo idade é obrigatório'),
          
          nome: Yup.string()
          .required('O campo nome é obrigatório')
          .max(250,'O campo nome pode te rno máximo 250 caracteres'),

          email: Yup.string().required('O campo email é obrigatório')
          .email('O valor informado não é um email'),

          senha: Yup.string().required('O campo senha é obrigatório')
          .min(6, 'A senha deve ter no míninmo 6  caracteres')
          .max(30, 'A senha pode ter no máximo 30 caracteres')
        })}
        onSubmit={handleCadastro}>
        {({errors, touched, handleBlur, handleChange, handleSubmit, isSubmitting}:any) =>(
        <ImageBackground style={{flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%'}}  source={require('../../../assets/imgs/fundo.png')}>

          <Text style={styles.texto}>Gold Tech{"\n"}</Text>

          <Text style={{fontSize: 40, color: 'white'}}>Cadastro</Text>

          <Input placeholder='Digite seu nome'
            inputContainerStyle={styles.containerInput}
            leftIcon={{name:'person', color:'purple'}} 
            inputStyle={{color: 'purple'}}
            onBlur={handleBlur('nome')} onChangeText={handleChange('nome')}/>
            { errors.nome && touched.nome && <Text style={styles.erro}>{errors.nome}</Text>}

          <Input placeholder='Digite seu email'
            inputContainerStyle={styles.containerInput}
            leftIcon={{name:'email', color:'purple'}} 
            inputStyle={{color: 'purple'}}
            onBlur={handleBlur('email')} onChangeText={handleChange('email')}/>
            { errors.email && touched.email && <Text style={styles.erro}>{errors.email}</Text>}

          <Input placeholder='Digite sua idade'
            inputContainerStyle={styles.containerInput}
            leftIcon={{name:'cake', color:'purple'}} 
            inputStyle={{color: 'purple'}}
            onBlur={handleBlur('idade')} onChangeText={handleChange('idade')}/>
            { errors.idade && touched.idade && <Text style={styles.erro}>{errors.idade}</Text>}

          <Input placeholder='Digite sua senha'
            leftIcon={{name:'lock', color:'purple'}}
            inputContainerStyle={styles.containerInput}
            inputStyle={{color: 'purple'}}
            secureTextEntry={true} 
            onBlur={handleBlur('senha')} onChangeText={handleChange('senha')}/>
            { errors.senha && touched.senha && <Text style={styles.erro}>{errors.senha}</Text>}

          { resultado == 'cadastrado' && <Text style={styles.sucesso}>Cadatrado com sucesso</Text>}
          { resultado == 'cadastro inválido' && <Text style={{fontSize: 20, color: 'red', textAlign: 'center'}}>Você esqueceu de preencher algum campo</Text>}
          
          <TouchableOpacity onPress={() => { navigation.navigate('login'); }}>
          <Text style={styles.link} >Já possui conta? Clique aqui para entrar</Text>
          </TouchableOpacity>


          <TouchableOpacity onPress={() => {handleSubmit()}}>
            <Text style={styles.entrar}>Cadastrar</Text>
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
  },
  entrar: {
    marginTop: 10,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#1E90FF',
    color: 'white',
    fontSize: 18
  },
  texto: {
    fontSize: 70,
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
    marginTop: -9,
    fontSize: 14,
    marginBottom: 5,
    color: 'white',
    textAlign: 'center',
  },
  sucesso: {
    fontSize: 20,
    color: '#ADFF2F',
    textAlign: 'center',
  }
});

