import React, { Component } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default class App extends Component {
  state = {
    data: []
  };

  componentWillMount() {
    this.fetchData();
  }

  fetchData = async () => {
    const response = await fetch("http:/192.168.182.131/test/studRecords.json");
    const json = await response.json();
    this.setState({ data: json.results });
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.data}
          keyExtractor={(x, i) => i}
          renderItem={({ item }) =>
            <Text>
              {`${item.name}`}
            </Text>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  }
});

