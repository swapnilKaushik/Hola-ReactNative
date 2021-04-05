import React, { useState } from 'react'
import { StyleSheet, View, ToastAndroid, Platform } from 'react-native'
import { Button } from 'react-native-elements'
import { db, auth } from './../firebase/firebase'
// import { Paragraph, Dialog, Portal } from 'react-native-paper';

const SettingScreen = ({navigation}) => {

    const deleteUser = () => {
        const user = auth.currentUser
        db.collection('users')
            .doc(user.uid)
            .delete()
            .then( () => {
                // console.log(user.uid)
                user.delete()
                    .then(() => {
                        if (Platform.OS === 'android')
                            ToastAndroid.show('User Deleted!', ToastAndroid.SHORT)
                        // else if (Platform.OS === 'ios')
                        //     AlertIOS('User Deleted!')
                        else
                            alert('User Deleted!')
                        navigation.replace('Login')
                    })
            }).catch( (error) => alert(error.message))
    }

    const resetPassword = () => {
        // console.log(auth.currentUser.email)
        auth.sendPasswordResetEmail(auth.currentUser.email)
            .then( () => {
                if (Platform.OS === 'android')
                    ToastAndroid.show('Password reset link is send on your mail. Plz check!', ToastAndroid.SHORT)
                else if (Platform.OS === 'ios')
                    AlertIOS('Password reset link is send on your mail. Plz check!')
                else
                    alert('Password reset link is send on your mail. Plz check!')
            }).catch( error => alert(error.message))
    }

    return (

            <View style={styles.container}>
                <Button
                    raised={true}
                    containerStyle={{ width: 280, marginTop: 25}}
                    title="Edit UserData"
                    onPress={() => navigation.navigate('EditUser')}
                />
                <Button
                    raised={true}
                    containerStyle={{ width: 280, marginTop: 25}}
                    title="Change Password"
                    onPress={resetPassword}
                />
                <Button
                    raised={true}
                    containerStyle={{ width: 280, marginTop: 40}}
                    buttonStyle={{ backgroundColor: 'red' }}
                    title="Delete Account"
                    onPress={deleteUser}
                />
            </View>
    )
}

export default SettingScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 130,
        backgroundColor: '#fff',
        padding: 10,
    },
})
