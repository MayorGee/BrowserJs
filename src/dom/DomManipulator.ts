export default class DomManipulator {
    public getElementByClassName(className: string): HTMLElement | null {
        return document.querySelector<HTMLElement>(`.${className}`);
    }

    public removeClassName(element: HTMLElement, className: string) {
        element.classList.remove(className);
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