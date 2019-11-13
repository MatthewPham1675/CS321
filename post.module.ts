import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule, NavController } from '@ionic/angular';
import { PostPage } from './post.page';
import { Component } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: PostPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PostPage]
})

@Component({
  selector: 'app-post',
  templateUrl: 'post.page.html',
  styleUrls: ['post.page.scss'],
})

export class PostPageModule {
  name: string;
  confirm()
  {
    console.log('hi');
  }
}