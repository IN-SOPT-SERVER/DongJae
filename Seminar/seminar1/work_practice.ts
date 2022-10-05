interface FRIENDS {
    name: string;
    age: number;
    home: string;
    like: string;
}

const members: Array<FRIENDS> = [
    {
        name: "전선희",
        age: 23,
        home: "개봉",
        like: "피자"
    },
    {
        name: "김소현",
        age: 23,
        home: "상도",
        like: "방탈출"
    },
    {
        name: "김경린",
        age: 24,
        home: "일산",
        like: "산책"
    }
];

members.map((member) => console.log(`${member.name}은 ${member.age}살이고 ${member.home}에 살고있고 ${member.like}를 좋아합니다.`))