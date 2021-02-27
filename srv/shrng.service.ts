import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShrngService {
  message:string;
  rld:boolean=false;
  array:any[];

  constructor() { }

  public setMsg(a){
    this.message=a;
  }
  public getMsg(){
    return this.message;
  }

  public setArray(a:any[]){
    this.array=a;
  }
  public getArray(){
    return this.array;
  }

  public setBln(a){
    this.rld=a;
  }
  public getBln()
  {
    return this.rld;
  }
}

