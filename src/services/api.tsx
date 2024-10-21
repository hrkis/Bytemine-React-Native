import axios from 'axios';
import { common } from '../utils/common';

export const api = axios.create({
  baseURL: common.BASE_URL,
});

export const postRequest = (url: string, body: any, headers?: any) => {
  return new Promise((resolve, reject) => {

    axios.post(url, body, headers ? {
      headers: headers
    } : {})
      .then((response) => {
        resolve(response.data)
      })
      .catch((err) => {
        reject(err)
      })

    // fetch(url, {
    //   method: 'POST',
    //   body,
    //   headers,
    // })
    //   .then(response => {
    //     return response.json();
    //   })
    //   .then(data => {
    //     resolve(data);
    //   })
    //   .catch(err => reject(err));
  });
};

export const getRequest = (url: string) => {
  return new Promise((resolve, reject) => {
    var link: any = `https://app.mktdynamics.com/api/${url}`
    if (url.startsWith('http')) {
      link = url
    }

    fetch(link)
      .then(response => {
        return response.json();
      })
      .then(data => {
        resolve(data);
      })
      .catch(err => reject(err));
  });
};
