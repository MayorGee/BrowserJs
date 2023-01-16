import { IAccount } from '../abstracts/common.js';
import Account from './Account.js';

export default class AccountView extends Account {
    protected accountsToDisplay: IAccount[] = [];

    public makeAccountsList() { 
        const [updateButton, deleteButton] = this.domManipulator.createButtons(
            {
                innerHtml: 'Edit',
                className: 'account__update-button'
            },
            {
                innerHtml: 'Delete',
                className: 'account__delete-button'
            }
        );

        const listItems = this.createListItems('account__list-item');

        this.domManipulator.appendActionButtons<HTMLUListElement>(listItems, updateButton, deleteButton);
        this.addAccountToDom(listItems);
    }

    public hideUpdateForm() {
        const updateForm = this.domManipulator.getElementByClassName('js-update-form') as HTMLFormElement;
        updateForm.style.display = 'none';
    }

    private decideAccountsToDisplay() {
        this.accountsToDisplay = Account.filteredAccounts.length > 0 ?
                                 Account.filteredAccounts :
                                 Account.accounts;
    }

    private addAccountToDom(listItems: HTMLUListElement[]) {
        this.domManipulator.appendElements(Account.accountList, listItems);
    }

    public clearAccountList() {
        Account.accountList.innerHTML = '';
    }

    private createListItems(className: string): HTMLUListElement[] {
        this.decideAccountsToDisplay();

        const listItems = this.accountsToDisplay.map(account => {
            const [listItem, paragraph, span] = this.domManipulator.createElements<HTMLElement>('li', 'p', 'span');
            span.style.display = 'none';

            const fullName = this.getFullName(account.firstName, account.lastName);
            
            const currentImage = this.domManipulator.createImgElement({
                src: account.avatar,
                alt: 'account avatar',
                className: 'account__avatar'
            });

            this.domManipulator.addClassName(listItem, className);
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