import { Account } from '../abstracts/common.js';
import { AccountDbo } from '../abstracts/dbo/AccountDbo.js';
import DomManipulator from '../dom/DomManipulator.js';
import LocalStorage from '../LocalStorage.js';

export default class AccountModel {
    public static accounts: Account[] = [];
    protected domManipulator;

    constructor() {
        this.domManipulator = new DomManipulator();
    }


    public static setAccounts(accounts: Account[]) {
        this.accounts = accounts;
    }

    public static getAccounts(filter = '') {
        if (filter) {
            return this.filterAccounts(filter);
        }

        return this.accounts;
    }

    public static addNewAccount(newAccount: Account) {
        this.accounts.push(newAccount);

        LocalStorage.setAccounts(this.accounts);
    }

    public static filterAccounts(filter: string): Account[] {
        const filteredAccountModels = this.accounts.filter(account => {
            const { firstName, lastName, tag } = account;

            return firstName.includes(filter) 
                || lastName.includes(filter)
                || tag.includes(filter);
        });

        return filteredAccountModels;
    }

    public static createNewAccount(accountDbo: AccountDbo): Account {
        const id = Date.now();
        const { firstName, lastName, avatar, tag } = accountDbo;

        return { id, firstName, lastName, avatar, tag };
    }

    public static updateAccountModel(updatedAccount: Account) {
        const accountIndex = this.accounts.findIndex(account => account.id === +updatedAccount.id);
        this.accounts[accountIndex] = updatedAccount;

        LocalStorage.setAccounts(this.accounts);
    } 
    
    public static deleteAccount(accountId: number) {
        const accounts = this.accounts.filter(account => account.id !== accountId);
        this.setAccounts(accounts);

        LocalStorage.setAccounts(this.accounts);
    } 
}