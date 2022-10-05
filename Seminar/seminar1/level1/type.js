//원시 타입
//number, String, Boolean, Symbol, Null, Undefined

//객체 타입
const user = {
    email: "kinbell@gmail.com",
    name: "김동재",
    getFavoriteFoods: function () {
        this.getFavoriteFoods.forEach((food) => {
            console.log(`${food} 먹고싶다 배고프다!`);
        })
    },
}

const array = [null, "하하", 2];

function sum(a, b) {
    return a + b;
}

const sum = (a, b) => {
    return a + b;
};

const add = (a, b) => a + b; // return 생략 가능
