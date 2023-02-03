import Liquid  from '../liquid';
import AccountModel from './AccountModel';

export default class AccountModelView extends AccountModel {
    static accountList: HTMLUListElement;

    constructor() {
        super();
        AccountModelView.accountList = this.domManipulator.getElementByClassName('js-account-list') as HTMLUListElement;
    }

    public async makeAccountModelList(accountsFilter = '') { 
        const listItems = await Liquid.renderTemplate('liquid/accounts.liquid', AccountModel.getAccounts(accountsFilter) );
        
        this.addAccountModelsToDom(listItems);
    }

    private addAccountModelsToDom(listItems: HTMLUListElement[]) {
        this.domManipulator.appendInnerHtml(AccountModelView.accountList, listItems);
    }

    public clearAccountModelList() {
        AccountModelView.accountList.innerHTML = '';
    }
}