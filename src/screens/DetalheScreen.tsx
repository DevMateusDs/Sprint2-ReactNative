import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, TouchableOpacity, Alert, Platform } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { AlertaSeguranca } from '../types/Registro';
import { alertaService } from '../services/alertaService';
import { Ionicons } from '@expo/vector-icons';

type Props = NativeStackScreenProps<RootStackParamList, 'Detalhe'>;

export function DetalheScreen({ route, navigation }: Props) {
  const { id } = route.params;
  const [alerta, setAlerta] = useState<AlertaSeguranca | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const buscarDetalhe = async () => {
      try {
        const dados = await alertaService.buscarPorId(id);
        setAlerta(dados);
      } catch (err) {
        Alert.alert("Erro", "Não foi possível carregar os detalhes.");
      } finally {
        setLoading(false);
      }
    };
    buscarDetalhe();
  }, [id]);

  const confirmarExclusao = () => {
    console.log("Botão excluir acionado para o ID:", id);

    // Se estiver rodando no navegador web, usa o confirm nativo do browser
    if (Platform.OS === 'web') {
      const resp = window.confirm("Tem certeza que deseja remover este alerta do sistema?");
      if (resp) {
        excluirAlerta();
      }
      return;
    }

    // Padrão para aplicativo mobile (Android/iOS)
    Alert.alert(
      "Excluir Registro",
      "Tem certeza que deseja remover este alerta do sistema?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Excluir", style: "destructive", onPress: excluirAlerta }
      ]
    );
  };

  const excluirAlerta = async () => {
    try {
      setDeleting(true);
      await alertaService.deletar(id);
      navigation.goBack();
    } catch (err) {
      Alert.alert("Erro", "Falha ao excluir o registro no servidor.");
      setDeleting(false);
    }
  };

  if (loading || !alerta) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#FF9500" />
      </View>
    );
  }

  const perigoStr = alerta.nivelPerigo ? alerta.nivelPerigo.toLowerCase() : '';
  const corDestaque = perigoStr === 'critico' ? '#FF3B30' : perigoStr === 'alerta' ? '#FF9500' : '#34C759';

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.headerRow}>
          <Ionicons name="alert-circle" size={32} color={corDestaque} />
          <View style={styles.headerTextContainer}>
            <Text style={styles.tipoRisco}>{alerta.tipoRisco}</Text>
            <Text style={[styles.nivelBadge, { color: corDestaque }]}>
              {alerta.nivelPerigo ? alerta.nivelPerigo.toUpperCase() : 'REGULAR'}
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <Ionicons name="location-outline" size={20} color="#6E6E73" />
          <Text style={styles.label}>Local:</Text>
          <Text style={styles.valor}>{alerta.localizacao || 'Não especificado'}</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="document-text-outline" size={20} color="#6E6E73" />
          <Text style={styles.label}>Descrição:</Text>
        </View>
        <Text style={styles.descricaoBox}>{alerta.descricao}</Text>
      </View>

      {/* Botão de Editar */}
      <TouchableOpacity 
        style={styles.editButton} 
        onPress={() => navigation.navigate('Cadastro', { id: alerta.id })}
      >
        <Ionicons name="create-outline" size={20} color="#FFF" style={{ marginRight: 8 }} />
        <Text style={styles.editButtonText}>Editar Registro</Text>
      </TouchableOpacity>

      {/* Botão de Excluir */}
      <TouchableOpacity 
        style={styles.deleteButton} 
        onPress={confirmarExclusao}
        disabled={deleting}
      >
        {deleting ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <>
            <Ionicons name="trash-outline" size={20} color="#FFF" style={{ marginRight: 8 }} />
            <Text style={styles.deleteButtonText}>Excluir Registro</Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F2F7', padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: { backgroundColor: '#FFF', borderRadius: 16, padding: 20, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 6, elevation: 3, marginBottom: 20 },
  headerRow: { flexDirection: 'row', alignItems: 'center' },
  headerTextContainer: { marginLeft: 12, flex: 1 },
  tipoRisco: { fontSize: 20, fontWeight: 'bold', color: '#1C1C1E' },
  nivelBadge: { fontSize: 13, fontWeight: 'bold', marginTop: 2 },
  divider: { height: 1, backgroundColor: '#E5E5EA', marginVertical: 16 },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  label: { fontSize: 15, fontWeight: '600', color: '#3A3A3C', marginLeft: 8, marginRight: 6 },
  valor: { fontSize: 15, color: '#1C1C1E', flex: 1 },
  descricaoBox: { fontSize: 15, color: '#3A3A3C', backgroundColor: '#F9F9FB', padding: 12, borderRadius: 8, marginTop: 4, lineHeight: 22 },
  editButton: { backgroundColor: '#007AFF', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 16, borderRadius: 12, marginBottom: 12, shadowColor: '#007AFF', shadowOpacity: 0.3, shadowRadius: 4, elevation: 2 },
  editButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  deleteButton: { backgroundColor: '#FF3B30', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 16, borderRadius: 12, shadowColor: '#FF3B30', shadowOpacity: 0.3, shadowRadius: 4, elevation: 2 },
  deleteButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' }
});