import * as React from 'react';

interface IMessage{
    content:string
    date:Date
    userName:string
}

interface IHistoryProps{
    messages:IMessage[]
}

interface IHistoryState{

}
class History extends React.Component<IHistoryProps,IHistoryState>{
    constructor(props:IHistoryProps){
        super(props);
    }

    public generateHistory(){
        return this.props.messages.map((message,idx)=>{
            return (
                <div className='message' key={idx}>
                     {/*+ myMessage - color white fixme*/}

                    <span className='histMessage'>{message.content}<span className='time'>{`  `+message.date}</span></span>
                </div>
            )
        });

    }

    public render(){
        const list = this.generateHistory();
        return(
            <div className='history'>
                <div className='messages'>{list}</div>
            </div>
        );
    }
}

export default History;