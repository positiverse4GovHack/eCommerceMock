// @flow
/**
 * Author: Bartłomiej Klinger <bartlomiej.klinger@positiverse.com>
 */

import React from 'react'

import { View, ScrollView, Image, KeyboardAvoidingView, Modal, Platform } from 'react-native'
import { Container, Content, List, ListItem, InputGroup, Input, Text, Picker, Button, Icon, Spinner } from 'native-base'
import { Card, FormLabel, FormInput } from 'react-native-elements'

import { Sae, Fumi, Hoshi, Kohana } from 'react-native-textinput-effects'
import DatePicker from 'react-native-datepicker'
import PopupDialog, { ScaleAnimation, DialogButton } from 'react-native-popup-dialog'

const Item = Picker.Item

import { connect } from 'react-redux'
import RegisterActions from '../Redux/RegisterRedux'

import { Images, Metrics, Fonts, Colors } from '../Themes'
// external libs
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialsIcon from 'react-native-vector-icons/MaterialIcons';
import Animatable from 'react-native-animatable'
import { Actions as NavigationActions } from 'react-native-router-flux'

// Styles
import styles from './Styles/RegistrationScreenStyle'

// I18n
import I18n from 'react-native-i18n'

class RegistrationScreen extends React.Component {

  static propTypes = {
    firstName: React.PropTypes.string,
    lastName: React.PropTypes.string,
    birthDate: React.PropTypes.string,
    email: React.PropTypes.string,
    mobilePhone: React.PropTypes.string,
    address: React.PropTypes.string,
    postalCode: React.PropTypes.string,
    city: React.PropTypes.string,
    country: React.PropTypes.string,
    requesting: React.PropTypes.bool,
    unsupported: React.PropTypes.bool,
    registerFormUpdate: React.PropTypes.func,
    registerConsentsRequest: React.PropTypes.func,
    dispatch: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
  }

  componentWillReceiveProps (newProps) {
    this.forceUpdate()
    // console.tron.display({
    //   name: 'ECOMMERCE WILL RECEIVE PROPS',
    //   preview: 'Receiving new props ...',
    //   value: {
    //     newProps: newProps,
    //   },
    // });
    if(newProps.unsupported) {
      this.popupDialog.openDialog();
    }
  }

  render () {
    const { firstName, lastName, birthDate, email, mobilePhone, address, postalCode, city, country, registerFormUpdate } = this.props;

    let requestButton =
      <Button
        style={styles.consentButton}
        textStyle={styles.consentButtonText}
        rounded
        success
        iconRight
        onPress={this.props.registerConsentsRequest}
      >
        <Text>Proceed</Text>
        <Icon name='ios-arrow-forward' />
      </Button>
    if(this.props.requesting) requestButton =
      <Button
        style={styles.consentButton}
        textStyle={styles.consentButtonText}
        rounded
        disabled
        iconRight
        onPress={this.props.registerConsentsRequest}
      >
        <Text>Consent requested</Text>
        <Icon name='ios-information-circle-outline' />
      </Button>

    let myConsentsAppLink = null
    if (Platform.OS === 'ios') {
      myConsentsAppLink = <Text style={styles.mobileStoreBadge}>myConsents app {'\n'} on {'\n'} App Store</Text>
    } else {
      myConsentsAppLink = <Text style={styles.mobileStoreBadge}>myConsents app {'\n'} on {'\n'} Google Play</Text>
    }

    return (
    <View style={styles.mainContainer}>
      <Image style={styles.backgroundImage} source={Images.background} />
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior='padding'>
          <Card
            containerStyle={styles.cardContainer}
            title='PROVIDE YOUR NAME AND BIRTH DATE'
            titleStyle={styles.cardTitle}
            dividerStyle={styles.cardDividerStyle}
          >
            <Sae
              label={'First Name'}
              style={styles.formField}
              labelStyle={styles.formFieldLabel}
              inputStyle={styles.formFieldInput}
              defaultValue={firstName}
              iconClass={FontAwesomeIcon}
              iconName={'pencil'}
              iconColor={Colors.charcoal}
              // TextInput props
              autoCapitalize={'none'}
              autoCorrect={false}
              onChange={(event) => registerFormUpdate({ firstName: event.nativeEvent.text })}
            />
            <Sae
              label={'Last Name'}
              labelStyle={styles.formFieldLabel}
              inputStyle={styles.formFieldInput}
              style={styles.formField}
              defaultValue={lastName}
              iconClass={FontAwesomeIcon}
              iconName={'pencil'}
              iconColor={Colors.charcoal}
              // TextInput props
              autoCapitalize={'none'}
              autoCorrect={false}
              onChange={(event) => registerFormUpdate({ lastName: event.nativeEvent.text })}
            />
            <DatePicker
              label='Birth date'
              style={styles.formField}
              date={birthDate}
              mode='date'
              placeholder='select your birthdate'
              format='YYYY-MM-DD'
              minDate='1910-01-01'
              maxDate='2010-12-31'
              confirmBtnText='Confirm'
              cancelBtnText='Cancel'
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  right: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  flex: 1,
                  borderWidth: 0,
                  borderBottomWidth: 1,
                  borderBottomColor: Colors.charcoal,
                  //alignItems: 'left',
                  //marginLeft: 36,
                  //margin: 0,
                  //flexDirection: 'row',
                  //alignSelf: 'stretch',
                },
                dateText: {
                  color: Colors.color,
                  fontWeight: 'bold',
                  textAlign: 'left',
                  fontFamily: Fonts.type.base,
                  fontSize: Fonts.size.input,
                },

              }}
              onDateChange={(date) => {registerFormUpdate({birthDate: date})}}
            />
          </Card>
          <Card
            containerStyle={styles.cardContainer}
            title='PROVIDE YOUR EMAIL AND PHONE NUMBER'
            titleStyle={styles.cardTitle}
            dividerStyle={styles.cardDividerStyle}
          >
            <Sae
              label={'Email'}
              labelStyle={styles.formFieldLabel}
              inputStyle={styles.formFieldInput}
              style={styles.formField}
              defaultValue={email}
              iconClass={FontAwesomeIcon}
              iconName={'pencil'}
              iconColor={Colors.charcoal}
              // TextInput props
              autoCapitalize={'none'}
              autoCorrect={false}
              keyboardType={'email-address'}
              onChange={(event) => registerFormUpdate({ email: event.nativeEvent.text })}
            />
            <Sae
              label={'Mobile phone number'}
              labelStyle={styles.formFieldLabel}
              inputStyle={styles.formFieldInput}
              style={styles.formField}
              defaultValue={mobilePhone}
              iconClass={FontAwesomeIcon}
              iconName={'pencil'}
              iconColor={Colors.charcoal}
              // TextInput props
              autoCapitalize={'none'}
              autoCorrect={false}
              keyboardType={'phone-pad'}
              onChange={(event) => registerFormUpdate({ mobilePhone: event.nativeEvent.text })}
            />
          </Card>
          <Card
            containerStyle={styles.cardContainer}
            title='PROVIDE YOUR ADDRESS'
            titleStyle={styles.cardTitle}
            dividerStyle={styles.cardDividerStyle}
          >
            <Sae
              label={'Address'}
              labelStyle={styles.formFieldLabel}
              inputStyle={styles.formFieldInput}
              style={styles.formField}
              defaultValue={address}
              iconClass={FontAwesomeIcon}
              iconName={'pencil'}
              iconColor={Colors.charcoal}
              // TextInput props
              autoCapitalize={'none'}
              autoCorrect={false}
              onChange={(event) => registerFormUpdate({ address: event.nativeEvent.text })}
            />
            <Sae
              label={'Postal code'}
              labelStyle={styles.formFieldLabel}
              inputStyle={styles.formFieldInput}
              style={styles.formField}
              defaultValue={postalCode}
              iconClass={FontAwesomeIcon}
              iconName={'pencil'}
              iconColor={Colors.charcoal}
              // TextInput props
              autoCapitalize={'none'}
              autoCorrect={false}
              onChange={(event) => registerFormUpdate({ postalCode: event.nativeEvent.text })}
            />
            <Sae
              label={'City'}
              labelStyle={styles.formFieldLabel}
              inputStyle={styles.formFieldInput}
              style={styles.formField}
              defaultValue={city}
              iconClass={FontAwesomeIcon}
              iconName={'pencil'}
              iconColor={Colors.charcoal}
              // TextInput props
              autoCapitalize={'none'}
              autoCorrect={false}
              onChange={(event) => registerFormUpdate({ city: event.nativeEvent.text })}
            />
            <Sae
              label={'Country'}
              labelStyle={styles.formFieldLabel}
              inputStyle={styles.formFieldInput}
              style={styles.formField}
              defaultValue={country}
              iconClass={FontAwesomeIcon}
              iconName={'pencil'}
              iconColor={Colors.charcoal}
d              // TextInput props
              autoCapitalize={'none'}
              autoCorrect={false}
              onChange={(event) => registerFormUpdate({ country: event.nativeEvent.text })}
            />
          </Card>
          <View style={styles.section} >
            <Text style={styles.sectionText} >
              With a strong respect to your personal data privacy, we will explain you in details
              how we're going to use the data you will share with us and we will ask for your consent to the usage.
            </Text>
            <Content>
              {requestButton}
            </Content>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>

      <PopupDialog
        ref={(popupDialog) => { this.popupDialog = popupDialog; }}
        //dialogAnimation={ new ScaleAnimation() }
        width={0.8}
        height={380}
        dialogStyle={styles.dialog}
        actions={[
          <DialogButton
            text="CLOSE"
            textStyle={styles.dialogActionText}
            onPress={() => {
              this.popupDialog.closeDialog();
            }}
            key="button-1"
          />,
        ]}
      >
        <View style={styles.dialogContent}>
          <Text style={styles.dialogContentText}>You don't have an application required to effective manage your consents to share your personal data.</Text>
          <Text style={styles.dialogContentText}>To regain control of your personal data usage by third parties please install the myConsents app.</Text>
          {myConsentsAppLink}
        </View>
      </PopupDialog>

    </View>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    firstName: state.register.firstName,
    lastName: state.register.lastName,
    birthDate: state.register.birthDate,
    email: state.register.email,
    mobilePhone: state.register.mobilePhone,
    address: state.register.address,
    postalCode: state.register.postalCode,
    city: state.register.city,
    country: state.register.country,
    requesting: state.register.requesting,
    unsupported: state.register.unsupported
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    registerFormUpdate: (update) => dispatch(RegisterActions.registerFormUpdate(update)),
    registerConsentsRequest: () => dispatch(RegisterActions.registerConsentsRequest()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationScreen)
