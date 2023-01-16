import { IAccount } from '../abstracts/common.js';
import Account from './Account.js';
import AccountView from './AccountView.js';
import DomManipulator from './DomManipulator.js';

export default class EventHandler {
    protected domManipulator;
    protected account;
    protected accountView;

    constructor() {
        this.account = new Account();
        this.domManipulator = new DomManipulator();
        this.accountView = new AccountView();
    }

    public addEventListeners() {
        const addForm = this.domManipulator.getElementByClassName('js-add-form') as HTMLFormElement;
        const updateForm = this.domManipulator.getElementByClassName('js-update-form') as HTMLFormElement;
        const searchInput = this.domManipulator.getElementByClassName('js-search-input') as HTMLInputElement;
        const selectTag = this.domManipulator.getElementByClassName('js-select-tag') as HTMLInputElement;
        
        addForm.addEventListener('submit', (ev) => {
            ev.preventDefault();
            this.handleAddFormSubmit(addForm);
        });

        searchInput.addEventListener('input', (ev) => {
            const valueToSearch = (ev.target as HTMLInputElement).value;
            this.handleFilterByInput(valueToSearch);
        });

        selectTag.addEventListener('change', (ev) => {
            const valueToSearch = (ev.target as HTMLInputElement).value;
            this.handleFilterByTag(valueToSearch);
        });

        Account.accountList.addEventListener('click', (ev) => {
            const eventTarget = (ev.target as HTMLElement);

            if(eventTarget.className === 'account__update-button') {
                updateForm.style.display = 'flex';
                const accountToUpdate = eventTarget.parentElement as HTMLUListElement;

                this.handleAccountUpdate(accountToUpdate, updateForm);
            }

            if(eventTarget.className === 'account__delete-button') {
                this.domManipulator.dropElement(eventTarget.parentElement);
            }
        });

        updateForm.addEventListener('submit', (ev) => {
            ev.preventDefault();
            this.handleUpdateFormSubmit(updateForm);
        });
    }

    private handleAccountUpdate(accountToUpdate: HTMLUListElement, updateForm: HTMLFormElement) {
        const accountImageSrc = (accountToUpdate.children[0] as HTMLImageElement).currentSrc;
        const [accountFirstName, accountLastName] = (accountToUpdate.children[1] as HTMLInputElement).innerText.split(' ');
        const [accountTag, accountId] = (accountToUpdate.children[2] as HTMLSpanElement).innerText.split(' ');
        
        const updateFormDivs = Array.from(updateForm.getElementsByTagName('div'));
        updateFormDivs.pop();

        const updateFormInputs = updateFormDivs.map(updateFormDiv => updateFormDiv.getElementsByTagName('input'));

        this.updateFormInputs(updateFormInputs, accountFirstName, accountLastName, accountImageSrc, accountTag, accountId);
    }

    private updateFormInputs(
        updateFormInputs: HTMLCollectionOf<HTMLInputElement>[], 
        accountFirstName: string, 
        accountLastName: string, 
        accountImageSrc: string, 
        accountTag: string, 
        accountId: string
        ) {
        updateFormInputs[0][0].value = accountFirstName;
        updateFormInputs[1][0].value = accountLastName;
        updateFormInputs[2][0].value = accountImageSrc;
        updateFormInputs[3][0].value = accountTag;
        updateFormInputs[4][0].value = accountId;
    }

    private handleFilterByTag(valueToSearch: string) {
        const filteredAccounts = Account.accounts.filter(account => {
            return account.tag === valueToSearch;
        });

        this.account.setFilteredAccounts(filteredAccounts);
        this.refreshDom();
    }

    private handleFilterByInput(valueToSearch: string) {
        const filteredAccounts = Account.accounts.filter(account => {
            const { firstName, lastName, tag } = account;

            return firstName.includes(valueToSearch) || 
            lastName.includes(valueToSearch) ||
            tag.includes(valueToSearch);
        });

        this.account.setFilteredAccounts(filteredAccounts);
        this.refreshDom();
    }

    private handleAddFormSubmit(form: HTMLFormElement) {
        const addFormData = this.getFormData(form);
        const newAccount = this.account.createNewAccount(addFormData);

        this.account.addNewAccount(newAccount);

        this.refreshDom();
        form.reset();
    }

    private handleUpdateFormSubmit(form: HTMLFormElement) {
        const editFormData = this.getFormData(form);

        this.account.updateAccount(editFormData);
        
        this.refreshDom();
        form.reset();
    }

    private refreshDom() {
        this.accountView.clearAccountList();
        this.accountView.makeAccountsList();
    }

    private getFormData(form: HTMLFormElement): IAccount {
        const formData = Object.fromEntries(new FormData(form)) as unknown as IAccount;

        return formData;
    }
}