import { IAccount } from './abstracts/common.js';

export default class LocalStorage {
    static accountsKey = 'accounts';

    static setAccounts(accounts: IAccount[]) {
        localStorage.setItem(this.accountsKey, JSON.stringify(accounts));
    }

    static getAccounts() {
        const accounts = localStorage.getItem(this.accountsKey);

        if(!accounts) {
            return null;
        }

        return JSON.parse(accounts);
    }
}