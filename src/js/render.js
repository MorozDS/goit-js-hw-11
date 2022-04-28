 import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { refs } from '../index';


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

export { renderPicture };