import { addLocaleData } from 'react-intl';
import es from 'react-intl/locale-data/es';
import en from 'react-intl/locale-data/en';
import { updateIntl } from 'react-intl-redux';
import messagesSpanish from '../../../locales/es';
import messagesEnglish from '../../../locales/en';

const {
  LOCALE_CONFIG_REQUEST,
  LOCALE_CONFIG_SUCCESS,
  LOCALE_CONFIG_FAILURE,
  LOCALE_SET_LANGUAGE_REQUEST,
  LOCALE_SET_LANGUAGE_SUCCESS,
  LOCALE_SET_LANGUAGE_FAILURE,
} = require('../actionsConstants').default;

export function initLocale() {
  return dispatch => {
    dispatch(localeConfigRequest());
    try {
      addLocaleData([...en, ...es]);
      dispatch(localeConfigSuccess());
    } catch (err) {
      dispatch(localeConfigFailure());
    }
  };
}

export function setLocaleSpanish() {
  return dispatch => {
    dispatch(localeSetRequest());
    try {
      dispatch(
        updateIntl({
          locale: 'es',
          messages: messagesSpanish,
        })
      );
      dispatch(localeSetSuccess());
    } catch (err) {
      dispatch(localeSetFailure());
    }
  };
}
export function setLocaleEnglish() {
  return dispatch => {
    dispatch(localeSetRequest());
    try {
      dispatch(
        updateIntl({
          locale: 'en',
          messages: messagesEnglish,
        })
      );
      dispatch(localeSetSuccess());
    } catch (err) {
      dispatch(localeSetFailure());
    }
  };
}

export function localeSetRequest() {
  return {
    type: LOCALE_SET_LANGUAGE_REQUEST,
  };
}

export function localeSetSuccess() {
  return {
    type: LOCALE_SET_LANGUAGE_SUCCESS,
  };
}

export function localeSetFailure() {
  return {
    type: LOCALE_SET_LANGUAGE_FAILURE,
  };
}

export function localeConfigRequest() {
  return {
    type: LOCALE_CONFIG_REQUEST,
  };
}

export function localeConfigSuccess() {
  return {
    type: LOCALE_CONFIG_SUCCESS,
  };
}

export function localeConfigFailure() {
  return {
    type: LOCALE_CONFIG_FAILURE,
  };
}
