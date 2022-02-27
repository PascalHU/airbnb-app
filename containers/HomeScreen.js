import { useEffect, useState } from "react";
import { SafeAreaView, FlatList } from "react-native";
import axios from "axios";
import Offer from "../components/Offer";
import LoadingScreen from "../components/LoadingScreen";

export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          "https://express-airbnb-api.herokuapp.com/rooms"
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error.response);
      }
    };
    fetchData();
  }, []);
  return isLoading ? (
    <LoadingScreen />
  ) : (
    <SafeAreaView>
      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <Offer data={item} />}
      />
    </SafeAreaView>
  );
}
