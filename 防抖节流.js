function debounce(func, wait) {
    let timer = null;
    return function (...args) {
        const _this = this;
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(_this, args);
        }, wait)
    }
}
function throttle(func, wait){
    let lastTime = 0;
    return function(...args){
        const nowTime = new Date().getTime();
        if(nowTime - lastTime >= wait){
            func.apply(null,args);
            lastTime = nowTime;
        }
    }
}
