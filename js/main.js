'use strict';

const calcLengthOfFraction = function (number) {
  return number.toString().includes('.')
    ? number.toString().split('.').pop().length
    : 0;
};

const randomizeInRange = function (bottom, top, precision = 0) {
  [bottom, top] = [Math.min(bottom, top), Math.max(bottom, top)];

  if (
    bottom < 0 ||
    precision < 0 ||
    Number.isInteger(precision) === false ||
    (top - bottom < 1 / 10 ** precision &&
      top.toString().slice(0, -precision) ===
        bottom.toString().slice(0, -precision))
  ) {
    return null;
  }

  const bottomFractionLength = calcLengthOfFraction(bottom);
  const topFractionLength = calcLengthOfFraction(top);
  let rangePrecisionMax = Math.max(
    bottomFractionLength,
    topFractionLength,
    precision,
  );

  if (rangePrecisionMax >= precision) {
    top = Math.floor(top * 10 ** precision);
    bottom = Math.ceil(bottom * 10 ** precision);
    rangePrecisionMax = 0;
  } else {
    top *= 10 ** (precision + rangePrecisionMax);
    bottom *= 10 ** (precision + rangePrecisionMax);
  }

  const randomInRange = Math.floor(bottom + Math.random() * (top + 1 - bottom));

  return +(randomInRange / 10 ** rangePrecisionMax / 10 ** precision).toFixed(
    precision,
  );
};

randomizeInRange(0.2, 100.99999999, 20);

/////////////////////////////////////////////
/////// GENERATE TEST DATA //////////////////
/////////////////////////////////////////////

const AMOUNT_OF_OBJECTS = 10;
const AMOUNT_OF_AUTHORS = 8;
const TYPES = ['palace', 'flat', 'house', 'bungalow'];
const TIME = ['12:00', '13:00', '14:00'];
const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const AUTHORS = new Array(AMOUNT_OF_AUTHORS).fill(null).map((_, index) => {
  return {
    avatar: `img/avatars/user0${index + 1}}}.png`,
  };
});
const TITLES = [
  'Студия с видом на Невский проспект',
  'Двухуровневая студия в центре в 5 мин. от метро #2',
  '⭐Большая ванна⭐Электронные замки ⭐Заселение 24/7',
  'Квартира у Медного всадника с отдельным входом',
  '2-комнатная студия Жуковского 6',
  'Location_SPb/Mohovaya 32',
  'Уютная Студия в Центре Петербурга',
  'Apartment in the heart of the city',
  'Новая Студия в центре в 5 минутах от метро! #3',
  'Duplex studio  city center',
];

const DESCRIPTIONS = [
  'Уютная студия в центре Петербурга, оснащенная современной мебелью и оборудованием для комфортного проживания. Имеется вся необходимая мебель и техника для комфортного проживания: на втором уровне - большая постель с матрасом, а внизу расположен санузел, гостиная и кухня. Окно выходит во двор, поэтому в студии нет городского шума. Студия полностью автономна: свои санузел и кухня.',
  'Уютная однокомнатная квартира с отдельным входом на первом этаже. Полностью оборудована : Смарт ТВ, WiFi, посуда , бокалы, эл. плита, душ полотенца и постельное белье - хлопок.',
  'Уютная квартира в современном стиле, 33 кв. метра. Находится в самом центре города рядом с Невским проспектом. В квартире есть все необходимое для комфортного проживания. Закрытый, безопасный двор с видео наблюдением, бесплатная парковка.',
  'Историческое сердце Петербурга, район театров, музеев и творческих людей!✹ 5 минут до Летнего сада, Фонтанки, Чижика Пыжика и Михайловского замка.✹ 7 минут до набережной Невского проспекта и Невы.✹ Насладитесь разводом мостов в шаге от вашего дома.✹ 10 минут до Спаса на Крови и Русского музея.✹ 22 м²',
  'Beautiful studio apartment in the center. Near Kazan and St. Isaacs Cathedral, Nevsky Prospect. All attractions within walking distance. 5 minutes away from underground. Restaurants and cozy cafes in the building. Clean and comfortable apartment with a fully equipped kitchen, washing machine, microwave, stove, shower. New double sofa.',
  'Duplex apartments in the "Consular House" are located on Kirochnaya street, 8. Metro "Chernyshevskaya" - 4 minutes on foot.The apartments are equipped with all necessary furniture and appliances for a comfortable stay, they have everything and more!',
  'Всего 3 минуты пешком до Казанского собора и до метро Невский проспект.Квартира находится на 1 этаже в тихом, зеленом дворе с видеонаблюдением.Окна выходят во двор, что позволит вам хорошо высыпаться после долгих прогулок по городу.Площадь 24 кв м.В квартире есть кухня с техникой, кофемашина, чайник, холодильник, электроплита, микроволновка, вытяжка, стиральная',
  'Студия 30 кв. метров, оформлена в романтическом стиле. Находится в самом центре города, рядом с Невским проспектом. Есть все необходимое для комфортного проживания. WiFi. Закрытый, безопасный двор с видео наблюдением, бесплатная парковка.',
  'Небольшая студия предназначена для 2-4х человек. Есть 4 спальных места (двуспальная кровать на 2 чел. и раскладной диван на 2 чел.). В ванной комнате есть стиральная машина, душ. На кухне: холодильник, индукционная плита на две конфорки, посудомоечная машина, тостер, кофеварка, микроволновая печь, чайник и посуда для приготовления и употребления пищи. Гостям выдаются полотенца и постельное белье.',
  'Дорогие гости! Добро пожаловать в Северную Пальмиру) Рады предложить Вам уютную квартиру 30 кв.м., расположенную в кирпичном доме начала 20 века в центре города.',
];

const createAdvert = function () {
  return {
    author: AUTHORS[randomizeInRange(0, AMOUNT_OF_AUTHORS - 1)],

    offer: {
      title: TITLES.splice(randomizeInRange(0, TITLES.length - 1), 1)[0],
      address: `${randomizeInRange(0, 90, 6)} ${randomizeInRange(0, 180, 6)}`,
      price: randomizeInRange(1, 200000),
      type: `${TYPES[randomizeInRange(0, TYPES.length - 1)]}`,
      rooms: randomizeInRange(1, 50),
      guests: randomizeInRange(1, 50),
      checkin: `${TIME[randomizeInRange(0, TIME.length - 1)]}`,
      checkout: `${TIME[randomizeInRange(0, TIME.length - 1)]}`,
      features: FEATURES.slice(randomizeInRange(0, FEATURES.length - 1)),
      description: DESCRIPTIONS.splice(
        randomizeInRange(0, DESCRIPTIONS.length - 1),
        1,
      )[0],
      photos: new Array(randomizeInRange(1, 3)).fill(null).map((_, index) => {
        return `http://o0.github.io/assets/images/tokyo/hotel${index + 1}.jpg`;
      }),
    },

    location: {
      x: randomizeInRange(35.65, 35.7, 5),
      y: randomizeInRange(139.7, 139.8, 5),
    },
  };
};

const testData = new Array(AMOUNT_OF_OBJECTS)
  .fill(null)
  .map(() => createAdvert());

testData; // чтобы пройти eslint check
