import * as React from 'react';
import {appService} from "../models/AppStore";

interface ISendProps{

}

interface ISendState{

}
class Send extends React.Component<ISendProps,ISendState>{
    private input:any
    constructor(props:ISendProps){
        super(props);
    }

    public addMessage =(e:any)=>{
        appService.addMessage(e.target.previousSibling.value);
        this.input.value="";
    }

    public render(){
        return(
            <div className='send'>
                <input ref={elem=>this.input = elem} id="message" type="text" placeholder='enter message'/>
                <button onClick={this.addMessage}>{'>'}</button>
            </div>
        );
    }
}

export default Send;