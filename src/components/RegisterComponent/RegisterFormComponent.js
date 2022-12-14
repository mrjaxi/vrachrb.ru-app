import React, { useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import SecondAuthButton from '../AuthComponent/SecondAuthButton';
import Request from '../../requests/Request';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { saveUserData } from '../../store/reducers/LoginSlice';
import BaseTextInput from "../AuthComponent/BaseTextInput";
import BaseSendButton from "../AuthComponent/BaseSendButton";
import AgreementComponent from "../AuthComponent/AgreementComponent";
import {Picker} from '@react-native-picker/picker';
import BaseDateTimePicker from "../AuthComponent/BaseDateTimePicker";
import {MultiPlatform} from "../MultiPlatform";
import Storage from "../../storage/Storage";
import Routes from "../../requests/Routes";
import { ScrollView } from 'react-native-gesture-handler'
import BaseSelectGender from "../AuthComponent/BaseSelectGender";

const RegisterFormComponent = () => {

    const navigation = useNavigation()
    const dispatch = useDispatch()

    const [name, setName]            = useState("")
    const [familia, setFamilia]      = useState("")
    const [last_name, setLast_name]  = useState("")
    const [gender, setGender]        = useState("ж")
    const [birth_date, setBirth_date]= useState()
    const [phone, setPhone]          = useState("")
    const [email, setEmail]          = useState("")
    const [password, setPassword]    = useState("")
    const [password2, setPassword2]  = useState("")

    const [agreementAccepted, setAgreementAccepted] = useState(false)

    const [response, setResponse]    = useState("")
    const [loading, setLoading] = useState(false)

    const register = async () => {
        if(!validateEmailPhonePass(email,phone)){
            return
        }
        setLoading(true)
        let dateBirth = birth_date.getUTCFullYear()+"."+(birth_date.getUTCMonth()+1)+"."+birth_date.getUTCDate()
        let data = {
            name:       name,
            familia:    familia,
            last_name:  last_name,
            gender:     gender,
            birth_date: dateBirth,
            phone:      phone,
            email:      email,
            password:   password,
        }
        let request = await Request.post(Routes.registerURL, data);

        setResponse(request)

        let day = birth_date.getUTCDate(),
            month = birth_date.getUTCMonth()+1,
            year = birth_date.getUTCFullYear();
        day = day < 10 ? "0"+day : day;
        month = month < 10 ? "0"+month : month;
        let dateRU = year+"-"+month+"-"+day

        let newUser = {
            auth: true,
            isSpecialist: false,
            first_name: name,
            second_name: familia,
            middle_name: last_name,
            username: email,
            gender: gender,
            birth_date: dateRU,
            email: email,
            phone: phone,
            photo: ""
        }
        if(request['response']){
            dispatch(saveUserData(newUser))
            await Storage.save("userData", newUser)
            navigation.reset({
                index: 0,
                routes: [{ name: 'MainNavigationScreen' }],
            })
        }
        setLoading(false)
    }

    const checkFilledField = () => {
        if (name && familia && last_name && gender && birth_date && phone && email && password && password2 && agreementAccepted){
            return true
        } else {
            return false
        }
    }

    function validateEmailPhonePass(email,phone) {
        let regMail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,10})$/;
        let regPhone = /^\d[\d\(\)\ -]{4,14}\d$/;

        let curDate = new Date()
        if(curDate < birth_date) {
            MultiPlatform.ToastShow("Выбранная дата больше нынешней")
            return false;
        }
        if(!regMail.test(email)) {
            MultiPlatform.ToastShow('Введите корректный email')
            return false;
        }
        if(!regPhone.test(phone)) {
            MultiPlatform.ToastShow('Введите корректный номер телефона')
            return false;
        }
        if(password !== password2){
            MultiPlatform.ToastShow('Пароли не совпадают')
            return false;
        }
        return true
    }

    return (
        <View style={styles.mainBlock}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ flex: 1, width: '100%', paddingLeft: MultiPlatform.AdaptivePixelsSize(15), paddingRight: MultiPlatform.AdaptivePixelsSize(15), }}
                contentContainerStyle={{ justifyContent: 'center', padding: 10}}
            >
                <View>
                    <BaseTextInput response={response} hint={"Имя"} setValue={setName}/>
                    <BaseTextInput response={response} hint={"Фамилия"} setValue={setFamilia}/>
                    <BaseTextInput response={response} hint={"Отчество"} setValue={setLast_name}/>
                    <BaseTextInput response={response} hint={"Номер телефона"} setValue={setPhone}/>
                    <BaseTextInput response={response} hint={"Электронная почта"} setValue={setEmail}/>
                    <BaseTextInput response={response} hint={"Пароль"} setValue={setPassword} pass={true}/>
                    <BaseTextInput response={response} hint={"Повторите пароль"} setValue={setPassword2} pass={true}/>
                    <BaseDateTimePicker hint={"Дата рождения"} response={response} setValue={setBirth_date}/>
                    <BaseSelectGender response={response} setValue={setGender} />
                </View>
                <View style={{ marginTop: 20 }}>
                    <AgreementComponent setValue={setAgreementAccepted}/>
                </View>
                <View style={ styles.btnBottom }>
                    { response['error'] &&
                        <Text style={{ color: "#F27C83", fontSize: MultiPlatform.AdaptivePixelsSize(15), paddingBottom: 10}}>{response['error']}</Text>
                    }
                    <BaseSendButton text={"Зарегистрироваться"} checkFields={checkFilledField} onPress={register} loading={loading}/>
                    <SecondAuthButton text={"Авторизоваться"} nav={"MailLoginScreen"} />
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    mainBlock: {
        flex: 1.1,
        width: '100%',
        backgroundColor: 'white',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    pickerStyle :{
        color: "black",
        marginTop: 10,
        marginBottom: 10,
    },
    textInputStyle: {
        borderBottomWidth: 2,
        width: MultiPlatform.AdaptivePixelsSize(350),
        marginTop: 5,
        fontSize: MultiPlatform.AdaptivePixelsSize(17),
        borderRadius: 1,
        color: '#434A53'
    },
    btnBottom: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
        marginTop: 30
    },
    textStyle: {
        color: '#FFFFFF',
        fontSize: MultiPlatform.AdaptivePixelsSize(17)
    },
    btnStyle: {
        width: MultiPlatform.AdaptivePixelsSize(320),
        height: MultiPlatform.AdaptivePixelsSize(60),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
    }
});

export default RegisterFormComponent
