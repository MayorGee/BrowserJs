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

            if(eventTarget.className === 'js-account-edit-button') {
                this.domManipulator.removeClassName(updateForm, 'hide');
                const accountToUpdate = eventTarget.closest('ul') as HTMLUListElement;

                this.handleAccountUpdate(accountToUpdate, updateForm);
            }

            if(eventTarget.className === 'js-account-delete-button') {
                this.domManipulator.dropElement(eventTarget.closest('ul'));
            }
        });

        updateForm.addEventListener('submit', (ev) => {
            ev.preventDefault();
            this.handleUpdateFormSubmit(updateForm);
        });
    }

    private handleAccountUpdate(accountToUpdate: HTMLUListElement, updateForm: HTMLFormElement) {
        const accountImageSrc = (accountToUpdate.querySelector('.js-account-avatar') as HTMLImageElement).currentSrc;
        const [accountFirstName, accountLastName] = (accountToUpdate.querySelector('.js-account-fullname') as HTMLParagraphElement).innerText.split(' ');
        const [accountTag, accountId] = (accountToUpdate.querySelector('.js-account-tag') as HTMLSpanElement).innerText.split(' ');

        const updateFormInputTags = updateForm.getElementsByClassName('main-input') as unknown as HTMLInputElement[];

        this.updateFormInputs(updateFormInputTags, accountFirstName, accountLastName, accountImageSrc, accountTag, accountId);
    }

    private updateFormInputs(
        updateFormInputs: HTMLInputElement[], 
        accountFirstName: string, 
        accountLastName: string, 
        accountImageSrc: string, 
        accountTag: string, 
        accountId: string
        ){
        updateFormInputs[0].value = accountFirstName;
        updateFormInputs[1].value = accountLastName;
        updateFormInputs[2].value = accountImageSrc;
        updateFormInputs[3].value = accountTag;
        updateFormInputs[4].value = accountId;

    }

    private handleFilterByTag(valueToSearch: string) {
        const filteredAccounts = Account.filterAccountsByTag(valueToSearch);

        this.account.setFilteredAccounts(filteredAccounts);
        this.refreshDom();
    }

    private handleFilterByInput(valueToSearch: string) {
        const filteredAccounts = Account.filterAccountsByInput(valueToSearch);

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