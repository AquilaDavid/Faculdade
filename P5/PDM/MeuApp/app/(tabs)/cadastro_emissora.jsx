import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';

export default function CadastroEmissora() {
  const [nome, setNome] = useState('');
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

  const salvarEmissora = async () => {
    if (!nome) return Alert.alert('Digite o nome da emissora!');

    const novaEmissora = {
      id: Date.now(),
      nome,
      latitude: localizacao?.latitude,
      longitude: localizacao?.longitude,
    };

    const armazenadas = await AsyncStorage.getItem('emissoras');
    const emissoras = armazenadas ? JSON.parse(armazenadas) : [];

    emissoras.push(novaEmissora);
    await AsyncStorage.setItem('emissoras', JSON.stringify(emissoras));

    Alert.alert('Emissora salva com sucesso!');
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Emissora</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome da Emissora"
        value={nome}
        onChangeText={setNome}
      />
      <TouchableOpacity style={styles.button} onPress={salvarEmissora}>
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
  input: { borderWidth: 1, borderColor: '#ccc', width: '100%', padding: 10, borderRadius: 8 },
  button: { marginTop: 20, backgroundColor: '#009933', padding: 12, borderRadius: 8 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  coords: { marginTop: 20, color: '#555' },
});
