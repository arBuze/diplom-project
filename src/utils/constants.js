import image from '../images/computer.jpg';

export const BASE_IMAGE_URL = 'http://localhost:3000/uploads/temp/';
export const BASE_APP_URL = 'http://localhost:3000/uploads/';
export const BASE_PROD_URL = 'http://localhost:3000/src-images/product_images/';
export const BASE_SALE_URL = 'http://localhost:3000/src-images/sale_images/';

export const NAME_REG = /^[A-Za-zА-Яа-яЁё\-_]{1,30}$/;
export const LASTNAME_REG = /^[A-Za-zА-Яа-яЁё\-_]{1,60}$/;
export const EMAIL_REG = "[a-zA-Z0-9\\.'+_`\\-]+@[a-zA-Z0-9.]+\\.[a-zA-Z0-9]{2,}";
export const PHONE_REG=/^(\+7|8)(\s?\d{3}){2}(-?\d{2}){2}$/m;

export const ERROR_TEXTS = {
  searchError: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз',
  saveError: 'При сохранении фильма произошла ошибка.',
  findError: 'Указанный фильм не найден.',
  deleteError: 'При удалении фильма произошла ошибка.',
  sameLoginError: 'Пользователь с таким логином уже существует.',
  upadateProfileError: 'При обновлении профиля произошла ошибка.',
  wrongData: 'Вы ввели неправильный логин или пароль',
  authError: 'При авторизации произошла ошибка.',
  registerError: 'При регистрации пользователя произошла ошибка.',
};

export const numberToName = {
  '01': 'января',
  '02': 'февраля',
  '03': 'марта',
  '04': 'апреля',
  '05': 'мая',
  '06': 'июня',
  '07': 'июля',
  '08': 'августа',
  '09': 'сентября',
  '10': 'октября',
  '11': 'ноября',
  '12': 'декабря',
};

export const ERROR_CODES = {
  conflict: 409,
  notFound: 404,
  auth: 401,
};

export const wordEnd = (length) => [11, 12, 13, 14].indexOf(length % 100) !== -1 ? 'ов' : length % 10 === 1 ? '' : [2, 3, 4].indexOf(length % 10) !== -1 ? 'а' : 'ов';
export const wordEnd1 = (length) => [11].indexOf(length % 100) !== -1 ? 'о' : length % 10 === 1 ? '' : 'о';

export const phoneTransform = (value, lastValue) => {
  const digits = '1234567890';
  const lastDigit = value[value.length - 1];
  const oldValue = lastValue ? lastValue : '';
  let tempValue = value;

  if (value.length > oldValue.length) {
    if (digits.includes(lastDigit)) {
      if (value.length === 7) {
        tempValue = value.slice(0, 6) + ' ' + lastDigit;
      } else if (value.length === 11 || value.length === 14) {
        tempValue = value.slice(0, value.length - 1) + '-' + lastDigit;
      }
    } else {
      return oldValue;
    }
  } else {
    if (value.length === 2) {
      return oldValue;
    }
    if ((lastDigit === ' ' && value.length !== 3) || lastDigit === '-') {
      tempValue = value.slice(0, value.length - 1);
    }
  }
  return tempValue;
}

export const linkMatches = [
  {
    name: 'Каталог',
    path: '/catalog',
  },
  {
    name: 'Корпуса',
    path: '/catalog/computer-cases',
  },
  {
    name: 'Процессоры',
    path: '/catalog/processors',
  },
  {
    name: 'Материнские платы',
    path: '/catalog/motherboards',
  },
  {
    name: 'Видеокарты',
    path: '/catalog/video-cards',
  },
  {
    name: 'Кулеры',
    path: '/catalog/coolers',
  },
  {
    name: 'Оперативная память',
    path: '/catalog/rams',
  },
  {
    name: 'Блок питания',
    path: '/catalog/power-units',
  },
  {
    name: 'Хранение данных',
    path: '/catalog/storages',
  },
  {
    name: 'Звуковые карты',
    path: '/catalog/sound-boards',
  },
  {
    name: 'Периферия',
    path: '/catalog/peripheral',
  },
  {
    name: 'Корзина',
    path: '/cart',
  },
  {
    name: 'Избранное',
    path: '/favorite',
  },
  {
    name: 'Ремонт',
    path: '/repair',
  },
  {
    name: 'Сборка',
    path: '/build',
  },
  {
    name: 'Акции',
    path: '/sales',
  },
  {
    name: 'О нас',
    path: '/about-us',
  },
  {
    name: 'Профиль',
    path: '/profile',
  },
  {
    name: 'Заказы',
    path: '/profile/orders',
  },
  {
    name: 'Заявки на ремонт',
    path: '/profile/applications',
  },
  {
    name: 'Оформление заказа',
    path: '/order-create',
  },
];
