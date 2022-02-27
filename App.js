import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "./containers/HomeScreen";
import ProfileScreen from "./containers/ProfileScreen";
import SignInScreen from "./containers/SignInScreen";
import SignUpScreen from "./containers/SignUpScreen";
import RoomScreen from "./containers/RoomScreen";
import { ActivityIndicator } from "react-native";
import Logo from "./components/Logo";
import ArroundMeScreen from "./containers/ArroundMeScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const setId = async (userId) => {
    if (userId) {
      await AsyncStorage.setItem("userId", userId);
    } else {
      await AsyncStorage.removeItem("userId");
    }
    setUserId(userId);
  };
  const setToken = async (token) => {
    if (token) {
      await AsyncStorage.setItem("userToken", token);
    } else {
      await AsyncStorage.removeItem("userToken");
    }
    setUserToken(token);
  };

  useEffect(() => {
    const isLogged = async () => {
      const userToken = await AsyncStorage.getItem("userToken");
      const userId = await AsyncStorage.getItem("userId");
      setUserToken(userToken);
      setUserId(userId);
      setIsLoading(false);
    };
    isLogged();
  }, []);

  return isLoading ? (
    <ActivityIndicator
      style={[{ marginTop: "auto", marginBottom: "auto" }]}
      size="large"
      color="#EE5A62"
    />
  ) : (
    <NavigationContainer>
      <Stack.Navigator>
        {userToken === null ? (
          <>
            <Stack.Screen name="SignIn" options={{ headerShown: false }}>
              {() => <SignInScreen setToken={setToken} setId={setId} />}
            </Stack.Screen>
            <Stack.Screen name="SignUp" options={{ headerShown: false }}>
              {() => <SignUpScreen setToken={setToken} setId={setId} />}
            </Stack.Screen>
          </>
        ) : (
          // User is signed in ! 🎉
          <Stack.Screen name="Tab" options={{ headerShown: false }}>
            {() => (
              <Tab.Navigator
                screenOptions={{
                  headerShown: false,
                  tabBarActiveTintColor: "tomato",
                  tabBarInactiveTintColor: "gray",
                }}
              >
                <Tab.Screen
                  name="TabHome"
                  options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons name={"ios-home"} size={size} color={color} />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Home"
                        options={{
                          headerTitle: () => <Logo />,
                          headerTitleAlign: "center",
                        }}
                      >
                        {() => <HomeScreen />}
                      </Stack.Screen>
                      <Stack.Screen
                        name="Room"
                        options={{
                          headerTitle: () => <Logo />,
                          headerTitleAlign: "center",
                        }}
                      >
                        {(props) => <RoomScreen {...props} />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
                <Tab.Screen
                  name="TabArroundMe"
                  options={{
                    tabBarLabel: "Arround me",
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons
                        name={"location-outline"}
                        size={size}
                        color={color}
                      />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="AroundMe"
                        options={{
                          headerTitle: () => <Logo />,
                          headerTitleAlign: "center",
                        }}
                      >
                        {(props) => <ArroundMeScreen {...props} />}
                      </Stack.Screen>
                      <Stack.Screen
                        name="Room"
                        options={{
                          headerTitle: () => <Logo />,
                          headerTitleAlign: "center",
                        }}
                      >
                        {(props) => <RoomScreen {...props} />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
                <Tab.Screen
                  name="TabMyProfil"
                  options={{
                    tabBarLabel: "My Profile",
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons
                        name={"ios-person-outline"}
                        size={size}
                        color={color}
                      />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="MyProfil"
                        options={{
                          headerTitle: () => <Logo />,
                          headerTitleAlign: "center",
                        }}
                      >
                        {() => (
                          <ProfileScreen
                            userToken={userToken}
                            userId={userId}
                            setToken={setToken}
                            setId={setId}
                          />
                        )}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
              </Tab.Navigator>
            )}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
