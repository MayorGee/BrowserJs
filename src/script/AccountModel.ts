import { Account } from '../abstracts/common';

export class AccountModel {
    private accounts: Account[] = [];

    constructor(accounts: Account[]) {
        this.accounts = accounts;
    }

    public getAccountById(id: number): Account | undefined {
        return this.accounts.find(account => account.id === id);
    }

    public getAccountsByName(name: string): Account[] {
        const filteredAccounts = this.accounts.filter(account => {
            const fullName = AccountModel.getFullName(account.name, account.surname);

            return fullName.toLowerCase().includes(name);
        })

        return filteredAccounts;
    }

    public static getFullName = (name: string, surname: string): string => {
        return name + ' ' + surname;
    }

    public getAccountByTag(tag: string): Account | undefined {
        return this.accounts.find(account => account.tag === tag);
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