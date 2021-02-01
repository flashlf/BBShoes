import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  private name : string; 
  private email : string;
  private address : string;
  private phone : number;
  constructor(
    private navParams: NavParams,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {}

  disEditProfile() {
    this.modalCtrl.dismiss({
      'dismissed':true
    });
  }

  refreshInput() {
    this.name = "";
    this.phone = null;
    this.email = "";
    this.address = "";
  }
}
