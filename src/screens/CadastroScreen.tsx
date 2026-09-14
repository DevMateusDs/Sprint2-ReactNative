import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { alertaService } from '../services/alertaService';

export function CadastroScreen() {
  const navigation = useNavigation();
  const [setor, setSetor] = useState('');
  const [descricao, setDescricao] = useState('');
  const [loading, setLoading] = useState(false);

  const salvarIncidente = async () => {
    if (!setor || !descricao) return Alert.alert("Erro", "Preencha tudo.");

    try {
      setLoading(true);
      await alertaService.criar({
        categoria: "Falta de EPI",
        descricao,
        gravidade: "critico",
        setorCamera: setor,
        dataHora: new Date().toLocaleString('pt-BR'),
        resolvido: false
      });
      navigation.goBack();
    } catch (err) {
      Alert.alert("Erro", "Falha ao comunicar com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Setor</Text>
      <TextInput style={styles.input} value={setor} onChangeText={setSetor} />

      <Text style={styles.label}>Descrição</Text>
      <TextInput style={styles.input} value={descricao} onChangeText={setDescricao} />

      {loading ? <ActivityIndicator size="large" color="#FF9500" /> : <Button title="Salvar Registro" color="#FF3B30" onPress={salvarIncidente} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#CCC', borderRadius: 8, padding: 12, marginBottom: 20 }
});