import { Image, StyleSheet } from "react-native";
export default function Logo() {
  return (
    <Image style={styles.logo} source={require("../assets/img/logo.png")} />
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 25,
    height: 25,
  },
});
