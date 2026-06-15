import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ListaScreen } from './src/screens/ListaScreen';
import { DetalheScreen } from './src/screens/DetalheScreen';
import { CadastroScreen } from './src/screens/CadastroScreen';
import { AlertaSeguranca } from './src/types/Registro';
import { alertasIniciais } from './src/data/mock';

export type RootStackParamList = {
  Lista: undefined;
  Detalhe: { alerta: AlertaSeguranca };
  Cadastro: { setAlertas: React.Dispatch<React.SetStateAction<AlertaSeguranca[]>> };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [alertas, setAlertas] = useState<AlertaSeguranca[]>(alertasIniciais);

  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Lista"
        screenOptions={{
          headerStyle: { backgroundColor: '#1C1C1E' },
          headerTintColor: '#FFF',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen name="Lista" options={{ title: 'Painel de Riscos' }}>
          {(props) => <ListaScreen {...props} alertas={alertas} />}
        </Stack.Screen>
        
        <Stack.Screen name="Detalhe" component={DetalheScreen} options={{ title: 'Detalhes do Incidente' }} />
        
        <Stack.Screen name="Cadastro" component={CadastroScreen} options={{ title: 'Relatar Risco Manual' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}