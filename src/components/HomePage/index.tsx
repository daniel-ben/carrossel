import { useEffect, useState } from 'react';
import { app } from '../../firebaseInit'
import Carrossel from '../../Carrossel';
import { getAllLivros, getLivrosImages } from '../../Livro/controller';
import { THomeParams, TLivro } from '../../interfaces'
import './style.css'

export default function HomePage({ setCurrentLivroId, isAdmin }: THomeParams) {

    const [livros, setLivros] = useState<{ [id: string]: TLivro }>({});

    useEffect(() => { handlePageLoad() }, [])

    async function handlePageLoad() {
        try {
            const data = await getAllLivros();
            if (!data.exists()) {
                return console.log("No data available")
            }
            const livros = data.val()
            const urls = await getLivrosImages(livros)

            urls.forEach((item) => {
                const id = item[0];
                const imageUrl = item[1];
                livros[id] = { ...livros[id], imageUrl };
            })
            setLivros(livros)
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className='home-page__container'>
            <Carrossel 
                title='Adicionados recentemente' 
                livros={livros} 
                setCurrentLivroId={setCurrentLivroId} 
                isAdmin={isAdmin}
            />
        </div>
    )
}


