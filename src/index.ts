import AccountView from './script/AccountView.js';
import { dummyAccounts } from './dummyDb.js';

const accountView = new AccountView(dummyAccounts);

accountView.makePage();