export {};

// import {IMessage} from './Group';

interface IUserMessage{
    content:string
    date:Date
    userName:string
    chattingWithUser:string
}

interface IUser{
    getUserName():string
    getAge():number
    setAge(age:number):boolean
    getPassword():string
    setPassword(password:string):void
    getType():string
    getUserMessages(chattingWith:string):IUserMessage[]
}

export class User implements IUser{
    private type:string;
    private name:string;
    private age:number;
    private password:string;
    private messages:IUserMessage[]

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
            return message.chattingWithUser === chattingWith;
        });
    }
    public addMessage(message:IUserMessage){
        this.messages.push(message);
    }
}

// module.exports.User = User;