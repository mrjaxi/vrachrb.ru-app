import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { MultiPlatform } from '../MultiPlatform';

const MainAuthButton = ({text, nav}) => {
    const navigation = useNavigation(); 

    return (
        <View style={{ marginTop: 8 }}>
            <TouchableOpacity style={ styles.btnStyle }
                onPress={() => navigation.navigate(nav)}>
                <Text style={ styles.textStyle }>{text}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    textStyle: {
        color: '#434A53',
        fontSize: MultiPlatform.AdaptivePixelsSize(17)
    },
    btnStyle: {
        width: MultiPlatform.AdaptivePixelsSize(320),
        height: MultiPlatform.AdaptivePixelsSize(60),
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        borderColor: '#CCD1D9',
        borderWidth: 2
    }
})

export default MainAuthButton
