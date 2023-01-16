import AccountView from './script/AccountView.js';
import EventHandler from './script/EventHandler.js';

const accountView = new AccountView();
const eventHandler = new EventHandler();

accountView.hideUpdateForm();
accountView.makeAccountsList();
localStorage.setItem('accounts', JSON.stringify([]));
eventHandler.addEventListeners();