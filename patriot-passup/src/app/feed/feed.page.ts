import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions'


@Component({
  selector: 'app-feed',
  templateUrl: 'feed.page.html',
  styleUrls: ['feed.page.scss'],
})

export class FeedPage implements OnInit
{
  posts
  sub
  constructor(private aff: AngularFireFunctions) {

  }

  ngOnInit(): void {
    const getFeed = this.aff.httpsCallable('getFeed')
    this.sub = getFeed({}).subscribe(data => {
      this.posts = data;
    })
  }

  ngOnDestroy(){
    this.sub.unsubscribe()
  }

}