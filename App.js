import React, { Component } from 'react';
import { AppRegistry, AsyncStorage, StyleSheet, TextInput, View, Alert, Button } from 'react-native';

const persistData = () => {
    let name = this.state.name
    AsyncStorage.setItem('name',name)
}

AppRegistry.registerComponent('albums', () => App);
