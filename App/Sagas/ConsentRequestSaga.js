/**
 * Author: Bartłomiej Klinger <bartlomiej.klinger@positiverse.com>
 */

import { Linking } from 'react-native'
import { take, call, put, select } from 'redux-saga/effects'
import forge from 'node-forge'
import RegisterActions from '../Redux/RegisterRedux'
import AppConfig from '../Config/AppConfig'

let consentsRaw = {
  dataControllerAddress: AppConfig.dataControllerAddress,
  dataControllerName: AppConfig.dataControllerName,
  newConsents: [
    // { //['mobileNumber']
    //   processingPurpose: 'Processing of the personal data usage consents through myConsents mobile app.',
    //   processingPurposeType: 'serviceSignUp',
    //   processingType: 'prerequisite',
    //   potentialDisclosures: 'none',
    // },
    { //['name', 'birthDate', 'emailAddress', 'mobileNumber']
      processingPurpose: 'Usage of services offered by eCommerce, processing of a shopping basket and purchases of products offered.',
      processingPurposeType: 'serviceUsage',
      processingType: 'required',
      potentialDisclosures: 'none',
    },
    { //['name', 'emailAddress', 'mobileNumber', 'postalAddress']
      processingPurpose: 'Finalization of the shopping transaction and delivery of purchased products.',
      processingPurposeType: 'transaction',
      processingType: 'required',
      potentialDisclosures: 'none',
    },
    { //['browserCookies']
      processingPurpose: 'Better user experience of eCommerce service, registration of you shopping preference, analytics of eCommerce online service usage.',
      processingPurposeType: 'profiling',
      processingType: 'optional',
      potentialDisclosures: 'none',
    },
    { //['emailAddress']
      processingPurpose: 'Marketing communication in an electronic form.',
      processingPurposeType: 'marketing',
      processingType: 'optional',
      potentialDisclosures: 'none',
    },
  ],
}

// exported to make available for tests
export const selectAttrToConsent = (state, attrName) => state.register[attrName]

export function * requestConsent (action) {
  try {
    const { data } = action
    const personalData = {
      name: `${yield select(selectAttrToConsent, 'firstName')} ${yield select(selectAttrToConsent, 'lastName')}`,
      mobileNumber: yield select(selectAttrToConsent, 'mobilePhone'),
      emailAddress: yield select(selectAttrToConsent, 'email'),
      birthDate: yield select(selectAttrToConsent, 'birthDate'),
      postalAddress: `${yield select(selectAttrToConsent, 'address')}, ${yield select(selectAttrToConsent, 'postalCode')},
                ${yield select(selectAttrToConsent, 'city')}, ${yield select(selectAttrToConsent, 'country')}`,

    }
    const consentsAttrs = [
//      ['mobileNumber'],
      ['name', 'birthDate', 'emailAddress', 'mobileNumber'],
      ['name', 'emailAddress', 'mobileNumber', 'postalAddress'],
      ['browserCookies'],
      ['emailAddress'],
    ]

    consentsRaw.newConsents.forEach((consentRaw, idx) => {
      consentsRaw.newConsents[idx].personalDataAttributes = consentsAttrs[idx].map((attrName) => {
        return (
          {
            personalDataType: attrName,
            personalData: personalData[attrName],
          }
        )
      })
    })

    if (__DEV__ && console.tron) {
      console.tron.log({
        name: 'ConsentRequestSaga | requestConsent',
        message: 'New consent request prepared',
        consentsRaw: consentsRaw,
      })
    }

    const consentsRequest = forge.util.encode64(JSON.stringify(consentsRaw));
    const url = `consent://consentsmanager/${consentsRequest}`

    const supported = yield Linking.canOpenURL(url);
    if (!supported) {
      if (__DEV__ && console.tron) {
        console.tron.error({
          message: 'Cannot handle consent request (unsupported)',
          url: url,
        })
      }
      yield put(RegisterActions.registerConsentsRequestUnsupported())
    } else {
      const linkingResponse = yield Linking.openURL(url);
      if (__DEV__ && console.tron) {
        console.tron.log({
          message: 'Consent request handled by ConsentManager',
          url: url,
          linkingResponse: linkingResponse,
        })
      }
      yield put(RegisterActions.registerConsentsRequested())
    }
  } catch (err) {
    if (__DEV__ && console.tron) {
      console.tron.error({
        message: 'Error during consent request handling',
        error: err,
      })
    }
    yield put(RegisterActions.registerFailure(err))
  }

}
