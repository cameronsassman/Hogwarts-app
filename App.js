import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

import { colors } from "./constants/styles";
import IconButton from "./components/UI/IconButton";
import SortingHat from "./screens/SortingHat/SortingHat";
import Gryffindor from "./screens/Hogwarts/Gryffindor";
import Hufflepuff from "./screens/Hogwarts/Hufflepuff";
import Ravenclaw from "./screens/Hogwarts/Ravenclaw";
import Slytherin from "./screens/Hogwarts/Slytherin";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function AppNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary100 },
        headerTintColor: "white",
        sceneContainerStyle: { backgroundColor: colors.primary200 },
        drawerContentStyle: { backgroundColor: colors.primary400 },
        drawerInactiveTintColor: "white",
        drawerActiveTintColor: colors.accent500,
        drawerActiveBackgroundColor: colors.primary700,
      }}
    >
      <Drawer.Screen
        name="Gryffindor Wizards"
        component={Gryffindor}
        options={{
          headerStyle: { backgroundColor: colors.gryffindor },
          drawerIcon: () => (
            <IconButton
              icon={require("./assets/Hogwarts/Icons/gryffindor.png")}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Hufflepuff Wizards"
        component={Hufflepuff}
        options={{
          headerStyle: { backgroundColor: colors.hufflepuff },
          drawerIcon: () => (
            <IconButton
              icon={require("./assets/Hogwarts/Icons/hufflepuff.png")}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Ravenclaw Wizards"
        component={Ravenclaw}
        options={{
          headerStyle: { backgroundColor: colors.ravenclaw },
          drawerIcon: () => (
            <IconButton
              icon={require("./assets/Hogwarts/Icons/ravenclaw.png")}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Slytherin Wizards"
        component={Slytherin}
        options={{
          headerStyle: { backgroundColor: colors.slytherin },
          drawerIcon: () => (
            <IconButton
              icon={require("./assets/Hogwarts/Icons/slytherin.png")}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Sorting Hat"
        component={SortingHat}
        options={{
          headerStyle: { backgroundColor: colors.hat },
          drawerIcon: () => (
            <IconButton icon={require("./assets/Hogwarts/SortingHat.png")} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="dark" barStyle="dark-content" />
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </>
  );
}
