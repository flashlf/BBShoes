import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Storage } from '@ionic/storage';
import { Userdb } from './Userdb';

@Injectable({
  providedIn: 'root'
})
export class UserdbService {
  userListRef: AngularFireList<any>;
  userRef: AngularFireObject<Userdb>;

  public currentUser: any = null;
  constructor(private db: AngularFireDatabase,
    public storage: Storage) { }

  //Create User
  createUser(user: Userdb) {
    //this.userListRef = this.db.list('/users');
    return this.userListRef.push({
      uid: user.uid,
      phone: user.phone,
      address: user.address,
      cc: user.cc,
      photoURL: user.photoURL,
      role: 1
    })
  }

  createUserPreID(user: Userdb, id) {
    //this.userListRef = this.db.list('/users');
    let temp = {
      uid: user.uid,
      name: user.name,
      phone: user.phone,
      address: user.address,
      cc: user.cc,
      photoURL: user.photoURL,
      role: 1
    }
    return this.db.list('/users/').set(id, temp);
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
      uid: user.uid,
      name: user.name,
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
  setLogout() {
    this.currentUser == null;
    this.storage.clear();
  }
  getCurrentUser() {
    if(this.currentUser === undefined || this.currentUser === null)
      return 0
    return this.currentUser;
  }
}
