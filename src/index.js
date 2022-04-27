import './css/style.css';

import axios from 'axios';
import Notiflix from 'notiflix';
 import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

 
 const refs = {
    form: document.querySelector('#search-form'),
    input: document.querySelector('input'),
    gallery: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more'),
}


refs.form.addEventListener('submit', onSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMore);
refs.loadMoreBtn.classList.add('is-hidden');
let page = 1;
const totalPage = 3;

//====== кнопка submit===========
function onSubmit(e) {
    e.preventDefault();
    
    const inputValue = refs.input.value.trim();
    
    if (inputValue === '') {
        return;
    };

    refs.gallery.innerHTML = "";

    getImage(inputValue).then(renderPicture)

}

//=====load more кнопка =======

function onLoadMore() {
    page += 1;
    
    getImage(refs.input.value).then(renderPicture)
    
   
}



//========api запрос==============

async function getImage(name) {
    const BASE_URL = 'https://pixabay.com/api/';
    const searchParams = new URLSearchParams({
        key: '27044833-133d6955f6c123c385198885a',
        q: name,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: totalPage,
    })
    
    return await fetch(`${BASE_URL}?${searchParams}`).then(response => {

        if (!response.ok) {
    refs.loadMoreBtn.classList.add('is-hidden');
    Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.")
    throw new Error(response.status);
        }
        
        refs.loadMoreBtn.classList.remove('is-hidden');
        
        return response.json();

    })
       
}

//============= разметка=======

async function renderPicture(picture) {
    const galleryList = await picture.hits.map(data => {
        return `<div class="photo-card">
  <a href="${data.largeImageURL}"><img src="${data.webformatURL}" alt="${Object.values(data.tags)}" loading="lazy" /></a>
  <div class="info">
    <p class="info-item">
      <b>Likes: ${data.likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${data.views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${data.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${data.downloads}</b>
    </p>
  </div>
</div>`
        
    }
    ).join('');

              

    refs.gallery.insertAdjacentHTML('beforeend', galleryList);
    const lightbox =  new SimpleLightbox('.gallery a',
    {
    captionsData: 'alt',
    captionDelay: 250,
    });
     lightbox.refresh()   
};


