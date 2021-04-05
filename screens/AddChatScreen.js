import React, { useEffect, useState, useLayoutEffect } from 'react'
import { StyleSheet, ToastAndroid, View, Platform } from 'react-native'
import UserItemList from './../components/UserItemList'
import { db, auth } from './../firebase/firebase'
import * as firebase from 'firebase'

const AddChat = ({navigation}) => {

    const [users, setUsers] = useState([])
    const [userExist, setUserExist] = useState(true)
    const currentUser = auth.currentUser.uid

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Add Chat',
            headerShown: true,
        })
    }, [navigation])

    useEffect(() => {
        const unsubscribe = db.collection('users')
            .onSnapshot(snapshot => {
                // console.log(snapshot.docs[0].data())
                setUsers(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            })

        return unsubscribe
    }, [db])

    const sendFirstMsg = (chatID) => {
        const time = firebase.firestore.FieldValue.serverTimestamp()
        const message = "You have a new Friend :)"
        const proID = 'thats_my_id'
        db.collection('users')
            .doc(auth.currentUser.uid)
            .collection('friends')
            .doc(chatID)
            .collection('message')
            .add({
                timestamp: time,
                message: message,
                id: proID
            })
        db.collection('users')
            .doc(chatID)
            .collection('friends')
            .doc(auth.currentUser.uid)
            .collection('message')
            .add({
                timestamp: time,
                message: message,
                id: proID
            })
    }

    const check = async (userID, chatID) => {
        let status = false
        await db.collection('users')
            .doc(userID)
            .collection('friends')
            .doc(chatID)
            .get()
            .then( (data) => {
                ( data.data() ) ?
                    status = true : status = false
            }).catch( error => {
                alert(error.message)
                status = false
            })
        return status
    }

    const addChat = (userID, chatID, chatName, photoURL) => {

        check(userID, chatID)
        .then( (status) => {
            console.log(status)
            if (status==1) {
                if (Platform.OS === 'android')
                    ToastAndroid.show('Already in chat!', ToastAndroid.SHORT)
                // else if( Platform.OS === 'ios')
                //     AlertIOS('Already in chat!')
                else
                    alert('Already in chat!')
                navigation.replace('Drawer')
            } else {
                db.collection('users')
                    .doc(userID)
                    .collection('friends')
                    .doc(chatID)
                    .set({
                        userName: chatName,
                        userProfileURL: photoURL,
                        lastSeen: firebase.firestore.FieldValue.serverTimestamp()
                    })
                    .then(() => {
                        console.log('running...')
                        db.collection('users')
                            .doc(chatID)
                            .collection('friends')
                            .doc(userID)
                            .set({
                                userName: auth.currentUser.displayName,
                                userProfileURL: auth.currentUser.photoURL,
                                lastSeen: firebase.firestore.FieldValue.serverTimestamp()
                            }).then( () => {
                                sendFirstMsg(chatID)
                                navigation.replace('Drawer')
                            })
                    }).catch(error => alert('error'))
            }
        })
        
    }

    return (
        <View>
            {users.map(({ id, data: { userUID, userEmail, userName, photoURL }}) => (
                ( currentUser === userUID ) ?
                    null
                : (
                    <UserItemList
                        key={id}
                        chatName={userName}
                        userEmail={userEmail}
                        userID={currentUser}
                        photoURL={photoURL}
                        chatID={userUID}
                        addChat={addChat}
                    />
                )
            ) )}
        </View>
    )
}

export default AddChat

const styles = StyleSheet.create({})
