import React, { useState, useEffect, useLayoutEffect } from 'react'
import { StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native'
import ChatItemList from './../components/ChatItemList'
import { db, auth } from './../firebase/firebase'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const RegisterScreen = ({ navigation }) => {

    const [friends, setFriends] = useState([])

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Hola',
            headerShown: true,
        })
    }, [navigation])

    useEffect(() => {
        const unsubscribe = db.collection('users')
            .doc(auth.currentUser.uid)
            .collection('friends')
            .onSnapshot( snapshot => {
                // alert(snapshot.docs[0].id)
                setFriends( snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            })

        return unsubscribe
    }, [db])

    const enterChatScreen = (chatName, chatID, chatPhotoURL) => {
        navigation.navigate('Chat', {
            chatName: chatName,
            chatID: chatID,
            chatPhotoURL: chatPhotoURL,
        })
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.innerContainer}>
                {friends.map(({ id, data: {userName} }) => (
                    <ChatItemList
                        key={id}
                        chatID={id}
                        chatName={userName}
                        enterChat={enterChatScreen} />
                ))}
            </ScrollView>
            <TouchableOpacity
                style={styles.floatingButton}
                onPress={ () => navigation.jumpTo('AddChat')}
            >
                <Icon
                    name="message-reply-text"
                    color={'white'}
                    size={30}
                />
            </TouchableOpacity>
        </SafeAreaView>
    )

}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    innerContainer: {
        flex: 1,
    },
    floatingButton: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 65,
        width: 65,
        position:'absolute',
        right: 30,
        bottom: 30,
        borderRadius: 40,
        backgroundColor: 'green',
        shadowColor: 'grey',
        shadowOffset: { height: 1, width: 1 },
        elevation: 4,
    },
})