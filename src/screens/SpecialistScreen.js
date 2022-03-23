import React, { useState, useEffect } from 'react'
import { StyleSheet, View, ActivityIndicator, RefreshControl, FlatList, StatusBar, Platform } from 'react-native';
import SpecialistCardWidget from '../components/Widgets/Specialist/SpecialistCardWidget';
import Request from '../requests/Request'
import {useSelector} from "react-redux";
import BaseSearchComponent from '../components/HeaderComponent/BaseSearchComponent';
import Routes from "../requests/Routes";
import { FlatList as FlatGestureList } from 'react-native-gesture-handler';
import BottomIssueCard from '../components/Widgets/Specialist/BottomIssueCard'

const SpecialistScreen = () => {

    const [specialist, setSpecialist] = useState()
    const [filteredSpecialist, setFilteredSpecialist] = useState()
    const [loading, setLoading] = useState(false)
    const specialistRoute = useSelector(state => state.SpecSlice.specialistRoute)
    const specialistData = useSelector(state => state.SpecSlice.specialistData)

    const [visible, setVisible] = useState(false)
    const [text, setText] = useState("")

    const getSpecialistData = (route = Routes.getSpecialistsURL, data= {}) => {
        setLoading(true)
        Request.get(route, data)
            .then(response => { setSpecialist(response), setLoading(false), setFilteredSpecialist(response), setText("")})
        setVisible(false)
    };

    const searchCabinetItem = (text) => {
        let data = specialist['response'].filter(specialist => {
            return (specialist.User.first_name + " " + specialist.User.second_name + " " + specialist.User.middle_name).toLocaleLowerCase().includes(text.toLocaleLowerCase())
        })

        setFilteredSpecialist({ 'response' : data })
    }

    useEffect(() => {
        getSpecialistData(specialistRoute, specialistData)
    }, [specialistData])


    return (
        <View style={ styles.mainContent }>
            {
                Platform.OS == 'ios' &&
                <StatusBar backgroundColor={"#F3F4F6"} />
            }
            { loading ? 
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size={'large'} />
                </View> : 
                (
                <View style={{
                    width: '100%',
                    height: '100%'
                }}>
                    <BaseSearchComponent value={text} setValue={setText} searchItem={searchCabinetItem}/>
                    {
                        Platform.OS == 'ios' ? 
                        (
                            <FlatGestureList
                                refreshControl={
                                    <RefreshControl
                                        refreshing={loading}
                                        onRefresh={() => { getSpecialistData() }}
                                    />
                                }
                                style={{
                                    width: '100%',
                                }}
                                onEndReached={() => setVisible(true)}
                                data={filteredSpecialist && filteredSpecialist['response']}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item }) => {
                                    return(
                                        <SpecialistCardWidget data={ item }/>
                                    )
                                }} 
                            />
                        ) :
                        (
                            <FlatList
                                refreshControl={
                                    <RefreshControl
                                        refreshing={loading}
                                        onRefresh={() => { getSpecialistData() }}
                                    />
                                }
                                style={{
                                    width: '100%',
                                }}
                                onEndReached={() => setVisible(true)}
                                initialNumToRender={10}
                                data={filteredSpecialist && filteredSpecialist['response']}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item }) => {
                                    return(
                                        <SpecialistCardWidget data={ item }/>
                                    )
                                }} 
                            />
                        )
                    }
                    <BottomIssueCard show={visible}/>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    mainContent: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: 'white',
      width: '100%',
      height: '100%'
    }, 
});

export default SpecialistScreen
