import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import HomeScreen from './screens/HomeScreen'
import ChatScreen from './screens/ChatScreen'
import EditUserDataScreen from './screens/EditUserDataScreen'
import ChangePasswordScreen from './screens/ChangePasswordScreen'
import DrawerScreen from './screens/DrawerScreen'
import { YellowBox } from 'react-native';

const Stack = createStackNavigator();

const globalScreenOptions = {
  headerStyle: { backgroundColor: '#FFF'},
  headerTitleStyle: { color: '#000' },
  headerTintColor: '#000',
}

export default function App() {
  
  console.ignoredYellowBox = ['Setting a timer']
  console.disableYellowBox = true
  
  return (
    <NavigationContainer>
      <Stack.Navigator
        // initialRouteName="Drawer"
        screenOptions={globalScreenOptions}>
          <Stack.Screen 
            options={{ title: 'Login' }}
            name="Login"
            component={LoginScreen}
          />
          <Stack.Screen 
            options={{ title: 'Register' }}
            name="Register"
            component={RegisterScreen}
        />
        <Stack.Screen
          options={{ title: 'Home' }}
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          options={{ title: 'Chat' }}
          name="Chat"
          component={ChatScreen}
        />
        <Stack.Screen
          options={{ 
            title: 'Drawer',
            // headerShown: false,
          }}
          name="Drawer"
          component={DrawerScreen}
        />
        <Stack.Screen
          options={{ title: 'EditUser' }}
          name="EditUser"
          component={EditUserDataScreen}
        />
        <Stack.Screen
          options={{ title: 'Change Password' }}
          name="ChngPassword"
          component={ChangePasswordScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
