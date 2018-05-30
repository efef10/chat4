import {Group} from './Group';
import {appService} from "../models/AppStore";
interface myGroupSpan extends HTMLSpanElement{
    path:string
}

function TreeChat(element:HTMLElement) {
    // e:React.KeyboardEvent<HTMLDivElement>
    function arrowsKeyboard(e:any):void{
        if (e.keyCode == 38 || e.keyCode == 40) {
            // up - down arrows
            let elements = element.querySelectorAll("li");
            let displayedElements =[];
            for(let i=0;i<elements.length; i++){
                if (elements[i].offsetParent !== null) {
                    displayedElements.push(elements[i]);
                }
            }
            let target = e.target as HTMLElement;
            let parent = target.parentElement;
            if(!!parent){
                let index = displayedElements.indexOf(parent as HTMLLIElement);
                index = e.keyCode===38 ? index-1 : index+1
                if(index>=0 && index<displayedElements.length){
                    let elem = displayedElements[index];
                    let span = elem.querySelector("span");
                    if(!!span){
                        span.focus();
                    }
                }
            }

        }

        else if (e.keyCode == 37 && (e.target as HTMLElement).classList.contains("group")) {
            // left arrow
            let parent = (e.target as HTMLElement).parentElement
            if(!!parent){
                let ul = parent.querySelector(":scope > ul");
                if(!!ul){
                    if(ul.classList.contains("hidden")){
                        let parent = ul.parentElement ? ul.parentElement.parentElement : null;
                        while(parent && parent.tagName!== "LI"){
                            parent = parent.parentElement;
                            if(!parent){
                                return;
                            }
                        }
                        let span = parent?parent.querySelector(":scope > span"):null;
                        span?(span as HTMLElement).focus():null;
                    }
                    else{
                        ul.classList.add("hidden");
                    }
                }
                else{
                    let parent = e.target.parentElement.parentElement.parentElement
                    parent.querySelector(":scope > span").focus();
                }
            }

        }
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

    function showHideGroups(e:any):void{
        e.stopPropagation();
        if(e.target.classList.contains("group")) {
            let uls = e.target.parentElement.querySelectorAll(":scope > ul")
            for(let ul of uls){
                ul.classList.toggle("hidden");
            }
        }
    }

    function load(items:Group[]){
        element.addEventListener("keydown",arrowsKeyboard);
        element.addEventListener("dblclick",showHideGroups);
        element.addEventListener("click",(e:any)=> {
            e.stopPropagation();
            e.target.focus();
            if (e.target.classList.contains("group")) {
                let target = e.target as myGroupSpan;
                appService.selectGroup(target.path)
                // this.props.groupSelected(target.path);//
            }
            else {
                debugger;
                appService.userSelected(e.target.innerText)
            }
        });

        items.forEach((item:any)=>{
            const li = document.createElement("li");
            let span = document.createElement("span");
            span.setAttribute("tabindex","1");
            if(item.type !== "group"){
                span.appendChild(document.createTextNode(item.name));
            }

            li.appendChild(span);
            element.appendChild(li);
            if(item.type === "group"){
                // span.innerHTML = ('&#128193'+item.name);

                (span as myGroupSpan).path = (item as Group).showGroupPath();
                span.innerHTML = (item.name);
                span.classList.add("group");
                if(item.children.length>0){
                    const hiddenUL = _createHiddenUl(item.children,"");
                    if(!!hiddenUL){
                        li.appendChild(hiddenUL);
                    }

                }
            }
        });
        // this.element.querySelector(":scope >li >span").focus()
    }

    function _createHiddenUl(items:any[],level:string){
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
                    const hiddenUL = _createHiddenUl(item.children,level);
                    if(!!hiddenUL){
                        li.appendChild(hiddenUL);
                    }
                }
            });
            return ul;
        }
        else {return ;}
    }

    function clear() {
        while(element.firstChild ){
            element.removeChild(element.firstChild );
        }
    }


    return {
        load,
        clear,
        element,
    };
}

export default TreeChat