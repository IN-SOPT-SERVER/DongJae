const condition: boolean = true;

const promise = new Promise((resolve, reject)=>{
    if (condition) {
        resolve("우와 Promise당");
    }
    else {
        reject(new Error("비동기 처리 도중 실패!"));
    }
});

promise
    .then((resolveData): void => console.log(resolveData))
    .catch((error): void => console.log(error));