import React from 'react'
import { StyleSheet } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements'

const UserItemList = ({ chatName, userID, userEmail, chatID, photoURL, addChat }) => {

    return (
        <ListItem onPress={() => addChat(userID, chatID, chatName, photoURL)} bottomDivider>
            <Avatar
                rounded
                source={{
                    uri: 
                        photoURL ||
                        'https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png'
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
                        {userEmail}
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
}

export default UserItemList

const styles = StyleSheet.create({})
