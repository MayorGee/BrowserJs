import { ButtonAttributes, ImageAttributes, } from '../abstracts/common.js';

export default class DomManipulator {
    public createElement<T>(elementName: string): T {
        return document.createElement(elementName) as unknown as T;
    }

    public createElements<T extends HTMLElement>(...elementNames: string[]) {
        const createdElements = elementNames.map(elementName => this.createElement<T>(elementName));

        return createdElements;
    }

    public createButtons(...buttonAttributes: ButtonAttributes[]) {
        const buttons = buttonAttributes.map(buttonAttribute => {
            const button = this.createElement<HTMLButtonElement>('button');

            this.addClassName(button, buttonAttribute.className); 
            this.appendInnerHtml(button, buttonAttribute.innerHtml);
            
            return button;
        })

        return buttons;       
    }


    public appendActionButtons<T extends HTMLElement>(elementItems: T[], ...actionButtons: HTMLButtonElement[]) {
        elementItems.forEach(elementItem => {
            this.appendElements<HTMLButtonElement>(elementItem, actionButtons);
        });
    }

    public createImgElement(imageAttributes: ImageAttributes) {
        const newImage = this.createElement<HTMLImageElement>('img');

        newImage.src = imageAttributes.src;
        newImage.alt = imageAttributes.alt;
        this.addClassName(newImage, imageAttributes.className);

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

    public dropElement(selectedElement: HTMLElement | null) {
        selectedElement?.remove();
    }   
}