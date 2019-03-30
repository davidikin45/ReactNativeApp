import Reactotron, {trackGlobalErrors, openInEditor, overlay, asyncStorage, networking} from 'reactotron-react-native'
import {reactotronRedux} from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';

Reactotron
  .configure({
    name: 'React Native App'
  })
  .use(trackGlobalErrors())
  .use(openInEditor())
  .use(overlay())
  .use(asyncStorage())
  .use(networking())
  .use(reactotronRedux())
  .use(sagaPlugin())
  .useReactNative() // add all built-in react native plugins
  .connect(); // let's connect!

  Reactotron.clear();