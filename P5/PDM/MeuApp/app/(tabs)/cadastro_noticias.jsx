import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';

export default function CadastroNoticias() {
  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [localizacao, setLocalizacao] = useState(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão negada para acessar localização!');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocalizacao(location.coords);
    })();
  }, []);

  const salvarNoticia = async () => {
    if (!titulo || !conteudo) return Alert.alert('Preencha todos os campos!');

    const novaNoticia = {
      id: Date.now(),
      titulo,
      conteudo,
      dataPublicacao: new Date().toLocaleDateString(),
      latitude: localizacao?.latitude,
      longitude: localizacao?.longitude,
    };

    const armazenadas = await AsyncStorage.getItem('noticias');
    const noticias = armazenadas ? JSON.parse(armazenadas) : [];

    noticias.push(novaNoticia);
    await AsyncStorage.setItem('noticias', JSON.stringify(noticias));

    Alert.alert('Notícia salva com sucesso!');
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Notícia</Text>

      <TextInput
        style={styles.input}
        placeholder="Título"
        value={titulo}
        onChangeText={setTitulo}
      />

      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Conteúdo"
        value={conteudo}
        onChangeText={setConteudo}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={salvarNoticia}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>

      {localizacao && (
        <Text style={styles.coords}>
          Localização: {localizacao.latitude.toFixed(4)}, {localizacao.longitude.toFixed(4)}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', width: '100%', padding: 10, borderRadius: 8, marginBottom: 10 },
  button: { marginTop: 10, backgroundColor: '#009933', padding: 12, borderRadius: 8 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  coords: { marginTop: 20, color: '#555' },
});
