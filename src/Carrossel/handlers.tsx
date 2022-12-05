import { writeCarousel } from "./controllers";

export function handleCreateNewCarousel() {
    try {
        writeCarousel();
        alert('Criado com sucesso')
    } catch (err) {
        console.error(err);
        alert('falhou')
    }
}