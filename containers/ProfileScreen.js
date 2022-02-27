import axios from "axios";
import { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import LoadingScreen from "../components/LoadingScreen";
import * as ImagePicker from "expo-image-picker";

export default function ProfileScreen({ userToken, userId, setToken, setId }) {
  const [isLoading, setIsLoading] = useState(false);
  const [photo, setPhoto] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [data, setData] = useState("");
  const [selectedPicture, setSelectedPicture] = useState(null);
  const [msg, setMsg] = useState("");
  useEffect(() => {
    setMsg("");
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/user/${userId}`,
          { headers: { authorization: `Bearer ${userToken}` } }
        );
        setData(response.data);
        if (response.data.photo) {
          setPhoto(response.data.photo.url);
        }
        setEmail(response.data.email);
        setUsername(response.data.username);
        setDescription(response.data.description);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchData();
  }, []);
  const getPermissionAndGetPicture = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === "granted") {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
      });
      if (result.cancelled === true) {
        alert("Pas de photo sélectionnée");
      } else {
        setSelectedPicture(result.uri);
      }
    } else {
      alert("Permission refusée");
    }
  };

  const getPermissionAndTakePicture = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status === "granted") {
      const result = await ImagePicker.launchCameraAsync();
      setSelectedPicture(result.uri);
    } else {
      alert("Permission refusée");
    }
  };

  const update = async () => {
    try {
      setMsg("");
      setIsLoading(true);
      if (username && email && description) {
        if (
          data.username !== username ||
          data.email !== email ||
          data.description !== description
        ) {
          const response = await axios.put(
            "https://express-airbnb-api.herokuapp.com/user/update",
            { email: email, description: description, username: username },
            { headers: { authorization: `Bearer ${userToken}` } }
          );
          if (response.data) {
            setMsg("Info Updated");
            setData(response.data);
          }
        }
        if (selectedPicture) {
          const tab = selectedPicture.split(".");
          const formData = new FormData();
          formData.append("photo", {
            uri: selectedPicture,
            name: `${data.username}.${tab[1]}`,
            type: `image/${tab[1]}`,
          });
          const response = await axios.put(
            "https://express-airbnb-api.herokuapp.com/user/upload_picture",
            formData,
            { headers: { authorization: `Bearer ${userToken}` } }
          );
          if (response.data) {
            setMsg("Info Updated");
            setPhoto(response.data.photo.url);
            setSelectedPicture(null);
          }
        }
      } else {
        setMsg("All Fields are required");
      }

      setIsLoading(false);
    } catch (error) {
      setMsg(error.response.data.error);
      setIsLoading(false);
      console.log(error.response.data);
    }
  };
  return isLoading ? (
    <LoadingScreen />
  ) : (
    <SafeAreaView style={[{ backgroundColor: "white", flex: 1 }]}>
      <View style={styles.avatarArea}>
        <View style={styles.avatar}>
          {selectedPicture || photo ? (
            <Image
              source={{ uri: selectedPicture ? selectedPicture : photo }}
              style={styles.avatarSrc}
            />
          ) : (
            <FontAwesome5 name="user-alt" size={80} color={"lightgray"} />
          )}
        </View>
        <View style={[{ justifyContent: "space-evenly" }]}>
          <TouchableOpacity onPress={getPermissionAndGetPicture}>
            <MaterialIcons name="photo-library" size={32} color={"gray"} />
          </TouchableOpacity>
          <TouchableOpacity onPress={getPermissionAndTakePicture}>
            <MaterialIcons name="camera-alt" size={32} color={"gray"} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={[{ alignItems: "center", marginTop: 50 }]}>
        <TextInput
          placeholder="Your email"
          onChangeText={(e) => setEmail(e)}
          value={email}
          style={styles.inputTxt}
        />
        <TextInput
          placeholder="Your username"
          onChangeText={(e) => setUsername(e)}
          value={username}
          style={styles.inputTxt}
        />
        <TextInput
          placeholder="Your description"
          onChangeText={(e) => setDescription(e)}
          value={description}
          numberOfLines={3}
          multiline={true}
          style={styles.descriptionTxt}
        />
      </View>
      <Text style={styles.infoMsg}>{msg}</Text>
      <View style={styles.buttonPart}>
        <TouchableOpacity style={styles.btn} onPress={update}>
          <Text style={styles.btn_txt}>Update</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setId(null);
            setToken(null);
          }}
          style={[styles.btn, styles.logout]}
        >
          <Text style={styles.btn_txt}>Log out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  avatarArea: { justifyContent: "center", flexDirection: "row", marginTop: 15 },
  avatarSrc: { width: 148, height: 148, borderRadius: 180 },
  avatar: {
    alignItems: "center",
    justifyContent: "center",
    width: 150,
    height: 150,
    borderColor: "red",
    borderWidth: 1,
    borderRadius: 180,
    marginRight: 15,
  },
  inputTxt: {
    height: 50,
    borderBottomColor: "red",
    borderBottomWidth: 1,
    width: 300,
  },
  descriptionTxt: {
    textAlignVertical: "top",
    padding: 5,
    borderColor: "red",
    borderWidth: 1,
    width: 300,
    height: 60,
    marginTop: 15,
    marginBottom: 5,
  },
  buttonPart: {
    marginTop: 20,
    paddingBottom: 50,
    alignItems: "center",
    flex: 1,
  },
  btn: {
    height: 50,
    borderWidth: 2,
    borderColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: 200,
    borderRadius: 45,
  },
  logout: { backgroundColor: "lightgray", marginTop: 10 },
  btn_txt: { color: "gray", fontSize: 16, fontWeight: "600" },
  infoMsg: {
    color: "red",
    textAlign: "center",
    paddingTop: 20,
  },
});
