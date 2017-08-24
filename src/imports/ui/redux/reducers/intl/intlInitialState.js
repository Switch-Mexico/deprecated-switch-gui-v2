import Immutable from 'immutable';
import messages from '../../../locales/es';
/**
 * ## Locale
 * This Record contains the state of the Locale
 */
const InitialState = Immutable.fromJS({
  locale: 'es',
  messages,
});

/**
 * ## InitialState
 * The form is set
 */
export default InitialState;
