import * as React from 'react';
import {appService} from "../src/models/AppStore";

import Popup from './components/PopUp';
// import TreeComponent from './components/TreeComponent';
import AddUserToGroup from './components/AddUserToGroup';
import './App.css';
import {Link,Redirect,Route,Switch} from 'react-router-dom';
const FontAwesome = require('react-fontawesome');
import '../node_modules/font-awesome/css/font-awesome.min.css';
import MainData from "./components/MainData";

interface IAppState{
    showPopup:boolean
}

class App extends React.Component<{},IAppState> {

    constructor(props:any){
        super(props);

        appService.subscribe(()=>{
            this.forceUpdate();
        })

        this.state = {
            showPopup: false,
        };
    }

    public togglePopup = ()=> {
        this.setState({
            showPopup: !this.state.showPopup
        },()=>{
            console.log(this.state.showPopup);
        });
    }

    public logOut=()=>{
        appService.logOut();
    }

    public renderLogIn=(props:any)=>
        (appService.getLoggedUser()===""?<Popup {...props} />:<Redirect to={{pathname:"/"}}/>)

    public renderSignUp = (props:any)=>
        (<div/>)

    public generateLink(){
        let group = appService.getSelectedGroup();
        if(!!group){
            return `/groups/${group.getGroupName()}/add`
        }
        return "";

    }

  public render() {
    return (
      <div className="App">
          <div className='header'>
              <Link to="/"><div className='navElement'>Home</div></Link>
              {appService.getSelectedGroup()!==null?<Link to={this.generateLink()}><FontAwesome onClick={this.togglePopup} name='user-plus' /></Link>:null}
              {/*{appService.getLoggedUser()===""?<Link to="login"><div id='logIn' onClick={this.togglePopup}>Log In</div></Link>:<Link to="/"><div id='logIn' onClick={this.logOut}>Log Out</div></Link>}*/}
              <Link to={appService.getLoggedUser()===""?"/login":"/"}><div id='logIn' onClick={appService.getLoggedUser()===""?this.togglePopup:this.logOut}>{appService.getLoggedUser()===""?"Log In":"Log Out"}</div></Link>
          </div>

          {/*<Route path='/sign-up' render={this.renderSignUp}/>*/}
          <Route path='/login' render={this.renderLogIn}/>
              <Switch>
                  <Route path='/groups/:group/add' component={AddUserToGroup}/>
                  <MainData>
                      <div>
                          <Route path='/login' render={this.renderLogIn}/>
                      </div>
                  </MainData>
              </Switch>
      </div>
    );
  }
}

export default App;
