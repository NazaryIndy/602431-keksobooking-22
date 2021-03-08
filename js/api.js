const getData = (onSuccess, onFail) => {
  fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        onFail('Не удалось загрузить предложения. Попробуйте позже');
      }
    })
    .then((offers) => {
      onSuccess(offers);
    })
    .catch(() => {
      onFail('Не удалось загрузить предложения. Попробуйте позже');
    });
};

const sendData = (onSuccess, successMessage, errorMessage, body) => {
  fetch('https://22.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        successMessage();
        onSuccess();
      } else {
        errorMessage()
      }
    })
    .catch(() => {
      errorMessage()
    });
};

export { getData, sendData };
