import { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

import { colors } from './constants/styles';
import SortingHat from './screens/SortingHat/SortingHat';
import AuthContextProvider, { AuthContext } from './store/auth-context';
import IconButton from './components/UI/IconButton';

import LoginScreen from './screens/Authentication/LoginScreen';
import Gryffindor from './screens/Hogwarts/Gryffindor';
// import Houses from './screens/Hogwarts/Houses';
import SignupScreen from './screens/Authentication/SignupScreen';
import Hufflepuff from './screens/Hogwarts/Hufflepuff';
import Ravenclaw from './screens/Hogwarts/Ravenclaw'
import Slytherin from './screens/Hogwarts/Slytherin'

const Stack = createNativeStackNavigator()
const Drawer = createDrawerNavigator()

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary200 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: colors.primary900 },
        headerShown: false
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const authCtx = useContext(AuthContext);
  return (
    <Drawer.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: colors.primary100 },
      headerTintColor: 'white',
      sceneContainerStyle: { backgroundColor: colors.primary200 },
      drawerContentStyle: { backgroundColor: colors.primary400 },
      drawerInactiveTintColor: 'white',
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
            <IconButton icon={require('./assets/Hogwarts/Icons/gryffindor.png')} />
          ),
          headerRight: ({ tintColor }) => (
            <Ionicons
              name="exit"
              color={tintColor}
              size={24}
              style={{paddingRight: 15}}
              onPress={authCtx.logout}
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
            <IconButton icon={require('./assets/Hogwarts/Icons/hufflepuff.png')} />
          ),
          headerRight: ({ tintColor }) => (
            <Ionicons
              name="exit"
              color={tintColor}
              size={24}
              style={{paddingRight: 15}}
              onPress={authCtx.logout}
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
            <IconButton icon={require('./assets/Hogwarts/Icons/ravenclaw.png')} />
          ),
          headerRight: ({ tintColor }) => (
            <Ionicons
              name="exit"
              color={tintColor}
              size={24}
              style={{paddingRight: 15}}
              onPress={authCtx.logout}
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
            <IconButton icon={require('./assets/Hogwarts/Icons/slytherin.png')} />
          ),
          headerRight: ({ tintColor }) => (
            <Ionicons
              name="exit"
              color={tintColor}
              size={24}
              style={{paddingRight: 15}}
              onPress={authCtx.logout}
            />
          ),
        }}
      />
      {/* <Drawer.Screen 
        name='Hogwarts Houses' 
        component={Houses} 
        options={{
          headerStyle: { backgroundColor: colors.houses },
          drawerIcon: () => (
            <IconButton icon={require('./assets/Hogwarts/Icons/houses.png')} />
          ),
          headerRight: ({ tintColor }) => (
            <Ionicons
              name="exit"
              color={tintColor}
              size={24}
              style={{paddingRight: 15}}
              onPress={authCtx.logout}
            />
          ),
        }}
      /> */}
      <Drawer.Screen 
        name='Sorting Hat' 
        component={SortingHat} 
        options={{
          headerStyle: { backgroundColor: colors.hat },
          drawerIcon: () => (
            <IconButton icon={require('./assets/Hogwarts/SortingHat.png')} />
          ),
          headerRight: ({ tintColor }) => (
            <Ionicons
              name="exit"
              color={tintColor}
              size={24}
              style={{paddingRight: 10}}
              onPress={authCtx.logout}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

function Root() {
  const [isTryingLogin, setIsTryingLogin] = useState(true);

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem('token');

      if (storedToken) {
        authCtx.authenticate(storedToken);
      }

      setIsTryingLogin(false);
    }

    fetchToken();
  }, []);

  if (isTryingLogin) {
    return <AppLoading />;
  }

  return <Navigation />;
}

export default function App() {
  
  return (
    <>
      <StatusBar style='dark' barStyle='dark-content' />
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  );
}