import { targetMap } from './share'

export function track(target, key) {
  let targetKeyMap = targetMap.get(target)
  if (!targetKeyMap) {
    targetMap.set(target, (targetKeyMap = new Map()))
  }

  console.log(targetMap)
  let keyDeps = targetKeyMap.get(key)
  if (!keyDeps) {
    targetKeyMap.set(key, (keyDeps = new Set()))
  }
}
