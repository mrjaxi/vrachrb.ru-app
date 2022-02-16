import React, { Component, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import VKLogin from 'react-native-vkontakte-login';
import { MultiPlatform } from '../MultiPlatform';

const VkLoginButton = () => {

    useEffect(() => {
        VKLogin.initialize(3280318)
    }, [])

    const loginWithVk = async () => {
        try {
            const auth = await VKLogin.login(['first_name', 'last_name', 'photo', 'sex', 'email']);

        } catch (e){
            console.log("ERORR")
        }
    }

    return (
        <View>
            <TouchableOpacity 
                style={ styles.btnStyle }
                onPress={() => loginWithVk()}
            >
                <Text style={ styles.textStyle }>Войти через VK</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    textStyle: {
        color: '#FFFFFF',
        fontSize: MultiPlatform.AdaptivePixelsSize(17)
    },
    btnStyle: {
        width: MultiPlatform.AdaptivePixelsSize(320),
        height: MultiPlatform.AdaptivePixelsSize(60),
        backgroundColor: '#3375F6',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
    }
})

export default VkLoginButton
