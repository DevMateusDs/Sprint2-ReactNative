import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { AlertaSeguranca } from '../types/Registro';
import { alertaService } from '../services/alertaService';

type Props = NativeStackScreenProps<RootStackParamList, 'Detalhe'>;

export function DetalheScreen({ route }: Props) {
  const { id } = route.params;
  const [alerta, setAlerta] = useState<AlertaSeguranca | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buscarDetalhe = async () => {
      try {
        const dados = await alertaService.buscarPorId(id);
        setAlerta(dados);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    buscarDetalhe();
  }, [id]);

  if (loading || !alerta) return <View style={styles.center}><ActivityIndicator size="large" color="#FF9500" /></View>;

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{alerta.categoria}</Text>
      <Text>Setor: {alerta.setorCamera}</Text>
      <Text>Status: {alerta.gravidade}</Text>
      <Text>Descrição: {alerta.descricao}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 }
});