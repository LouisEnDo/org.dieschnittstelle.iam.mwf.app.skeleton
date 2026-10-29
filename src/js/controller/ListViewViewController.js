/**
 * @author Jörn Kreutel
 */
import {mwf} from "vfh-iam-mwf-base";
import {mwfUtils} from "vfh-iam-mwf-base";
import * as entities from "../model/MyEntities.js";
import { GenericCRUDImplLocal } from "vfh-iam-mwf-base";

export default class ListViewViewController extends mwf.ViewController {

    // instance attributes set by mwf after instantiation
    args;
    root;
    // TODO-REPEATED: declare custom instance attributes for this controller
    items = [];

    constructor() {
        super();

        this.crudops = GenericCRUDImplLocal.newInstance("MediaItem");

        /** 
        this.items = new Array(7).fill(null).map((_) => entities.createRandomMediaItem())
        console.log("items created", this.items)
        */
       this.crudops.readAll().then(items => this.initialiseListview(items))
    }


    /** 
    bindListItemView(listviewid, itemview, itemobj){
        itemview.root.querySelector("img").src = itemobj.src 
        itemview.root.querySelector("h2").textContent = itemobj.title
        itemview.root.querySelector("h3").textContent = itemobj.added
    }
*/
    onListItemSelected(itemobj, listviewId){
        alert("Selected item: " + itemobj.title + " with ID " + itemobj._id);
    }

    async oncreate(){
        this.root.querySelector("header .mwf-img-plus")
            .onclick = () => {
                const newItem = entities.createRandomMediaItem();
                this.crudops.create(newItem).then(created => {
                    this.addToListview(created)
                })
            }        

        this.crudops.readAll().then(items => {
            this.items = items
            this.initialiseListview(items)
        })
    }

    editItem(item){
        item.title += (" "+ item.title);
        this.crudops.update(item._id,item)
            .then(() => {
                this.updateInListview(item._id,item);
            })
    }

    deleteItem(item){
        this.crudops.delete(item._id)
            .then(()=>{
                this.removeFromListview(item._id);
            })
    }
}
