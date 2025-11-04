import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

export default function CadastroNoticias() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');

  const salvar = () => {
    console.log('📰 Nova notícia cadastrada:', { titulo, conteudo });
    router.back(); // volta para noticias.tsx
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Cadastrar Notícia</Text>

      <TextInput
        style={[styles.input, { borderColor: theme.tint, color: theme.text }]}
        placeholder="Título"
        placeholderTextColor="#888"
        value={titulo}
        onChangeText={setTitulo}
      />
      <TextInput
        style={[
          styles.input,
          { borderColor: theme.tint, color: theme.text, height: 100 },
        ]}
        placeholder="Conteúdo"
        placeholderTextColor="#888"
        multiline
        value={conteudo}
        onChangeText={setConteudo}
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
