import { trigger } from './trigger'
import { track } from './track'
import { targetMap } from './share'

export function reactive(obj) {
  let proxy = new Proxy(obj, {
    set(target, key, value, reciver) {
      let oldValue = target[key]
      if (oldValue != value) {
        trigger(proxy, key, value, oldValue)
      }

      return Reflect.set(target, key, value, reciver)
    },
    get(target, key, reciver) {
      track(proxy, key)
      return Reflect.get(target, key, reciver)
    },
  })

  return proxy
}
