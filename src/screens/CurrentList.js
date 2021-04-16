import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, FlatList, KeyboardAvoidingView } from 'react-native';
// import {v4 as uuid } from 'uuid';
// import AsyncStorage from '@react-native-community/async-storage'

import ListItem, { Separator } from '../component/ListItem';
import AddItem from '../component/AddItem';
import {useCurrentList} from '../util/ListManager'


// const updateStoredCurrentList = (list) => {
//     AsyncStorage.setItem('@@GroceryList/currentList', JSON.stringify(list))
// }

export default () => {
    const {list, loading, addItem, removeItem} = useCurrentList()
    // const [list, setList] = useState([])
    // const [loading, setLoading] = useState(true) 

    // const addItem = (text) => {
    //     setList([{ id: uuid(), name: text }, ...list])
    //     setList(newList)
    //     updateStoredCurrentList(newList)
    // }

    // const removeItem = (id) => {
    //     const newList = list.filter(item => item.id !== id);
    //     setList(newList)
    //     updateStoredCurrentList(newList)
    // }

    // useEffect(() => {
    //     setTimeout(() => {
    //         AsyncStorage.getItem('@@GroceryList/currentList')
    //         .then(data => JSON.parse(data))
    //         .then(data => {
    //             if (data) {
    //                 setList(data)
    //             }
    //             setLoading(false)
    //         })
    //     }, 2000)
    // }, [])

    if(loading) {
        return (
            <SafeAreaView>
                <Text>
                    Loading...
                </Text>
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1}}>
            <KeyboardAvoidingView 
                style={{ flex: 1}}
                bahavior="padding"
            >
                <FlatList 
                    data={list}
                    renderItem={({ item, index }) => (
                        <ListItem 
                            name={item.name}
                            onFavoritePress={() => alert('todo: handle favorite')}
                            isFavorite={index < 2}
                            onAddedSwipe={() => removeItem(item.id)}
                            onDeleteSwipe={() => removeItem(item.id)}
                        />
                    )}
                    keyExtractor={(item) => item.id}
                    ItemSeparatorComponent={() => <Separator />}
                    ListHeaderComponent={() => (
                        <AddItem 
                            onSubmitEditing={({ nativeEvent: { text } }) => addItem(text)}
                        />
                    )}
                />
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
    // return (
    //     <SafeAreaView>
    //         <ScrollView>
    //             {nachos.map((item, index)=>(
    //                 <React.Fragment key={item.id}>
    //                     <ListItem 
    //                         name={item.name}
    //                         onFavoritePress={() => alert('todo: handle favorite')}
    //                         isFavorite={index < 2}
    //                     />
    //                     <Separator />
    //                 </React.Fragment>
    //             ))}
    //         </ScrollView>
    //     </SafeAreaView>
    // )
};