import React,{ useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';


let user1Point= 0;
let user2Point = 0;
export default class MagicNumber extends React.Component {
    constructor(props) {  
        super(props);  
        this.state = {number: ''};  
    }  

    componentDidMount(){

    }
    render() {
        const {navigation} = this.props

        return (
            <View>
            <Text>Quick Word Game</Text>
                
                <TouchableOpacity style={styles.signupBtn}
                    onPress={() => { navigation.navigate('Home') }}>
                    <Text style={styles.loginText}>HOME</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#003f5c',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputView: {
        width: "80%",
        backgroundColor: "#465881",
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20
    },
    inputText: {
        height: 50,
        color: "white"
    },
    forgot: {
        color: "white",
        fontSize: 11
    },
    loginBtn: {
        width: "80%",
        backgroundColor: "#fb5b5a",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10
    },
    signupBtn: {
        width: "80%",
        backgroundColor: "#fb5b5a",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center"
    },
    loginText: {
        color: "white"
    }
});