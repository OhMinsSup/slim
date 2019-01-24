import {createStore, use} from './core/createStore'
import {warnIf} from './helpers/throwIf'
import {isPlainObject} from './helpers/type'
import {parse2Json} from './helpers/util'

/*
* This is a dummy function to check if the function name has been altered by minification.
* If the function has been minified and NODE_ENV !== 'production', warn the user.
*/
const __DEV__ = process.env.NODE_ENV !== 'production'

function isCrushed() {
}

warnIf(
    __DEV__ &&
    typeof isCrushed.name === 'string' &&
    isCrushed.name !== 'isCrushed',
    'You are currently using minified code outside of NODE_ENV === "production". ' +
    'This means that you are running a slower development build of Slim. '
)

const _createStore = () => {
  if (__DEV__) {
    const devtoolPlugin = {
      init (store) {
        window.addEventListener('message', (e) => {
          const {type, state} = parse2Json(e.data)
          if (type === '__SLIM_DEVTOOL_ANSWER__') {
            store.emit('__SLIM_DEVTOOL_ANSWER__', parse2Json(state))
          }
        })
      },
      after (state, action) {
        if (['__SLIM_DEVTOOL_ANSWER__', '__SLIM_DEVTOOL_SET__', '__SLIM_DEVTOOL__'].indexOf(action) === -1) {
          window.postMessage({
            type: '__SLIM_DEVTOOL__',
            state: JSON.stringify(state),
            actionType: action
          }, '*')
        }
      }
    }

    use(devtoolPlugin)
  }

  return createStore
}

const Slim = {
  createStore: _createStore(),
  use
}

export default Slim
