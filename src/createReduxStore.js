import { createStore } from 'redux';
import reducer from './reducer';

if (localStorage.getItem('settings') == null) {
  // set default settings
  const defaultSettings = {
    disableBalanceOnAdd: true,
    disableBalanceOnEdit: false,
    allowRegistration: true
  };

  // Set to localStorage
  localStorage.setItem('settings', JSON.stringify(defaultSettings));
}

// Create initial state
const initialState = { settings: JSON.parse(localStorage.getItem('settings')) };

export default () => {
  return createStore(reducer, initialState);
};
