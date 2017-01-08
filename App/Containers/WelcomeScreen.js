// @flow

/**
 * Author: Bartłomiej Klinger <bartlomiej.klinger@positiverse.com>
 */

import React from 'react'
import { View, ScrollView, Image, KeyboardAvoidingView } from 'react-native'
import { Container, Content, Card, CardItem, Thumbnail, Text, Button, Icon } from 'native-base'

import { Images } from '../Themes'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Metrics } from '../Themes'
// external libs
// import Icon from 'react-native-vector-icons/FontAwesome'
import Animatable from 'react-native-animatable'
import { Actions as NavigationActions } from 'react-native-router-flux'

// Styles
import styles from './Styles/WelcomeScreenStyle'

// I18n
import I18n from 'react-native-i18n'

class WelcomeScreen extends React.Component {

  render () {
    return (
      <View style={styles.mainContainer}>
        <Image style={styles.backgroundImage} source={Images.background} />
        <ScrollView style={styles.container}>
          <KeyboardAvoidingView behavior='position'>
            <Text style={styles.titleText} >
              Online Shopping
            </Text>
            <View style={styles.centered}>
              <Image source={Images.clearLogo} style={styles.logo} />
            </View>
            <View style={styles.centered} >
              <Content>
              <Button
                style={styles.callToAction}
                textStyle={styles.callToActionText}
                rounded
                large
                success
                onPress={NavigationActions.registration}
              >
                checkout
              </Button>
              </Content>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen)
