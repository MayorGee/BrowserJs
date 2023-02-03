import FetchClient from '../api/FetchClient';
import LocalStorage from '../LocalStorage';
import AccountModel from './AccountModel';

export default class AccountApi {
    private static async getInitialAccounts() {
        const accounts = await FetchClient.get('http://localhost:3333/accounts');

        return accounts;
    }

    public static async initializeAccounts() {
        const initialAccounts = LocalStorage.getAccounts() || await this.getInitialAccounts();

        LocalStorage.setAccounts(initialAccounts);

        AccountModel.setAccounts(initialAccounts);
    }
}