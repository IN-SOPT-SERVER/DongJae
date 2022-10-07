/* 

도전 과제 조건
1. Member, Dinner interface 만들고 타입 지정하기
2. organize 내부 로직 채우기

*/
import Dinner from "./interface/Dinner";

const dinner: Dinner = {
  member: [
    {
      name: "권세훈",
      group: "OB",
    },
    {
      name: "강민재",
      group: "OB",
    },
    {
      name: "최승빈",
      group: "OB",
    },
    {
      name: "백준",
      group: "YB",
    },
    {
      name: "이현우",
      group: "YB",
    },
    {
      name: "이다은",
      group: "YB",
    },
    {
      name: "박현정",
      group: "YB",
    },
    {
      name: "김다현",
      group: "YB",
    }
  ],
  pick: ['치킨', '피자', '마라탕', '연어덮밥', '엽떡', '마늘빵', '파스타'], 
  
  shuffle(array: any[]) {
    return array.sort(() => Math.random() - 0.5);
  },
  organize(array: any[]) {
    this.shuffle(array);
    this.shuffle(this.pick);
    const dinnerMember = array.map((member) => member.name);
    console.log(`결과 -> ${dinnerMember[0]}, ${dinnerMember[1]}는 ${this.pick[0]}을 드세요^^`);
  },
};

dinner.organize(dinner.member);
