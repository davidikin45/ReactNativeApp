import React from 'react';
import { Animated  } from 'react-native';
import { createAppContainer, createStackNavigator, createBottomTabNavigator  } from 'react-navigation';

import Icon from '../components/UI/Icon/Icon';

import EventListScreen from "../screens/EventListScreen/EventListScreen";
import AddEventScreen from "../screens/AddEventScreen/AddEventScreen";

const ElementInformatioNavigator = createStackNavigator({
	MainList: {
		screen: EventListScreen,
		navigationOptions: () => ({
			title: 'Main List'
		})
	},
	ElementInfo: {
		screen: EventListScreen,
		navigationOptions: ({ navigation }) => ({
			title: `${navigation.state.params.name}'s Info`
		})
	}
}, {
	initialRouteName: 'MainList',
	navigationOptions: {
		headerStyle: {
			backgroundColor: 'white'
		}
	}
});

const TabNavigator = createBottomTabNavigator ({
	ListScreen: {
		screen: EventListScreen,
		navigationOptions: {
			tabBarLabel: 'List',
			tabBarIcon: ({ tintColor, focused }) => (
				<Icon
					nameAndroid={focused ? 'format-list-bulleted' : 'list'}
					nameIos={focused ? 'ios-list' : 'ios-list-box-outline'}
					size={26}
					style={{ color: tintColor }}
				/>
			)
		}
	},
	AddEvent: {
		screen: AddEventScreen,
		navigationOptions: {
			tabBarLabel: 'New',
			tabBarIcon: ({ tintColor, focused }) => (
				<Icon
					nameAndroid={focused ? 'add' : 'add-circle-outline'}
					nameIos={focused ? 'ios-add' : 'ios-add-circle-outline'}
					size={26}
					style={{ color: tintColor }}
				/>
			)
		}
	}
}, {
	initialRouteName: 'ListScreen',
	animationEnabled: true,
	tabBarPosition: 'bottom',
	configureTransition: () => ({
		timing: Animated.spring,
		tension: 1,
		friction: 25
	}),
	swipeEnabled: true,
	activeTintColor: 'red'
});

export const MainNavigator = createAppContainer(TabNavigator);