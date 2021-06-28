import React,{ useState } from 'react';
import { Text, View , TouchableOpacity, StyleSheet,StatusBar,SafeAreaView} from 'react-native';


export default class MagicNumber extends React.Component {
    
    render() {
        const {navigation} = this.props

        return (
            <SafeAreaView style={styles.container}>
            <Text style={{fontSize:50}}>Home</Text>
            <Text style={{fontSize:20,marginBottom:5}}>Welcome to cross pwgame!</Text>
            <TouchableOpacity style={styles.signupBtn}
                    onPress={() => navigation.navigate('Pregame') }>
                    <Text style={styles.loginText}>       ROOM        </Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#818181',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: StatusBar.currentHeight,
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
        backgroundColor: "#fb5b5a",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10
    },
    signupBtn: {
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