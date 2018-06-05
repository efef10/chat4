import * as React from "react";
import DataFlow from './DataFlow';
import TreeComponent from './TreeComponent';
import {appService} from "../models/AppStore";
import {Redirect} from 'react-router-dom';
import Popup from './PopUp';

class MainData extends React.Component{

    public renderLogIn=(props:any)=>
    {debugger;
    return appService.getLoggedUser()===""?<Popup {...props} />:<Redirect to={{pathname:"/"}}/>}

    public render(){
        return(
            <div className='main'>
                <div className='treeComponent'>
                    <TreeComponent/>
                </div>
                <div className='window'>
                    <DataFlow messages={appService.getMessages()}/>
                </div>
            </div>
        )
    }
}


export default MainData;