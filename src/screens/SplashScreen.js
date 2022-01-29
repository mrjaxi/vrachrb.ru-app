import { useNavigation } from '@react-navigation/native';
import React, { Component, useLayoutEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import baseApiURL from '../requests/baseApiURL';
import Request from '../requests/Request';

const SplashScreen = () => {

    const navigation = useNavigation()

    const isAuth = async () => {
      let data = await Request.post(baseApiURL + "Is_auth", {})
  
      data['response'] && data['response'] == true ? 
        navigation.navigate("MainScreen") : 
        navigation.navigate("AuthScreen")
    }
  
    useLayoutEffect(() => {
      isAuth()
    }, [])
 
    return (
        <View style={styles.mainContent}>
            <Image 
                source={ require('../images/logo.png') }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    mainContent: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
      }, 
})

export default SplashScreen;
