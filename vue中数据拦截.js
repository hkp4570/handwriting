const data = {
    level1: {
        level2: {
            value: 100
        }
    }
}

function deepDefineProperty(obj) {
    for (const key in obj) {
        if (obj.hasOwnProperty(key) && typeof obj[key] === 'object') {
            deepDefineProperty(obj[key]);
        }
        let _value = obj[key];
        Object.defineProperty(obj, key, {
            configurable: true,
            enumerable: true,
            get() {
                console.log('读取' + key + '属性');
                return _value;
            },
            set(value) {
                console.log(`设置${key}属性`);
                _value = value;
            }
        })
    }
}

deepDefineProperty(data);
// console.log(data.level1.level2.value);
// data.level1.level2.value = 200;

function deepProxy(obj) {
    return new Proxy(obj, {
        get(target, key) {
            console.log('读取' + key + '属性');
            if (typeof target[key] === 'object') {
                return deepProxy(target[key]);
            }
            return target[key];
        },
        set(target, key, value) {
            console.log('设置' + key + '属性');
            if (typeof target[key] === 'object') {
                return deepProxy(target[key]);
            }
            target[key] = value;
        }
    })
}
const proxyData = deepProxy(data);
console.log(proxyData.level1.level2.value);
