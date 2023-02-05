import LiquidClient from './liquid';
import AccountView from './account/AccountView';
import EventHandler from './event/EventHandler';
import AccountApi from './account/AccountApi';
import './scss/styles.scss';

export default class App {
    async start() {
        // console.log('start');
        
        const accountView = new AccountView();
        const eventHandler = new EventHandler();
        
        // console.log('before init liquid');

        LiquidClient.initLiquid();

        // console.log('after init liquid');
        
        await AccountApi.initializeAccounts();
        accountView.makeAccountList();
        
        eventHandler.addEventListeners();
    }
}