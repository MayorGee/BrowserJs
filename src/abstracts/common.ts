export interface Account {
    id: number,
    name: string,
    surname: string,
    avatar: string,
    tag: string
}

export interface ButtonAttributes {
    innerHtml: string,
    className: string,
    onClink?: Function
}

export interface ImageAttributes {
    src: string,
    alt: string,
    className: string
}