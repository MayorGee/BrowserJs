import { hide, Account } from '../abstracts/common.js';
import AccountModel from '../account/AccountModel.js';
import AccountView from '../account/AccountView.js';
import DomManipulator from '../dom/DomManipulator.js';

export default class EventHandler {
    protected domManipulator;
    protected accountView;

    constructor() {
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

        AccountView.accountList.addEventListener('click', (ev) => {
            const eventTarget = (ev.target as HTMLElement);

            if (eventTarget.className.includes('js-account-edit-button')) {
                this.domManipulator.removeClassName(updateForm, hide);
                const accountToUpdate = eventTarget.closest('.js-account-list-item') as HTMLUListElement;

                this.handleAccountModelUpdate(accountToUpdate, updateForm);
            }

            if (eventTarget.className.includes('js-account-delete-button')) {
                const accountToDelete = eventTarget.closest('.js-account-list-item') as HTMLUListElement;
                this.domManipulator.dropElement(accountToDelete);

                this.handleAccountModelDelete(accountToDelete);
            }
        });

        updateForm.addEventListener('submit', (ev) => {
            ev.preventDefault();
            this.handleUpdateFormSubmit(updateForm);
        });
    }

    private handleAccountModelDelete(accountToDelete: HTMLUListElement) {
        const hiddenSpan = (accountToDelete.querySelector('.js-account-tag') as HTMLSpanElement);
        const [, accountId] = hiddenSpan.innerText.split(' ');

        AccountModel.deleteAccount(+accountId);
    }

    private handleAccountModelUpdate(accountToUpdate: HTMLUListElement, updateForm: HTMLFormElement) {
        const accountImageSrc = (accountToUpdate.querySelector('.js-account-avatar') as HTMLImageElement).currentSrc;
        const [accountFirstName, accountLastName] = (accountToUpdate.querySelector('.js-account-fullname') as HTMLParagraphElement).innerText.split(' ');
        const [accountTag, accountId] = (accountToUpdate.querySelector('.js-account-tag') as HTMLSpanElement).innerText.split(' ');

        const updateFormInputTags = updateForm.getElementsByClassName('js-main-input') as unknown as HTMLInputElement[];

        this.updateFormInputs(updateFormInputTags, accountFirstName, accountLastName, accountImageSrc, accountTag, accountId);
        AccountModel.updateAccountModel({
            id: +accountId,
            firstName: accountFirstName,
            lastName: accountLastName,
            avatar: accountImageSrc,
            tag: accountTag
        });
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

    private handleFilterByTag(tag: string) {
        this.refreshDom(tag);
    }

    private handleFilterByInput(input: string) {
        this.refreshDom(input);
    }

    private handleAddFormSubmit(form: HTMLFormElement) {
        const addFormData = this.getFormData(form);
        const newAccount = AccountModel.createNewAccount(addFormData);

        AccountModel.addNewAccount(newAccount);

        this.refreshDom();
        form.reset();
    }

    private handleUpdateFormSubmit(form: HTMLFormElement) {
        const editFormData = this.getFormData(form);

        AccountModel.updateAccountModel(editFormData);
        
        this.refreshDom();
        form.reset();
    }

    private refreshDom(filter = '') {
        this.accountView.clearAccountModelList();
        this.accountView.makeAccountModelList(filter);
    }

    private getFormData(form: HTMLFormElement): Account {
        const formData = Object.fromEntries(new FormData(form)) as unknown as Account;

        return formData;
    }
}