import { useEffect, useState } from 'react';
import { app } from '../../firebaseInit'
import Carrossel from '../../Carrossel';
import { getAllLivros, getLivrosImages } from '../../Livro/controller';
import { THomeParams, TLivro } from '../../interfaces'
import './style.css'

export default function HomePage({ setCurrentLivroId, isAdmin }: THomeParams) {

    const [livros, setLivros] = useState<{ [id: string]: TLivro }>({});
    const [livrosClassicos, setLivrosClassicos] = useState<{ [id: string]: TLivro }>({});
    const [livrosDistopias, setLivrosDistopias] = useState<{ [id: string]: TLivro }>({});
    const [livrosProgramacao, setLivrosProgramacao] = useState<{ [id: string]: TLivro }>({});

    useEffect(() => { handlePageLoad() }, [])

    async function handlePageLoad() {
        try {
            const data = await getAllLivros();
            if (!data.exists()) {
                return console.log("No data available")
            }
            const livros = data.val()
            const urls = await getLivrosImages(livros)

            let classicos: { [id: string]: TLivro } = {};
            let distopias: { [id: string]: TLivro } = {};
            let programacao: { [id: string]: TLivro } = {};

            urls.forEach((item) => {
                const id = item[0];
                const imageUrl = item[1];
                livros[id] = { ...livros[id], imageUrl };

                if (livros[id].categories.includes('classico')) {
                    classicos[id] = livros[id];
                }

                if (livros[id].categories.includes('distopia')) {
                    distopias[id] = livros[id];
                }

                if (livros[id].categories.includes('programacao')) {
                    programacao[id] = livros[id];
                }
            })
            setLivros(livros)
            setLivrosClassicos(classicos)
            setLivrosDistopias(distopias);
            setLivrosProgramacao(programacao)
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

            <Carrossel
                title='Livros de Programação'
                livros={livrosProgramacao}
                setCurrentLivroId={setCurrentLivroId}
                isAdmin={isAdmin}
            />

            <Carrossel
                title='Clássicos da literatura'
                livros={livrosClassicos}
                setCurrentLivroId={setCurrentLivroId}
                isAdmin={isAdmin}
            />

            <Carrossel
                title='Distopias'
                livros={livrosDistopias}
                setCurrentLivroId={setCurrentLivroId}
                isAdmin={isAdmin}
            />


        </div>
    )
}


