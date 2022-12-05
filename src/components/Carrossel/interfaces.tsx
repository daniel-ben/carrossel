export interface iCarrossel {
    title: string;
    items: {
        description: string;
        imageUrl: string;
        name: string;
    }[];
}

export interface iCarrosselParams {
    carrossel: iCarrossel,
}