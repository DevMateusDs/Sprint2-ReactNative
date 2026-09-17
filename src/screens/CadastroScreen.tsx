import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { alertaService } from '../services/alertaService';
import { Ionicons } from '@expo/vector-icons';

type Props = NativeStackScreenProps<RootStackParamList, 'Cadastro'>;

export function CadastroScreen({ route, navigation }: Props) {
  // Se veio um ID nos parâmetros da rota, significa que estamos no modo de EDIÇÃO
  const editId = route.params && 'id' in route.params ? (route.params as any).id : undefined;

  const [tipoRisco, setTipoRisco] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [descricao, setDescricao] = useState('');
  const [nivelPerigo, setNivelPerigo] = useState('baixo');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(Boolean(editId));

  // Se for edição, busca os dados atuais do registro para preencher os campos
  useEffect(() => {
    if (editId) {
      const carregarDadosParaEdicao = async () => {
        try {
          const dados = await alertaService.buscarPorId(editId);
          setTipoRisco(dados.tipoRisco);
          setLocalizacao(dados.localizacao);
          setDescricao(dados.descricao);
          setNivelPerigo(dados.nivelPerigo || 'baixo');
        } catch (err) {
          Alert.alert("Erro", "Não foi possível carregar os dados para edição.");
        } finally {
          setFetching(false);
        }
      };
      carregarDadosParaEdicao();
    }
  }, [editId]);

  const salvarIncidente = async () => {
    if (!tipoRisco || !localizacao || !descricao) {
      return Alert.alert("Atenção", "Preencha todos os campos obrigatórios.");
    }
    
    try {
      setLoading(true);
      if (editId) {
        // Atualiza (Update)
        await alertaService.atualizar(editId, {
          tipoRisco,
          localizacao,
          nivelPerigo,
          descricao,
        });
      } else {
        // Cria novo (Create)
        await alertaService.criar({
          tipoRisco,
          localizacao,
          nivelPerigo,
          descricao,
        });
      }
      navigation.goBack();
    } catch (err) {
      Alert.alert("Erro", "Falha ao comunicar com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#FF9500" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Tipo de Risco / Categoria</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Falta de EPI, Vazamento..."
          value={tipoRisco}
          onChangeText={setTipoRisco}
        />

        <Text style={styles.label}>Local / Setor</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Produção, Almoxarifado..."
          value={localizacao}
          onChangeText={setLocalizacao}
        />

        <Text style={styles.label}>Nível de Gravidade / Status</Text>
        <View style={styles.containerNiveis}>
          <TouchableOpacity 
            style={[styles.botaoNivel, nivelPerigo === 'baixo' && styles.ativoBaixo]}
            onPress={() => setNivelPerigo('baixo')}
          >
            <Text style={[styles.textoNivel, nivelPerigo === 'baixo' && styles.textoAtivo]}>Baixo</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.botaoNivel, nivelPerigo === 'alerta' && styles.ativoAlerta]}
            onPress={() => setNivelPerigo('alerta')}
          >
            <Text style={[styles.textoNivel, nivelPerigo === 'alerta' && styles.textoAtivo]}>Alerta</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.botaoNivel, nivelPerigo === 'critico' && styles.ativoCritico]}
            onPress={() => setNivelPerigo('critico')}
          >
            <Text style={[styles.textoNivel, nivelPerigo === 'critico' && styles.textoAtivo]}>Crítico</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Descrição Detalhada</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Descreva o que aconteceu..."
          value={descricao}
          onChangeText={setDescricao}
          multiline
          numberOfLines={4}
        />

        <TouchableOpacity 
          style={styles.salvarButton} 
          onPress={salvarIncidente}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <>
              <Ionicons name="checkmark-circle-outline" size={20} color="#FFF" style={{ marginRight: 8 }} />
              <Text style={styles.salvarButtonText}>{editId ? 'Salvar Alterações' : 'Salvar Alerta'}</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F2F7', padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: { backgroundColor: '#FFF', borderRadius: 16, padding: 20, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 6, elevation: 3, marginBottom: 30 },
  label: { fontSize: 14, fontWeight: '600', color: '#3A3A3C', marginBottom: 6, marginTop: 12 },
  input: { borderWidth: 1, borderColor: '#E5E5EA', borderRadius: 8, padding: 12, fontSize: 15, backgroundColor: '#F9F9FB', color: '#1C1C1E' },
  textArea: { height: 100, textAlignVertical: 'top' },
  containerNiveis: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  botaoNivel: { flex: 1, paddingVertical: 10, borderWidth: 1, borderColor: '#E5E5EA', borderRadius: 8, alignItems: 'center', marginHorizontal: 4, backgroundColor: '#F9F9FB' },
  ativoBaixo: { backgroundColor: '#34C759', borderColor: '#34C759' },
  ativoAlerta: { backgroundColor: '#FF9500', borderColor: '#FF9500' },
  ativoCritico: { backgroundColor: '#FF3B30', borderColor: '#FF3B30' },
  textoNivel: { fontSize: 14, fontWeight: '600', color: '#3A3A3C' },
  textoAtivo: { color: '#FFF' },
  salvarButton: { backgroundColor: '#007AFF', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 16, borderRadius: 12, marginTop: 24, shadowColor: '#007AFF', shadowOpacity: 0.3, shadowRadius: 4, elevation: 2 },
  salvarButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' }
});