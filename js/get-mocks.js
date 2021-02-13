import { randomizeInRange } from './util.js';

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
const COORDS_FRACTION_LENGTH = 5;
const LATITUDE_RANGE = [35.65, 35.7];
const LONGITUDE_RANGE = [139.7, 139.8];
const ROOMS_RANGE = [1, 50];
const GUESTS_RANGE = [1, 50];
const PRICE_RANGE = [1, 200000];

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
  const advert = {
    author: AUTHORS[randomizeInRange(0, AMOUNT_OF_AUTHORS - 1)],

    offer: {
      title: TITLES.splice(randomizeInRange(0, TITLES.length - 1), 1)[0],
      price: randomizeInRange(...PRICE_RANGE),
      type: `${TYPES[randomizeInRange(0, TYPES.length - 1)]}`,
      rooms: randomizeInRange(...ROOMS_RANGE),
      guests: randomizeInRange(...GUESTS_RANGE),
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
      x: randomizeInRange(...LATITUDE_RANGE, COORDS_FRACTION_LENGTH),
      y: randomizeInRange(...LONGITUDE_RANGE, COORDS_FRACTION_LENGTH),
    },
  };

  advert.offer.address = `${advert.location.x} ${advert.location.y}`;

  return advert;
};

const getMocks = function () {
  return new Array(AMOUNT_OF_OBJECTS).fill(null).map(() => {
    return createAdvert();
  });
};

export { getMocks };
