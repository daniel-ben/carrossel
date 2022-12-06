import { useEffect, useState } from 'react'
import { getDatabase, ref as ref_database, child, push } from "firebase/database";
import { getStorage, ref as ref_storage, uploadBytes } from "firebase/storage";
import './style.css'

type TAdminParams = {
    setActivePage: React.Dispatch<React.SetStateAction<string>>
}
export default function Admin({setActivePage}: TAdminParams) {
    const [imageUrl, setImageUrl] = useState('');
    const [categorias, setCategorias] = useState<string[]>([]);

    function handleImageUpload(event: any) {
        const file = event.target.files[0];
        setImageUrl(URL.createObjectURL(file))
    }

    function updateCategorias(e: any) {
        const checkbox = e.target;
        if (checkbox.checked && !categorias.includes(checkbox.id)) {
            setCategorias([...categorias, checkbox.id])
        } else if (!checkbox.checked && categorias.includes(checkbox.id)) {
            const novaLista = categorias.filter((value) => value !== checkbox.id)
            setCategorias(novaLista)
        }
    }

    async function handleWriteLivro(e: any) {
        e.preventDefault();
        const form = e.target;
        if (categorias.length === 0) { return alert('Preencha ao menos uma categoria') }

        const imageFile = form['imageFile'].files[0]
        const dadosLivro = {
            name: form['name'].value,
            author: form['author'].value,
            description: form['description'].value,
            categories: categorias
        }

        const database = ref_database(getDatabase());
        const storage = getStorage();

        try {
            const id = push(child(database, "livros/"), dadosLivro).key;
            const storageRef = ref_storage(storage, "livros/" + id);
            uploadBytes(storageRef, imageFile);

            alert('Cadastro realizado com sucesso');
            setActivePage('Home')
        } catch (err: any) {
            console.error(err)
        }
    }

    return (
        <form className='admin__container' onSubmit={handleWriteLivro}>
            <h1 className='admin__title'>Adicionar Imagem</h1>
            <section className='admin__image-section'>
                <div className='image-upload__container'>
                    <input type='file' className='image-upload__uploader'
                        id='imageFile'
                        required
                        onChange={(e: any) => {
                            handleImageUpload(e)
                        }}
                    />
                    <img src={imageUrl || ''} alt='' className='image-upload__preview' />
                </div>
                <div className='image-section__description'>
                    <h2 className='description__title'>Informações da imagem</h2>
                    <input className='description__input description__name' placeholder='Nome' id='name' required />
                    <input className='description__input description__autor' placeholder='Autor' id='author' required />
                    <div className='description__container'>
                        <label className='description__label sub-section__title' htmlFor='description'>Descrição</label>
                        <textarea className='description__text' required
                            id='description'
                            rows={3}
                            placeholder='Insira descrição aqui'></textarea>
                    </div>

                    <h3 className='categorias__title sub-section__title'>Categorias</h3>
                    <ul className='image-section__categorias'>
                        {listaCategorias.map((categoria, index) => (
                            <li key={index} className='categorias__item'>
                                <input className='categorias__input' name='categoria' data-categoria
                                    type='checkbox'
                                    id={categoria.id}
                                    onChange={updateCategorias}
                                />
                                <label className='categorias__label' htmlFor={categoria.id}>{categoria.label}</label>
                            </li>
                        ))}
                    </ul>
                    <button type="submit" className="botao">Salvar</button>
                </div>
            </section>
        </form>

    )
}


const listaCategorias = [
    {
        id: 'programacao',
        label: 'Programação'
    }, {
        id: 'classico',
        label: 'Clássico'
    }, {
        id: 'distopia',
        label: 'Distopia'
    }, {
        id: 'nacional',
        label: 'Nacional'
    }
]