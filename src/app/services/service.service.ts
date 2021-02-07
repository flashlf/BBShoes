import { Injectable } from '@angular/core';
import { User } from '../shared/user.interface';
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from 'firebase';
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/firestore";
import { Observable, of, VirtualTimeScheduler } from 'rxjs';
import { first, switchMap } from "rxjs/operators";
import { UserdbService } from '../shared/userdb.service';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  public user$: Observable<User>;

  public currentUserID: string;
  public currentUserEmail: string;
  constructor(
    private angAuth:AngularFireAuth,
    private angStore:AngularFirestore,
    private usrSvc: UserdbService,
    public storage: Storage
  ) {
    this.user$ = this.angAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.angStore.doc<User>(`users/${user.uid}`).valueChanges();
        }
        return of(null);
      })
    )
   }
  
  isEmailVerified(user: User): boolean{
    return user.emailVerified === true ? true: false;
  }

  async sendVerificationEmail(): Promise<void> {
    try {
      return (await this.angAuth.currentUser).sendEmailVerification();
    } catch (error) {
      console.log('Error->', error)
    }
  }

  async resetPassword(email:string): Promise<void> {
    try {
      return this.angAuth.sendPasswordResetEmail(email);
    } catch (error) {
      console.log('Error ->', error);
    }
  }

  async loginGoogle(): Promise<User> {
    try {
      const { user } = await this.angAuth.signInWithPopup(new firebase.default.auth.GoogleAuthProvider())
      this.currentUserID = user.uid;
      this.currentUserEmail = user.email;
      console.log("EMAIL & UID ->",this.currentUserEmail, this.currentUserID);
      this.updateUserData(user);
      return user;
    } catch (error) {
      console.log('Error->', error)
    }
  }

  async register(email:string, password:string): Promise<User> { 
    try {
      const { user } = await this.angAuth.createUserWithEmailAndPassword(email, password);
      await this.sendVerificationEmail();
      return user;
    } catch (error) {
      console.log('Error->', error)
    }
  }

  async login(email:string, password:string): Promise<User> { 
    try {
      const { user } = await this.angAuth.signInWithEmailAndPassword(email, password);
      this.currentUserID = user.uid;
      this.currentUserEmail = user.email;
      this.updateUserData(user);
      return user;
    } catch (error) {
      console.log('Error->',error)
    }
  }

  async logout(): Promise<void> { 
    try {
      this.currentUserID = null;
      await this.angAuth.signOut();
      this.storage.clear();
    } catch (error) {
      console.log('Error ->', error);
    }
  }

  private updateUserData(user:User) {
    const userRef : AngularFirestoreDocument<User> = this.angStore.doc(`users/${user.uid}`);
    const data: User = {
      uid : user.uid,
      email: user.email,
      emailVerified: true,
      displayName: user.displayName
    };

    return userRef.set(data, { merge: true });
  }

  firstUser() {
    this.usrSvc.getUserList();
    if(this.usrSvc.getUser(this.currentUserID) == null) {
      
    }
  }
}
