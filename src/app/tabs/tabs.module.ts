import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';


const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'post',
        loadChildren: '../post/post.module#PostPageModule'
      },
      {
        path: 'feed',
        loadChildren: '../feed/feed.module#FeedPageModule'
      },
      {
        path: 'chats',
        loadChildren: '../chats/chats.module#ChatsPageModule'
      },
      {
        path: 'profile',
        loadChildren: '../profile/profile.module#ProfilePageModule'
      },
      {
        path: '',
        redirectTo: '/tabs/feed',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/feed',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
