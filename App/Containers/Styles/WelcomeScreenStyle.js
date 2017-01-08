// @flow
/**
 * Author: Bartłomiej Klinger <bartlomiej.klinger@positiverse.com>
 */

import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  logo: {
    height: Metrics.images.logo,
    width: Metrics.images.logo,
    resizeMode: 'contain'
  },
  titleText: {
    ...Fonts.style.h1,
    //color: Colors.silver,
    //textShadowColor: '#e69017',
    color: Colors.navy2,
    textShadowColor: Colors.silver,
    textShadowOffset: {
      width: 2,
      height: 2 },
    textShadowRadius: 2,
    marginVertical: Metrics.smallMargin,
    textAlign: 'center',
    fontWeight: 'bold',
    lineHeight: Fonts.size.h1+10,
    paddingTop: 30,
  },
  callToActionText: {
    ...Fonts.style.h4,
    paddingHorizontal: 30,
  },
  card: {
    marginLeft: Metrics.section,
    marginRight: Metrics.section,
    backgroundColor: Colors.background,
  }
})
