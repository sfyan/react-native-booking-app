import React, { Component } from 'react'
import { View, Image, Text, ImageBackground, TouchableHighlight,Button} from 'react-native'
import ImagePicker from 'react-native-image-picker'

var photoOptions={
    title:'请选择',
    cancelButtonTitle:'取消',
    takePhotoButtonTitle:'拍照',
    chooseFromLibraryButtonTitle:'选择相册',
    quality:0.75,
    allowsEditing:true,
    noData:false,
    storageOptions:{
        skipBackup:true,
        path:'images'
    }
}
export default class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: 'Sean',
            imgURL:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1863916270,145947116&fm=11&gp=0.jpg'
    }
}

    render() {
        return <View style={{ backgroundColor: 'rgba(255,255,255,1)', height: '100%', width: '85%',padding:20, }}>
            <Image source={{uri:this.state.imgURL}} style={{ width: 150, height: 150, borderRadius: 75 }}></Image>
            <Text style={{fontSize:16,textAlign:'center',width:150}}>{this.state.userName}</Text>
            <View style={{width:80,marginLeft:35}}><Button title='更新图片' onPress={this.cameraAction}></Button></View>
            <Text style={{fontSize:16,marginVertical:20}}>Menu.制作中...</Text>
        </View>
    }

    cameraAction=()=>{
        ImagePicker.showImagePicker(photoOptions,(response)=>{
            if(response.didCancel){
                return;
            }
            this.setState({
                imgURL:response.uri,
            })
        })
    }


}

