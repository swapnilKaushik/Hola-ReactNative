import React, { useLayoutEffect, useState, useEffect } from 'react'
import { ToastAndroid, StyleSheet, Text, View, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback, Keyboard, TextInput, TouchableOpacity, SafeAreaView } from 'react-native'
import { Avatar } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons'
import { db, auth } from './../firebase/firebase'
import DoubleClick from 'react-native-double-tap'
import * as firebase from 'firebase'

const ChatScreen = ({ navigation, route}) => {

    useLayoutEffect( () => {
        navigation.setOptions({ 
            headerBackTitleVisible: false,
            headerTitleAlign: 'flex-start',
            headerTitle: () => (
                <View style={{
                    flexDirection: 'row',
                    marginLeft: -100,
                }}>
                    <Avatar rounded
                        source={{
                            uri:
                                route.params.chatPhotoURL ||
                                'https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png'
                        }} />
                    <Text style={{
                        color: '#000',
                        marginLeft: 10,
                        fontWeight: '700',
                        fontSize: 18,
                        alignSelf: 'center',
                    }}>
                        {route.params.chatName}
                    </Text>
                </View>
            ),
        })
    }, [navigation])

    const [inputMessage, setInputMessage] = useState('')
    const [chatMessages, setChatMessages] = useState([])
    const [ userImg, setUserImg] = useState('')

    useEffect( () => {
        const unsubscribe = db.collection('users')
            .doc(auth.currentUser.uid)
            .collection('friends')
            .doc(route.params.chatID)
            .collection('message')
            .orderBy('timestamp', 'desc')
            .onSnapshot(snapshot => {
                setChatMessages( snapshot.docs.map( doc => ({
                    id: doc.id,
                    data: doc.data(),
                })))
            })

        db.collection('users')
            .doc(route.params.chatID)
            .get()
            .then(snapshot => {
                setUserImg(snapshot.data().photoURL)
            })
        return unsubscribe
    }, [db])

    useLayoutEffect(() => {
        db.collection('users')
            .doc(auth.currentUser.uid)
            .collection('friends')
            .doc(route.params.chatID)
            .update({
                lastSeen: firebase.firestore.FieldValue.serverTimestamp()
            })

    }, [db])

    const deleteMsg = (msgID) => {
        db.collection('users')
            .doc(auth.currentUser.uid)
            .collection('friends')
            .doc(route.params.chatID)
            .collection('message')
            .doc(msgID)
            .delete()
            .then( () => {
                if (Platform.OS === 'android')
                    ToastAndroid.show('deleted!', ToastAndroid.SHORT)
                // else if (Platform.OS === 'ios')
                //     AlertIOS('deleted!')
                else
                    alert('deleted!')
            })
            .catch( error => alert('something wrong'))
        // alert(msgID)
    }

    const sendMessage = () => {
        Keyboard.dismiss()
        if ( inputMessage === '' ) 
            return
        const time = firebase.firestore.FieldValue.serverTimestamp()
        db.collection('users')
            .doc(auth.currentUser.uid)
            .collection('friends')
            .doc(route.params.chatID)
            .collection('message')
            .add({
                timestamp: time,
                message: inputMessage,
                id: auth.currentUser.uid
            })
        db.collection('users')
            .doc(route.params.chatID)
            .collection('friends')
            .doc(auth.currentUser.uid)
            .collection('message')
            .add({
                timestamp: time,
                message: inputMessage,
                id: auth.currentUser.uid
            })
        
            setInputMessage('')
    }

    return (
        // <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
            style={styles.container}
                keyboardVerticalOffset={90}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}        
        >
            <TouchableWithoutFeedback 
                onPress={ Keyboard.dismiss }>
                <>
                <ScrollView style={styles.innerContainer}>
                    {/* Chat goes here */}
                    { chatMessages.map( ({ id, data}) => (
                        (route.params.chatID === data.id) ? (
                            <DoubleClick
                                key={id}
                                doubleTap={() => 
                                    deleteMsg(id)
                                }>
                                <View style={styles.receiver}>
                                    <Avatar
                                        position='absolute'
                                        rounded
                                        bottom={-12}
                                        right={-5}
                                        size={25}
                                        //Web
                                        containerStyle={{
                                            position: 'absolute',
                                            bottom: -12,
                                            left: -5,
                                        }}
                                        source={{
                                            uri: userImg
                                        }}
                                    />
                                    <Text style={{ color: 'white' }}>{data.message}</Text>
                                </View>
                            </DoubleClick>
                        ) : ( data.id === 'thats_my_id' ) ? (
                                <View style={styles.serverMsg} key={id}>
                                    <Text style={{ color: '#788084', fontSize: 12 }}>{data.message}</Text>
                                </View>
                            ) : (
                            <DoubleClick
                                key={id}
                                        doubleTap={() => 
                                    deleteMsg(id)
                                }>
                                <View
                                    style={styles.sender}>
                                        <Avatar
                                            position='absolute'
                                            rounded
                                            bottom={-12}
                                            right={-5}
                                            size={25}
                                            //Web
                                            containerStyle={{
                                                position: 'absolute',
                                                bottom: -12,
                                                right: -5,
                                            }}
                                            source={{
                                                uri: auth.currentUser.photoURL
                                            }}
                                        />
                                    <Text style={{ color: 'white'}}>{ data.message }</Text>
                                </View>
                            </DoubleClick>
                        )
                    ))} 
                </ScrollView>
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.inputMsg}
                            placeholder="Enter here..."
                            type="text"
                            value={inputMessage}
                            // numberOfLines={4}
                            // verticalAlign={'center'}
                            textAlignVertical={'center'}
                            multiline={true}
                            onChangeText={ text => setInputMessage(text)}
                            // onSubmitEditing={sendMessage}
                        />
                        <TouchableOpacity
                            style={styles.button}
                            onPress={sendMessage}
                            activeOpacity={0.5}
                        >
                            <Ionicons name="send" size={35} color="#2B68E6" />
                        </TouchableOpacity>
                    </View>
                </>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        // </SafeAreaView>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    innerContainer: {
        flex: 1,
        marginTop: 15,
    },
    serverMsg: {
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 20,
        maxWidth: '80%',
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: '#cce7f3',
        borderRadius: 1000,
    },
    sender: {
        padding: 15,
        marginBottom: 20,
        marginRight: 20,
        backgroundColor: 'green',
        borderRadius: 20,
        alignSelf: 'flex-end',
        maxWidth: '80%',
        borderBottomRightRadius: 0,
    },
    receiver: {
        padding: 15,
        marginBottom: 20,
        marginLeft: 20,
        backgroundColor: 'grey',
        borderRadius: 20,
        alignSelf: 'flex-start',
        maxWidth: '80%',
        borderBottomLeftRadius: 0,
    },
    inputView: {
        backgroundColor: '#f2f2f2',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingTop: 5,
        paddingBottom: 10,
        paddingHorizontal: 20,
        maxHeight: 200,
        minHeight: 'auto',
    },
    inputMsg: {
        bottom: 0,
        flex: 1,
        marginRight: 15,
        backgroundColor: '#ECECEC',
        paddingVertical: 8,
        paddingHorizontal: 20,
        color: 'grey',
        borderRadius: 30,
        maxHeight: 200,
        minHeight: 50,
    },
    button: {},
})
