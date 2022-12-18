export default class DomManipulator {
    public createElement(elementName: string): HTMLElement{
        return document.createElement(elementName);
    }

    public appendElement(element: HTMLElement, orphan: HTMLElement) {
        element.append(orphan);
    }

    public addClassName(element: HTMLElement, className: string) {
        element.classList.add(className);
    }

    public updateInnerHtml(element: HTMLElement, orphanNode: string) {
        element.innerHTML = orphanNode;
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