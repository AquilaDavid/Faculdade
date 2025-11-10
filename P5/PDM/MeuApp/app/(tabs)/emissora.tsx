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

interface Emissora {
  nome: string;
  cidade: string;
  tipo?: string;
  latitude?: number | null;
  longitude?: number | null;
  enderecoCompleto?: string;
}

export default function Emissora() {
  const [emissoras, setEmissoras] = useState<Emissora[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [nome, setNome] = useState('');
  const [cidade, setCidade] = useState('');
  const [tipo, setTipo] = useState('');
  const [editIndex, setEditIndex] = useState<number | null>(null);

  // Carregar emissoras do AsyncStorage
  const carregar = async () => {
    try {
      const armazenadas = await AsyncStorage.getItem('emissoras');
      if (armazenadas) setEmissoras(JSON.parse(armazenadas));
      else setEmissoras([]);
    } catch (error) {
      console.error('Erro ao carregar emissoras:', error);
    }
  };

  // Atualiza ao focar a tela
  useFocusEffect(
    useCallback(() => {
      carregar();
    }, [])
  );

  // Obter localização atual
  const obterLocalizacao = async (): Promise<{
    enderecoCompleto?: string;
    latitude?: number;
    longitude?: number;
  }> => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão negada', 'Ative o GPS para registrar a localização.');
        return {};
      }

      const pos = await Location.getCurrentPositionAsync({});
      const [endereco] = await Location.reverseGeocodeAsync({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      });

      const enderecoCompleto = endereco
        ? `${endereco.city ?? ''} - ${endereco.region ?? ''}`
        : `${pos.coords.latitude.toFixed(3)}, ${pos.coords.longitude.toFixed(3)}`;

      return {
        enderecoCompleto,
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      };
    } catch (error) {
      console.error('Erro ao obter localização:', error);
      return {};
    }
  };

  // Abrir modal para novo cadastro
  const abrirNovo = () => {
    setEditIndex(null);
    setNome('');
    setCidade('');
    setTipo('');
    setModalVisible(true);
  };

  // Abrir modal para editar
  const abrirEditar = (index: number) => {
    const item = emissoras[index];
    setNome(item.nome ?? '');
    setCidade(item.cidade ?? '');
    setTipo(item.tipo ?? '');
    setEditIndex(index);
    setModalVisible(true);
  };

  // Salvar nova ou editar existente
  const salvar = async () => {
    if (!nome.trim()) return;

    const atualizadas = [...emissoras];

    if (editIndex !== null) {
      // Editando
      atualizadas[editIndex] = {
        ...atualizadas[editIndex],
        nome,
        cidade,
        tipo,
      };
      setEditIndex(null);
    } else {
      // Nova emissora com localização
      const { enderecoCompleto, latitude, longitude } = await obterLocalizacao();
      const novaEmissora: Emissora = {
        nome,
        cidade: enderecoCompleto ?? cidade,
        tipo,
        latitude: latitude ?? null,
        longitude: longitude ?? null,
        enderecoCompleto,
      };
      atualizadas.push(novaEmissora);
    }

    setEmissoras(atualizadas);
    try {
      await AsyncStorage.setItem('emissoras', JSON.stringify(atualizadas));
    } catch (error) {
      console.error('Erro ao salvar emissoras:', error);
    }

    setNome('');
    setCidade('');
    setTipo('');
    setModalVisible(false);
  };

  // Excluir emissora
  const excluir = async (index: number) => {
    const atualizadas = emissoras.filter((_, i) => i !== index);
    setEmissoras(atualizadas);
    try {
      await AsyncStorage.setItem('emissoras', JSON.stringify(atualizadas));
    } catch (error) {
      console.error('Erro ao excluir emissora:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Emissoras Cadastradas</Text>

      <FlatList
        data={emissoras}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.card}>
            <Text style={styles.name}>🏢 {item.nome}</Text>
            <Text style={styles.info}>📍 {item.cidade}</Text>
            {item.tipo ? <Text style={styles.info}>🎙️ {item.tipo}</Text> : null}
            {item.latitude && item.longitude ? (
              <Text style={styles.location}>
                🌎 {item.latitude.toFixed(4)}, {item.longitude.toFixed(4)}
              </Text>
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
        ListEmptyComponent={<Text style={styles.empty}>Nenhuma emissora cadastrada.</Text>}
      />

      <TouchableOpacity style={styles.addButton} onPress={abrirNovo}>
        <Text style={styles.addButtonText}>+ Nova Emissora</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {editIndex !== null ? 'Editar Emissora' : 'Nova Emissora'}
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Nome da emissora"
              value={nome}
              onChangeText={setNome}
            />
            <TextInput
              style={styles.input}
              placeholder="Cidade"
              value={cidade}
              onChangeText={setCidade}
            />
            <TextInput
              style={styles.input}
              placeholder="Tipo (TV, Rádio, Online...)"
              value={tipo}
              onChangeText={setTipo}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.saveButton} onPress={salvar}>
                <Text style={styles.buttonText}>{editIndex !== null ? 'Atualizar' : 'Salvar'}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.saveButton, { backgroundColor: '#ccc' }]}
                onPress={() => {
                  setModalVisible(false);
                  setEditIndex(null);
                  setNome('');
                  setCidade('');
                  setTipo('');
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
  info: { fontSize: 14, color: '#555', marginTop: 4 },
  location: { fontSize: 13, color: '#333', marginTop: 4 },
  actions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  edit: { color: '#0077cc' },
  delete: { color: '#c00' },
  addButton: {
    backgroundColor: '#009933',
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
