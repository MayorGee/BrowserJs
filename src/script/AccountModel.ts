import { Account } from "../abstracts/common";

export class AccountModel {
    private accounts: Account[] = [];

    constructor(accounts: Account[]) {
        this.accounts = accounts;
    }

    public getAccountById(id: number) {
        return this.accounts.filter(account => account.id === id);
    }

    public getAccountByName(name: string) {
        const queryResult: Account[] = [];
        
        this.accounts.map(account => {
            const fullName = account.name + account.surname;

            if (fullName.toLowerCase().includes(name)) {
                queryResult.push(account);
            }
        })

        return queryResult;
    }

    public getAccountByTag(tag: string) {
        return this.accounts.filter(account => account.tag === tag);
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