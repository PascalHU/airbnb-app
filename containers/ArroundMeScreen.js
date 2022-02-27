import axios from "axios";
import { useEffect, useState } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import LoadingScreen from "../components/LoadingScreen";
import * as Location from "expo-location";
import { StyleSheet } from "react-native";

export default function ArroundMeScreen(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [permission, setPermission] = useState(false);
  const [data, setData] = useState();
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  useEffect(() => {
    const getPermission = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === "granted") {
          const location = await Location.getCurrentPositionAsync();
          setLat(location.coords.latitude);
          setLng(location.coords.longitude);

          const response = await axios.get(
            "https://express-airbnb-api.herokuapp.com/rooms/around"
          );

          setData(response.data);
          setIsLoading(false);
          setPermission(true);
        } else {
          alert("Permission Refusée 🤯");
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getPermission();
  }, []);

  return isLoading || !permission ? (
    <LoadingScreen />
  ) : (
    <MapView
      provider={PROVIDER_GOOGLE}
      initialRegion={{
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      }}
      showsUserLocation={true}
      style={styles.map}
    >
      {data.map((offer, index) => {
        return (
          <MapView.Marker
            key={index}
            coordinate={{
              latitude: offer.location[1],
              longitude: offer.location[0],
            }}
            onPress={() =>
              props.navigation.navigate("Room", { offerId: offer._id })
            }
          />
        );
      })}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: { flex: 1 },
});
