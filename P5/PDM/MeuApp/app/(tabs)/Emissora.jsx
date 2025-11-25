import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function Emissora() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gerenciar Emissoras</Text>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push('/(tabs)/emissora')}
      >
        <Text style={styles.addButtonText}>+ Nova Emissora</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.addButton, { backgroundColor: '#0066cc' }]}
        onPress={() => router.push('/(tabs)/noticias')}
      >
        <Text style={styles.addButtonText}>+ Nova Notícia</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  addButton: {
    backgroundColor: '#009933',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginVertical: 10,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
