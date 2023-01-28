import Liquid  from '../liquid.js';
import Account from './Account.js';

export default class AccountView extends Account {
    static accountList: HTMLUListElement;

    constructor() {
        super();
        AccountView.accountList = this.domManipulator.getElementByClassName('js-account-list') as HTMLUListElement;
    }

    public async makeAccountList(accountsFilter = '') { 
        const listItems = await Liquid.renderTemplate('liquid/accounts.liquid', Account.getAccounts(accountsFilter) );
        
        this.addAccountsToDom(listItems);
    }

    private addAccountsToDom(listItems: HTMLUListElement[]) {
        this.domManipulator.appendInnerHtml(AccountView.accountList, listItems);
    }

    public clearAccountList() {
        AccountView.accountList.innerHTML = '';
    }
}