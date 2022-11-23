import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import {
  isAuthenticated,
  login,
  storeData,
  getCommonError,
} from "../services/userServices";
import { useFocusEffect } from "@react-navigation/native";

//navigation sers a naviguer entre les ecrans
export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState();

  useFocusEffect(() => {
    (async () => {
      const isUserAuthenticated = await isAuthenticated();
      if (isUserAuthenticated) {
        navigation.navigate("Liste Contact");
      }
    })();
  });

  const seConnecter = async () => {
    var response = await login(email, password);
    if (response.success) {
      await storeData(response.idToken, response.expiresIn);
      navigation.navigate("Liste Contact");
    } else {
      var message = getCommonError(response?.error?.message);
      setErrorMessage(message);
    }
  };

  return (
    <View>
      <View style={styles.logoApp}>
        <Image source={require("../assets/logoApp.png")} />
      </View>
      <View style={{ marginTop: 10 }}>
        <Text style={styles.errorText}>{errorMessage}</Text>
      </View>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          textContentType="password"
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity style={styles.button} onPress={() => seConnecter()}>
          <Text style={styles.login}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Accueil")}
        >
          <Text style={styles.login}>Accueil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  logoApp: {
    margin: 20,
    width: 150,
    height: 200,
    alignSelf: "center",
  },

  input: {
    height: 50,
    width: 200,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 18,
    padding: 10,
    margin: 10,
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    margin: 12,
    borderRadius: 6,
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
    marginBottom: 20,
  },
  login: {
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
  errorText: {
    color: "red",
    textTransform: "uppercase",
    textAlign: "center",
  },
});
