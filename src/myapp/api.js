import moment from 'moment';
import uuid from 'uuid';
class Api {
  
   async getEvents() {
    let response = await fetch('http://192.168.3.103:3000/events');
    let responseJson = await response.json();
    return responseJson.map(e => ({
      ...e,
      date: new Date(e.date),
    }));
  }

    async saveEvent(payload) {
      let responseJson =  await fetch('http://192.168.3.103:3000/events', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ title: payload.title, date: payload.date, id: uuid()})
      });
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

export default new Api();