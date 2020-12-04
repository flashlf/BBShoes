import { Injectable } from '@angular/core';
import { Appointment } from '../shared/Appointment';
import { AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  bookingListRef: AngularFireList<any>;
  bookingRef: AngularFireObject<any>;
  constructor(private db: AngularFireDatabase) { }

  // Create
  createBooking(apt: Appointment) {
    return this.bookingListRef.push({
      name    : apt.name,
      email   : apt.email,
      mobile  : apt.mobile
    })
  }

  // Get Single
  getBooking(id: String) {
    this.bookingRef = this.db.object('/appointment/'+ id);
    return this.bookingRef;
  }

  // Get List
  getBookingList() {
    this.bookingListRef = this.db.list('/appointment');
    return this.bookingListRef;
  }
  
  // Update
  updateBooking(id, apt: Appointment) {
    return this.bookingRef.update({
      name    : apt.name,
      email   : apt.email,
      mobile  : apt.mobile
    })
  }

  // Delete
  deleteBooking(id: string) {
    this.bookingRef = this.db.object('/appointment/'+ id);
    this.bookingRef.remove();
  }
}
