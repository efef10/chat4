import * as React from 'react'
// import {nAryTree} from '../models/nAryTree';
import {Group} from '../models/Group';
import {appService} from "../models/AppStore";


interface myGroupSpan extends HTMLSpanElement{
    path:string
}

interface ITreeProps{
    // items:Group[]  // Group[]|null
    groupSelected(groupName:string):void
}

// interface IItem{
//     name:string
//     type:string
//     children:IItem[]
// }

interface ITreeState {
    groups:Group[]

}

class TreeComponent extends React.Component<ITreeProps,ITreeState>{
    private element:any;

    constructor(props:ITreeProps){
        super(props);
        this.state = {groups:appService.groupsToDisplay()}
    }

    public componentDidUpdate(){
        // this.generateTree(this.state.groups);
        // this.generateTree(this.props.items);
    }

    public componentDidMount() {
        this.generateTree(this.state.groups);
        // this.generateTree(this.props.items);
        this.element.addEventListener("keydown",this.arrowsKeyboard);
        this.element.addEventListener("dblclick",this.showHideGroups);
        this.element.addEventListener("click",(e:any)=>{
                console.log(e.type);
                e.stopPropagation();
                e.target.focus();
                if(e.target.classList.contains("group")){
                    let target = e.target as myGroupSpan
                    this.props.groupSelected(target.path);//
                }
                else{
                    debugger;
                    appService.userSelected(e.target.innerText)
                }
        });

    }
    // React.ChangeEvent<HTMLInputElement>//fixme
    public  arrowsKeyboard=(e:React.KeyboardEvent<HTMLDivElement>)=>{
        if (e.keyCode == 38) {
            // up arrow
            let elements = this.element.querySelectorAll("li");
            let displayedElements =[];
            for(let i=0;i<elements.length; i++){
                if (elements[i].offsetParent !== null) {
                    displayedElements.push(elements[i]);
                }
            }
            let target = e.target as HTMLElement;
            let index = displayedElements.indexOf(target.parentElement);
            if(index>0){
                let elem = displayedElements[index-1];
                elem.querySelector("span").focus();
            }
        }
        else if (e.keyCode == 40) {
            // down arrow
            let elements = this.element.querySelectorAll("li");
            let displayedElements =[];
            for(let i=0;i<elements.length; i++){
                if (elements[i].offsetParent !== null) {
                    displayedElements.push(elements[i]);
                }
            }
            let target = e.target as HTMLElement;
            let index = displayedElements.indexOf(target.parentElement);
            if(index<displayedElements.length-1){
                let elem = displayedElements[index+1];
                elem.querySelector("span").focus();
            }
        }
        // else if (e.keyCode == 37 && (e.target as HTMLTextAreaElement).classList.contains("group")) {
        //     // left arrow
        //     let parent = (e.target as HTMLElement).parentElement
        //     if(!!parent){
        //         let ul = parent.querySelector(":scope > ul");
        //         if(!!ul){
        //             if(ul.classList.contains("hidden")){
        //                 let parent = ul.parentElement.parentElement;
        //                 while(parent.tagName!== "LI"){
        //                     parent = parent.parentElement;
        //                     if(!parent){
        //                         return;
        //                     }
        //                 }
        //                 parent.querySelector(":scope > span").focus();
        //             }
        //             else{
        //                 ul.classList.add("hidden");
        //             }
        //         }
        //         else{
        //             let parent = e.target.parentElement.parentElement.parentElement
        //             parent.querySelector(":scope > span").focus();
        //         }
        //     }
        //
        // }
        else if (e.keyCode == 39 && (e.target as HTMLElement).classList.contains("group")) {
            // right arrow
            let parent = (e.target as HTMLElement).parentElement;
            if(!!parent){
                let ul = parent.querySelector(":scope > ul");
                if(!!ul){
                    ul.classList.remove("hidden");
                }
            }
        }
    }

    public showHideGroups=(e:any)=>{
            console.log(e.type);
            e.stopPropagation();
            if(e.target.classList.contains("group")){
                let uls = e.target.parentElement.querySelectorAll(":scope > ul")
                for(let i=0;i<uls.length;i++){
                    uls[i].classList.toggle("hidden");
                }
            }
    }

    public generateTree(groups:Group[]){
        this.clear();
        const items = groups;
        items.forEach((item:any)=>{
            const li = document.createElement("li");
            let span = document.createElement("span");
            // span.path="khk";
            span.setAttribute("tabindex","1");
            if(item.type !== "group"){
                span.appendChild(document.createTextNode(item.name));
            }

            li.appendChild(span);
            this.element.appendChild(li);
            if(item.type === "group"){
                // span.innerHTML = ('&#128193'+item.name);

                (span as myGroupSpan).path = (item as Group).showGroupPath();

                // Object.defineProperty(span,"path",{enumerable:true})
                // let mySpan = new myGroupSpan();
                // mySpan = span as myGroupSpan;
                // mySpan.setPath((item as Group).showGroupPath());
                span.innerHTML = (item.name);
                span.classList.add("group");
                if(item.children.length>0){
                    const hiddenUL = this._createHiddenUl(item.children,"");
                    if(!!hiddenUL){
                        li.appendChild(hiddenUL);
                    }

                }
            }
        });
        // this.element.querySelector(":scope >li >span").focus()
        // return (<li>hi</li>);
    }

    public _createHiddenUl(items:any[],level:string){
         const tab = '&nbsp'+'&nbsp'+'&nbsp'+'&nbsp';
        if(level===undefined){
            level = tab;
        }
        else{level+=tab;}
        if(items.length>0){
            const ul = document.createElement("ul");
            ul.classList.add("hidden");
            items.forEach((item)=> {
                const li = document.createElement("li");
                const span = document.createElement("span");
                // span.innerHTML = (level+item.name)
                if(item.type !== "group"){
                    span.innerHTML = (item.name);
                    // span.innerHTML = (level+item.name);
                }
                span.setAttribute("tabindex","1");;
                li.appendChild(span);
                ul.appendChild(li);
                if (item.type === "group") {
                    (span as myGroupSpan).path = (item as Group).showGroupPath();
                    span.innerHTML = (item.name);
                    // span.innerHTML = (level+'&#128193'+item.name);
                    span.classList.add("group");
                    const hiddenUL = this._createHiddenUl(item.children,level);
                    if(!!hiddenUL){
                        li.appendChild(hiddenUL);
                    }
                }
            });
            return ul;
        }
        else {return ;}

    }

    public clear() {
        while(this.element.firstChild ){
            this.element.removeChild( this.element.firstChild );
        }
    }

    // static getDerivedStateFromProps=(nextProps:any,prevState:any)=>{
    //     debugger;
    //     return true;
    // }

    public render(){
        return(
            <div>
            <ul className='tree' ref={elem=>this.element=elem}/>
            </div>
        );
    }
}

export default TreeComponent;