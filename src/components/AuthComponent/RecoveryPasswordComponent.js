import React, { useState, Component } from 'react'
import { View, StyleSheet, Text, ScrollView } from 'react-native'
import SecondAuthButton from '../AuthComponent/SecondAuthButton';
import Request from '../../requests/Request';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import BaseTextInput from "../AuthComponent/BaseTextInput";
import BaseSendButton from "./BaseSendButton";
import { MultiPlatform } from '../MultiPlatform';
import Routes from "../../requests/Routes";
import BackButton from '../HeaderComponent/BackButton';


const RecoveryPasswordComponent = () => {
    const [email, setEmail]       = useState("")
    const [response, setResponse] = useState("")
    const [loading, setLoading] = useState(false)

    const register = async () => {
        setLoading(true)

        let data = {
            email: email,
        }

        let request = await Request.post(Routes.recoverPasswordURL, data);

        setResponse(request)

        setLoading(false)
    }

    const checkFilledField = () => {
        if (email){
            return true
        } else {
            return false
        }
    }

    return (
        <View style={ styles.mainBlock }>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ width: '100%', paddingLeft: MultiPlatform.AdaptivePixelsSize(15), paddingRight: MultiPlatform.AdaptivePixelsSize(15), flex: 1 }}
                contentContainerStyle={{flexGrow: 1, justifyContent: 'center', padding: 10}}
            >
                <View>
                    <BaseTextInput response={response} hint={"Электронная почта"} setValue={setEmail}/>
                    { response['error'] &&
                    <Text style={styles.negativeResponseStyle}>{response['error']}</Text>
                    }
                    { response['response'] &&
                    <Text style={styles.positiveResponseStyle}>{response['response']}</Text>
                    }
                </View>
                <View style={ styles.btnBottom }>
                    <BaseSendButton text={"Восстановить"} checkFields={checkFilledField} onPress={register} loading={loading}/>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    mainBlock: {
        backgroundColor: 'white',
        flex: 0.7,
        width: '100%',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnBottom: {
        marginTop: MultiPlatform.AdaptivePixelsSize(25),
        justifyContent: 'center',
        alignItems: 'center'
    },
    positiveResponseStyle: {
        color: "#58BE3F",
        flexShrink: 1,
        fontSize: MultiPlatform.AdaptivePixelsSize(15)
    },
    negativeResponseStyle: {
        color: "#F27C83",
        flexShrink: 1,
        fontSize: MultiPlatform.AdaptivePixelsSize(15)
    },
});

export default RecoveryPasswordComponent
