import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Avatar, Drawer } from 'react-native-paper'
import MatComIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import MatIcon from 'react-native-vector-icons/MaterialIcons'
import IonIcon from 'react-native-vector-icons/Ionicons'
import FonIcon from 'react-native-vector-icons/Fontisto'
import { auth } from './../firebase/firebase'

const DrawerComponent = (props) => {

    const logOut = () => {
        auth.signOut().then(() => {
            props.navigation.replace("Login");
        });
    };

    return (
        <View style={{flex: 1}}>
            <DrawerContentScrollView {...props}>
                <View>
                    <View style={styles.header}>
                        <TouchableOpacity style={styles.avatar}>
                            <Avatar.Image
                                source={{
                                    uri: auth.currentUser.photoURL || 'https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png'
                                }}
                                size={70}
                            />
                        </TouchableOpacity>
                        <Text style={styles.headerText}>{ auth.currentUser.displayName}</Text>
                        <Text style={styles.headerEmail}>{ auth.currentUser.email }</Text>
                    </View>
                    <Drawer.Section style={styles.linkSection}>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <MatComIcon
                                    name="home"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Home"
                            onPress={ () => props.navigation.jumpTo('Home')}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <MatIcon
                                    name="person-add-alt-1"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Add Chat"
                            onPress={ () => props.navigation.jumpTo('AddChat')}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <MatIcon
                                    name="app-settings-alt"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Settings"
                            onPress={() => props.navigation.navigate('Settings')}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <FonIcon
                                    name="info"
                                    color={color}
                                    size={size}
                                />
                            )}
                            style={{ paddingLeft: 8 }}
                            label="About"
                            onPress={() => props.navigation.navigate('About')}
                        />
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.linkSection}>
                <DrawerItem
                    icon={({ color, size }) => (
                        <MatIcon
                            name="logout"
                            color={color}
                            size={size}
                        />
                    )}
                    label="LogOut"
                    onPress={logOut}
                />
                <DrawerItem
                    icon={({ color, size }) => (
                        <IonIcon
                            name="glasses"
                            color={color}
                            size={size}
                        />
                    )}
                    focused
                    label="#SwapnilKaushik"
                    labelStyle={{ fontWeight: 'bold'}}
                />
            </Drawer.Section>
        </View>
    )
}

export default DrawerComponent

const styles = StyleSheet.create({
    header: {
        padding: 15,
        backgroundColor: '#ececec'
    },
    avatar: {
        margin: 20,
        marginLeft: 30,
    },
    headerText: {
        marginLeft: 20,
        fontWeight: 'bold',
        fontSize: 20,
    },
    headerEmail: {
        fontSize: 12,
        marginLeft: 20,
        marginBottom: 10,
    },
    linkSection: {},
})
