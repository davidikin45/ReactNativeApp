import Reactotron, {trackGlobalErrors, openInEditor, overlay, asyncStorage, networking} from 'reactotron-react-native'
import {reactotronRedux} from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';

const reactotron = Reactotron
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

  reactotron.clear();

  export default reactotron