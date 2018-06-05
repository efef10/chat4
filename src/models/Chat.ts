import {Users} from './Users';
import {Group} from './Group';
import {nAryTree} from './nAryTree';

export class Chat{

    private groups:nAryTree;
    private users:Users;

    constructor() {
        // this.root = null;
        this.groups = new nAryTree();
        this.users = new Users();

        // example initials
        this.users.addUser("efrat",25,"efrat");
        this.users.addUser("eli",1,"eli");
        this.users.addUser("bambi",3,"bambi","bambi.jpg");
        this.users.addUser("simba",3,"simba","simba.jpg");
        this.groups.addInitialGroup("jsbootcamp3");
        this.addUserToGroup("simba","jsbootcamp3");
        this.addUserToGroup("efrat","jsbootcamp3");
        this.addUserToGroup("eli","jsbootcamp3");
        this.addUserToGroup("bambi","jsbootcamp3");
        this.addGroup("react","jsbootcamp3");
        this.addUserToGroup("efrat","jsbootcamp3>react");
        // this.addUserToGroup("eli","jsbootcamp3>react");
        this.addUserToGroup("bambi","jsbootcamp3>react");
        this.addMessageToGroup("jsbootcamp3>others","bambi","welcome to others group");
        this.addMessageToGroup("jsbootcamp3>others","efrat","what a great group!");
        this.addMessageToGroup("jsbootcamp3>others","efrat","with such a meaningfull name.... who had the idea to call a group 'others'???");
        this.addMessageToGroup("jsbootcamp3>others","eli","it was mine! don't you like it? you are more than welcome to think about a new cool name for us...");
        this.addMessageToGroup("jsbootcamp3>others","efrat",
            "VeryLongMessageTestVeryLongMessageTestVeryLongMessageTestVeryLongMessageTestVeryLongMessageTestVeryLongMessageTestVeryLongMessageTestVeryLongMessageTestVeryLongMessageTestVeryLongMessageTestVeryLongMessageTestVeryLongMessageTestVeryLongMessageTestVeryLongMessageTestVeryLongMessageTestVeryLongMessageTestVeryLongMessageTestVeryLongMessageTestVeryLongMessageTestVeryLongMessageTestVeryLongMessageTestVeryLongMessageTestVeryLongMessageTestVeryLongMessageTestVeryLongMessageTestVeryLongMessageTestVeryLongMessageTestVeryLongMessageTestVeryLongMessageTest");
        this.addMessageToGroup("jsbootcamp3>react","efrat","welcome to our group");
        let user = this.returnUserByName("efrat");
        if(!!user) {
            user.addMessage({content:"hi eli, it's efrat",date:new Date(),userName:"efrat",chattingWithUser:"eli"})
            user.addMessage({content:"hi bambi, it's efrat",date:new Date(),userName:"efrat",chattingWithUser:"bambi"})
        }
        this.addGroup("group3","jsbootcamp3>react");
        this.addGroup("group4","jsbootcamp3>react>group3");
        this.addGroup("group5","jsbootcamp3>react>group3>group4");
    }


    //------USERS FUNCTIONS------------
    //---------------------------------
    getGroups(){
        return this.groups;
    }

    addUser(userName:string,age:number,password:string){
        return this.users.addUser(userName,Number(age),password);
    }

    removeUser(userName:string){
        var groups = this.allGroupsOfUser(userName);
        for(var i=0 ; i<groups.length ; i++){
            groups[i].removeUser(userName);
        }
        return this.users.removeUser(userName);
    }

    allUsersNames(){
        return this.users.allUsersNames()
    }

    returnUserByName(userName:string){
        return this.users.returnUserByName(userName);
    }

    setUserAge(userName:string, newAge:number){
        return this.users.setUserAge(userName,newAge);
    }

    setUserPassword(userName:string, newPassword:string){
        return this.users.setUserPassword(userName, newPassword)
    }
    //---------------------------------
    //---------------------------------


    //------GROUPS FUNCTIONS-----------
    //---------------------------------
    addGroup(newGroupName:string,path:string){
        if(path === undefined){
            return this.groups.addInitialGroup(newGroupName);
        }
        var group = this.getGroupByPath(path);
        if (!!group){
            return group.addNewGroup(newGroupName);
        }
        else{
            return false;
        }
    }

    removeGroup(groupName:string,path:string){
        var group = this.getGroupByPath(path);
        if(!!group){
            let parent = group.getParent();
            if(parent === null){
                this.groups.deleteTree();
            }
            else{
                parent.removeGroup(groupName)
            }
        }

    }

    getGroupByPath(path:string){
        return this.groups.getGroupByPath(path);
    }

    searchGroup(groupName:string){
        return this.groups.searchGroup(groupName);
    }

    allGroupsNames(){
        return this.groups.allGroupsNames();
    }

    _rootIsNull(){
        return this.groups._rootIsNull();
    }

    flatGroup(path:string){
        var group = this.getGroupByPath(path);
        if(!!group && group.flat()){
            return true;
        }
        return false;
    }


    //---------------------------------
    //---------------------------------


    //------GROUPS & USERS-------------
    //---------------------------------
    addUserToGroup(userName:string,path:string){
        let user = this.users.returnUserByName(userName);
        if(!user){
            return false;
        }
        let group = this.getGroupByPath(path);
        if(!!group && group.addUser(user) !== null){
            return true;
        }
        else{
            return false;
        }
    }

    removeUserFromGroup(userName:string,path:string){
        var group = this.getGroupByPath(path);

        if(!!group && group.removeUser(userName)){
            return true;
        }
        else{
            return false;
        }
    }

    nameOfAllGroupsOfUser(userName:string){
        return this.allGroupsOfUser(userName).map((group:Group)=> {
            if (!!group) {
                return group.getGroupName();
            }
            return undefined;//fixme
        });
    }

    addMessageToGroup(path:string,userName:string, content:string){
        let g = this.getGroupByPath(path);
        if(!!g) {
            g.addMessage({
                content: content,
                date: new Date(),
                userName: userName
            });
        }
    }


    allGroupsOfUser(userName:string){
        return this.groups.allGroupsOfUser(userName);
    }

    returnGroupsAndUsers(){
        return this.groups.returnGroupsAndUsers();
    }
    //---------------------------------
    //---------------------------------
}


// module.exports.Chat = Chat;