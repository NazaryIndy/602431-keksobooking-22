const types = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
};

const offerCardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const renderOffers = (offers) => {
  const offersFragment = document.createDocumentFragment();

  offers
    .forEach(({ offer, author }) => {
      const offerElement = offerCardTemplate.cloneNode(true);
      offerElement.querySelector('.popup__title').textContent = offer.title;
      offerElement.querySelector('.popup__text--address').textContent = offer.address;
      offerElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
      offerElement.querySelector('.popup__type').textContent = types[offer.type];
      offerElement.querySelector('.popup__text--capacity').textContent
        =`${offer.rooms} комнаты для ${offer.guests} гостей`;
      offerElement.querySelector('.popup__text--time').textContent
        =`Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

      const features = offerElement.querySelectorAll('.popup__feature');
      features.forEach((featureElement) => {
        const isExistFeature = offer.features.some((feature) => {
          return featureElement.classList[1].includes(feature);
        });
        if (!isExistFeature) {
          featureElement.remove();
        }
      });

      offerElement.querySelector('.popup__description').textContent = offer.description;

      offer.photos.forEach((link) => {
        const imgElement =
          offerElement.querySelector('.popup__photos').querySelector('img').cloneNode(true);
        imgElement.src = link;
        offerElement.querySelector('.popup__photos').appendChild(imgElement);
      });
      offerElement.querySelector('.popup__photos').querySelector('img').remove();
      offerElement.querySelector('.popup__avatar').src = author.avatar;
      offersFragment.appendChild(offerElement);
    });

  return offersFragment;
};

export { renderOffers };
