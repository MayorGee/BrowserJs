import Liquid  from '../liquid.js';
import { IAccount } from '../abstracts/common.js';
import Account from './Account.js';

export default class AccountView extends Account {
    protected accountsToDisplay: IAccount[] = [];
    static accountList: HTMLUListElement;

    constructor() {
        super();
        AccountView.accountList = this.domManipulator.getElementByClassName('js-account-list') as HTMLUListElement;
    }

    public async makeAccountList() { 
        this.decideAccountsToDisplay();
        const listItems = await Liquid.renderTemplate('liquid/accounts.liquid', Account.accounts );

        this.addAccountToDom(listItems);
    }

    private decideAccountsToDisplay() {
        this.accountsToDisplay = Account.filteredAccounts.length > 0 ?
                                 Account.filteredAccounts :
                                 Account.accounts;
    }

    private addAccountToDom(listItems: HTMLUListElement[]) {
        this.domManipulator.appendInnerHtml(AccountView.accountList, listItems);
    }

    public clearAccountList() {
        AccountView.accountList.innerHTML = '';
    }
}