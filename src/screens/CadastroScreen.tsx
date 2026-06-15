// src/screens/CadastroScreen.tsx
import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AlertaSeguranca, CategoriaRisco } from '../types/Registro';

export function CadastroScreen() {
  const navigation = useNavigation();
  const [setor, setSetor] = useState('');
  const [descricao, setDescricao] = useState('');

  const salvarIncidente = () => {
    if (!setor || !descricao) {
      Alert.alert("Erro", "Por favor, preencha todos os campos do monitoramento.");
      return;
    }

    // Criando o objeto seguindo rigidamente a modelagem TypeScript
    const novoAlerta: AlertaSeguranca = {
      id: Date.now().toString(),
      categoria: "Falta de EPI", // Mock padrão para simplificar o form
      descricao: descricao,
      gravidade: "critico", // Todo reporte manual assume gravidade crítica temporariamente
      setorCamera: `Relato Manual - ${setor}`,
      dataHora: new Date().toLocaleString('pt-BR'),
      resolvido: false
    };

    // Aqui simulamos o salvamento disparando um aviso e voltando à tela anterior
    Alert.alert("Sucesso", "Risco registrado no painel local!", [
      { text: "OK", onPress: () => navigation.goBack() }
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Setor / Área da Indústria</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Almoxarifado, Linha de Montagem 02"
        value={setor}
        onChangeText={setSetor}
      />

      <Text style={styles.label}>Ocorrência / Risco Identificado</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Descreva o risco ou o EPI ausente observado..."
        multiline
        numberOfLines={4}
        value={descricao}
        onChangeText={setDescricao}
      />

      <View style={styles.buttonContainer}>
        <Button title="Enviar Alerta ao Painel" color="#FF3B30" onPress={salvarIncidente} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 20 },
  label: { fontSize: 16, fontWeight: 'bold', color: '#1C1C1E', marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#C7C7CC', borderRadius: 8, padding: 12, fontSize: 16, marginBottom: 20 },
  textArea: { height: 100, textAlignVertical: 'top' },
  buttonContainer: { marginTop: 10 }
});