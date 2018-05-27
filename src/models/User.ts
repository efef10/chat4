export {};

interface IUser{
    getUserName():string
    getAge():number
    setAge(age:number):boolean
    getPassword():string
    setPassword(password:string):void
    getType():string
}

export class User implements IUser{
    private type:string;
    private name:string;
    private age:number;
    private password:string;

    constructor(userName:string, age:number, password:string){
        this.type = "user";
        this.name = userName;
        this.age = age;
        this.password = password;
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
}

// module.exports.User = User;