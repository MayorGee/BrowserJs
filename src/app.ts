import Liquid from './liquid.js';
import AccountView from './account/AccountView.js';
import EventHandler from './event/EventHandler.js';
import AccountApi from './account/AccountApi.js';

export default class App {
    async start() {
        const accountView = new AccountView();
        const eventHandler = new EventHandler();
        
        Liquid.initLiquid();
        await AccountApi.initializeAccounts();
        accountView.makeAccountModelList();
        
        eventHandler.addEventListeners();
    }
}