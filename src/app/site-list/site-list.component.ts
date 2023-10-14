import { Component } from '@angular/core';
import { PasswordManagerService } from '../password-manager.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-site-list',
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.css']
})
export class SiteListComponent {

  allSites !: Observable<Array<any>>;

  siteName !: string;
  siteImgURL !: string;
  siteURL !: string;
  siteId !: string;

  constructor(private passwordManagerService: PasswordManagerService) {
    this.loadSites();
  }

  onSubmit(values:object) {
    console.log(values);
    this.passwordManagerService.addSite(values)
    .then(() => {
      console.log('Data save sucessfully');

    })
    .catch(err => {
      console.log(err);
    })
  }

  loadSites() {
    this.allSites = this.passwordManagerService.loadSites()

  }

  editSite(siteName: string, siteURL:string, siteImgURL:string, id:string) {


  }

}
