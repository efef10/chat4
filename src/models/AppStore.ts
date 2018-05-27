// import {listeners} from "cluster";
// import {User} from './User';
import {Chat} from './Chat';

export interface AppState {
    chat : Chat
}

export class AppService {
    listeners: Function[];
    // users: User[];


    constructor(){
        this.listeners = [];
    }

    addMessage(path:string,userName:string,content:string){
        appStore.chat.addMessageToGroup(path,userName,content);
        this.onStoreChanged();
    }


    // dec(){
    //     appStore.counter--;
    //
    //     this.onStoreChanged();
    // }

    subscribe(listener:Function){
        this.listeners.push(listener);
    }

    private onStoreChanged(){
        for(const listener of this.listeners){
            listener();
        }
    }
}

export const appStore: AppState = {
    chat : new Chat()
};

export const appService: AppService = new AppService();
