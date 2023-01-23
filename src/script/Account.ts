import { IAccount } from '../abstracts/common.js';
import { AccountDbo } from '../abstracts/dbo/AccountDbo.js';
import DomManipulator from './DomManipulator.js';
import LocalStorage from './LocalStorage.js';

export default class Account {
    static accounts: IAccount[] = [];
    static filteredAccounts: IAccount[] = [];
    protected domManipulator;

    constructor() {
        this.domManipulator = new DomManipulator();
    }

    public addNewAccount(newAccount: IAccount) {
        Account.accounts.push(newAccount);
        LocalStorage.setAccounts(Account.accounts);
    }

    public setFilteredAccounts(filteredAccounts: IAccount[]) {
        Account.filteredAccounts = filteredAccounts;
    }

    static filterAccountsByTag(valueToSearch: string): IAccount[] {
        const filteredAccounts = Account.accounts.filter(account => {
            return account.tag === valueToSearch;
        });

        return filteredAccounts;
    }

    static filterAccountsByInput(valueToSearch: string) {
        const filteredAccounts = Account.accounts.filter(account => {
            const { firstName, lastName, tag } = account;

            return firstName.includes(valueToSearch) || 
            lastName.includes(valueToSearch) ||
            tag.includes(valueToSearch);
        });

        return filteredAccounts;
    }

    public createNewAccount(accountDbo: AccountDbo): IAccount {
        const id = Date.now();
        const { firstName, lastName, avatar, tag } = accountDbo;

        return { id, firstName, lastName, avatar, tag };
    }

    public updateAccount(updatedAccount: IAccount) {
        const accountIndex = Account.accounts.findIndex(account => account.id === +updatedAccount.id);
        Account.accounts[accountIndex] = updatedAccount;

        LocalStorage.setAccounts(Account.accounts);
    }    
}