import { useEffect, useState } from 'react';
import { app } from '../../firebaseInit'
import Carrossel from '../../Carrossel';
import { getAllLivros } from '../../Carrossel/controllers';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { TLivro } from '../../interfaces'
import './style.css'

export default function HomePage() {
    const [livros, setLivros] = useState<{[id: string]:TLivro}>({});

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
                livros[id] = {...livros[id], imageUrl};
            })
            setLivros(livros)
        } catch (err) {
            console.error(err)
        }
    }

    async function getLivrosImages(livros: any) {
        const storage = getStorage();

        const urlPromises = (Object.keys(livros)).map(async (id: string): Promise<string[]> => {
            const imgRef = ref(storage, 'livros/' + id);
            const url = await getDownloadURL(imgRef)
            return [id, url]
        })
        
        const urls = await Promise.all(urlPromises)
        return urls
    }

    return (
        <div className='home-page__container'>
            <Carrossel title='Adicionados recentemente' livros={livros} />
        </div>
    )
}


