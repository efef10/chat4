// import {listeners} from "cluster";
import {Group} from './Group';
import {Chat} from './Chat';

// import {IMessage} from './Group';



export interface AppState {
    chat : Chat
    selectedGroup:Group|null;
    loggedUser:string;
    chattingWithUser:string;
}

export class AppService {
    listeners: Function[];
    // selectedGroup:Group|null;
    // loggedUser:string;
    // chattingWithUser:string;
    // users: User[];


    constructor(){
        this.listeners = [];
        appStore.loggedUser = "";
        appStore.chattingWithUser="";
    }

    addMessage(content:string){
        debugger
        // appStore.chat.addMessageToGroup(path,userName,content);
        if(!!appStore.selectedGroup) {
            appStore.selectedGroup.addMessage({content: content, date: new Date(), userName: appStore.loggedUser});
            // auto reply:
            appStore.selectedGroup.addMessage({content: "what do you say???", date: new Date(), userName: "bambi"});
        }
        else if(appStore.chattingWithUser!=="") {
            // debugger
            let user = appStore.chat.returnUserByName(appStore.loggedUser);
            let chattingWith =  appStore.chat.returnUserByName(appStore.chattingWithUser);
            if(!!user && !!chattingWith) {
                user.addMessage(
                    {content: content,
                     date: new Date(),
                     userName: appStore.loggedUser,
                     chattingWithUser:appStore.chattingWithUser});

                // auto reply:
                chattingWith.addMessage(
                    {content: appStore.loggedUser === appStore.chattingWithUser ? "I'm your virtual Psychologist. \n can I help you?":`hi ${appStore.loggedUser} !!! we haven't talk for a long time`,
                     date: new Date(),
                     userName: appStore.chattingWithUser,
                     chattingWithUser:appStore.loggedUser})
            }
        }
        this.onStoreChanged();
    }

    selectGroup(path:string){
        appStore.chattingWithUser = "";
        let group = appStore.chat.getGroupByPath(path);
        if(appStore.loggedUser!=="" && !!group && group.userInGroup(appStore.loggedUser) ){
            appStore.selectedGroup= group;
        }
        else{
            appStore.selectedGroup=null;
        }
        this.onStoreChanged();
    }

    userSelected(userName:string){
        if(appStore.loggedUser===""){
            return;
        }
        appStore.chattingWithUser = userName;
        // this.chattingWithUser = (userName !== this.loggedUser) ? userName : "";
        appStore.selectedGroup = null;
        this.onStoreChanged();
    }

    getMessages(){
        if(!!appStore.selectedGroup){
            return appStore.selectedGroup.getMessages();
        }
        else if(appStore.chattingWithUser!=="" && appStore.loggedUser!==""){
            let user = appStore.chat.returnUserByName(appStore.loggedUser);
            let chattingWith =  appStore.chat.returnUserByName(appStore.chattingWithUser);
            if(!!user && !!chattingWith){
                let allMessages =  user.getUserMessages(appStore.chattingWithUser).concat
                (appStore.loggedUser !==appStore.chattingWithUser ?chattingWith.getUserMessages(appStore.loggedUser):[]);
                return allMessages.sort((message1:any,message2:any)=>{
                        return message1.date-message2.date;
                })
            }
            else{
                return []
            }
        }
        else{
            return [];
        }
    }

    getLoggedUser(){
        return appStore.loggedUser;
    }

    getChattedWithUser(){
        return appStore.chattingWithUser;
    }

    getSelectedGroup(){
        return appStore.selectedGroup;
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
        appStore.loggedUser=userName;
        this.onStoreChanged();
    }

    auth(userName:string,password:string){
        let user =  appStore.chat.returnUserByName(userName);
        if(!!user){
            return user.getPassword()===password;
        }
        return false;

    }

    logOut(){
        appStore.loggedUser="";
        appStore.selectedGroup=null;
        appStore.chattingWithUser="";
        this.onStoreChanged();
    }

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
    chat : new Chat(),
    selectedGroup:null,
    loggedUser:"",
    chattingWithUser:"",
};

export const appService: AppService = new AppService();
