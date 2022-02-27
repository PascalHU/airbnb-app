import axios from "axios";
import { useEffect, useState } from "react";
import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import LoadingScreen from "../components/LoadingScreen";
import MapView, { Circle, PROVIDER_GOOGLE } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import { SwiperFlatList } from "react-native-swiper-flatlist";

export default function RoomScreen({ route }) {
  const { offerId } = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [showMore, setShowMore] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://express-airbnb-api.herokuapp.com/rooms/${offerId}`
      );
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [offerId]);

  const rating = [];
  const photos = [];
  if (data) {
    for (let i = 0; i < 5; i++) {
      if (i < data.ratingValue) {
        rating.push(<Ionicons name="ios-star" color={"#FFB101"} size={20} />);
      } else {
        rating.push(<Ionicons name="ios-star" color={"lightgray"} size={20} />);
      }
    }
    for (let j = 0; j < data.photos.length; j++) {
      photos.push(data.photos[j].url);
    }
  }
  return isLoading ? (
    <LoadingScreen />
  ) : (
    <SafeAreaView style={{ flex: 1 }}>
      <SwiperFlatList
        autoplay
        autoplayDelay={10}
        autoplayLoop
        showPagination
        data={photos}
        style={styles.carousel}
        renderItem={({ item }) => {
          return (
            <ImageBackground
              source={{ uri: item }}
              resizeMode="cover"
              style={styles.offer_img}
            >
              <View style={styles.price_box}>
                <Text style={styles.offer_price}>{data.price} €</Text>
              </View>
            </ImageBackground>
          );
        }}
      />
      <View>
        <View style={[styles.offer_info]}>
          <View style={{ justifyContent: "space-evenly" }}>
            <Text
              style={styles.offer_title}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {data.title}
            </Text>
            <View style={styles.notation}>
              {rating.map((item, index) => {
                return <Text key={index}>{item} </Text>;
              })}
              <Text style={styles.reviews}>{data.reviews} reviews</Text>
            </View>
          </View>
          <Image
            source={{ uri: data.user.account.photo.url }}
            style={styles.avatar}
            resizeMode="cover"
          />
        </View>
        <Text style={styles.description} numberOfLines={showMore ? 0 : 3}>
          {data.description}
        </Text>
        <TouchableOpacity onPress={() => setShowMore(!showMore)}>
          <Text style={[{ color: "gray", paddingLeft: 10, marginBottom: 10 }]}>
            {showMore ? "Show less" : "Show more"}
          </Text>
        </TouchableOpacity>
      </View>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 48.856614,
          longitude: 2.3522219,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        <Circle
          center={{ latitude: data.location[1], longitude: data.location[0] }}
          radius={400}
          strokeColor="rgba(255,0,0,0.3)"
          fillColor="rgba(255,0,0,0.3)"
          ref={(ref) => (this.circle = ref)}
          onLayout={() =>
            this.circle.setNativeProps({ fillColor: "rgba(255,0,0,0.3)" })
          }
        />
      </MapView>
    </SafeAreaView>
  );
}
const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  carousel: {
    minHeight: 250,
    maxHeight: 250,
  },
  offer_img: {
    height: 250,
    width: Dimensions.get("window").width,
    alignSelf: "center",
  },
  price_box: {
    marginTop: "45%",
    width: 80,
    height: 50,
    justifyContent: "center",
    backgroundColor: "black",
  },
  offer_price: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
  },
  offer_info: {
    width: deviceWidth - 20,
    flexDirection: "row",
    marginTop: 5,
    alignSelf: "center",
  },
  offer_title: { fontSize: 20, width: deviceWidth - 95 },
  avatar: {
    width: 75,
    height: 75,
    borderRadius: 90,
  },
  notation: {
    flexDirection: "row",
    alignItems: "center",
  },
  reviews: {
    color: "gray",
    marginLeft: 10,
  },
  description: {
    marginTop: 5,
    marginBottom: 5,
    width: deviceWidth - 20,
    alignSelf: "center",
  },
});
