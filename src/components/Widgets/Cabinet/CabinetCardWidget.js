import React from 'react'
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {useDispatch} from "react-redux";
import {setSpecialistData, setSpecialistRoute} from "../../../store/reducers/SpecSlice";
import {useNavigation} from "@react-navigation/native";
import { MultiPlatform } from '../../MultiPlatform';
import Routes from '../../../requests/Routes';

const CabinetCardWidget = ({ data }) => {

    const dispatch = useDispatch()
    const navigation = useNavigation()

    function setCabinet(){
        dispatch(setSpecialistRoute(Routes.getSpecialistBySpecialtyIDURL))
        dispatch(setSpecialistData({specialtyId : data.id}))
        navigation.navigate("Специалист")
    }

    return (
            <TouchableOpacity style={ styles.mainContent } onPress={() => setCabinet()}>
                <View style={ styles.wrapperBlock }>
                    <View style={{
                        width: MultiPlatform.AdaptivePercentSize(42)
                    }}>
                        <Text numberOfLines={2} ellipsizeMode='tail' style={ styles.descriptionText }>{ data.title }</Text>
                    </View>
                    <Image
                        style={{
                            width: MultiPlatform.AdaptivePixelsSize(8),
                            resizeMode: 'contain',
                        }}
                        source={ require('../../../images/shevron.png') }
                    />
                </View>
            </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    mainContent: {
        height: MultiPlatform.AdaptivePixelsSize(75),
    },
    descriptionText: {
        color: '#434A53',
        fontSize: MultiPlatform.AdaptivePixelsSize(19),
        fontWeight: '500',
    },
    imageStyle: {
        width: MultiPlatform.AdaptivePixelsSize(80),
        height: MultiPlatform.AdaptivePixelsSize(80),
        borderRadius: 150,
    },
    wrapperBlock: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        borderBottomWidth: 1,
        borderColor: '#E6E9ED',
        paddingRight: MultiPlatform.AdaptivePixelsSize(15),
        paddingLeft: MultiPlatform.AdaptivePixelsSize(15),
    }
});

export default CabinetCardWidget
