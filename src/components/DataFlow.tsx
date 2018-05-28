import * as React from 'react';
import Send from './Send';
import History from './History';

interface IMessage{
    content:string
    date:Date
    userName:string
}

interface IDataFlowProps{
    messages:IMessage[];
    user:string
}

interface IDataFlowState{
    messages:IMessage[]
}

class DataFlow extends React.Component<IDataFlowProps,IDataFlowState>{
    constructor(props:IDataFlowProps){
        super(props);
    }

    public render(){
        return(
            <div className='dataFlow'>
                <History messages={this.props.messages}/>
                <Send/>
            </div>
        );
    }
}

export default DataFlow;