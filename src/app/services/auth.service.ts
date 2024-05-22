import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { ApiService } from "./api.service";


const USER_DB = 'DeviceAttribution';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  appVerifier: any;
  confirmationResult: any;
  connect: any
  constructor(private storage: Storage, private route: Router,
    private api: ApiService ) {
    this.storage.create();
    this.authverif();
  }

  async authverif(){
    this.storage.get('auth').then((res) => {
      if (res === null) {
        this.route.navigate(['login']);
      }
    });

  }
  login(data: any) {
    //From supabase
    // return this.connect
    // .from(USER_DB)
    // .select(`*`)
    // .match({ deviceCode })
    // .eq('isActiveted', true)
    // .then((result: any) => result.data)
    //From API server
    return this.api.request(data, 'suivi').subscribe((result: any) => result)
  }


}
