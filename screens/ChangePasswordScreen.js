import React, { useState } from 'react'
import { StyleSheet, View, KeyboardAvoidingView, ToastAndroid, Platform } from 'react-native'
import { Text, Input, Button } from 'react-native-elements'
import { db, auth } from './../firebase/firebase'

const ChangePasswordScreen = ({navigation}) => {

    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confrmPassword, setConfrmPassword] = useState('')

    const updatePassword = () => {

        if (newPassword === confrmPassword && !(newPassword==='')) {
            const emailCred = auth.EmailAuthProvider.credential(
                auth.currentUser, currentPassword);
            auth.currentUser.reauthenticateWithCredential(emailCred)
                .then(() => {
                    // const newPass = window.prompt('Please enter new password');
                    auth.currentUser.updatePassword(newPassword)
                    if (Platform.OS === 'android')
                        ToastAndroid.show('Password reset!', ToastAndroid.SHORT)
                    // else if (Platform.OS === 'ios')
                    //     AlertIOS('Password reset!')
                    else
                        alert('Password reset!')
                    navigation.replace('Drawer')
                    return
                })
                .catch(error => alert(error.message));
        } else {
            alert('Password mismatch')
        }
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={styles.innerContainer}>
                <Text h3 style={{ alignSelf: 'center', marginBottom: 25 }}>Reset Password</Text>
                <Input
                    autoFocus
                    style={{ paddingHorizontal: 15}}
                    placeholder="Current Password"
                    type="password"
                    secureTextEntry
                    value={currentPassword}
                    onChangeText={text => setCurrentPassword(text)}
                />
                <Input
                    style={{ paddingHorizontal: 15}}
                    secureTextEntry
                    placeholder="New Password"
                    type="password"
                    secureTextEntry
                    value={newPassword}
                    onChangeText={(text) => setNewPassword(text)}
                    onSubmitEditing={updatePassword}
                />
                <Input
                    style={{ paddingHorizontal: 15}}
                    secureTextEntry
                    placeholder="Confirm Password"
                    type="password"
                    secureTextEntry
                    value={confrmPassword}
                    onChangeText={(text) => setConfrmPassword(text)}
                    onSubmitEditing={updatePassword}
                />
            </View>
            <Button
                containerStyle={styles.button}
                title="Change"
                onPress={updatePassword}
            />
            <Button
                type="outline"
                containerStyle={styles.button}
                title="Cancel"
                onPress={() => navigation.replace('Drawer')}
            />
            <View style={{ marginBottom: -60 }} />
        </KeyboardAvoidingView>
    )
}

export default ChangePasswordScreen

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
