import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Userdb } from './Userdb';

@Injectable({
  providedIn: 'root'
})
export class UserdbService {
  userListRef: AngularFireList<any>;
  userRef: AngularFireObject<Userdb>;

  currentUser: any;
  constructor(private db: AngularFireDatabase) { }

  //Create User
  createUser(user: Userdb) {
    //this.userListRef = this.db.list('/users');
    return this.userListRef.push({
      uid: user.$uid,
      phone: user.phone,
      address: user.address,
      cc: user.cc,
      photoURL: user.photoURL,
      role: 1
    })
  }

  //Get Single
  getUser(id: string) {
    this.userRef = this.db.object('/users/'+id);
    return this.userRef;
  }

  getUserList() {
    this.userListRef = this.db.list('/users/');
    return this.userListRef;
  }

  updateUser(id, user: Userdb, roleset = 1) {
    return this.userListRef.update(id, {
      uid: user.$uid,
      phone: user.phone,
      address: user.address,
      cc: user.cc,
      photoURL: user.photoURL,
      role: roleset
    })
  }

  deleteUser(id: string) {
    this.userRef = this.db.object('/users/'+id);
    this.userRef.remove();
  }

  setCurrentUser(obj) {
    this.currentUser = obj;
  }

  getCurrentUser() {
    if(this.currentUser === undefined || this.currentUser === null)
      return 0
    return this.currentUser;
  }
}
