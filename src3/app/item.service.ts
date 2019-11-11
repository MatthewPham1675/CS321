import { User } from 'firebase';
import { Injectable} from '@angular/core';

interface Ite {
    name: string;
    price: number ;
    tags: string[];

    seller: User;
    buyer: User;
    img: any;

}

@Injectable()
export class Item {
    private item: Ite;

    setItem( item: Ite) {
        this.item = item;
    }

    setName(name: string) {
        this.item.name = name;
    }
    setPrice(price: number) {
        this.item.price = price;
    }

    setTags(tags: string[]) {
        this.item.tags = tags;
    }
    addtag(tag: string) {
        this.item.tags.push(tag);
    }
    removetag( tag: string) {
        for ( let i = 0; i < this.item.tags.length ; i++) {
            if (this.item.tags[i] === tag) {
                this.item.tags.slice(i);
                return true;
            }
        }
        return false;
    }
    setSeller( user: User) {
        this.item.seller = user;
    }
    setBuyer( user: User) {
        this.item.buyer = user;
    }
    setImg(img: any) {
        this.item.img = img;
    }
}
