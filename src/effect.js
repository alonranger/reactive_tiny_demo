import { targetMap } from './share'

export function effect(target, key, cb) {
  let keyMap = targetMap.get(target)
  let effects = keyMap.get(key)
  effects.push(cb)
}
