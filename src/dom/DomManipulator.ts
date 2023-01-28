export default class DomManipulator {
    public getElementByClassName(className: string): HTMLElement | null {
        const element = document.querySelector<HTMLElement>(`.${className}`);

        return element;
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