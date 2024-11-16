function throttle(func, delay) {
    let isThrottled = false;
    return function (...args) {
        if(!isThrottled) {
            isThrottled = true;
            func.apply(this, args);
            setTimeout(() => {
                isThrottled = false;
            }, delay);
        }
    }
}

function add(a, b) {
    console.log(a+ b)
    return a + b;
}

const throttledFunction = throttle(add, 1000);

console.log(throttledFunction(12,18));