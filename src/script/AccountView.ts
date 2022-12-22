import { Account } from '../abstracts/common.js';
import { AccountModel } from './AccountModel.js';
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
                className: 'account__edit-button'
            },
            {
                innerHtml: 'Delete',
                className: 'account__delete-button'
            }
        );

        const listItems = this.createListItems(this.accounts, 'account__list-item');

        this.domManipulator.appendActionButtons<HTMLUListElement>(listItems, editButton, deleteButton);

        this.domManipulator.appendElements(accountList, listItems);
    }

    private createListItems(accounts: Account[], className: string): HTMLUListElement[] {
        const listItems = accounts.map(account => {
            const listItem = this.domManipulator.createElement<HTMLUListElement>('li');
            const paragraph = this.domManipulator.createElement<HTMLParagraphElement>('p');
            const fullName = AccountModel.getFullName(account.name, account.surname);
            
            const currentImage = this.domManipulator.createImgElement({
                src: account.avatar,
                alt: 'account avatar',
                className: 'account__avatar'
            });

            this.domManipulator.addClassName(listItem, className);
            this.domManipulator.appendInnerHtml(paragraph, fullName);
            this.domManipulator.appendInnerHtml<HTMLImageElement | HTMLParagraphElement>(listItem, currentImage.outerHTML, paragraph.outerHTML);

            return listItem;
        })

        return listItems;
    }
}