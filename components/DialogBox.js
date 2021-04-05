import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';

const DialogBox = ({ show, func, data }) => {

    const [visible, setVisible] = useState(false);
    // const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);

    useEffect( () => {
        setVisible(show)
    }, [show])

    return (
        <View>
            {/* <Button onPress={showDialog}>Show Dialog</Button> */}
            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title>Delete</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>Delete Message?</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={hideDialog}>Cancel</Button>
                        <Button onPress={ () => func(data)}>Delete</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    )
}

export default DialogBox

const styles = StyleSheet.create({})
