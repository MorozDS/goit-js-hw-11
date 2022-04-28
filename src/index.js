import './css/style.css';
import { getImage } from './js/api-service';
import { renderPicture } from './js/render';


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
    
    const inputValue = refs.input.value.trim();
    
  if (inputValue === '') {
      refs.loadMoreBtn.classList.add('is-hidden');
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


export { refs };
export { page };