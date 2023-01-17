import { IAccount } from "../abstracts/common";

export default class LocalStorage {
    static setAccounts(accounts: IAccount[]) {
        localStorage.setItem('accounts', JSON.stringify(accounts));
    }
}