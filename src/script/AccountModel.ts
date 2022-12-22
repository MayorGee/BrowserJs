import { Account, getFullName } from '../abstracts/common';

export class AccountModel {
    private accounts: Account[] = [];

    constructor(accounts: Account[]) {
        this.accounts = accounts;
    }

    public getAccountById(id: number): Account {
        return this.accounts.filter(account => account.id === id)[0];
    }

    public getAccountsByName(name: string): Account[] {
        const queryResult = this.accounts.filter(account => {
            const fullName = getFullName(account.name, account.surname);

            if (fullName.toLowerCase().includes(name)) {
                return account;
            }
        })

        return queryResult;
    }

    public getAccountByTag(tag: string): Account {
        return this.accounts.filter(account => account.tag === tag)[0];
    }

    public addAccount(account: Account) {
        this.accounts.push(account);
    }

    public deleteAccount(id: number) {
        this.accounts = this.accounts.filter(account => account.id !== id);
    }

    public updateAccount(id: number, body: Account) {
        const accountIndex = this.accounts.findIndex(account => account.id === id);

        this.accounts[accountIndex] = body;
    }    
}