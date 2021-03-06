import {AppRegistry, UIManager} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import axios from 'axios';
import {Sentry} from 'react-native-sentry';

let dsn = 'https://7d286949a9db4a239895e348a705bff0@sentry.io/1446565';

if (__DEV__) {
      // Route network requests through Chrome's native XMLHttpRequest
      //GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;
  
      // Use native FormData for native XMLHttpRequest set above
      //GLOBAL.FormData = GLOBAL.originalFormData ? GLOBAL.originalFormData : GLOBAL.FormData;
  
      // Use native Blob for native XMLHttpRequest set above
      //GLOBAL.Blob = GLOBAL.originalBlob || GLOBAL.Blob;
    
      // Use native FileReader to read native Blob set above
      //GLOBAL.FileReader = GLOBAL.originalFileReader || GLOBAL.FileReader;
  
      // fetch logger
     global._fetch = fetch;
      global.fetch = function (uri, options, ...args) {
      return global._fetch(uri, options, ...args).then((response) => {
         console.log('Fetch', { request: { uri, options, ...args }, response });
         return response;
      });
      };

    import('./src/config/ReactotronConfig').then(() => console.log('Reactotron Configured'));
}
else
{
   //Send errors to Sentry in Production.
   Sentry.config(dsn).install();
}

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

AppRegistry.registerComponent(appName, () => App);
