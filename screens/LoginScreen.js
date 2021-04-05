import React, { useState, useEffect } from 'react'
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native'
import { Image, Input, Button } from 'react-native-elements'
import { StatusBar } from 'expo-status-bar'
import { auth } from './../firebase/firebase'

const LoginScreen = ({navigation}) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect( () => {
        const unsubscribe = auth.onAuthStateChanged(authUser => {
            if(authUser) {
                navigation.replace('Drawer')
            }
        })

        return unsubscribe
    })

    const logIn = () => {
        auth.signInWithEmailAndPassword(email, password)
            .catch( error => alert(error.message))
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >
            <StatusBar style="auto" />
            <View style={styles.inputContainer}>
                <Image
                    containerStyle={styles.image}
                    source={ require('./../assets/logo.png') } />
                <Input 
                    autoFocus
                    placeholder='Email'                    
                    style={{ paddingHorizontal: 15}}
                    type='email'
                    value={email}
                    onChangeText={ text => setEmail(text) }
                    />
                <Input
                    autoFocus
                    placeholder='Password'                    
                    style={{ paddingHorizontal: 15}}
                    type='password'
                    secureTextEntry
                    value={password}
                    onChangeText={text => setPassword(text)}
                />
            </View>
            <Button
                onPress={() => navigation.navigate('Home')}
                containerStyle={styles.button}
                onPress={logIn}
                title="LogIn" />
            <Button
                onPress={() => navigation.navigate('Register')}
                containerStyle={styles.button}
                type="outline"
                title="Register" />
            <View style={{ height: 140 }}></View>
        </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#FFF',
    },
    inputContainer: {
        width: 300,
    },
    image: {
        alignSelf: 'center',
        margin: 20,
        width: 100,
        height: 100,
    },
    button: {
        marginTop: 10,
        width: 230,
    },
})
