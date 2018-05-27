import * as React from 'react';
// const Group = require('./models/Group.ts').Group;
// const User = require('./models/User.ts').User;
import {Chat} from '../src/models/Chat';

// import {User} from '../src/models/User';

// const pop = require('reactjs-popup');
// import Popup from 'react-popup';
import DataFlow from './components/DataFlow';
import Popup from './components/PopUp';
import TreeComponent from './components/TreeComponent';
import './App.css';
import {Group} from '../src/models/Group';
// import {Link} from 'react-router-dom';
interface IMessage{
    content:string
    date:Date
    userName:string
}

interface IAppState{
    showPopup:boolean
    chat:Chat
    loggedUser:string
    userGroups:Group[]
    selectedGroup:Group
    messages:IMessage[]
}

class App extends React.Component<{},IAppState> {

    constructor(props:any){
        super(props);
        this.state = {
            showPopup: false,
            chat:new Chat(),
            loggedUser:"",
            userGroups:[],
            selectedGroup:{} as Group,//fixme
            messages:[]
        };
    }

    public addMessage=(message:string,time:Date)=>{
        this.state.chat.addMessageToGroup(this.state.selectedGroup.showGroupPath(),this.state.loggedUser,message);
        this.setState({messages:this.state.selectedGroup.getMessages()});
    }

    public groupsToDisplay(){
        if(this.state.loggedUser===""){
            let root = this.state.chat.getGroups().getRoot()
            if(root){
                return [root];
            }
            return [];
        }
        else{
            return this.state.userGroups;
        }
    }

    public togglePopup = ()=> {
        this.setState({
            showPopup: !this.state.showPopup
        });

        // this.setState(prevState => {
        //     prevState.showPopup = !this.state.showPopup
        //     ...
        // });  //fixme
    }

    public logUser = (userName:string)=>{
        this.setState({loggedUser:userName},()=>{
            this.setState({userGroups:this.state.chat.allGroupsOfUser(userName)});
        });
    }

    public groupSelected = (path:string)=>{
        if(this.state.loggedUser!==""){
            let g = this.state.chat.getGroupByPath(path);
            if(!!g){
                this.setState({selectedGroup:g},()=>{
                    console.log(this.state.selectedGroup.getGroupName())
                    this.setState({messages:this.state.selectedGroup.getMessages()},()=>{
                        console.log(this.state.messages[1]);
                    });
                });
            }
        }
    }

    public signOut=()=>{
        this.setState({loggedUser:"",messages:[]});
    }

  public render() {
    return (
      <div className="App">
              {this.state.showPopup ?<Popup text='Log In' logUser={this.logUser} closePopup={this.togglePopup}/> : null}
          <div className='header'>
                  <div className='navElement'>
                      Home
                  </div>
              <div id='SignOut' onClick={this.signOut}>
                  Sign Out
              </div>
                  <div id='logIn' onClick={this.togglePopup} >
                      Log In
                  </div>
          </div>
          <div className='main'>
              <div className='treeComponent'>
                  <h1>{"groups of User:" + this.state.loggedUser}</h1>
                  <TreeComponent groupSelected={this.groupSelected} items={this.groupsToDisplay()}/>
              </div>
              <div className='window'>
                  <DataFlow addMessage={this.addMessage} messages={this.state.messages} user={this.state.loggedUser}/>
              </div>
          </div>
      </div>
    );
  }
}

export default App;
