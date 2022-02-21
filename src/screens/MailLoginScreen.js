import React, { Component } from 'react'
import { View, Image, KeyboardAvoidingView } from 'react-native'
import LoginFormComponent from '../components/LoginComponent/LoginFormComponent'
import { MultiPlatform } from '../components/MultiPlatform'

const MailLoginScreen = () => {
    return (
        <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'} style={{
            flex: 1,
            width: '100%',
            justifyContent: 'flex-end',
            alignItems: 'center',
            backgroundColor: "#F3F4F6"
        }}>
            <View style={{
                flex: 0.6,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Image
                    style={{
                        width: MultiPlatform.AdaptivePixelsSize(243),
                        height: MultiPlatform.AdaptivePixelsSize(83)
                    }}
                    source={require("../images/logo.png")} 
                />
            </View>
            <LoginFormComponent />
        </KeyboardAvoidingView>
    )
}

export default MailLoginScreen
