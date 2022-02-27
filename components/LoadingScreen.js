import { StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";

export default function LoadingScreen() {
  return (
    <View style={styles.animationContainer}>
      <LottieView
        source={require("../assets/img/LoadingScreenHome.json")}
        autoPlay
        loop
      />
    </View>
  );
}

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});
