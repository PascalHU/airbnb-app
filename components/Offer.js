import {
  Text,
  View,
  Image,
  ImageBackground,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { Ionicons } from "@expo/vector-icons";

export default function Offer({ data }) {
  const navigation = useNavigation();
  let rating = [];
  for (let i = 0; i < 5; i++) {
    if (i < data.ratingValue) {
      rating.push(<Ionicons name="ios-star" color={"#FFB101"} size={20} />);
    } else {
      rating.push(<Ionicons name="ios-star" color={"lightgray"} size={20} />);
    }
  }

  return (
    <TouchableOpacity
      style={styles.offer_container}
      onPress={() => navigation.navigate("Room", { offerId: data._id })}
    >
      <ImageBackground
        source={{
          uri: data.photos[0].url,
        }}
        style={styles.offer_img}
        resizeMode="cover"
      >
        <View style={styles.price_box}>
          <Text style={styles.offer_price}>{data.price} €</Text>
        </View>
      </ImageBackground>
      <View style={styles.offer_info}>
        <View style={{ justifyContent: "space-evenly" }}>
          <Text
            style={styles.offer_title}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {data.title}
          </Text>
          <View style={styles.notation}>
            <FlatList
              data={rating}
              style={{ flexDirection: "row" }}
              keyExtractor={(item, index) => index}
              renderItem={({ item }) => <Text>{item} </Text>}
            />
            <Text style={styles.reviews}>{data.reviews} reviews</Text>
          </View>
        </View>
        <Image
          source={{ uri: data.user.account.photo.url }}
          style={styles.avatar}
          resizeMode="cover"
        />
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  offer_container: {
    marginTop: 10,
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  offer_img: {
    height: 200,
    width: Dimensions.get("window").width - 20,
    alignSelf: "center",
  },
  price_box: {
    marginTop: 140,
    width: 75,
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
    flexDirection: "row",
    width: Dimensions.get("window").width - 20,
    marginTop: 10,
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  offer_title: { fontSize: 20, width: Dimensions.get("window").width - 95 },
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
});
