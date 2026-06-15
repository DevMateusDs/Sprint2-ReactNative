// src/components/AlertaCard.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AlertaSeguranca } from '../types/Registro';

type Props = {
  alerta: AlertaSeguranca;
  onPress: () => void; 
};

export function AlertaCard({ alerta, onPress }: Props) {
  
  const getCorGravidade = (gravidade: string) => {
    switch (gravidade) {
      case 'critico': return '#FF3B30'; // Vermelho (Urgência máxima)
      case 'alerta': return '#FF9500';  // Laranja/Amarelo (Atenção)
      case 'observacao': return '#34C759'; // Verde (Monitoramento leve)
      default: return '#8E8E93'; // Cinza padrão
    }
  };

  const corDestaque = getCorGravidade(alerta.gravidade);

  return (
    <TouchableOpacity 
      style={[styles.card, { borderLeftColor: corDestaque }]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <Text style={styles.categoria}>{alerta.categoria}</Text>
        {}
        {alerta.resolvido ? (
          <Ionicons name="checkmark-circle" size={20} color="#34C759" />
        ) : (
          <Ionicons name="warning" size={20} color={corDestaque} />
        )}
      </View>

      <Text style={styles.local}>
        <Ionicons name="videocam-outline" size={14} color="#666" /> {alerta.setorCamera}
      </Text>

      <View style={styles.footer}>
        <Text style={styles.statusTexto}>
          Status: <Text style={{ color: corDestaque, fontWeight: 'bold' }}>{alerta.gravidade.toUpperCase()}</Text>
        </Text>
        <Text style={styles.dataHora}>{alerta.dataHora}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderLeftWidth: 6, // Cria a barra colorida na lateral esquerda do card
    // Sombras para Android
    elevation: 3, 
    // Sombras para iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoria: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1C1C1E',
  },
  local: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: '#F2F2F7',
    paddingTop: 8,
  },
  statusTexto: {
    fontSize: 12,
    color: '#8E8E93',
  },
  dataHora: {
    fontSize: 12,
    color: '#8E8E93',
  }
});