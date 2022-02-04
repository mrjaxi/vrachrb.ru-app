import React, { Component, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList, Image, Alert } from 'react-native';
import DocumentPicker from 'react-native-document-picker'
import uuid from 'react-native-uuid';
import baseURL from "../../requests/baseURL";

const UploadFileBase = ({ component }) => {

    let ImagesData = [{
        index: 0,
        id: uuid.v4(),
        setted: false,
        defaultImage: true,
        image: '../../images/plus.png'
    }]

    const [imageData, setImageData] = useState(ImagesData)

    const deleteImage = async (id) => {
        let imageDataPrev = [...imageData]

        imageDataPrev[id].image = '../../images/plus.png'
        imageDataPrev[id].setted = true
        imageDataPrev[id].defaultImage = true 

        setImageData(imageDataPrev)
    }

    const imagePick = async (id) => {
        const result = await DocumentPicker.pick({
            type: [DocumentPicker.types.images]
        });

        setImageData(imageDataPrev)

        let imageDataPrev = [...imageData]

        imageDataPrev[id].image = result[0].uri
        !imageDataPrev[id].setted && imageDataPrev.push({
            index: imageDataPrev[id].index + 1,
            id: uuid.v4(),
            setted: false,
            defaultImage: true,
            image: '../../images/plus.png'
        })
        imageDataPrev[id].defaultImage = false
        imageDataPrev[id].setted = true

        setImageData(imageDataPrev)
        await upload(result[0])
    }

    const upload = async (resp) => {
        let data = new FormData();
        try {
            data.append('file', {
                uri: resp.uri,
                type: resp.type,
                name: resp.name || resp.fileName
            });
            const response = await fetch(baseURL + 'uploader?key=analysis', {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body: data
            });
            const text = await response.text();
            console.log('text', text);
            let json = JSON.parse(text);
            if (json.state === 'success') {
                Alert.alert("Text");
            } else {
                Alert.alert(json.message);
            }
        } catch (e) {
            Alert.alert(e);
        }
    }

    return (
        <View
            style={{
                width: '100%'
            }}
        >
            {
                component
            }
            <View style={{
                marginTop: 5
            }}>
                <FlatList 
                    data={imageData}
                    horizontal={true}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => {
                        return(
                            <View>
                                { !item.defaultImage &&
                                    <TouchableOpacity onPress={() => deleteImage(item.index)} style={ styles.deleteButtonStyle }>
                                        <Image style={{ width: '50%', height: '50%' }} source={ require('../../images/delete_cross.png') }/>
                                    </TouchableOpacity>
                                }
                                <TouchableOpacity onPress={() => imagePick(item.index)} style={ styles.uploadButtonStyle }>
                                    <Image 
                                        style={{ width: !item.defaultImage ? 100 : 40, height: !item.defaultImage ? 100 : 40, borderRadius: 8 }} 
                                        source={ !item.defaultImage ? { uri: item.image } : require('../../images/plus.png')}
                                    />
                                </TouchableOpacity>
                            </View>
                        )
                    }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    additionalFieldStyle: {
        fontSize: 15,
        color: '#434A53',
        fontWeight: '400',
    },
    uploadButtonStyle: {
        width: 100,
        height: 100,
        borderColor: '#CCD1D9',
        borderWidth: 2,
        borderStyle: 'dashed',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
        marginTop: 12,
        marginBottom: 10
    },
    deleteButtonStyle: {
        position: 'absolute',
        right: 8,
        top: 5,
        width: 26,
        height: 26,
        backgroundColor: '#F27C83',
        borderRadius: 50,
        zIndex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default UploadFileBase;
