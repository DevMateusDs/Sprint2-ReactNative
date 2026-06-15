
import React from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { AlertaSeguranca } from '../types/Registro';
import { AlertaCard } from '../components/AlertaCard';
import { Ionicons } from '@expo/vector-icons';

type Props = NativeStackScreenProps<RootStackParamList, 'Lista'> & {
  alertas: AlertaSeguranca[];
};

export function ListaScreen({ navigation, alertas }: Props) {
  return (
    <View style={styles.container}>
      <FlatList
        data={alertas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <AlertaCard
            alerta={item}
            onPress={() => navigation.navigate('Detalhe', { alerta: item })}
          />
        )}
        contentContainerStyle={styles.listContent}
      />

      {/* Botão Flutuante para Relato Manual */}
      <TouchableOpacity 
        style={styles.fab}
        onPress={() => navigation.navigate('Cadastro', { setAlertas: navigation.getParent() ? () => {} : undefined as any })}
      >
        <Ionicons name="add" size={24} color="#FFF" />
        <Text style={styles.fabText}>Relatar Risco</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F2F7' },
  listContent: { paddingBottom: 100 },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: '#FF9500',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 4 },
  },
  fabText: { color: '#FFF', fontWeight: 'bold', marginLeft: 8 }
});