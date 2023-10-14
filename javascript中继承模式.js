// 原型链继承
Father1.prototype.name1 = 'father1';
function Father1(name){
    this.name = name;
}

Son1.prototype = new Father1("son1");
function Son1(){

}

// 构造函数继承
function Father2(name, age){
    this.name = name;
    this.age = age;
}
function Son2(name,age,sn){
    Father2.call(this,name,age)
    this.sn = sn;
}

// 共享原型
Father3.prototype.lastname = 'father3';
function Father3(){

}
Son3.prototype = Father3.prototype;
Son3.prototype.name = 'li';
function Son3(){

}

// 圣杯模式
const inherit = (function(){
    function F(){}
    return function(Target, Origin) {
        F.prototype = Origin.prototype;
        Target.prototype = new F();
        Target.prototype.constructor = Target;
        Target.prototype.order = Origin.prototype;
    }
})()
Father4.prototype.lastname = 'father4';
function Father4(){

}
function Son4(){

}
inherit(Son4,Father4);
const son = new Son4();
console.log(son);


