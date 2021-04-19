import React, { useEffect, useState } from 'react';
import { SectionList,View, Text, SafeAreaView, ScrollView, FlatList, KeyboardAvoidingView } from 'react-native';
// import {v4 as uuid } from 'uuid';
// import AsyncStorage from '@react-native-community/async-storage'

import ListItem, { SectionHeader, Separator } from '../component/ListItem';
import AddItem from '../component/AddItem';
import {useCurrentList} from '../util/ListManager'


// const updateStoredCurrentList = (list) => {
//     AsyncStorage.setItem('@@GroceryList/currentList', JSON.stringify(list))
// }

export default ({navigation}) => {
    const {list, loading, addItem, removeItem, cart, addToCart} = useCurrentList()

    if(loading) {
        return (
            <SafeAreaView>
                <Text>
                    Loading...
                </Text>
            </SafeAreaView>
        )
    }

    console.log('cart', cart);
    return (
        <SafeAreaView style={{ flex: 1}}>
            <KeyboardAvoidingView 
                style={{ flex: 1}}
                bahavior="padding"
            >
                <SectionList 
                    // data={list}
                    sections={[
                        {title: 'List', data: list},
                        {title: 'cart', data: cart} 
                    ]}
                    renderSectionHeader={({section}) => (
                        <SectionHeader title={section.title}/>
                    )}
                    renderItem={({ item, index }) => (  
                        <ListItem 
                            name={item.name}
                            onFavoritePress={() => alert('todo: handle favorite')}
                            isFavorite={index < 2}
                            onAddedSwipe={() => addToCart(item)}
                            onDeleteSwipe={() => removeItem(item.id)}
                            onRowpress={() => {
                                navigation.navigate('ItemDetails', {item})
                            }}
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