import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {

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
    console.log("Refresh input Clicked!");
  }

  saveChanges() {
    console.log("Save Changes Clicked!");
  }
}
