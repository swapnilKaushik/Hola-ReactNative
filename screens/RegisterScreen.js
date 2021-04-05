import React, { useState } from 'react'
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native'
import { Text, Input, Button } from 'react-native-elements'
import { db, auth } from './../firebase/firebase'

const RegisterScreen = ({navigation}) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [profileURL, setProfileURL] = useState('')
    
    const signUp = () => {
        auth.createUserWithEmailAndPassword(email, password)
            .then( authUser => {
                authUser.user.updateProfile({
                    displayName: name,
                    photoURL: profileURL || 'https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png',
                })
                db.collection('users')
                    .doc(authUser.user.uid)
                    .set({
                        userUID: authUser.user.uid,
                        userName: name,
                        userEmail: authUser.user.email,
                        photoURL: profileURL || 'https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png',
                    })
                    .then( () => navigation.replace('Drawer') )
                    .catch(error => alert(error.message))
            })
            .catch( error => alert(error.message))
    }

    return (
        <KeyboardAvoidingView
            style={ styles.container }
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        >
            <View style={styles.innerContainer}>
                <Text h3 style={{ alignSelf: 'center', marginBottom: 25 }}>Create Account</Text>
                <Input 
                    autoFocus
                    placeholder="Full Name"
                    type="text"
                    value={name}
                    style={{ paddingHorizontal: 15}}
                    onChangeText={ text => setName(text)}
                />
                <Input 
                    placeholder="Email"
                    type="email"
                    value={email}
                    style={{ paddingHorizontal: 15}}
                    onChangeText={ (text) => setEmail(text) }
                />
                <Input 
                    secureTextEntry
                    placeholder="Password"
                    type="password"
                    value={password}
                    style={{ paddingHorizontal: 15}}
                    onChangeText={ (text) => setPassword(text) }
                />
                <Input
                    secureTextEntry
                    placeholder="Profile Picture URL (optional)"
                    type="text"
                    value={profileURL}
                    style={{ paddingHorizontal: 15}}
                    onChangeText={(text) => setProfileURL(text)}
                    onSubmitEditing={signUp}
                />
            </View>
            <Button
                containerStyle={styles.button}
                title="Register"
                onPress={signUp}
            />
            <View style={{ marginBottom: -60 }} />
        </KeyboardAvoidingView>
    )

}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        padding: 10,
    },
    innerContainer: {
        width: 300,
    },
    button: {
        width: 200,
        height: 200,
        marginTop: 15,
    },
})