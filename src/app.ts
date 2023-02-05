import LiquidClient from './liquid';
import AccountView from './account/AccountView';
import EventHandler from './event/EventHandler';
import AccountApi from './account/AccountApi';
import './scss/styles.scss';

export default class App {
    async start() {
        const accountView = new AccountView();
        const eventHandler = new EventHandler();
        
        LiquidClient.initLiquid();
        
        await AccountApi.initializeAccounts();
        accountView.makeAccountList();
        
        eventHandler.addEventListeners();
    }
}