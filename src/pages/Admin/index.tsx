import './style.css'

export default function Admin() {
    return (
        <div className='admin__container'>
            <h1 className='admin__title'>Adicionar Imagem</h1>

            <section className='admin__image-section'>
                <div className='image-upload__container'>
                    <input type='file' className='image-upload__uploader' />
                    <img src='' alt='' className='image-upload__preview' />
                </div>
                <div className='image-section__description'>
                    <h2 className='description__title'>Informações da imagem</h2>

                    <div className='description__container'>
                        <label className='description__label' htmlFor='description'>Descrição</label>
                        <textarea id='description' rows={3} className='description__text' placeholder='Insira descrição aqui'></textarea>
                    </div>

                    <h3 className='categorias__title'>Categorias</h3>
                    <ul className='image-section__categorias'>
                        {listaCategorias.map((categoria, index) => (
                            <li key={index} className='categorias__item'>
                                <input id={categoria.id} className='categorias__input' type='checkbox' name='categoria' />
                                <label className='categorias__label' htmlFor={categoria.id}>{categoria.label}</label>
                            </li>
                        ))}
                    </ul>

                    {/* <div>
                        <h3>Adicione uma categoria</h3>
                        <input />
                    </div> */}
                </div>
            </section>
        </div>

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