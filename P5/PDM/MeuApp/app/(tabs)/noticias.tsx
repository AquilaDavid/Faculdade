import React, { useState } from 'react';
import { View, Text, FlatList, Modal, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

interface Noticia {
  id: number;
  titulo: string;
  conteudo: string;
  dataPublicacao: string;
}

export default function NoticiasScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const [noticias, setNoticias] = useState<Noticia[]>([
    { id: 1, titulo: 'Mudanças no mercado de tecnologia', conteudo: 'Empresas estão ampliando oportunidades...', dataPublicacao: '08/10/2025' },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [editando, setEditando] = useState<Noticia | null>(null); // controla se está editando

  // ✅ Criar nova notícia
  const adicionarNoticia = () => {
    if (titulo.trim() === '' || conteudo.trim() === '') return;

    const novaNoticia: Noticia = {
      id: noticias.length + 1,
      titulo,
      conteudo,
      dataPublicacao: new Date().toLocaleDateString(),
    };

    setNoticias([...noticias, novaNoticia]);
    limparCampos();
  };

  // ✏️ Editar notícia existente
  const editarNoticia = (item: Noticia) => {
    setEditando(item); // guarda a notícia atual
    setTitulo(item.titulo);
    setConteudo(item.conteudo);
    setModalVisible(true);
  };

  // 💾 Salvar edição
  const salvarEdicao = () => {
    if (!editando) return;

    const atualizadas = noticias.map((n) =>
      n.id === editando.id ? { ...n, titulo, conteudo } : n
    );
    setNoticias(atualizadas);
    limparCampos();
  };

  // ❌ Deletar notícia
  const deletarNoticia = (id: number) => {
    const filtradas = noticias.filter((n) => n.id !== id);
    setNoticias(filtradas);
  };

  // 🔄 Função auxiliar para limpar tudo
  const limparCampos = () => {
    setEditando(null);
    setTitulo('');
    setConteudo('');
    setModalVisible(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.header, { color: theme.text }]}>Notícias Recentes</Text>

      <FlatList
        data={noticias}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: theme.background }]}>
            <Text style={[styles.title, { color: theme.text }]}>{item.titulo}</Text>
            <Text style={[styles.content, { color: theme.text }]}>{item.conteudo}</Text>
            <Text style={[styles.date, { color: theme.tint }]}>{item.dataPublicacao}</Text>

            {/* Ações */}
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => editarNoticia(item)}>
                <Text style={[styles.actionText, { color: theme.tint }]}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deletarNoticia(item.id)}>
                <Text style={[styles.actionText, { color: 'red' }]}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Botão para abrir modal */}
      <TouchableOpacity
        style={[
          styles.addButton,
          { backgroundColor: colorScheme === 'dark' ? '#4A90E2' : theme.tint },
        ]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>+ Nova Notícia</Text>
      </TouchableOpacity>

      {/* Modal para criar/editar notícia */}
      <Modal animationType="slide" visible={modalVisible} transparent>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContainer, { backgroundColor: theme.background }]}>
            <Text style={[styles.modalTitle, { color: theme.text }]}>
              {editando ? 'Editar Notícia' : 'Cadastrar Notícia'}
            </Text>

            <TextInput
              style={[styles.input, { color: theme.text, borderColor: theme.tint }]}
              placeholder="Título"
              placeholderTextColor="#888"
              value={titulo}
              onChangeText={setTitulo}
            />
            <TextInput
              style={[styles.input, { color: theme.text, borderColor: theme.tint, height: 100 }]}
              placeholder="Conteúdo"
              placeholderTextColor="#888"
              multiline
              value={conteudo}
              onChangeText={setConteudo}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: theme.tint }]}
                onPress={editando ? salvarEdicao : adicionarNoticia}
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
  content: { fontSize: 15, marginBottom: 6 },
  date: { fontSize: 12, fontStyle: 'italic', textAlign: 'right' },
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
  modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContainer: { width: '90%', borderRadius: 10, padding: 20 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  input: { borderWidth: 1, borderRadius: 8, padding: 10, marginBottom: 12 },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between' },
  button: { padding: 10, borderRadius: 8, width: '48%', alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
