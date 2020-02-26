import React, { Component } from 'react'
import { View,StyleSheet} from 'react-native'

import { Router, Stack, Scene } from 'react-native-router-flux'
import Home from './components/Home'
import SearchResult from './components/SearchResult'


export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return <View style={{flex:1}}>      
        <Router sceneStyle={{backgroundColor:'white'}}>
                <Stack key="root">
                    <Scene key="home" component={Home} title="" hideNavBar={true}/>
                    <Scene key="searchresult" component={SearchResult} hideNavBar={true}/>
                </Stack>
            </Router>
    </View>

    }
}