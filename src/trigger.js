import { targetMap } from './share'

export function trigger(target, key, value, oldValue) {
  let targetKeyMap = targetMap.get(target)
  let depsMap = targetKeyMap.get(key)
  depsMap.forEach(listener => listener(value, oldValue))
}
