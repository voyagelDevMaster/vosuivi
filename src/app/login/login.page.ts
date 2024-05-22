import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { ToastController, MenuController } from '@ionic/angular';
import { LoaderService } from '../services/loader.service';
import { ApiService } from '../services/api.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  name: string = '';
  code: any = '';
  screen: any = 'signin';
  isLoading: boolean = false;
  device: any;
  service: any;
  isOnline = false;
  devices: any;
  networkStatus: any;
  phone: string = '';
  password: string = '';
  user: any;
  seller: any
  session: any
  constructor(
    private storage: Storage,
    private route: Router,
    private api: ApiService,
    public toastController: ToastController,
    private loader: LoaderService,
    private menuCtrl: MenuController,
  ) {this.storage.create(); }

  ngOnInit() {
    this.menuCtrl.enable(false);
    console.log("🚀 ~ LoginPage ~ ngOnInit ~ this.screen:", this.screen)
  }
  ionViewWillEnter(){
    this.initsession()
  }
  change(event: any) {
    this.screen = event;
  }
  async initsession() {
    this.storage.get('auth').then(async (res) => {
      this.seller = res
      if (this.seller == null) {
      } else{
        this.route.navigate(['/']);

      }
    });
  }
  async login() {
    if (this.phone == '') {
      const toast = await this.toastController.create({
        message: 'Ce champ téléphone ne peut pas être vide.',
        duration: 2000,
        position: 'top',
        icon: 'warning',
        color: 'danger',
      });
      toast.present();
    }else if (this.password == '') {
      const toast = await this.toastController.create({
        message: 'Ce champ mot de passe ne peut pas être vide.',
        duration: 2000,
        position: 'top',
        icon: 'warning',
        color: 'danger',
      });
      toast.present();
    } else {
      let body = {
        device: this.code,
      };
      this.loader.showLoader();
      this.api.request(body, 'suivi').subscribe(
        async (res: any) => {
          const result = res
          console.log("🚀 ~ LoginPage ~ result:", result)
          if (result === null) {
            const toast = await this.toastController.create({
              message: "Ce compte n'existe pas ou a été désactivé!",
              duration: 3000,
              position: 'middle',
              icon: 'warning',
              color: 'danger',
            });
            toast.present();
            this.loader.dismissLoader();
            this.screen = 'signin';
          } else {
            this.storage.set('auth', res.user);
            this.storage.set('vehicule', res.vehicule);

            this.loader.dismissLoader();
            this.menuCtrl.enable(true);
            this.route.navigate(['/']);

          }
        },
        async (err: any) => {
          console.log('🚀 ~ LoginPage ~ this.api.request ~ err:', err);
          this.loader.dismissLoader();
        }
      );
    }
  }
}
