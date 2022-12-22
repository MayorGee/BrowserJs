import { Account, ButtonMaterial, getFullName, ImageMaterial, } from '../abstracts/common.js';

export default class DomManipulator {
    public createElement<T>(elementName: string): T {
        return document.createElement(elementName) as unknown as T;
    }
    
    public createListItems(accounts: Account[], className: string): HTMLUListElement[] {
        let listItems = accounts.map(account => {
            const listItem = this.createElement<HTMLUListElement>('li');
            const paragraph = this.createElement<HTMLParagraphElement>('p');
            const fullName = getFullName(account.name, account.surname);
            
            const currentImage = this.createImgElement({
                src: account.avatar,
                alt: 'account avatar',
                className: 'accounts__avatar'
            });

            this.addClassName(listItem, className);
            this.appendInnerHtml(paragraph, fullName);
            this.appendInnerHtml<HTMLImageElement | HTMLParagraphElement>(listItem, currentImage.outerHTML, paragraph.outerHTML);

            return listItem;
        })

        return listItems;
    }

    public createButtons(...buttonMaterials: ButtonMaterial[]) {
        const buttons = buttonMaterials.map(buttonMaterial => {
            const button = this.createElement<HTMLButtonElement>('button');

            this.addClassName(button, buttonMaterial.className); 
            this.appendInnerHtml(button, buttonMaterial.innerHtml);

            return button;
        })

        return buttons;       
    }

    public appendActionButtons<T extends HTMLElement>(elementItems: T[], ...actionButtons: HTMLButtonElement[]) {
        elementItems.forEach(elementItem => {
            this.appendElements<HTMLButtonElement>(elementItem, actionButtons);
        });
    }

    public createImgElement(imageMaterial: ImageMaterial) {
        const newImage = this.createElement<HTMLImageElement>('img');

        newImage.src = imageMaterial.src;
        newImage.alt = imageMaterial.alt;
        this.addClassName(newImage, imageMaterial.className);

        return newImage;
    }

    public getElementByClassName(className: string): HTMLElement | null {
        const element = document.querySelector<HTMLElement>(`.${className}`);

        return element;
    }

    public appendElement(parentElement: HTMLElement, loneChild: HTMLElement | Node) {
        parentElement.appendChild(loneChild);
    }

    public appendElements<T extends HTMLElement>(parentElement: HTMLElement, loneChildren: T[]) {
        loneChildren.forEach(loneChild => {
            this.appendElement(parentElement, loneChild.cloneNode(true));
        });
    }

    public addClassName(element: HTMLElement, className: string) {
        element.classList.add(className);
    }

    public appendInnerHtml<T>(element: HTMLElement, ...loneChildrenNode: (string | T)[]) {
        loneChildrenNode.forEach(loneChildNode => {
            element.innerHTML += loneChildNode;
        })
    }

    public dropElement(id: string) {
        const selectedElement = document.getElementById(id);
        selectedElement?.remove();
    }

    public removeClassName(element: HTMLElement, className: string) {
        element.classList.remove(className);
    }

    public removeChild(element: HTMLElement, child: HTMLElement) {
        element.removeChild(child);
    }   
}