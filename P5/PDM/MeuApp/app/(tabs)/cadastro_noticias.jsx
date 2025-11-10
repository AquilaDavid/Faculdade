import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function Emissora() {
  const [emissoras, setEmissoras] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const carregar = async () => {
      const armazenadas = await AsyncStorage.getItem('emissoras');
      if (armazenadas) setEmissoras(JSON.parse(armazenadas));
    };
    const unsubscribe = router.addListener('focus', carregar);
    return unsubscribe;
  }, [router]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Emissoras Cadastradas</Text>
      <TouchableOpacity style={styles.addButton} onPress={() => router.push('/(tabs)/cadastro_emissora')}>
        <Text style={styles.addButtonText}>+ Adicionar Emissora</Text>
      </TouchableOpacity>
      <FlatList
        data={emissoras}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.nome}</Text>
            <Text style={styles.location}>
              📍 {item.latitude?.toFixed(3)}, {item.longitude?.toFixed(3)}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f8f8f8' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 10, elevation: 2 },
  name: { fontSize: 16, fontWeight: 'bold' },
  location: { fontSize: 14, color: '#555' },
  addButton: { backgroundColor: '#009933', padding: 10, borderRadius: 8, marginBottom: 10 },
  addButtonText: { color: '#fff', fontWeight: '600', textAlign: 'center' },
});
