export type mouseEvent = React.MouseEvent<HTMLImageElement>
export type touchEvent = React.TouchEvent<HTMLImageElement>

export type TLivro = {
    name: string;
    author: string,
    categories: string[],
    description: string;
    imageUrl?: string;
}

export type TCarrosselParams = {
    title: string,
    livros: {[id : string]: TLivro},
}

export type THeaderParams = {
    setLoginDisplay: React.Dispatch<React.SetStateAction<boolean>>,
    setActivePage: React.Dispatch<React.SetStateAction<string>>
}