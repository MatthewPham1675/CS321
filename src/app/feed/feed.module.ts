import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule, NavController } from '@ionic/angular';
import { FeedPage } from './feed.page';

const routes: Routes = [
  {
    path: '',
    component: FeedPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FeedPage]
})
export class FeedPageModule 
{
  constructor(public navCtrl: NavController)
  {

  }
  items: string[];
  generateItems()
  {
    this.items = [
      'Calculus 1 Textbook',
      'Calculus 2 Textbook',
      'Calculus 3 Textbook',
      'Physics 1 Textbook',
      'Physics 2 Textbook'
    ];
  }
  getItems(ev: any)
  {
    this.generateItems();
    let serVal = ev.target.value;
    if( serVal && serVal.trim() != '')
    {
      this.items = this.items.filter((item) => 
      {
        return (item.toLowerCase().indexOf(serVal.toLowerCase()) > -1);
      })
    }
  }
}