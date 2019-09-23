import superagent from 'superagent';
import PropTypes from 'prop-types';
import decode from 'jwt-decode';
import { toast } from 'amis';
import { createIntl, createIntlCache } from 'react-intl';

import zhTranslationMessages from '../lang/zh-CN';
import enTranslationMessages from '../lang/en';

export { compose } from 'redux';

let store;
export const updateStore = (s) => {
  store = s;
};

const location = PropTypes.shape({
  hash: PropTypes.string.isRequired,
  key: PropTypes.string, // only in createBrowserHistory and createMemoryHistory
  pathname: PropTypes.string.isRequired,
  search: PropTypes.string.isRequired,
  state: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
    PropTypes.number,
    PropTypes.object,
    PropTypes.string,
  ]), // only in createBrowserHistory and createMemoryHistory
});

const history = PropTypes.shape({
  action: PropTypes.oneOf(['PUSH', 'REPLACE', 'POP']).isRequired,
  block: PropTypes.func.isRequired,
  canGo: PropTypes.func, // only in createMemoryHistory
  createHref: PropTypes.func.isRequired,
  entries: PropTypes.arrayOf(location), // only in createMemoryHistory
  go: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
  goForward: PropTypes.func.isRequired,
  index: PropTypes.number, // only in createMemoryHistory
  length: PropTypes.number,
  listen: PropTypes.func.isRequired,
  location: location.isRequired,
  push: PropTypes.func.isRequired,
  replace: PropTypes.func.isRequired,
});

export const commonPropTypes = {
  history,
  location,
};

export const auth = {
  async loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = auth.getToken(); // GEtting token from localstorage
    if (!!token && !auth.isTokenExpired(token)) {
      return true;
    }
    // auth.removeToken();
    return false;
  },
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        // Checking if token is expired. N
        if (auth.expireShow === false) {
          auth.expireShow = true;
          setTimeout(() => {
            auth.expireShow = false;
            window.location.href = '/admin/signin';
          }, 3000);
        }
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  },
  setToken(token) {
    localStorage.setItem('accessToken', token);
    auth.$token = token;
  },
  getToken() {
    if (auth.$token) {
      return auth.$token;
    }
    auth.$token = localStorage.getItem('accessToken');
    return auth.$token;
  },
  removeToken() {
    auth.$token = null;
    return localStorage.removeItem('accessToken');
  },
};

export const pageToOffset = (page, limit) => (page - 1) * limit;

export const renderAny = cb => cb();
const cache = createIntlCache();
const messageTotal = {
  en: enTranslationMessages,
  'zh-CN': zhTranslationMessages,
};

export const i18nTxt = (str) => {
  const { lang } = store.getState().common;
  const intl = createIntl(
    {
      locale: lang,
      messages: messageTotal[lang],
    },
    cache,
  );
  return intl.formatMessage({
    id: str,
  });
};


export const sendRequest = (config) => {
  const reqType = config.type || 'POST';
  const accessToken = auth.getToken();
  const apiUrl = config.url.startsWith('http') ? config.url : config.url;

  const reqPromise = superagent(reqType, apiUrl);
  if (!config.url.startsWith('http')) {
    reqPromise.set({
      ...config.headers,
      authorization: accessToken || undefined,
    });
  }

  reqPromise
    .query(config.query)
    .send(config.body)
    .responseType(config.responseType || 'json');

  reqPromise.catch((error) => {
    console.log(error);
    toast.error(error.message, 'network error');
  });
  return reqPromise;
};
