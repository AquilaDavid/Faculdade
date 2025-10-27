import React, { useState } from 'react';
import { View, Text, FlatList, Modal, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

interface Emissora {
  id: number;
  nome: string;
  cidade: string;
  tipo: string;
}

export default function EmissorasScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const [emissoras, setEmissoras] = useState<Emissora[]>([
    { id: 1, nome: 'TSI News FM', cidade: 'Guarabira - PB', tipo: 'Rádio' },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [nome, setNome] = useState('');
  const [cidade, setCidade] = useState('');
  const [tipo, setTipo] = useState('');
  const [editando, setEditando] = useState<Emissora | null>(null);

  // Criar nova emissora
  const adicionarEmissora = () => {
    if (!nome.trim() || !cidade.trim() || !tipo.trim()) return;

    const novaEmissora: Emissora = {
      id: emissoras.length + 1,
      nome,
      cidade,
      tipo,
    };

    setEmissoras([...emissoras, novaEmissora]);
    limparCampos();
  };

  // Editar emissora
  const editarEmissora = (item: Emissora) => {
    setEditando(item);
    setNome(item.nome);
    setCidade(item.cidade);
    setTipo(item.tipo);
    setModalVisible(true);
  };

  // Salvar edição
  const salvarEdicao = () => {
    if (!editando) return;

    const atualizadas = emissoras.map((e) =>
      e.id === editando.id ? { ...e, nome, cidade, tipo } : e
    );
    setEmissoras(atualizadas);
    limparCampos();
  };

  // Excluir emissora
  const deletarEmissora = (id: number) => {
    const filtradas = emissoras.filter((e) => e.id !== id);
    setEmissoras(filtradas);
  };

  // Limpar modal
  const limparCampos = () => {
    setEditando(null);
    setNome('');
    setCidade('');
    setTipo('');
    setModalVisible(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.header, { color: theme.text }]}>Emissoras Cadastradas</Text>

      <FlatList
        data={emissoras}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: theme.background }]}>
            <Text style={[styles.title, { color: theme.text }]}>{item.nome}</Text>
            <Text style={[styles.content, { color: theme.text }]}>📍 {item.cidade}</Text>
            <Text style={[styles.type, { color: theme.tint }]}>🎙️ Tipo: {item.tipo}</Text>

            {/* Ações */}
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => editarEmissora(item)}>
                <Text style={[styles.actionText, { color: theme.tint }]}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deletarEmissora(item.id)}>
                <Text style={[styles.actionText, { color: 'red' }]}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Botão para adicionar nova emissora */}
      <TouchableOpacity
        style={[
          styles.addButton,
          { backgroundColor: colorScheme === 'dark' ? '#4A90E2' : theme.tint },
        ]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>+ Nova Emissora</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal animationType="slide" visible={modalVisible} transparent>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContainer, { backgroundColor: theme.background }]}>
            <Text style={[styles.modalTitle, { color: theme.text }]}>
              {editando ? 'Editar Emissora' : 'Cadastrar Emissora'}
            </Text>

            <TextInput
              style={[styles.input, { color: theme.text, borderColor: theme.tint }]}
              placeholder="Nome da emissora"
              placeholderTextColor="#888"
              value={nome}
              onChangeText={setNome}
            />
            <TextInput
              style={[styles.input, { color: theme.text, borderColor: theme.tint }]}
              placeholder="Cidade"
              placeholderTextColor="#888"
              value={cidade}
              onChangeText={setCidade}
            />
            <TextInput
              style={[styles.input, { color: theme.text, borderColor: theme.tint }]}
              placeholder="Tipo (TV, Rádio, Online...)"
              placeholderTextColor="#888"
              value={tipo}
              onChangeText={setTipo}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: theme.tint }]}
                onPress={editando ? salvarEdicao : adicionarEmissora}
              >
                <Text style={styles.buttonText}>{editando ? 'Atualizar' : 'Salvar'}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: '#999' }]}
                onPress={limparCampos}
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
  container: { flex: 1, padding: 16 },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  card: { borderRadius: 10, padding: 14, marginBottom: 10, elevation: 2 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 6 },
  content: { fontSize: 15, marginBottom: 4 },
  type: { fontSize: 14, fontStyle: 'italic' },
  actions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 },
  actionText: { fontWeight: 'bold' },
  addButton: {
    position: 'absolute',
    bottom: 25,
    right: 20,
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 10,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
  addButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: { width: '90%', borderRadius: 10, padding: 20 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  input: { borderWidth: 1, borderRadius: 8, padding: 10, marginBottom: 12 },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between' },
  button: { padding: 10, borderRadius: 8, width: '48%', alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
