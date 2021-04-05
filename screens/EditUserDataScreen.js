import React, { useState } from 'react'
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native'
import { Text, Input, Button } from 'react-native-elements'
import { db, auth } from './../firebase/firebase'

const EditUserDataScreen = ({navigation}) => {

    const [name, setName] = useState('')
    const [profileURL, setProfileURL] = useState('')

    const updateUser = () => {
        const user = auth.currentUser
        console.log(user.photoURL)
        user.updateProfile({
            displayName: (name === '') ? user.displayName : name,
            photoURL: (profileURL === '') ? user.photoURL : profileURL
        }).then( (authUser) => {
            console.log(user)
            db.collection('users')
                .doc(user.uid)
                .update({
                    userName: user.displayName,
                    photoURL: user.photoURL
                })
            if (Platform.OS === 'android')
                ToastAndroid.show('Update Sucessful', ToastAndroid.SHORT)
            // else if (Platform.OS === 'ios')
            //     AlertIOS('Update Sucessful')
            else
                alert('Update Sucessful')
            navigation.replace('Drawer')
        }).catch(error => alert(error.message));
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={styles.innerContainer}>
                <Text h3 style={{ alignSelf: 'center', marginBottom: 25 }}>Edit User Details</Text>
                <Input
                    autoFocus
                    style={{ paddingHorizontal: 15 }}
                    placeholder="Enter new name"
                    type="text"
                    value={name}
                    onChangeText={text => setName(text)}
                />
                <Input
                    style={{ paddingHorizontal: 15}}
                    placeholder="Enter new Profile Picture URL (optional)"
                    type="text"
                    value={profileURL}
                    onChangeText={(text) => setProfileURL(text)}
                    onSubmitEditing={updateUser}
                />
            </View>
            <Button
                containerStyle={styles.button}
                title="Update"
                onPress={updateUser}
            />
            <Button
                type="outline"
                containerStyle={styles.button}
                title="Cancel"
                onPress={ () => navigation.replace('Drawer') }
            />
            <View style={{ marginBottom: -60 }} />
        </KeyboardAvoidingView>
    )
}

export default EditUserDataScreen

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
