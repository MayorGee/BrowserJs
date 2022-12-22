export interface Account {
    id: number,
    name: string,
    surname: string,
    avatar: string,
    tag: string
}

export interface ButtonMaterial {
    innerHtml: string,
    className: string,
    onClink?: Function
}

export interface ImageMaterial {
    src: string,
    alt: string,
    className: string
}

export const getFullName = (name: string, surname: string): string => {
    return name + ' ' + surname;
}