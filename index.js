import React, { Component } from 'react';
import { AppRegistry, Text, AsyncStorage, StyleSheet, TextInput, View, Alert, Button, FlatList, TouchableOpacity } from 'react-native';
//import AppBodyData from './appBodyData';

class MainProject extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: ''
        };
        this.persistData = this.persistData.bind(this);
    }

    state = {
        data: []
    };

    persistData() {
        let name = this.state.name
        AsyncStorage.setItem('name', name).done();
        this.setState({ name: name, persistedName: name })
    }

    check() {
        AsyncStorage.getItem('name').then((name) => {
            this.setState({ name: name, persistedName: name })
        })
    }

    componentWillMount() {
        this.check();
        //this.fetchData();
    }

    fetchData = async () => {

        const response = await fetch('http://192.168.182.131/test/select.php');
        const json = await response.json();
        this.setState({ data: json.results });
    }

    removeData = async (item) => {
        console.log(item);
        return fetch('http://192.168.182.131/test/delete.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: item
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                Alert.alert(responseJson);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    // removeTodo(rowData) {
    //   this.itemsRef.child(rowData.id).remove();
    // };

    InsertDataToServer = () => {
        const { name } = this.state;
        fetch('http:/192.168.182.131/test/submit_user_info.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name
            })

        }).then((response) => response.json())
            .then((responseJson) => {
                // Showing response message coming from server after inserting records.
                Alert.alert(responseJson);
            }).catch((error) => {
                console.error(error);
            });
    }

    render() {
        return (
            <View style={styles.MainContainer}>
                <TextInput
                    // Adding hint in Text Input using Place holder.
                    placeholder="Enter Name"
                    onChangeText={name => this.setState({ name })}
                    // Making the Under line Transparent.
                    underlineColorAndroid='transparent'
                    style={styles.TextInputStyleClass}
                />
                <View style={styles.ViewAll}>
                    <Button title="SUBMIT" onPress={this.InsertDataToServer} color="#2196F3" />
                    <Button title="VIEW ALL" onPress={this.fetchData} color="green" />
                </View>
                <View style={styles.State}>
                    <Text>STATE:</Text>
                    <Text>Name: {this.state.name}</Text>
                </View>
                <View style={styles.container}>
                    <FlatList
                        data={this.state.data}
                        keyExtractor={(x, i) => i}
                        renderItem={({ item }) =>
                            <View style={styles.row}>
                                <View>
                                    <Text style={styles.text}>
                                        {`${item.name}`}
                                    </Text>
                                </View>
                                <View>
                                    <TouchableOpacity onPress={() => this.removeData(item.name)}>
                                        <Text style={styles.button}>
                                            DELETE
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        }
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    MainContainer: {

        justifyContent: 'center',
        flex: 1,
        margin: 10,
        backgroundColor: 'white',
        borderColor: '#ACD3D6'
    },

    TextInputStyleClass: {

        textAlign: 'center',
        marginBottom: 7,
        height: 40,
        borderWidth: 1,
        // Set border Hex Color Code Here.
        borderColor: '#FF5722'
    },

    container: {
        marginTop: 15,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#B8F1F0'
    },

    ViewAll: {
        marginTop: 20,
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 390
    },

    button: {
        borderColor: 'red',
        backgroundColor: 'red',
        width: 60,
        textAlign: 'center',
        borderRadius: 10,
        color: 'white'
    },

    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 40,
        width: 200
    },

    text: {
        fontSize: 15,
        fontWeight: 'bold'
    },

    State: {
        backgroundColor: '#B8F1F0',
        borderColor: '#ACD3D6'
    }

});

AppRegistry.registerComponent('albums', () => MainProject);
