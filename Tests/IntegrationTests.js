import React from 'react'
import PropTypes from 'prop-types'
import ReactNative from 'react-native'
import {Provider} from 'react-redux'
const {
  AppRegistry,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} = ReactNative

// This list should be kept in sync with TextileBridgeTests.m
const TESTS = [
  require('./Tests'),
]

TESTS.forEach(
  (test) => AppRegistry.registerComponent(test.displayName, () => test)
)

class IntegrationTests extends React.Component {
  state = {
    test: undefined,
  }

  render() {
    if (this.state.test) {
      return (
        <ScrollView>
          <this.state.test />
        </ScrollView>
      )
    }
    return (
      <View style={ styles.container }>
      <Text style={ styles.row }>
        Click on a test to run it in this shell for easier debugging and
        development.  Run all tests in the testing environment with cmd+U in
        Xcode.
      </Text>
      <View style={styles.separator} />
      <ScrollView>
        { TESTS.map((test) => [
          <TouchableOpacity
           onPress={ () => this.setState({ test }) }
           style={ styles.row }>
            <Text style={ styles.testName }>
              { test.displayName }
            </Text>
          </TouchableOpacity>,
          <View style={ styles.separator } />
        ]) }
      </ScrollView>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginTop: 40,
    margin: 15,
  },
  row: {
    padding: 10,
  },
  testName: {
    fontWeight: '500',
  },
  separator: {
    height: 1,
    backgroundColor: '#bbbbbb',
  },
})

AppRegistry.registerComponent('IntegrationTests', () => IntegrationTests)
