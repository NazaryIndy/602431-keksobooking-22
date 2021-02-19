import { generateOffers } from './data.js';

const types = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
};

const offerCardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');
const offers = generateOffers();

const renderOffers = () => {
  const offersFragment = document.createDocumentFragment();

  offers.forEach((ad) => {
    const offerElement = offerCardTemplate.cloneNode(true);
    offerElement.querySelector('.popup__title').textContent = ad.offer.title;
    offerElement.querySelector('.popup__text--address').textContent = ad.offer.address;
    offerElement.querySelector('.popup__text--price').textContent = `${ad.offer.price} ₽/ночь`;
    offerElement.querySelector('.popup__type').textContent = types[ad.offer.type];
    offerElement.querySelector('.popup__text--capacity').textContent
      =`${ad.offer.rooms} комнаты для ${ad.offer.guests} гостей`;
    offerElement.querySelector('.popup__text--time').textContent
      =`Заезд после ${ad.offer.checkin}, выезд до ${ad.offer.checkout}`;
    offerElement.querySelector('.popup__features').textContent = `${ad.offer.features.join(', ')}`;
    offerElement.querySelector('.popup__description').textContent = ad.offer.description;

    ad.offer.photos.forEach((link) => {
      const imgElement =
        offerElement.querySelector('.popup__photos').querySelector('img').cloneNode(true);
      imgElement.src = link;
      offerElement.querySelector('.popup__photos').appendChild(imgElement);
    });

    offerElement.querySelector('.popup__avatar').src = ad.author.avatar;
    offersFragment.appendChild(offerElement);
  });
  return offersFragment;
};

export { renderOffers };
