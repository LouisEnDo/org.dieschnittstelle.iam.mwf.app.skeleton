/**
 * @author Jörn Kreutel
 *
 * this skript defines the data types used by the application and the model operations for handling instances of the latter
 */

import {mwfUtils} from "vfh-iam-mwf-base";
import {EntityManager} from "vfh-iam-mwf-base";

/*************
 * example entity
 *************/

export class MyEntity extends EntityManager.Entity {

    // TODO-REPEATED: declare entity instance attributes

    constructor() {
        super();
    }

}

// TODO-REPEATED: add new entity class declarations here
export class MediaItem extends EntityManager.Entity {
    title;
    src;
    added = Date.now();
    descriptions;

    constructor(title,src){
        super();
        this.title = title;
        this.src = src;
    }

    get addedPP(){
        return new Date(this.added || null).toLocaleDateString("de-DE",{
            day: "numeric",
            weekday: "short",
            year: "numeric",
            month: "long",
        });
    }
}

export function createRandomMediaItem() {
    const titles = ["Guter Tag","Bester Tag", "Photoshop", "WapBap", "Hahnenkampf"]
    const dims = [[100,100],[50,100],[150,200],[200,150],[400,30]]

    const title = titles[Math.floor(Math.random() * titles.length)]
    const dim = dims[Math.floor(Math.random() * dims.length)]

    return new MediaItem(
        title,
        `https://picsum.photos/${dim[0]}/${dim[1]}` );
}

