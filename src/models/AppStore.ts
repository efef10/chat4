// import {listeners} from "cluster";
import {Group} from './Group';
import {Chat} from './Chat';

// import {IMessage} from './Group';



export interface AppState {
    chat : Chat
}

export class AppService {
    listeners: Function[];
    selectedGroup:Group|null;
    loggedUser:string;
    chattingWithUser:string;
    // users: User[];


    constructor(){
        this.listeners = [];
        this.loggedUser = "";
        this.chattingWithUser="";
    }

    addMessage(content:string){
        // appStore.chat.addMessageToGroup(path,userName,content);
        if(!!this.selectedGroup) {
            this.selectedGroup.addMessage({content: content, date: new Date(), userName: this.loggedUser});
            this.onStoreChanged();
        }
    }

    selectGroup(path:string){
        this.chattingWithUser = "";
        let group = appStore.chat.getGroupByPath(path);
        if(this.loggedUser!=="" && !!group && group.userInGroup(this.loggedUser)){
            this.selectedGroup= group;
        }
        else{
            this.selectedGroup=null;
        }
        this.onStoreChanged();
    }

    userSelected(userName:string){
        debugger;
        if(userName !== this.loggedUser){
            this.chattingWithUser = userName;
        }
        this.selectedGroup = null;
        this.onStoreChanged();
    }

    getMessages(){
        if(!!this.selectedGroup){
            return this.selectedGroup.getMessages();
        }
        else if(this.chattingWithUser!==""){
            let user = appStore.chat.returnUserByName(this.loggedUser);
            if(!!user){
                return user.getUserMessages(this.chattingWithUser);
            }
            else{
                return []
            }
            // return [{content: "test", date: new Date(), userName: "efrat"}]//fixme
        }
        else{
            return [];
        }
    }

    getLoggedUser(){
        return this.loggedUser;
    }

    getChattedWithUser(){
        return this.chattingWithUser;
    }

    getSelectedGroup(){
        return this.selectedGroup;
    }

    groupsToDisplay(){
        // if(this.loggedUser!==""){
        //     return appStore.chat.allGroupsOfUser(this.loggedUser);
        // }
        // else{
            let root = appStore.chat.getGroups().getRoot();
            if(!!root){
                return [root];
            }
            else
                return [];
        // }
    }

    logUser(userName:string){
        this.loggedUser=userName;
        this.onStoreChanged();
    }

    auth(userName:string,password:string){
        let user =  appStore.chat.returnUserByName(userName);
        if(!!user){
            return user.getPassword()===password;
        }
        return false;

    }

    signOut(){
        this.loggedUser="";
        this.selectedGroup=null;
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
