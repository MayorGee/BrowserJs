import { hide, IAccount } from '../abstracts/common.js';
import Account from './Account.js';

export default class AccountView extends Account {
    protected accountsToDisplay: IAccount[] = [];
    static accountList: HTMLUListElement;

    constructor() {
        super();
        AccountView.accountList = this.domManipulator.getElementByClassName('js-account-list') as HTMLUListElement;
    }

    public makeAccountsList() { 
        const [updateButton, deleteButton] = this.domManipulator.createButtons(
            {
                innerHtml: 'Edit',
                className: 'js-account-edit-button'
            },
            {
                innerHtml: 'Delete',
                className: 'js-account-delete-button'
            }
        );

        const listItems = this.createListItems('js-account-list-item');

        this.domManipulator.appendActionButtons<HTMLUListElement>(listItems, updateButton, deleteButton);
        this.addAccountToDom(listItems);
    }

    public hideUpdateForm() {
        const updateForm = this.domManipulator.getElementByClassName('js-update-form') as HTMLFormElement;
        this.domManipulator.addClassName(updateForm, hide);
    }

    private decideAccountsToDisplay() {
        this.accountsToDisplay = Account.filteredAccounts.length > 0 ?
                                 Account.filteredAccounts :
                                 Account.accounts;
    }

    private addAccountToDom(listItems: HTMLUListElement[]) {
        this.domManipulator.appendElements(AccountView.accountList, listItems);
    }

    public clearAccountList() {
        AccountView.accountList.innerHTML = '';
    }

    private createListItems(className: string): HTMLUListElement[] {
        this.decideAccountsToDisplay();

        const listItems = this.accountsToDisplay.map(account => {
            const [listItem, paragraph, span] = this.domManipulator.createElements<HTMLElement>('li', 'p', 'span');

            this.domManipulator.addClassName(span, 'js-account-tag', hide);
            this.domManipulator.addClassName(paragraph, 'js-account-fullname');
            this.domManipulator.addClassName(listItem, className);

            const fullName = this.getFullName(account.firstName, account.lastName);
            
            const currentImage = this.domManipulator.createImgElement({
                src: account.avatar,
                alt: 'account avatar',
                className: 'js-account-avatar'
            });

            this.domManipulator.appendInnerHtml(paragraph, fullName);
            this.domManipulator.appendInnerHtml(span, account.tag, ' ', account.id);
            this.domManipulator.appendInnerHtml<HTMLImageElement | HTMLParagraphElement | HTMLElement>(
                listItem, 
                currentImage.outerHTML, 
                paragraph.outerHTML, 
                span.outerHTML
            );
            
            return listItem;
        })

        return listItems as HTMLUListElement[];
    }
}