import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-elements'

const AboutScreen = () => {
    return (
        <View style={styles.container}>
            <Text h2 style={{ alignSelf: 'center' }}>Halo App</Text>
            <Text style={{ alignSelf: 'center' }}>v1.0.0</Text>
            <Text style={styles.credit}>Swapnil Kaushik</Text>
        </View>
    )
}

export default AboutScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    credit: {
        position: 'absolute',
        bottom: 25,
        color: 'grey',
        alignSelf: 'center',
        letterSpacing: 3,
    }
})
