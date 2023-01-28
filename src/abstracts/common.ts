export interface Account {
    id: number,
    firstName: string,
    lastName: string,
    avatar: string,
    tag: string
}

export interface ButtonAttributes {
    innerHtml: string,
    className: string
}

export interface ImageAttributes {
    src: string,
    alt: string,
    className: string
}

export const hide = 'hide';