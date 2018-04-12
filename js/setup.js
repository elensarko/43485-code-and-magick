// Файл setup.js
'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var userDialog = document.querySelector('.setup');

var similarListElement = userDialog.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var randomItem = function (arr) {
  var min = 0;
  var max = arr.length - 1;
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
};

var renderArrWizards = function () {
  var wizards = [];
  for (var i = 0; i < 4; i++) {
    wizards[i] = {
      name: WIZARD_NAMES[randomItem(WIZARD_NAMES)] + ' ' + WIZARD_SURNAMES[randomItem(WIZARD_SURNAMES)],
      coatColor: COAT_COLORS[randomItem(COAT_COLORS)],
      eyesColor: EYES_COLORS[randomItem(EYES_COLORS)]
    };
  }
  return wizards;
};


var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

var createFragment = function () {
  var fragment = document.createDocumentFragment();
  var wizards = renderArrWizards();
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  similarListElement.appendChild(fragment);
};

createFragment();

userDialog.querySelector('.setup-similar').classList.remove('hidden');

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && evt.target.tagName !== 'INPUT') {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

var inputEyesColor = setup.querySelector('input[name=eyes-color]');
var changeColorEyes = function (arr) {
  var indexColor = arr.indexOf(inputEyesColor.value) + 1;
  var newColor = arr[indexColor % arr.length];
  wizardEyes.style.fill = newColor;
  inputEyesColor.value = newColor;
};

var inputFireballColor = setup.querySelector('input[name=fireball-color]');
var changeColorFireball = function (arr) {
  var color = arr[randomItem(arr)];
  fireballWrap.style.background = color;
  inputFireballColor.value = color;
};

var wizardEyes = setup.querySelector('.wizard-eyes');
wizardEyes.addEventListener('click', function () {
  changeColorEyes(EYES_COLORS);
});

var fireballWrap = setup.querySelector('.setup-fireball-wrap');
fireballWrap.addEventListener('click', function () {
  changeColorFireball(FIREBALL_COLORS);
});
