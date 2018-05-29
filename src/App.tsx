import * as React from 'react';
import {appService} from "../src/models/AppStore";
import DataFlow from './components/DataFlow';
import Popup from './components/PopUp';
import TreeComponent from './components/TreeComponent';
import './App.css';
import {Link,Switch,Route,Redirect} from 'react-router-dom';

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
        });
    }

    public signOut=()=>{
        appService.signOut();
    }

    public renderLogIn=(props:any)=>
        (appService.getLoggedUser()===""?<Popup {...props} />:<Redirect to={{pathname:"/"}}/>)

  public render() {
    return (
      <div className="App">
          <div className='header'>
                  <div className='navElement'>Home</div>
                  <div id='SignOut' onClick={this.signOut}>Sign Out</div>
                  <Link to="login"><div id='logIn' onClick={this.togglePopup}> Log In</div></Link>
          </div>
          <Switch>
              <section>
                  <Route path='/login' render={this.renderLogIn}/>
              </section>
          </Switch>
          <div className='main'>
              <div className='treeComponent'>
                  <TreeComponent/>
              </div>
              <div className='window'>
                  <DataFlow messages={appService.getMessages()}/>
              </div>
          </div>
      </div>
    );
  }
}

export default App;
