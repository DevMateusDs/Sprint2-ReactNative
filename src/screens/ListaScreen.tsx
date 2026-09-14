import React, { useState, useCallback } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { AlertaSeguranca } from '../types/Registro';
import { AlertaCard } from '../components/AlertaCard';
import { alertaService } from '../services/alertaService';
import { Ionicons } from '@expo/vector-icons';

type Props = NativeStackScreenProps<RootStackParamList, 'Lista'>;

export function ListaScreen({ navigation }: Props) {
  const [alertas, setAlertas] = useState<AlertaSeguranca[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useFocusEffect(
    useCallback(() => {
      carregarDados();
    }, [])
  );

  const carregarDados = async () => {
    try {
      setLoading(true);
      setError(false);
      const dados = await alertaService.listar();
      setAlertas(dados);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" color="#FF9500" /></View>;

  if (error) {
    return (
      <View style={styles.center}>
        <Ionicons name="cloud-offline" size={64} color="#FF3B30" />
        <Text style={styles.errorText}>Backend indisponível.</Text>
        <TouchableOpacity style={styles.retryBtn} onPress={carregarDados}>
          <Text style={styles.retryText}>Tentar Novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={alertas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <AlertaCard alerta={item} onPress={() => navigation.navigate('Detalhe', { id: item.id })} />
        )}
      />
      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('Cadastro')}>
        <Ionicons name="add" size={24} color="#FFF" />
        <Text style={styles.fabText}>Relatar Risco</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F2F7' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { fontSize: 18, color: '#FF3B30', marginTop: 10 },
  retryBtn: { marginTop: 20, padding: 12, backgroundColor: '#FF9500', borderRadius: 8 },
  retryText: { color: '#FFF', fontWeight: 'bold' },
  fab: { position: 'absolute', bottom: 24, right: 24, backgroundColor: '#FF9500', flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 30 }
});