import React from 'react'
import CurrentList from '../screens/CurrentList'
import ItemDetails from '../screens/ItemDetails'
import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {Text, Image, Platform } from 'react-native'
import favouritesList from '../screens/favouritesList'

const Stack = createStackNavigator() 

const CurrentListStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="CurrentList" component={CurrentList}/>
                {/* // options={({ route }) => ({ headerTitle: route.params.name })}/> */}
            <Stack.Screen 
            name="ItemDetails" 
            component={ItemDetails}
            options={({route}) => {
                return {
                    headerTitle: () => {
                        return <Text>{route.params.item.name}</Text>
                    }
                }
            }}
            />
        </Stack.Navigator>
    )  
};

const FavouritesListStack = () => {
    return (
       <Stack.Navigator>
           <Stack.Screen name="FavouritesList" component={favouritesList}/>
       </Stack.Navigator>
    )
}
const Tab = createBottomTabNavigator()

const Tabs = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, }) => {
                    let image;
                    if(route.name === 'Shopping List') {
                        image = Platform.select({
                            ios: require('../assets/icons/ios-list.png'),
                            android: require('../assets/icons/md-list.png')
                        })
                    } else {
                        image = Platform.select({
                            ios: focused ? require('../assets/icons/ios-star.png') : 
                                require('../assets/icons/ios-star-outline.png'),
                            android: focused ? require('../assets/icons/md-star.png'): 
                                require('../assets/icons/md-star-outline.png')
                        })
                    }
                  
                    return <Image source={image}
                    resizeMode= 'contain'
                    style={{width: 25, tintColor: color}}
                    />
                }
            })}>
                <Tab.Screen name="Shopping List" component={CurrentListStack}/>
                <Tab.Screen name="FavouritesList" component={FavouritesListStack}/>
            </Tab.Navigator>
    </NavigationContainer>
    )
}
export default Tabs