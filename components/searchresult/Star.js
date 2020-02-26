import React, { Component } from 'react'
import { View} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Star extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return <View style={{margin:0.5}}>
         <Icon name="star" size={15} color="#ffbb02"/>
        </View>
    }

}
