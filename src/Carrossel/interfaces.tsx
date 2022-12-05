export interface iCarrossel {
    title: string;
    items: {
        description: string;
        imageUrl: string;
    }[];
}

export interface iCarrosselParams {
    carrossel: iCarrossel
}