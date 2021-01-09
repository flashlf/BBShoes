import { Injectable } from '@angular/core';
import { User } from '../shared/user.interface';
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from 'firebase';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/firestore";
import { EmailValidator } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(
    private angAuth:AngularFireAuth,
    private angStore:AngularFirestore
  ) { }

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
    const data:User = {
      uid : user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      displayName: user.displayName
    };

    return userRef.set(data, { merge: true });
  }
}
