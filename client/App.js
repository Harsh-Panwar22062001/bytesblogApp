import { StyleSheet, Text, View } from "react-native";
// import Register from './screens/auth/Register';
import Register from "./screens/auth/Register";
import Login from "./screens/auth/Login";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthProvider } from "./context/authContext";
import Home from "./screens/Home";

export default function App() {
  const stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
    <AuthProvider>

    <stack.Navigator initialRouteName="Login">

    <stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />
        <stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
      </stack.Navigator>


    </AuthProvider>
     
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
