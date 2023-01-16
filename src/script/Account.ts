import { IAccount } from '../abstracts/common.js';
import { AccountDbo } from '../abstracts/dbo/AccountDbo.js';
import DomManipulator from './DomManipulator.js';

export default class Account {
    public static accounts: IAccount[] = [];
    protected static filteredAccounts: IAccount[] = [];

    protected domManipulator;
    public static accountList: HTMLUListElement;

    constructor() {
        this.domManipulator = new DomManipulator();
        Account.accountList = this.domManipulator.getElementByClassName('js-account-list') as HTMLUListElement;
    }

    public addNewAccount(newAccount: IAccount) {
        Account.accounts.push(newAccount);
        this.resetAccountsAtLocalStorage();
    }

    private resetAccountsAtLocalStorage() {
        localStorage.setItem('accounts', JSON.stringify(Account.accounts));
    }

    public setFilteredAccounts(filteredAccounts: IAccount[]) {
        Account.filteredAccounts = filteredAccounts;
    }

    public createNewAccount(accountDbo: AccountDbo): IAccount {
        const id = Date.now();
        const { firstName, lastName, avatar, tag } = accountDbo;

        return { id, firstName, lastName, avatar, tag };
    }

    public getFullName = (name: string, surname: string): string => {
        return name + ' ' + surname;
    }

    public updateAccount(updatedAccount: IAccount) {
        const accountIndex = Account.accounts.findIndex(account => account.id === +updatedAccount.id);
        Account.accounts[accountIndex] = updatedAccount;

        this.resetAccountsAtLocalStorage();
    }    
}