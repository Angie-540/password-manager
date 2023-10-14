import { Injectable } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { collection, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';


@Injectable({
  providedIn: 'root'
})
export class PasswordManagerService {

  constructor(private firestore: Firestore) { }

  addSite(data: object) {
    const dbInstance = collection(this.firestore, 'sites');
    return addDoc(dbInstance, data);

  }

  loadSites() {
    const dbInstance = collection(this.firestore, 'sites');
    return collectionData(dbInstance, {idField: 'id'})

  }

  updateSite(id: string, data:object) {
    const docInstance = doc(this.firestore, 'sites', id);
    return updateDoc(docInstance, data);

  }

  deleteSite(id: string) {
    const docInstance = doc(this.firestore, 'sites', id);
    return  deleteDoc(docInstance);


  }

}
