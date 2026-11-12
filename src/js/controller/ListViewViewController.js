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

       // this.crudops = GenericCRUDImplLocal.newInstance("MediaItem");

        /** 
        this.items = new Array(7).fill(null).map((_) => entities.createRandomMediaItem())
        console.log("items created", this.items)
        */
      // this.crudops.readAll().then(items => this.initialiseListview(items))
    }


    /** 
    bindListItemView(listviewid, itemview, itemobj){
        itemview.root.querySelector("img").src = itemobj.src 
        itemview.root.querySelector("h2").textContent = itemobj.title
        itemview.root.querySelector("h3").textContent = itemobj.added
    }
*/
    //onListItemSelected(itemobj, listviewId){
     //   this.nextView("myapp-mediaReadview")    
    //}

    async oncreate(){
        this.root.querySelector("header .mwf-img-plus")
            .onclick = () => {
                const newItem = entities.createRandomMediaItem()
                this.showDialog("myapp-editDialogTemplate", {
                    dialogTitle: "Erstellen",
                    item: newItem,
                    actionBindings: {
                        saveItem:(evt) => {
                            evt.original.preventDefault();
                            this.hideDialog();
                            newItem.create().then((item)=>
                                this.addToListview(item)
                            )
                        },
                        cancelDialog: (evt) => {
                            evt.original.preventDefault();
                            alert("cancelling")
                            this.hideDialog();
                        }
                }
                });                
            }       

        this.#readAll()
    }

    #readAll(){
        entities.MediaItem.readAll().then(items => {
            this.items = items
            this.initialiseListview(items)
        })
    }

    editItem(item){
        this.showDialog("myapp-editDialogTemplate",
            {
            item: item,
            dialogTitle: "Editieren",
            actionBindings: {
            saveItem:(evt) => {
                evt.original.preventDefault();
                this.hideDialog();
                item.update()
                .then(() => {
                    this.updateInListview(item._id,item);
                })
            },
            cancelDialog: (evt) => {
                evt.original.preventDefault();
                alert("cancelling")
                this.hideDialog();
            }}});
    }

    deleteItem(item){
        item.delete()
            .then(()=>{
                this.removeFromListview(item._id);
            })
    }

    async onresume() {
        this.#readAll()

        super.onresume()
    }

    async onReturnFromNextView(nextviewid, returnValue, returnStatus){
        if (nextviewid === "myapp-mediaReadView"){
            if (returnStatus === "itemDeleted"){
                const deletedItem = returnValue.item;
                this.removeFromListview(deletedItem._id)
            }
        }
    }
}
