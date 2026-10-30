/**
 * @author Jörn Kreutel
 */
import {mwf} from "vfh-iam-mwf-base";
import {mwfUtils} from "vfh-iam-mwf-base";
import * as entities from "../model/MyEntities.js";
import { GenericCRUDImplLocal } from "vfh-iam-mwf-base";

export default class ReadviewViewController extends mwf.ViewController {

    // instance attributes set by mwf after instantiation
    args;
    root;
    // TODO-REPEATED: declare custom instance attributes for this controller
    items = [];

    constructor() {
        super();
    }


    /** 
    bindListItemView(listviewid, itemview, itemobj){
        itemview.root.querySelector("img").src = itemobj.src 
        itemview.root.querySelector("h2").textContent = itemobj.title
        itemview.root.querySelector("h3").textContent = itemobj.added
    }
*/


    async oncreate(){
        
        const myItem = this.args?.item

        const viewProxy = this.bindElement("myapp-mediaReadviewTemplate", { item: myItem }, this.root).viewProxy
        viewProxy.bindAction("deleteItem", () => {
            myItem.delete().then(()=> this.previousView())
        })

        super.oncreate()
    }
}
