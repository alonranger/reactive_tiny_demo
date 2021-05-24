const targetMap = new Map();

function trigger(target, key, value, oldValue) {
  let targetKeyMap = targetMap.get(target);
  let depsMap = targetKeyMap.get(key);
  depsMap.forEach(listener => listener(value, oldValue));
}

function track(target, key) {
  let targetKeyMap = targetMap.get(target);
  if (!targetKeyMap) {
    targetMap.set(target, (targetKeyMap = new Map()));
  }

  console.log(targetMap);
  let keyDeps = targetKeyMap.get(key);
  if (!keyDeps) {
    targetKeyMap.set(key, (keyDeps = new Set()));
  }
}

function reactive(obj) {
  let proxy = new Proxy(obj, {
    set(target, key, value, reciver) {
      let oldValue = target[key];
      if (oldValue != value) {
        trigger(proxy, key, value, oldValue);
      }

      return Reflect.set(target, key, value, reciver)
    },
    get(target, key, reciver) {
      track(proxy, key);
      return Reflect.get(target, key, reciver)
    },
  });

  return proxy
}

function effect(target, key, cb) {
  let keyMap = targetMap.get(target);
  let effects = keyMap.get(key);
  effects.push(cb);
}

var index = {
  reactive,
  effect,
};

export default index;
