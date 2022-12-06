import { useEffect, useState } from 'react'
import { getLivroById, getLivroImageById, writeNewLivro, updateLivro, deleteLivro, deleteImage } from '../../Livro/controller';
import { TAdminParams } from '../../interfaces';
import './style.css'

export default function AdminPage({ setActivePage, currentLivroId, setCurrentLivroId, isAdmin }: TAdminParams) {
    const [livro, setLivro] = useState<any>()

    const [name, setName] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('')
    const [categorias, setCategorias] = useState<string[]>([]);
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => { 
        if (currentLivroId !== '') { preencheForm() }
    }, [currentLivroId])

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

    async function handleSubmit(e: any) {
        e.preventDefault();
        const form = e.target;

        if (!isAdmin) { return }
        if (!imageUrl) { return alert('Selecione uma imagem')}
        if (categorias.length === 0) return alert('Preencha ao menos uma categoria')
        if (!name || !author || !description || !categorias || !imageUrl) return alert('Campos não podem estar vazios')

        const imageFile = form['imageFile'].files[0]
        const dadosLivro = {
            name: form['name'].value,
            author: form['author'].value,
            description: form['description'].value,
            categories: categorias
        }

        try {
            currentLivroId ? updateLivro(dadosLivro, imageFile, currentLivroId) : writeNewLivro(dadosLivro, imageFile)
            alert('Cadastro realizado com sucesso');
            setCurrentLivroId('');
            setActivePage('Home')
        } catch (err: any) {
            console.error(err)
        }
    }

    async function preencheForm() {
        const livro = await getLivroById(currentLivroId)

        setName(livro.name);
        setAuthor(livro.author);
        setDescription(livro.description);
        setCategorias(livro.categories);

        const url = await getLivroImageById(currentLivroId);
        setImageUrl(url)
    }


    return (
        <form className='admin__container' onSubmit={handleSubmit} data-admin-form>
            <h1 className='admin__title'>Adicionar Imagem</h1>
            <section className='admin__image-section'>
                <div className='image-upload__container'>
                    <input type='file' className='image-upload__uploader'
                        id='imageFile'
                        onChange={(e: any) => {
                            handleImageUpload(e)
                        }}
                        data-file
                    />
                    <img src={imageUrl || ''} alt='' className='image-upload__preview' />
                </div>
                <div className='image-section__description'>
                    <h2 className='description__title'>Informações da imagem</h2>
                    <input className='description__input description__name'
                        placeholder='Nome'
                        id='name'
                        value={name}
                        onChange={(e: any) => { setName(e.target.value) }}
                        required data-name />
                    <input className='description__input description__autor'
                        placeholder='Autor'
                        id='author'
                        value={author}
                        onChange={(e: any) => { setAuthor(e.target.value) }}
                        required data-author />
                    <div className='description__container'>
                        <label className='description__label sub-section__title' htmlFor='description'>Descrição</label>
                        <textarea className='description__text' required
                            id='description'
                            rows={3}
                            data-description
                            value={description}
                            onChange={(e: any) => { setDescription(e.target.value) }}
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
                                    checked={categorias.includes(categoria.id) ? true : false}
                                />
                                <label className='categorias__label' htmlFor={categoria.id}>{categoria.label}</label>
                            </li>
                        ))}
                    </ul>
                    <button type="submit" className="botao">Salvar</button>

                    {isAdmin && currentLivroId !== '' ? (
                        <button 
                            type="button" 
                            className="botao"
                            style={{backgroundColor: 'red'}}
                            onClick={async () => {
                                try {
                                    await deleteLivro(currentLivroId);
                                    await deleteImage(currentLivroId);
                                    alert('Deletado com sucesso')
                                    setCurrentLivroId('');
                                    setActivePage('Home')
                                } catch (err: any) {
                                    console.error(err)
                                }
                            }}    
                        >Deletar</button>
                    ) : (<></>)}

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
