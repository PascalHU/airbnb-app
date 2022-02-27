import { useNavigation } from "@react-navigation/core";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
  SafeAreaView,
  Image,
  ActivityIndicator,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useState } from "react";
import axios from "axios";
import Constants from "expo-constants";
import { Feather } from "@expo/vector-icons";

export default function SignUpScreen({ setToken, setId }) {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [viewPassword, setViewPassword] = useState(false);
  const [viewConfirmPassword, setViewConfirmPassword] = useState(false);

  const signUp = async () => {
    try {
      if (email && username && description && password && confirmPassword) {
        if (password && confirmPassword) {
          setIsLoading(true);
          const response = await axios.post(
            "https://express-airbnb-api.herokuapp.com/user/sign_up",
            {
              email: email,
              username: username,
              description: description,
              password: password,
            }
          );
          if (response.status === 200) {
            setToken(response.data.token);
            setId(response.data.id);
            setIsLoading(false);
          }
        } else {
          setErrorMsg("Passwords must be the same");
        }
      } else {
        setErrorMsg("All fields are mandatory");
      }
    } catch (error) {
      setIsLoading(false);
      if (
        error.response.data.error === "This username already has an account." ||
        error.response.data.error === "This email already has an account."
      ) {
        setErrorMsg(error.response.data.error);
      }
    }
  };

  return isLoading ? (
    <ActivityIndicator
      style={[{ marginTop: "auto", marginBottom: "auto" }]}
      size="large"
      color="#EE5A62"
    />
  ) : (
    <SafeAreaView>
      <KeyboardAwareScrollView
        style={{
          marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
        }}
      >
        <View style={[styles.center, styles.section]}>
          <Image
            source={require("../assets/img/logo.png")}
            style={styles.airbnb_logo}
            resizeMode="contain"
          />
          <Text style={[styles.txt_gray, { fontSize: 30 }]}>Sign up</Text>
        </View>
        <View style={[styles.center, styles.section]}>
          <TextInput
            placeholder="email"
            style={styles.inputTxt}
            onChangeText={(e) => setEmail(e)}
            onFocus={() => setErrorMsg("")}
            value={email}
          />
          <TextInput
            placeholder="username"
            style={styles.inputTxt}
            onChangeText={(e) => setUsername(e)}
            onFocus={() => setErrorMsg("")}
            value={username}
          />
          <TextInput
            placeholder="Describe yourself in a few words..."
            style={styles.descriptionTxt}
            multiline={true}
            numberOfLines={3}
            onChangeText={(e) => setDescription(e)}
            onFocus={() => setErrorMsg("")}
            value={description}
          />
          <View style={[{ position: "relative" }, styles.inputTxt]}>
            <TextInput
              placeholder="password"
              secureTextEntry={viewPassword ? false : true}
              onChangeText={(e) => setPassword(e)}
              onFocus={() => setErrorMsg("")}
              style={styles.inputPw}
            />
            <TouchableOpacity
              style={styles.viewPw}
              onPress={() => setViewPassword(!viewPassword)}
            >
              <Feather
                name={viewPassword ? "eye-off" : "eye"}
                size={20}
                color={viewPassword ? "lightgray" : "gray"}
              />
            </TouchableOpacity>
          </View>
          <View style={[{ position: "relative" }, styles.inputTxt]}>
            <TextInput
              placeholder="confirm password"
              secureTextEntry={viewConfirmPassword ? false : true}
              onChangeText={(e) => setConfirmPassword(e)}
              onFocus={() => setErrorMsg("")}
              style={styles.inputPw}
            />
            <TouchableOpacity
              style={styles.viewPw}
              onPress={() => setViewConfirmPassword(!viewConfirmPassword)}
            >
              <Feather
                name={viewConfirmPassword ? "eye-off" : "eye"}
                size={20}
                color={viewConfirmPassword ? "lightgray" : "gray"}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.center, styles.section]}>
          <Text style={styles.errorMsg}>{errorMsg}</Text>
          <TouchableOpacity onPress={signUp} style={styles.sub_btn}>
            <Text style={[styles.txt_gray, { fontSize: 16 }]}>Sign up</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
            <Text style={styles.txt_gray}>
              Already have an account? Sign in
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  center: {
    alignItems: "center",
    justifyContent: "center",
  },

  errorMsg: {
    color: "red",
  },
  airbnb_logo: {
    width: 125,
    height: 150,
  },
  inputTxt: {
    height: 40,
    borderBottomColor: "red",
    borderBottomWidth: 1,
    width: 300,
  },
  inputPw: {
    width: 250,
    height: 40,
  },
  viewPw: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  descriptionTxt: {
    textAlignVertical: "top",
    borderColor: "red",
    borderWidth: 1,
    width: 300,
    height: 60,
    marginTop: 15,
    marginBottom: 5,
  },
  section: { marginTop: 30 },
  sub_btn: {
    borderColor: "red",
    borderWidth: 1,
    borderRadius: 50,
    marginTop: 20,
    marginBottom: 20,
    height: 50,
    width: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  txt_gray: {
    color: "gray",
  },
});
