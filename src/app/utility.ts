export class Utility
{
  constructor(){}

  static selectFromArrayRandomly<T>(arr: T[], num: number): T[]
  {
    let res: T[] = [];
    let seen: T[] = [];
    let counter = 0;

    while(counter<num)
    {
      //0<= rand < 1 -> 0<= rand*len < len
      let item = arr[Math.floor(Math.random()*arr.length)];
      if(!seen.includes(item)){
        seen.push(item);
        res.push(item);
        counter++;
      }
    }

    return res;
  }
}
