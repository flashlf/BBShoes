import { Injectable } from '@angular/core';
import { User } from '../shared/user.interface';
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from 'firebase';
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/firestore";
import { Observable, of } from 'rxjs';
import { first, switchMap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  public user$: Observable<User>;

  public currentUserID: string;
  constructor(
    private angAuth:AngularFireAuth,
    private angStore:AngularFirestore
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
      this.updateUserData(user);
      return user;
    } catch (error) {
      console.log('Error->',error)
    }
  }

  async logout(): Promise<void> { 
    try {
      await this.angAuth.signOut();
    } catch (error) {
      console.log('Error ->', error);
    }
  }

  private updateUserData(user:User) {
    const userRef : AngularFirestoreDocument<User> = this.angStore.doc(`users/${user.uid}`);
    const data: User = {
      uid : user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      displayName: user.displayName
    };

    return userRef.set(data, { merge: true });
  }
}
