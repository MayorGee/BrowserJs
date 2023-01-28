import { IAccount } from '../abstracts/common.js';
import { AccountDbo } from '../abstracts/dbo/AccountDbo.js';
import Fetch from '../api/Fetch.js';
import DomManipulator from '../dom/DomManipulator.js';
import LocalStorage from '../LocalStorage.js';

export default class Account {
    static accounts: IAccount[] = [];
    protected domManipulator;

    constructor() {
        this.domManipulator = new DomManipulator();
    }

    private async getInitialAccounts() {
        const accounts = await Fetch.fetchGetRequest('http://localhost:3333/accounts');

        return accounts;
    }

    public async initializeAccounts() {
        const initialAccounts = LocalStorage.getAccounts() ?? await this.getInitialAccounts();

        LocalStorage.setAccounts(initialAccounts);

        Account.accounts = initialAccounts;
    }

    public setAccounts(accounts: IAccount[]) {
        Account.accounts = accounts;
    }

    static filterAccounts(filter: string): IAccount[] {
        const accounts = this.filterAccountsByInput(filter);

        return accounts;
    }

    static getAccounts(filter = '') {
        if(filter) {
            return this.filterAccounts(filter);
        }

        return Account.accounts;
    }

    public addNewAccount(newAccount: IAccount) {
        Account.accounts.push(newAccount);

        LocalStorage.setAccounts(Account.accounts);
    }

    static filterAccountsByInput(input: string): IAccount[] {
        const filteredAccounts = Account.accounts.filter(account => {
            const { firstName, lastName, tag } = account;

            return firstName.includes(input) || 
            lastName.includes(input) ||
            tag.includes(input);
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
    
    public deleteAccount(accountId: number) {
        const accounts = Account.accounts.filter(account => account.id !== accountId);
        this.setAccounts(accounts);

        LocalStorage.setAccounts(Account.accounts);
    } 
}