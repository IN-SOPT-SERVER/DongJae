import Member from "./Member";

export default interface Dinner {
    member : Member[];
    pick : string[];
    shuffle : (array: any[]) => any[];
    organize : (array: Member[]) => void;
  }