import * as readLine from 'readline';
import { stdin as input, stdout as output } from 'process';

export const rl  = readLine.createInterface({input,output});

export function question(query){
  return new Promise(resolve=>{
    rl.question(query,resolve);
  })
}

export function close(){
  rl.close();
}