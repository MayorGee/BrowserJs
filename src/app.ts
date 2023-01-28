import Liquid from './liquid.js';
import Account from './account/Account.js';
import AccountView from './account/AccountView.js';
import EventHandler from './event/EventHandler.js';

export default class App {
    async start() {
        const account = new Account();
        const accountView = new AccountView();
        const eventHandler = new EventHandler();
        
        Liquid.initLiquid();
        await account.initializeAccounts();
        accountView.makeAccountList();
        
        eventHandler.addEventListeners();
    }
}