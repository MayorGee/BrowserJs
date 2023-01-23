import Liquid from './liquid.js';
import AccountView from './script/AccountView.js';
import LocalStorage from './script/LocalStorage.js';
import EventHandler from './script/EventHandler.js';

const accountView = new AccountView();
const eventHandler = new EventHandler();

Liquid.initLiquid();
accountView.makeAccountList();
LocalStorage.setAccounts([]);

eventHandler.addEventListeners();