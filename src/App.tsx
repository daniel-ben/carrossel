import React from 'react';
import { getDatabase, ref as dbRef, set } from "firebase/database";
import { app } from './firebaseInit'
import Carrossel from './Carrossel';
import './App.css';

function App() {

  function handlePageLoad() {

  }


  return (
    <div className="App">
      <Carrossel carrossel={test} />
      <Carrossel carrossel={test} />
      <Carrossel carrossel={test} />
      <Carrossel carrossel={test} />
      <Carrossel carrossel={test} />
    </div>
  );
}

export default App;


const test = {
  title: 'Livros lidos esse ano',
  items: [
    {
      description: 'Em O idiota, Dostoiévski constrói um dos personagens mais impressionantes de toda a literatura mundial - o humanista e epiléptico príncipe Míchkin',
      imageUrl: 'https://a-static.mlcdn.com.br/800x560/livro-o-idiota/magazineluiza/223741200/cdabecb3199184ad9762fbbf307540c9.jpg'
    }, {
      description: 'Introdução à lingugagem Typescript',
      imageUrl: 'https://m.media-amazon.com/images/I/41JHd+anIkL._SY346_.jpg',
    }, {
      description: 'Gente pobre mostra ao leitor a dura realidade vivida pelos moradores de São Petesburgo, no século XIX por meio das cartas trocadas entre os protagonistas.',
      imageUrl: 'https://m.media-amazon.com/images/I/51-vqFZS1cL._SY344_BO1,204,203,200_QL70_ML2_.jpg'
    }, {
      description: 'Em um mundo onde as pessoas vivem em função das telas e a literatura está ameaçada de extinção, os livros são objetos proibidos, e seus portadores são considerados criminosos.',
      imageUrl: 'https://m.media-amazon.com/images/I/41PVVpQf-sL._SY344_BO1,204,203,200_QL70_ML2_.jpg'
    }, {
      description: 'Curso prático ensinando SQL',
      imageUrl: 'https://m.media-amazon.com/images/I/51Meg8yMu8L._SY344_BO1,204,203,200_QL70_ML2_.jpg'
    }, {
      description: 'Contada em sua famosa prosa poderosa e minimalista, esta história de coragem e triunfo pessoal é até hoje uma das obras mais duradouras de Ernest Hemingway.',
      imageUrl: 'https://m.media-amazon.com/images/I/419Jl7oflOL._SY344_BO1,204,203,200_QL70_ML2_.jpg'
    },
  ]
}