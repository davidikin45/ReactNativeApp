import axios from 'axios';
import moment from 'moment';
import uuid from 'uuid';

const client = axios.create({
  baseURL:'http://localhost:3000/'
});

if(__DEV__)
{
  client.interceptors.request.use(request => {
    console.log('Api Request Starting:', request);
    return request;
  }, error => {
    console.log('Api Request Error:', error.message);
    return Promise.reject(error);
  });
  
  client.interceptors.response.use(response => {
    console.log('Api Response Success:', response.data);
    return response;
  }, error => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log('Api Response Error:', error.response);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log('Api No Response:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Api Request Error:', error.message);
    }
    return Promise.reject(error);
  });
}

class Api {
  constructor(client) {
		this.client = client;
	}
  
   async getEvents() {
    let response = await this.client.get('/events');
    return response.data;
  }

    async  saveEvent(payload) {
      let response =  await this.client.post('events', { title: payload.title, date: payload.date, id: uuid()});
      // let response =  await fetch('http://localhost:3000/events', {
      //   method: 'POST',
      //   headers: {
      //     "Content-Type": "application/json"
      //   },
      //   body: JSON.stringify({ title: payload.title, date: payload.date, id: uuid()})
      // });
      //let responseJson = response.json();
      let responseJson = response.data;
      return responseJson;
    }

    formatDateTime(dateString) {
    const parsed = moment(new Date(dateString));

    if (!parsed.isValid()) {
      return dateString;
    }

    return parsed.format('H A on D MMM YYYY');
  }

   formatDate(dateString) {
    const parsed = moment(new Date(dateString));

    if (!parsed.isValid()) {
      return dateString;
    }

    return parsed.format('D MMM YYYY');
  }

    getCountdownParts(eventDate) {
    const duration = moment.duration(moment(new Date(eventDate)).diff(new Date()));
    return {
      days: parseInt(duration.as('days')),
      hours: duration.get('hours'),
      minutes: duration.get('minutes'),
      seconds: duration.get('seconds'),
    };
  }
}

export default new Api(client);