Function.prototype.myCall = function (context, ...args) {
    if (typeof this !== 'function') {
        throw new Error('必须使用函数调用');
    }
    context = context || globalThis;
    const fn = Symbol('fn');
    context[fn] = this;
    const result = context[fn](...args);
    delete context[fn];
    return result;
}
const test = {
    name: "test",
    hello: function () {
        console.log(`hello,${this.name}!`);
    },
    add: function (a, b) {
        return a + b;
    },
};

Function.prototype.myApply = function (context, args) {
    if (typeof this !== 'function') {
        throw new Error('必须使用函数调用');
    }
    if (!args || !Array.isArray(args)) {
        args = [];
    }
    context = context || globalThis;
    const fn = Symbol('key');
    context[fn] = this;
    const result = context[fn](...args);
    delete context[fn];
    return result;

}

Function.prototype.myBind = function (context, ...args) {
    if (typeof this !== 'function') {
        throw new Error('必须使用函数调用');
    }
    context = context || globalThis;
    const _this = this;

    return function fn(...innerArgs) {
        // 使用new关键字
        if (this instanceof fn) {
            return new _this(...args, ...innerArgs);
        }
        return _this.apply(context, args.concat(innerArgs));
    }
}
// const obj = {name: "world"};
// test.hello.myApply(obj); //hello,world!
// test.hello.apply(obj);//hello,world!
// console.log(test.add.myApply(null, [1, 2]));//3
// console.log(test.add.apply(null, [1, 2]));//3

const test1 = {
    name: "xxx",
    hello: function (a,b,c) {
        console.log(`hello,${this.name}!`,a+b+c);
    },
};

const obj = { name: "world" };
let hello1 = test1.hello.myBind(obj,1);
let hello2 = test1.hello.bind(obj,1);
hello1(2,3)//hello,world! 6
hello2(2,3)//hello,world! 6
console.log(new hello1(2,3));
console.log(new hello2(2,3));
