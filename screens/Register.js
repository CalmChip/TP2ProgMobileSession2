import React, { useState, useEffect } from "react";
import { TextInput, Stack } from "@react-native-material/core";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { signUp, getCommonError } from "../services/userServices";
import { db } from "../database/firebase";
import { addDoc, collection } from "firebase/firestore";

export default function Register({ navigation }) {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmation, setConfirmation] = useState();
  const [telephone, setTelephone] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const [idUser, setIdUser] = useState();

  useEffect(() => {
    if (idUser) {
      (async () => {
        await addUser();
      })();
    }
  }, [idUser]);

  const ajouterUser = async () => {
    if (password !== confirmation) {
      Alert.alert("Erreur", "Le mots de passe ne sont pas identiques", [
        {
          text: "Ok",
          style: "ok",
        },
      ]);
    } else {
      await createAccount(email, password);
      navigation.navigate("Login");
    }
  };

  const addUser = async () => {
    const newUser = {
      nom: firstName + " " + lastName,
      email: email,
      _id: idUser,
    };
    try {
      const docRef = await addDoc(collection(db, "usagers"), newUser);
      newUser.id = docRef.id;
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const createAccount = async () => {
    if (validateName() && validateEmail() && validatePassword()) {
      setErrorMessage("");
      var response = await signUp(email, password);
      if (response.success) {
        setIdUser(response.localId);
      } else {
        var message = getCommonError(response?.error?.message);
        setErrorMessage(message);
      }
    }
  };

  const validateName = () => {
    if (!firstName || firstName.length < 2) {
      setErrorMessage("Le pr??nom doit comporter au moins deux caract??res.");
      return false;
    }

    if (!lastName || lastName.length < 2) {
      setErrorMessage("Le nom doit comporter au moins deux caract??res.");
      return false;
    }
    return true;
  };

  const validateEmail = () => {
    if (!email || email.length < 1) {
      setErrorMessage("Courriel invalide");
      return false;
    }
    return true;
  };

  const validatePassword = () => {
    if (password !== confirmation) {
      setErrorMessage("Les mots de passe ne sont pas identiques.");
      return false;
    }
    if (!password || password.length < 6) {
      setErrorMessage(
        "Le mot de passe doit comporter au moins six caract??res."
      );
      return false;
    } else {
      return true;
    }
  };

  return (
    <Stack spacing={2} style={{ margin: 14 }}>
      <View style={styles.container}>
        <View style={{ marginTop: 10 }}>
          <Text style={styles.errorRegister}>{errorMessage}</Text>
        </View>
        <TextInput
          placeholder="Pr??nom"
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
          leading={(props) => (
            <MaterialCommunityIcons
              name="account-plus-outline"
              size={24}
              color="blue"
              {...props}
            />
          )}
        />
        <TextInput
          placeholder="Nom"
          value={lastName}
          onChangeText={(text) => setLastName(text)}
          leading={(props) => (
            <MaterialCommunityIcons
              name="account-plus-outline"
              color="blue"
              {...props}
            />
          )}
        />
        <TextInput
          placeholder="Email"
          textContentType="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          leading={(props) => (
            <MaterialCommunityIcons
              name="email-outline"
              color="blue"
              {...props}
            />
          )}
        />
        <TextInput
          placeholder="Mot de passe"
          textContentType="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          leading={(props) => (
            <MaterialCommunityIcons
              name="onepassword"
              color="blue"
              {...props}
            />
          )}
        />
        <TextInput
          placeholder="Confirmation"
          textContentType="password"
          value={confirmation}
          onChangeText={(text) => setConfirmation(text)}
          leading={(props) => (
            <MaterialCommunityIcons
              name="onepassword"
              color="blue"
              {...props}
            />
          )}
        />
        <TextInput
          placeholder="Cellulaire"
          keyboardType="numeric"
          value={telephone}
          onChangeText={(text) => setTelephone(text)}
          leading={(props) => (
            <MaterialCommunityIcons name="cellphone" color="blue" {...props} />
          )}
        />
        <View style={styles.btn}>
          <TouchableOpacity style={styles.button} onPress={ajouterUser}>
            <Text style={styles.register}>S'enregistrer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Stack>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 14,
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
  },

  btn: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    margin: 12,
    borderRadius: 6,
  },

  register: {
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

  errorRegister: {
    margin: 10,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    color: "#fff",
  },
});
