// @flow
/**
 * Author: Bartłomiej Klinger <bartlomiej.klinger@positiverse.com>
 */

import { StyleSheet } from 'react-native'
import { ApplicationStyles, Fonts, Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  sectionText: {
    ...ApplicationStyles.screen.sectionText,
    color: Colors.navy2,
  },
  cardTitle: {
    alignSelf: 'center',
    fontSize: Fonts.size.regular,
    fontWeight: 'bold',
    color: Colors.navy2,
  },
  cardDividerStyle: {
    backgroundColor: Colors.navy2,
  },
  cardContainer: {
    backgroundColor: Colors.snow,
    borderColor: Colors.background,
    borderWidth: 0.5,
    borderRadius: 2,
    shadowColor: Colors.charcoal,
    shadowOffset: {
      height: 2,
      width: 2,
    },
    shadowRadius: 2,
    margin: Metrics.baseMargin,
  },
  formField: {
    width: null,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.charcoal,
    marginBottom: Metrics.baseMargin,
  },
  formFieldLabel: {
    color: Colors.charcoal,
    fontWeight: 'normal',
  },
  formFieldInput: {
    color: Colors.color,
    fontWeight: 'bold',
  },
  consentAction : {
    alignItems: 'center',
    paddingVertical: Metrics.baseMargin,
  },
  consentButton: {
    alignSelf: 'center',
    marginVertical: Metrics.baseMargin,
    paddingHorizontal: Metrics.baseMargin,
  },
  consentButtonText: {
    ...Fonts.style.h5,
    paddingHorizontal: Metrics.baseMargin,
  },
})
