import * as React from 'react';
import { Text, StyleSheet, KeyboardAvoidingView, TouchableOpacity, View, Alert } from 'react-native';
import { Input } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';
import {Cabecalho} from '../../components/cabecalho';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { getAuth, updateEmail, updatePassword } from '@firebase/auth';
import { doc, updateDoc, getDoc, getFirestore } from '@firebase/firestore';
import { useState, useEffect } from 'react';

type Usuario = {
  email: string,
  nome: string,
  senha: string,
  idade: number
}

export function Perfil() {

  const auth = getAuth(); 

  const db = getFirestore();

  const navigation = useNavigation();

  const [ resultado, setResultado ] = useState<null|'atualizado'|'invalido'>(null);
  
  const [usuario, setUsuario] = useState<Usuario>({ email: '', senha: '', idade: 0, nome: '' });

  useEffect(() => {
    if (auth.currentUser) {
      getDoc(doc(db, 'Usuarios', auth.currentUser.uid))
        .then((dados) => setUsuario(dados.data() as Usuario))
        .catch((error) => console.error(error));
    }
  }, []);

  const handleAtualizaCadastro = async({email, senha, idade, nome}:any) => {
    try{
      if(auth.currentUser){
        if(auth.currentUser?.email != email)
          await updateEmail(auth.currentUser, email);

        if(senha != '')
          await updatePassword(auth.currentUser, senha);

        
          updateDoc(doc(db, 'Usuarios', auth.currentUser.uid), {email, nome, idade})
        }
        Alert.alert('Sucesso', 'Dados atualizados')
      }
    catch(erro){
      Alert.alert('Erro', 'Não foi possível atualizar os dados')
    }
  }

  return (
      <View>
        
        <Cabecalho tela="Editar Perfil" />
        
        <KeyboardAvoidingView behavior='position'>
          <Formik
          initialValues={{email: usuario.email, senha: usuario.senha, idade: usuario.idade, nome: usuario.nome}}
          enableReinitialize
          validationSchema={Yup.object({
            email: Yup.string().required('O campo email é obrigatório')
            .email('O valor informado não é um email'),

            nome: Yup.string()
            .required('O campo nome é obrigatório')
            .max(250,'O campo nome pode te rno máximo 250 caracteres'),

            senha: Yup.string().min(6, 'A senha deve ter no míninmo 6  caracteres')
            .max(30, 'A senha pode ter no máximo 30 caracteres'),

            idade: Yup.number().required('O campo idade é obrigatório'),
          })}
          onSubmit={handleAtualizaCadastro}>
          {({values, errors, touched, handleBlur, handleChange, handleSubmit}) =>(
          <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 170}}>

            <Text style={styles.texto}>Atualizar{"\n"}</Text>

            <Input placeholder='Digite seu nome'
              inputContainerStyle={styles.containerInput}
              leftIcon={{name:'person', color:'purple'}} 
              inputStyle={{color: 'purple'}}
              onBlur={handleBlur('nome')} onChangeText={handleChange('nome')}
              value={values.nome}/>
              { errors.nome && touched.nome && <Text style={styles.erro}>{errors.nome}</Text>}

            <Input placeholder='Digite seu email'
              inputContainerStyle={styles.containerInput}
              leftIcon={{name:'email', color:'purple'}} 
              inputStyle={{color: 'purple'}}
              onBlur={handleBlur('email')} onChangeText={handleChange('email')}
              value={values.email}/>
              { errors.email && touched.email && <Text style={styles.erro}>{errors.email}</Text>}

            <Input placeholder='Digite sua idade'
              inputContainerStyle={styles.containerInput}
              leftIcon={{name:'cake', color:'purple'}} 
              inputStyle={{color: 'purple'}}
              onBlur={handleBlur('idade')} onChangeText={handleChange('idade')}
              value={values.idade.toString()}/>
              { errors.idade && touched.idade && <Text style={styles.erro}>{errors.idade}</Text>}

            <Input placeholder='Digite sua senha'
              leftIcon={{name:'lock', color:'purple'}}
              inputContainerStyle={styles.containerInput}
              inputStyle={{color: 'purple'}}
              secureTextEntry={true} 
              onBlur={handleBlur('senha')} onChangeText={handleChange('senha')}
              value={values.senha}/>
              { errors.senha && touched.senha && <Text style={styles.erro}>{errors.senha}</Text>}

            { resultado == 'atualizado' && <Text style={styles.sucesso}>Cadatrado com sucesso</Text>}
            { resultado == 'invalido' && <Text style={{fontSize: 20, color: 'red', textAlign: 'center'}}>Você esqueceu de preencher algum campo</Text>}


            <TouchableOpacity onPress={() => {handleSubmit()}}>
              <Text style={styles.entrar}>Atualizar</Text>
            </TouchableOpacity>
            
          </View>
          )}
        </Formik>
        </KeyboardAvoidingView>

    </View>
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
    color: 'purple',
    textAlign: 'center',
  },
  link: {
    fontSize: 13,
    color: 'purple',
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

