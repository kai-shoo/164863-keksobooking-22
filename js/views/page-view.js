const renderMessage = function (name) {
  const template = document
    .querySelector(`#${name}`)
    .content.querySelector(`.${name}`);

  const fragment = document.createDocumentFragment();
  fragment.appendChild(template);
  document.querySelector('main').appendChild(fragment);

  const message = document.querySelector(`.${name}`);

  message.addEventListener('click', () => {
    document.querySelector(`.${name}`).remove();
  });
};

export const renderSuccess = function () {
  renderMessage('success');
};

export const renderError = function () {
  renderMessage('error');
};
