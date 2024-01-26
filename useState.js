let globalState = {};
let globalSubscribers= {};
let startIndex = 0;

function useState(initialValue){
    const currentIndex = startIndex;
    startIndex++;
    if(!(currentIndex in globalState)){
        globalState[currentIndex] = initialValue;
        globalSubscribers[currentIndex] = new Set();
    }
    const useState = (newState) => {
        if(typeof newState === 'function'){
            newState = newState(globalState[currentIndex]);
        }
        globalState[currentIndex] = newState;
        for (const subscribe of globalSubscribers[currentIndex]) {
            subscribe(newState);
        }
    }

    const subscribe = (subscriber) => {
        globalSubscribers[currentIndex].add(subscriber);
        return () => {
            globalSubscribers[currentIndex].delete(subscriber);
        }
    }
    return [globalState[currentIndex], useState, subscribe];
}

const [count1, setCount1, subscribeCount1] = useState(1);
subscribeCount1(newValue => {
    console.log('count1 change:' + newValue);
})
console.log(count1, 'count1');
setCount1(2);

const [count2, setCount2, subscribeCount2] = useState(2);
subscribeCount2(newValue => {
    console.log('count2 change:' + newValue)
})
console.log(count2, 'count2');
setCount2(state => state + 1);