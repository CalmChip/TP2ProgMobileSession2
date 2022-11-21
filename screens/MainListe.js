import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { db } from "../database/firebase";
import { collection, getDocs } from "firebase/firestore";
import * as Contacts from "expo-contacts";
import { isAuthenticated, getCommonError } from "../services/userServices";
import { useFocusEffect } from "@react-navigation/native";

export default function MainListe({ navigation }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  useFocusEffect(() => {
    (async () => {
      const isUserAuthenticated = await isAuthenticated();
      if (!isUserAuthenticated) {
        navigation.navigate("Login");
      }
    })();
  });

  const listeContact = async () => {
    const userList = [];
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === "granted") {
      const { data } = await Contacts.getContactsAsync({});
      console.log(data);
      data.forEach((doc) => {
        const user = {
          id: doc.id,
          nom: doc.name,
        };
        userList.push(user);
      });
      setUsers(userList);
    }
  };

  const renderUsers = ({ item }) => {
    return (
      <View style={styles.listeContainer}>
        <View style={{ marginRight: 15 }}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Conversation", {
                withUser: {
                  nom: item.nom,
                  email: item.email,
                  id: item._id,
                },
              })
            }
          >
            <Text style={{ marginBottom: 10 }}>Email: {item.email}</Text>
            <Text>Nom: {item.nom}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const getUsers = async () => {
    const userList = [];
    const querySnapshot = await getDocs(collection(db, "usagers"));
    querySnapshot.forEach((doc) => {
      const user = {
        id: doc.id,
        ...doc.data(),
      };
      userList.push(user);
    });
    setUsers(userList);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        renderItem={renderUsers}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity style={styles.button} onPress={() => listeContact()}>
        <Text style={styles.buttonText}>Phone contacts</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => getUsers()}>
        <Text style={styles.buttonText}>App contacts</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  listeContainer: {
    marginTop: 20,
    backgroundColor: "#F2F2F2",
    padding: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    minWidth: 280,
  },
  removeIcon: {
    width: 30,
    height: 35,
  },
  button: {
    width: 150,
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "blue",
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    marginBottom: 10,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    color: "#fff",
    borderRadius: 19,
    borderColor: "blue",
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
  },
});
