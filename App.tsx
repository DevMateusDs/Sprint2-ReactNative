import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ListaScreen } from './src/screens/ListaScreen';
import { DetalheScreen } from './src/screens/DetalheScreen';
import { CadastroScreen } from './src/screens/CadastroScreen';

export type RootStackParamList = {
  Lista: undefined;
  Detalhe: { id: number }; 
  Cadastro: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#1C1C1E' }, headerTintColor: '#FFF' }}>
        <Stack.Screen name="Lista" component={ListaScreen} options={{ title: 'Painel de Riscos' }} />
        <Stack.Screen name="Detalhe" component={DetalheScreen} options={{ title: 'Detalhes do Incidente' }} />
        <Stack.Screen name="Cadastro" component={CadastroScreen} options={{ title: 'Relatar Risco Manual' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}