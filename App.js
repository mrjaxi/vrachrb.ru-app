import React, {useEffect} from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch } from "react-redux";
import { saveUserData } from "./src/store/reducers/LoginSlice";
import { OverflowMenuProvider } from 'react-navigation-header-buttons';
import { MultiPlatform } from './src/components/MultiPlatform';
import { Notifications } from 'react-native-notifications';
import { Platform } from 'react-native';
import Storage from "./src/storage/Storage";
import Routes from './src/requests/Routes';
import Request from './src/requests/Request';
import NotificationAgent from './src/components/NotificationManager/NotificationAgent';
import AuthScreen from './src/screens/AuthScreen';
import MailLoginScreen from './src/screens/MailLoginScreen';
import StartScreen from './src/screens/AnamnezScreens/StartScreen';
import ModalScreen from './src/screens/ModalScreen';
import QuestionsScreen from './src/screens/AnamnezScreens/QuestionsScreen';
import SplashScreen from './src/screens/SplashScreen';
import CancelButton from './src/components/HeaderComponent/CancelButton';
import BackButton from './src/components/HeaderComponent/BackButton';
import ChatScreen from './src/screens/ChatScreen'
import MainNavigationScreen from './src/screens/MainNavigationScreen';
import RegisterScreen from "./src/screens/RegisterScreen";
import RecoveryPasswordScreen from "./src/screens/RecoveryPasswordScreen";
import DisplayAnamnezScreen from './src/screens/AnamnezScreens/DisplayAnamnezScreen';
import OutpatientCardScreen from './src/screens/AnamnezScreens/OutpatientCardScreen'
import NextAppleAuth from "./src/screens/NextAppleAuth";

const Stack = createNativeStackNavigator();

global.count = 0

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        Notifications.registerRemoteNotifications();

        let remoteNotify = Notifications.events().registerRemoteNotificationsRegistered((event) => {
            if (global.count == 0){
                Request.post(Routes.SaveDeviceToken, {
                    token: event.deviceToken,
                    type: Platform.OS == 'ios' ? 1 : 2
                })
                global.count += 1
            } 
        })

        setTimeout(() => {
            Platform.OS == 'android' && remoteNotify.remove()
        }, 1) 

        NotificationAgent.registerNotificationEvents(true)

        Storage.get("userData")
            .then((data) => dispatch(saveUserData(data)))

        global.count = 0
    },[])

    return (
        <OverflowMenuProvider>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name={"SplashScreen"}
                        options={{headerShown: false}}
                        component={SplashScreen}
                    />
                    <Stack.Screen
                        name={"AuthScreen"}
                        options={{headerShown: false}}
                        component={AuthScreen}
                    />
                    <Stack.Screen
                        name="RegisterScreen"
                        options={{headerShown: false}}
                        component={RegisterScreen}
                    />
                    <Stack.Screen
                        name="RecoveryPasswordScreen"
                        options={{headerShown: false}}
                        component={RecoveryPasswordScreen}
                    />
                    <Stack.Screen
                        name="MailLoginScreen"
                        options={{headerShown: false}}
                        component={MailLoginScreen}
                    />
                    <Stack.Screen
                        name={"NextAppleAuth"}
                        options={{headerShown: false}}
                        component={NextAppleAuth}
                    />
                    <Stack.Screen
                        name={"MainNavigationScreen"}
                        options={{headerShown: false}}
                        component={MainNavigationScreen}
                    />
                    <Stack.Screen
                        name={"ChatScreen"}
                        options={{
                            title: "Консультации",
                            headerStyle: {
                                backgroundColor: '#FFFFFF'
                            },
                            headerTitleAlign: 'center',
                            headerTitleStyle: {
                                color: "#434A53",
                                fontWeight: '500',
                                fontSize: MultiPlatform.AdaptivePixelsSize(19),
                            },
                            headerBackVisible: false,
                            headerLeft: () => (
                                <BackButton/>
                            ),
                        }}
                        component={ChatScreen}
                    />
                    <Stack.Screen
                        name="StartScreen"
                        // options={{ header: props => <AnamnezHeader page={1} /> }}
                        options={{
                            title: '1/2',
                            headerBackVisible: false,
                            headerStyle: {
                                backgroundColor: '#FFFFFF',
                                padding: 20
                            },
                            headerTitleStyle: {
                                fontSize: MultiPlatform.AdaptivePixelsSize(21),
                                color: '#434A53',
                                fontWeight: '400'
                            },
                            headerShadowVisible: false,
                            headerTitleAlign: 'center',
                            headerRight: () => (
                                <CancelButton/>
                            ),
                            headerLeft: () => (
                                <BackButton/>
                            )
                        }}
                        component={StartScreen}
                    />
                    <Stack.Screen
                        name="ModalScreen"
                        options={{
                            headerBackVisible: false,
                            title: "",
                            headerStyle: {
                                backgroundColor: '#FFFFFF',
                                padding: 20
                            },
                            headerTitleStyle: {
                                fontSize: MultiPlatform.AdaptivePixelsSize(21),
                                color: '#434A53',
                                fontWeight: '400'
                            },
                            headerShadowVisible: false,
                            headerTitleAlign: 'center',
                            headerLeft: () => (
                                <BackButton/>
                            )
                        }}
                        component={ModalScreen}
                    />
                    <Stack.Screen
                        name="OutpatientCardScreen"
                        options={{
                            title: 'Амбулаторная карта',
                            headerBackVisible: false,
                            headerStyle: {
                                backgroundColor: '#FFFFFF',
                            },
                            headerTitleStyle: {
                                fontSize: MultiPlatform.AdaptivePixelsSize(21),
                                color: '#434A53',
                                fontWeight: '500'
                            },
                            headerShadowVisible: false,
                            headerTitleAlign: 'center',
                            headerLeft: () => (
                                <BackButton/>
                            )
                        }}
                        component={OutpatientCardScreen}
                    />
                    <Stack.Screen
                        name="DisplayAnamnezScreen"
                        options={{
                            title: 'Анамнез',
                            headerBackVisible: false,
                            headerStyle: {
                                backgroundColor: '#FFFFFF',
                            },
                            headerTitleStyle: {
                                fontSize: MultiPlatform.AdaptivePixelsSize(21),
                                color: '#434A53',
                                fontWeight: '500'
                            },
                            headerShadowVisible: false,
                            headerTitleAlign: 'center',
                            headerLeft: () => (
                                <BackButton/>
                            )
                        }}
                        component={DisplayAnamnezScreen}
                    />
                    <Stack.Screen
                        name="QuestionsScreen"
                        // options={{ header: props => <AnamnezHeader page={2} /> }}
                        options={{
                            title: '2/2',
                            headerBackVisible: false,
                            headerStyle: {
                                backgroundColor: '#FFFFFF',
                            },
                            headerTitleStyle: {
                                fontSize: MultiPlatform.AdaptivePixelsSize(21),
                                color: '#434A53',
                                fontWeight: '400'
                            },
                            headerShadowVisible: false,
                            headerTitleAlign: 'center',
                            headerRight: () => (
                                <CancelButton/>
                            ),
                            headerLeft: () => (
                                <BackButton/>
                            )
                        }}
                        component={QuestionsScreen}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </OverflowMenuProvider>
    );
};

export default App;
