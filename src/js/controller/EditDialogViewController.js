/**
 * @author Jörn Kreutel
 */
import {GenericDialogTemplateViewController, mwf} from "vfh-iam-mwf-base";
import {mwfUtils} from "vfh-iam-mwf-base";
import * as entities from "../model/MyEntities.js";

export default class EditDialogViewController extends GenericDialogTemplateViewController {

    // instance attributes set by mwf after instantiation
    args;
    root;
    // TODO-REPEATED: declare custom instance attributes for this controller

    /*
     * for any view: initialise the view
     */
    async oncreate() {
        // TODO: do databinding, set listeners, initialise the view

        // call the superclass once creation is done
        super.oncreate();
    }


    constructor() {
        super();

        console.log("ViewControllerTemplate()");
    }

   async onresume(){
    await super.onresume();
    console.log("args", this.args)
    const viewProxy = this.root.viewProxy;
    
    viewProxy.bindAction("onImgFileSelected", (evt) => {
        const selectedFile = evt.original.target.files[0]
        
        const filereader = new FileReader();
        filereader.readAsDataURL(selectedFile)
        filereader.onload = () => {
        const url = filereader.result;
        this.args.item.src = url;
        viewProxy.update(this.args)
        }
        /*
        const url = URL.createObjectURL(selectedFile)
        this.args.item.src = url;
        viewProxy.update(this.args)
*/
    })
        

   }

}
