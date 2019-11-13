import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule, NavController } from '@ionic/angular';
import { FeedPage } from './feed.page';
import { Component } from '@angular/core';

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

@Component({
  selector: 'app-feed',
  templateUrl: 'feed.page.html',
  styleUrls: ['feed.page.scss'],
})

export class FeedPageModule 
{
  items:any=[];
  constructor()
  {
    this.generateItems();
  }
  raymond(ev:any)
  {
    this.generateItems();
    const val = ev.target.value;
    if(val && val.trim() != '')
    {
      this.items = this.items.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
  selectVal(val)
  {
    alert("You Choose = "+val);
  }

  generateItems()
  {
    this.items = [
      {"name": "Calculus 1 Textbook"},
      {"name": "Calculus 2 Textbook"},
      {"name": "Calculus 3 Textbook"},
      {"name": "Physics 1 Textbook"},
      {"name": "Physics 2 Textbook"}];
  }
}