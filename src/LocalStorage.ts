import { Account } from './abstracts/common.js';

export default class LocalStorage {
    static accountsKey = 'accounts';

    static setAccounts(accounts: Account[]) {
        localStorage.setItem(this.accountsKey, JSON.stringify(accounts));
    }

    static getAccounts() {
        const accounts = localStorage.getItem(this.accountsKey);

        if (!accounts) {
            return null;
        }

        return JSON.parse(accounts);
    }
}