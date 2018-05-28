export {};

import {IMessage} from './Group';


interface IUser{
    getUserName():string
    getAge():number
    setAge(age:number):boolean
    getPassword():string
    setPassword(password:string):void
    getType():string
    getUserMessages(chattingWith:string):IMessage[]
}

export class User implements IUser{
    private type:string;
    private name:string;
    private age:number;
    private password:string;
    private messages:IMessage[]

    constructor(userName:string, age:number, password:string){
        this.type = "user";
        this.name = userName;
        this.age = age;
        this.password = password;
        this.messages=[];
    }
    public getType() {
        return this.type;
    }
    public getUserName() {
        return this.name;
    }
    public getAge(){
        return this.age;
    }
    public setAge(age:number){
        this.age = age;
        return true;
    }
    public getPassword() {
        return this.password;
    }
    public setPassword(password:string) {
        this.password = password;
    }
    public getUserMessages(chattingWith:string){
        debugger
        return this.messages.filter((message)=>{
            return message.userName === chattingWith;
        });
    }
    public addMessage(message:IMessage){
        this.messages.push(message);
    }
}

// module.exports.User = User;