import Liquid from './liquid';
import AccountView from './account/AccountView';
import EventHandler from './event/EventHandler';
import AccountApi from './account/AccountApi';

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