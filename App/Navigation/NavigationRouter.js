// @flow
/**
 * Author: Bartłomiej Klinger <bartlomiej.klinger@positiverse.com>
 */

import React, { Component } from 'react'
import { Scene, Router } from 'react-native-router-flux'
import Styles from './Styles/NavigationContainerStyle'

// screens identified by the router
import RegistrationScreen from '../Containers/RegistrationScreen'
import WelcomeScreen from '../Containers/WelcomeScreen'

/* **************************
* Documentation: https://github.com/aksonov/react-native-router-flux
***************************/

class NavigationRouter extends Component {
  render () {
    return (
      <Router>
        <Scene key='main' navigationBarStyle={Styles.navBar} titleStyle={Styles.title} leftButtonIconStyle={Styles.leftButton} rightButtonTextStyle={Styles.rightButton}>
          <Scene initial key='welcome' component={WelcomeScreen} title='My Favourite eShop' />
          <Scene key='registration' component={RegistrationScreen} title='Registration form' />
        </Scene>
      </Router>
    )
  }
}

export default NavigationRouter
