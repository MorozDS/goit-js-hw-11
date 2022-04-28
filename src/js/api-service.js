import Notiflix from 'notiflix';
import { refs } from '../index';
import { page } from '../index';

async function getImage(name) {
    const BASE_URL = 'https://pixabay.com/api/';
    const searchParams = new URLSearchParams({
        key: '27044833-133d6955f6c123c385198885a',
        q: name,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: 40,
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

export { getImage };