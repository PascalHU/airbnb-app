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
  Dimensions,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Constants from "expo-constants";
import { Feather } from "@expo/vector-icons";

export default function SignInScreen({ setToken, setId }) {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [viewPassword, setViewPassword] = useState(false);
  const login = async () => {
    try {
      if (email && password) {
        setIsLoading(true);
        const response = await axios.post(
          "https://express-airbnb-api.herokuapp.com/user/log_in",
          {
            email: email,
            password: password,
          }
        );
        if (response.status === 200) {
          setToken(response.data.token);
          setId(response.data.id);
          setIsLoading(false);
        }
      } else {
        setErrorMsg("Please fill all fields");
      }
    } catch (error) {
      setIsLoading(false);
      if (error.response.status === 401) {
        setErrorMsg("Invalid email / password");
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
    <SafeAreaView
      style={{
        marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
        flex: 1,
      }}
    >
      <KeyboardAwareScrollView>
        <View
          style={{
            flexDirection: "column",
            height: Dimensions.get("window").height,
          }}
        >
          <View style={[styles.center, styles.section]}>
            <Image
              source={require("../assets/img/logo.png")}
              style={styles.airbnb_logo}
              resizeMode="contain"
            />
            <Text style={[styles.txt_gray, { fontSize: 30 }]}>Sign in</Text>
          </View>
          <View style={[styles.center, styles.section]}>
            <TextInput
              placeholder="email"
              onChangeText={(e) => setEmail(e)}
              onFocus={() => setErrorMsg("")}
              style={styles.inputTxt}
              value={email}
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
          </View>
          <View style={[styles.center, styles.section]}>
            <Text style={styles.errorMsg}>{errorMsg}</Text>
            <TouchableOpacity onPress={login} style={styles.sub_btn}>
              <Text style={[styles.txt_gray, { fontSize: 16 }]}>Sign in</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
              <Text style={styles.txt_gray}>No account ? Register</Text>
            </TouchableOpacity>
          </View>
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
    height: 50,
    borderBottomColor: "red",
    borderBottomWidth: 1,
    width: 300,
  },
  inputPw: {
    width: 250,
    height: 50,
  },
  viewPw: {
    position: "absolute",
    right: 10,
    top: 15,
  },
  section: { marginTop: 50 },
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
