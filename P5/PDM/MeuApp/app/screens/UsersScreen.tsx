import React, { useEffect, useState } from "react";
import { View, Text, TextInput, FlatList, Modal, Button, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function UsersScreen() {
  const [users, setUsers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newName, setNewName] = useState("");

  // Carregar usuários ao iniciar
  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    const data = await AsyncStorage.getItem("users");
    if (data) {
      setUsers(JSON.parse(data));
    }
  }

  async function saveUser() {
    if (!newName.trim()) return;

    const newUser = { id: Date.now(), name: newName };
    const updated = [...users, newUser];

    await AsyncStorage.setItem("users", JSON.stringify(updated));

    setUsers(updated);
    setNewName("");
    setModalVisible(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Usuários</Text>

      <FlatList
        data={users}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.userItem}>
            <Text>{item.name}</Text>
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addText}>Adicionar Usuário</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Novo Usuário</Text>

            <TextInput
              placeholder="Nome"
              value={newName}
              style={styles.input}
              onChangeText={setNewName}
            />

            <Button title="Salvar" onPress={saveUser} />
            <Button title="Cancelar" color="red" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  userItem: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#eee",
    borderRadius: 6
  },
  addButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 6,
    marginTop: 20
  },
  addText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center"
  },
  modalBox: {
    width: "80%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 6,
    marginBottom: 10
  }
});
