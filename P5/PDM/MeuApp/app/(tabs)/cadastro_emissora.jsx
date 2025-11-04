import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

export default function CadastroEmissora() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const [nome, setNome] = useState('');
  const [cidade, setCidade] = useState('');
  const [tipo, setTipo] = useState('');

  const salvar = () => {
    console.log('✅ Emissora cadastrada:', { nome, cidade, tipo });
    router.back(); // volta para emissora.tsx
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Cadastrar Emissora</Text>

      <TextInput
        style={[styles.input, { borderColor: theme.tint, color: theme.text }]}
        placeholder="Nome da emissora"
        placeholderTextColor="#888"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={[styles.input, { borderColor: theme.tint, color: theme.text }]}
        placeholder="Cidade"
        placeholderTextColor="#888"
        value={cidade}
        onChangeText={setCidade}
      />
      <TextInput
        style={[styles.input, { borderColor: theme.tint, color: theme.text }]}
        placeholder="Tipo (TV, Rádio...)"
        placeholderTextColor="#888"
        value={tipo}
        onChangeText={setTipo}
      />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.tint }]}
        onPress={salvar}
      >
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#888' }]}
        onPress={() => router.back()}
      >
        <Text style={styles.buttonText}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderRadius: 8, padding: 10, marginBottom: 12 },
  button: { padding: 12, borderRadius: 8, marginTop: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
