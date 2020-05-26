
import React from 'react';
import {
  StyleSheet,
  View,
  StatusBar
} from 'react-native';
import Routes from './src/Route';

export default class App extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#2A2B37" barStyle="while-content" />
        <Routes />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
















