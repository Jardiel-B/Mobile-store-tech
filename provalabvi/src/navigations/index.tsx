import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Pagina1 } from './../screens/pagina1/index';
import { Cadastro } from './../screens/cadastro/cadastro';
import { Login } from './../screens/login/login';
import { Home } from './../screens/home/home';
import { Produto } from './../screens/produto/produto';
import { Pagamento } from './../screens/pagamento/pagamento';
import { Finalizar } from './../screens/finalizar/finalizar';
import { Agradecimento } from './../screens/agradecimento/agradecimento';
import { Configuracao } from './../screens/configuracao/configuracao';
import { Perfil } from './../screens/perfil/perfil';
import { Cartao } from '../screens/cartao/cartao';
import { Boleto } from '../screens/boleto/boleto'
import { Categoria } from '../screens/categoria/categoria';
import { Compras } from '../screens/compras/compras';

export type NavegacaoPrincipalProps = {
  finalizar: {preco: number, image: string, forma: string, nome: string, rua: string, cep: string, casa: string}
  produto: {image: string, nome: string, descricao: string, preco: number}
  pagamento: {preco: number, image: string}
  cartao: {preco: number, image: string}
  boleto: {preco: number, image: string}
  categoria: {categoria: string}
  home: undefined
  compras: undefined
  login: undefined
  cadastro: undefined
  configuracao: undefined
}

const Stack = createStackNavigator<NavegacaoPrincipalProps>();

export function Navegacao() {
  return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown:false}}>
          <Stack.Screen component={Login} name="login" />
          <Stack.Screen component={Home} name="home" />
          <Stack.Screen component={Compras} name="compras" />
          <Stack.Screen component={Pagina1} name="tela1" />
          <Stack.Screen component={Cadastro} name="cadastro" />
          <Stack.Screen component={Configuracao} name="configuracao" />
          <Stack.Screen component={Produto} name="produto" />
          <Stack.Screen component={Pagamento} name="pagamento" />
          <Stack.Screen component={Boleto} name="boleto" />
          <Stack.Screen component={Cartao} name="cartao" />
          <Stack.Screen component={Finalizar} name="finalizar" />
          <Stack.Screen component={Agradecimento} name="agradecimento" />
          <Stack.Screen component={Perfil} name="perfil" />
          <Stack.Screen component={Categoria} name="categoria" />
        </Stack.Navigator>
      </NavigationContainer>
  );
}


