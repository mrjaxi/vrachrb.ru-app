import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'

const BaseSearchComponent = ({ searchItem, value, setValue }) => {
    return (
        <View style={ styles.mainContent }>
            <TextInput 
                defaultValue={value}
                style={ styles.textInputStyle } 
                placeholder='Поиск...'
                placeholderTextColor={"#AAB2BD"}
                onChangeText={text => { text !== "" ? setValue(text) : "", searchItem(text) }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    mainContent: { 
        width: '100%', 
        justifyContent: 'flex-start', 
        alignItems: 'center', 
        marginTop: 10,
        marginBottom: 10
    },
    textInputStyle: { 
        backgroundColor: '#F3F4F6', 
        paddingLeft: 15, 
        width: '95%',
        height: 40, 
        borderRadius: 30, 
        color: '#434A53', 
        fontSize: 15 
    }
})

export default BaseSearchComponent