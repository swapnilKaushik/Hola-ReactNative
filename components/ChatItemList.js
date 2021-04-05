import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements'
import { db, auth } from './../firebase/firebase'
import * as firebase from 'firebase'

const ChatItemList = ({ chatID, chatName, enterChat }) => {

    const [msgs, setMsgs] = useState([])
    const [count, setCount] = useState(0)
    const [frndData, setFrndData] = useState([])

    const countUnreadMessages = () => {
        let count = 0
        db.collection('users')
            .doc(auth.currentUser.uid)
            .collection('friends')
            .doc(chatID)
            .get()
            .then( snapshot => {
                for (let i = 0; i < msgs.length; i++) {
                    // console.log(msgs[i].timestamp)
                    if (msgs[i].timestamp.seconds > snapshot.data().lastSeen.seconds)
                        count = count + 1
                }
                setCount(count)
                // console.log(snapshot.data().lastSeen)
            })
        // alert(count)
    }

    useEffect(() => {
        const unsubscribe = db.collection('users')
            .doc(auth.currentUser.uid)
            .collection('friends')
            .doc(chatID)
            .collection('message')
            .orderBy('timestamp', 'desc')
            .onSnapshot(snapshot => {
                setMsgs(snapshot.docs.map(doc => doc.data()))
                countUnreadMessages()
            })

        db.collection('users')
            .doc(chatID)
            .get()
            .then(snapshot => {
                setFrndData(snapshot.data())
            })

        return unsubscribe
    }, [db, auth, chatID])

    return (
        <ListItem onPress={() => enterChat(chatName, chatID, frndData.photoURL) } bottomDivider>
            <Avatar
                rounded
                source={{
                    uri:
                        frndData.photoURL || 'https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png'
                }}
            />
            <ListItem.Content>
                <ListItem.Title style={{ fontWeight: "800" }}>
                    {chatName}
                </ListItem.Title>
                <ListItem.Subtitle
                    numberOfLines={1}
                    /* to add ellipsize if text is too long */
                    ellipsizeMode="tail" >
                    {msgs?.[0]?.message || 'error...'}
                </ListItem.Subtitle>
            </ListItem.Content>
                {( count == 0 ) ?
                    null
                : ( <View style={styles.bubble}>
                        <Text style={{ color: 'white' }}>{count}</Text> 
                    </View> )}
        </ListItem>
    )
}

export default ChatItemList

const styles = StyleSheet.create({
    bubble: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        backgroundColor: 'green',
        height: 25,
        width: 25,
        color: '#fff'
    }
})
