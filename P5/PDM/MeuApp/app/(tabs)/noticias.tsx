import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { useFocusEffect } from '@react-navigation/native';

interface Noticia {
  titulo: string;
  conteudo: string;
  dataPublicacao: string;
  localizacao?: string;
}

export default function Noticias() {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [editIndex, setEditIndex] = useState<number | null>(null);

  // Carregar notícias do AsyncStorage
  const carregar = async () => {
    try {
      const armazenadas = await AsyncStorage.getItem('noticias');
      if (armazenadas) setNoticias(JSON.parse(armazenadas));
      else setNoticias([]);
    } catch (error) {
      console.error('Erro ao carregar notícias:', error);
    }
  };

  // Atualiza ao focar a tela
  useFocusEffect(
    useCallback(() => {
      carregar();
    }, [])
  );

  // Abrir modal para nova notícia
  const abrirNovo = () => {
    setEditIndex(null);
    setTitulo('');
    setConteudo('');
    setModalVisible(true);
  };

  // Abrir modal para editar
  const abrirEditar = (index: number) => {
    const item = noticias[index];
    setTitulo(item.titulo ?? '');
    setConteudo(item.conteudo ?? '');
    setEditIndex(index);
    setModalVisible(true);
  };

  // Obter localização atual
  const obterLocalizacao = async (): Promise<string | undefined> => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão negada', 'Ative o GPS para registrar a localização.');
        return undefined;
      }

      const pos = await Location.getCurrentPositionAsync({});
      const [endereco] = await Location.reverseGeocodeAsync({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      });

      if (endereco) {
        return `${endereco.city ?? ''} - ${endereco.region ?? ''}`;
      } else {
        return `${pos.coords.latitude.toFixed(3)}, ${pos.coords.longitude.toFixed(3)}`;
      }
    } catch (error) {
      console.error('Erro ao obter localização:', error);
      return undefined;
    }
  };

  // Salvar nova ou editar existente
  const salvar = async () => {
    if (!titulo.trim() || !conteudo.trim()) return;

    const atualizadas = [...noticias];

    if (editIndex !== null) {
      // Editando
      atualizadas[editIndex] = {
        ...atualizadas[editIndex],
        titulo,
        conteudo,
      };
      setEditIndex(null);
    } else {
      // Nova notícia com localização
      const localizacao = await obterLocalizacao();
      const novaNoticia: Noticia = {
        titulo,
        conteudo,
        dataPublicacao: new Date().toLocaleString(),
        localizacao,
      };
      atualizadas.push(novaNoticia);
    }

    setNoticias(atualizadas);
    try {
      await AsyncStorage.setItem('noticias', JSON.stringify(atualizadas));
    } catch (error) {
      console.error('Erro ao salvar notícia:', error);
    }

    setTitulo('');
    setConteudo('');
    setModalVisible(false);
  };

  // Excluir notícia
  const excluir = async (index: number) => {
    const atualizadas = noticias.filter((_, i) => i !== index);
    setNoticias(atualizadas);
    try {
      await AsyncStorage.setItem('noticias', JSON.stringify(atualizadas));
    } catch (error) {
      console.error('Erro ao excluir notícia:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notícias Publicadas</Text>

      <FlatList
        data={noticias}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.titulo}</Text>
            <Text style={styles.content}>{item.conteudo}</Text>
            <Text style={styles.date}>🕒 {item.dataPublicacao}</Text>
            {item.localizacao ? (
              <Text style={styles.location}>📍 {item.localizacao}</Text>
            ) : null}

            <View style={styles.actions}>
              <TouchableOpacity onPress={() => abrirEditar(index)}>
                <Text style={styles.edit}>✏️ Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => excluir(index)}>
                <Text style={styles.delete}>🗑 Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>Nenhuma notícia cadastrada ainda.</Text>
        }
      />

      <TouchableOpacity style={styles.addButton} onPress={abrirNovo}>
        <Text style={styles.addButtonText}>+ Nova Notícia</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {editIndex !== null ? 'Editar Notícia' : 'Nova Notícia'}
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Título"
              value={titulo}
              onChangeText={setTitulo}
            />
            <TextInput
              style={[styles.input, { height: 100 }]}
              placeholder="Conteúdo"
              multiline
              value={conteudo}
              onChangeText={setConteudo}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.saveButton} onPress={salvar}>
                <Text style={styles.buttonText}>
                  {editIndex !== null ? 'Atualizar' : 'Salvar'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.saveButton, { backgroundColor: '#ccc' }]}
                onPress={() => {
                  setModalVisible(false);
                  setEditIndex(null);
                  setTitulo('');
                  setConteudo('');
                }}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f8f8f8' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 3,
  },
  name: { fontSize: 16, fontWeight: 'bold' },
  content: { fontSize: 14, color: '#555', marginVertical: 4 },
  date: { fontSize: 12, color: '#777' },
  location: { fontSize: 13, color: '#333', marginTop: 3 },
  actions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  edit: { color: '#0077cc' },
  delete: { color: '#c00' },
  addButton: {
    backgroundColor: '#0066cc',
    padding: 12,
    borderRadius: 8,
    marginTop: 15,
  },
  addButtonText: { color: '#fff', textAlign: 'center', fontWeight: '600' },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalContent: {
    backgroundColor: '#fff',
    width: '85%',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
  },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between' },
  saveButton: { backgroundColor: '#0066cc', padding: 10, borderRadius: 8, width: '45%' },
  buttonText: { color: '#fff', textAlign: 'center' },
  empty: { textAlign: 'center', color: '#666', marginTop: 20 },
});
