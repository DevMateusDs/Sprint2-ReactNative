// src/screens/DetalheScreen.tsx
import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { Ionicons } from '@expo/vector-icons';

type Props = NativeStackScreenProps<RootStackParamList, 'Detalhe'>;

export function DetalheScreen({ route }: Props) {
  const { alerta } = route.params;

  return (
    <ScrollView style={styles.container}>
      {/* Simulação do Frame da Câmera (UX do Desafio de Visão Computacional) */}
      <View style={styles.boxImagem}>
        <Ionicons name="image-outline" size={48} color="#8E8E93" />
        <Text style={styles.boxImagemTexto}>[ FRAME DA VISÃO COMPUTACIONAL ]</Text>
        <Text style={styles.boxSubTexto}>A imagem com a Bounding Box aparecerá aqui após integração da API</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.categoria}>{alerta.categoria}</Text>
        
        <View style={styles.row}>
          <Ionicons name="videocam" size={18} color="#666" />
          <Text style={styles.detalheTexto}>Origem: {alerta.setorCamera}</Text>
        </View>

        <View style={styles.row}>
          <Ionicons name="time" size={18} color="#666" />
          <Text style={styles.detalheTexto}>Detecção: {alerta.dataHora}</Text>
        </View>

        <View style={styles.row}>
          <Ionicons name="alert-circle" size={18} color="#666" />
          <Text style={styles.detalheTexto}>Severidade: {alerta.gravidade.toUpperCase()}</Text>
        </View>

        {alerta.equipamentoFaltante && (
          <View style={[styles.row, styles.alertBox]}>
            <Ionicons name="shirt" size={18} color="#FF3B30" />
            <Text style={styles.alertBoxTexto}>EPI Ausente: {alerta.equipamentoFaltante}</Text>
          </View>
        )}

        <Text style={styles.tituloDescricao}>Descrição Completa:</Text>
        <Text style={styles.descricao}>{alerta.descricao}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  boxImagem: {
    height: 220,
    backgroundColor: '#E5E5EA',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  boxImagemTexto: { fontSize: 16, fontWeight: 'bold', color: '#8E8E93', marginTop: 10 },
  boxSubTexto: { fontSize: 12, color: '#AEAEB2', textAlign: 'center', marginTop: 4 },
  infoContainer: { padding: 20 },
  categoria: { fontSize: 24, fontWeight: 'bold', color: '#1C1C1E', marginBottom: 16 },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  detalheTexto: { fontSize: 16, color: '#3A3A3C', marginLeft: 10 },
  alertBox: { backgroundColor: '#FFD6D6', padding: 12, borderRadius: 8, marginTop: 8 },
  alertBoxTexto: { color: '#FF3B30', fontWeight: 'bold', marginLeft: 10, fontSize: 16 },
  tituloDescricao: { fontSize: 18, fontWeight: 'bold', color: '#1C1C1E', marginTop: 20, marginBottom: 8 },
  descricao: { fontSize: 16, color: '#48484A', lineHeight: 24 }
});