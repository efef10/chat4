import * as React from "react";
import {appService,appStore} from "../models/AppStore";
import {User} from "../models/User";
import './AddUserToGroup.css';
import {Link} from 'react-router-dom';

interface IAddUserToGroupState{
    selected:{}
}


class AddUserToGroup extends React.Component<{},IAddUserToGroupState>{

    constructor(props:any){
        super(props);
        this.state={selected:{}}
    }

    public toggleSelect=(e:any)=>{

        let tmpSelected = this.state.selected;
        tmpSelected[e.target.parentElement.innerText]=!tmpSelected[e.target.parentElement.innerText];
        this.setState({selected:tmpSelected})
    }

    public generateUsers(){
        let group = appService.getSelectedGroup();
        if(!!group){
            let alreadyExist = {};
            for(let user of group.getChildren()){
                alreadyExist[(user as User).getUserName()]=true
            }
            let usersNotExists = appStore.chat.allUsersNames().filter(userName=>alreadyExist[userName]===undefined);

            return usersNotExists.map((user,idx)=>{
                return(
                    <label key={idx} className="container"><p>{user}</p>
                        <input onClick={this.toggleSelect} type="checkbox" />
                            <span className="checkmark"/>
                    </label>
            )
            });
        }
        else{
            return <li/>
        }
    }

    public sendSelections=()=>{
        let selected = this.state.selected;
        let updated = false;
        let group = appService.getSelectedGroup();
        if(!!group){
            for(let userName in selected){
                if(selected[userName]===true){
                    let user = appStore.chat.returnUserByName(userName);
                    if(!!user){
                        group.addUser(user);
                        appService.treeShouldUpdate();
                        updated = true;
                    }
                }
            }
            updated? alert("users added successfully"):alert("no users selected");
        }
    }

    public render(){
        const list = this.generateUsers();
        const group = appService.getSelectedGroup();
        const groupName = group?group.getGroupName():"";
        return(
            <div className="userToGroup">
                <h2>{`Choose users to add to group ${groupName}:`}</h2>
                <ul className="userSelection">{list}</ul>
                <Link to="/"><button id="select" onClick={this.sendSelections}>Join Users</button></Link>
                <Link to="/"><button className="back">{"< Back to Home Page"}</button></Link>
            </div>
        )
    }
}


export default AddUserToGroup;