import React, { useLayoutEffect } from 'react'
import { StyleSheet, useWindowDimensions } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import HomeScreen from './HomeScreen'
import SettingScreen from './SettingScreen'
import AddChatScreen from './AddChatScreen'
import AboutScreen from './AboutScreen'
import DrawerComponent from './../components/DrawerComponent'

const Drawer = createDrawerNavigator();

const DrawerScreen = ({ navigation }) => {

    const dimensions = useWindowDimensions();

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Chat',
            headerShown: false
        })
    }, [navigation])

    return (
        <Drawer.Navigator 
            drawerType={dimensions.width >= 768 ? 'permanent' : 'back'}
            drawerContent={props => <DrawerComponent {...props} />}
            initialRouteName="Home">
            <Drawer.Screen 
                name="Home" 
                options={{ drawerLabel: 'Home' }}
                component={HomeScreen} />
            <Drawer.Screen 
                name="AddChat"
                options={{ drawerLabel: 'AddChat' }}
                component={AddChatScreen} />
            <Drawer.Screen
                name="Settings"
                options={{ drawerLabel: 'Settings' }}
                component={SettingScreen} />
            <Drawer.Screen
                name="About"
                options={{ drawerLabel: 'About' }}
                component={AboutScreen} />
        </Drawer.Navigator>
    )
}

export default DrawerScreen

const styles = StyleSheet.create({})
