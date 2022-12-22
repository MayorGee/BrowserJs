import { Account } from '../abstracts/common.js';
import DomManipulator from './DomManipulator.js';

export default class AccountView {
    private domManipulator;
    private accounts: Account[];

    constructor(dummyData: Account[]) {
        this.domManipulator = new DomManipulator;
        this.accounts = dummyData;
    }

    public makePage() {
        const accountList = this.domManipulator.getElementByClassName('js-account-list');
        
        if (!accountList) {
            throw new Error('Account List Undefined');
        }

        const [editButton, deleteButton] = this.domManipulator.createButtons(
            {
                innerHtml: 'Edit',
                className: 'accounts__edit-button'
            },
            {
                innerHtml: 'Delete',
                className: 'accounts__delete-button'
            }
        );

        const listItems = this.domManipulator.createListItems(this.accounts, 'accounts__list-item');

        this.domManipulator.appendActionButtons<HTMLUListElement>(listItems, editButton, deleteButton);

        this.domManipulator.appendElements(accountList, listItems);
    }
}