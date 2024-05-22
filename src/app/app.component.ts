import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  user: any;
  public appPages = [
    { title: 'Bus', url: '/folder/Inbox', icon: 'bus' },
    { title: 'Opérateurs', url: '/folder/favorites', icon: 'list' },
    { title: 'Contrôleurs', url: '/folder/favorites', icon: 'people' },
    { title: 'Lignes', url: '/folder/favorites', icon: 'map' },
    { title: 'Mon compte', url: '/folder/favorites', icon: 'person' },
  ];
  constructor(
    private auth: AuthService,
    private storage: Storage
  ) {this.initApp()}
  async initApp(){
    this.auth.authverif();
    this.storage.get('auth').then((res) => {
      this.user = res;
    });
  }
}
