import AccountView from './script/AccountView.js';
import EventHandler from './script/EventHandler.js';
import LocalStorage from './script/LocalStorage.js';

const accountView = new AccountView();
const eventHandler = new EventHandler();

accountView.hideUpdateForm();
accountView.makeAccountsList();
LocalStorage.setAccounts([]);

eventHandler.addEventListeners();