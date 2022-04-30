import './css/style.css';
import { getImage } from './js/api-service';
import { renderPicture } from './js/render';
import Notiflix from 'notiflix';

 const refs = {
    form: document.querySelector('#search-form'),
    input: document.querySelector('input'),
    gallery: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more'),
}

refs.loadMoreBtn.classList.add('is-hidden');
refs.form.addEventListener('submit', onSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

let page = 1;



//====== кнопка submit===========
function onSubmit(e) {
    e.preventDefault();
    page = 1;
    const inputValue = refs.input.value.trim();
    
  if (inputValue === '') {
      refs.loadMoreBtn.classList.add('is-hidden');
        return;
    };

    try {
refs.gallery.innerHTML = "";

    getImage(inputValue).then(renderPicture)

    } catch (error) { 
         Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.")

    };

    
};

//=====load more кнопка =======

function onLoadMore() {
    page += 1;
    
    getImage(refs.input.value).then(renderPicture)
    
   
};




export { refs };
export { page };


