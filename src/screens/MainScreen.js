import React, { Component } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import CabinetScreen from './CabinetScreen';
import SpecialistScreen from './SpecialistScreen';

const Tab = createMaterialTopTabNavigator();

const MainScreen = (props) => {
    return(
        <Tab.Navigator 
            tabBarOptions={{ 
                tabBarActiveTintColor: "black",
                tabBarInactiveTintColor: "#FFFFFF",  
                labelStyle: { 
                    fontSize: 17,
                    color: '#AAB2BD',
                },
                style: { 
                    backgroundColor: '#F3F4F6',
                },               
                tabStyle: { 
                    margin: 5,
                },
                indicatorStyle: { 
                    backgroundColor: '#54B9D1', 
                    height: 4, 
                    borderRadius: 3,
                    marginLeft: 11,
                    width: '45%'
                },
                
            }}
        >
            <Tab.Screen name="Кабинет" component={ CabinetScreen } />
            <Tab.Screen name="Специалист" component={ SpecialistScreen } />
        </Tab.Navigator> 
    )
}

export default MainScreen