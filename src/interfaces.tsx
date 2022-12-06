export type mouseEvent = React.MouseEvent<HTMLImageElement>
export type touchEvent = React.TouchEvent<HTMLImageElement>

export type TLivro = {
    name: string;
    author: string,
    categories: string[],
    description: string;
    imageUrl?: string;
}

export interface iCarrosselParams {
    title: string,
    livros: {[id : string]: TLivro},
}