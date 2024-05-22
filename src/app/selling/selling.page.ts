import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-selling',
  templateUrl: './selling.page.html',
  styleUrls: ['./selling.page.scss'],
})
export class SellingPage implements OnInit {
  vehicules: any[] = [];
  selling: any;
  bus: any
  id: number = 0;
  searchV: any;
  searchTerm: any = null;
  busid: number = 0;

  constructor(
    private storage: Storage,
    private router: Router,
    private api: ApiService,
    private route: ActivatedRoute,
  ) {
    this.storage.create();
    this.route.params.subscribe(async (params) => {
      this.id = Number(params['id']);
      this.busid = Number(params['busid']);
      console.log("🚀 ~ SellingPage ~ this.route.params.subscribe ~ this.id:", this.id)
    });

  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {
    this.findSelling();
  }
  findSelling(){
    let body = {
      id: this.id,
    };
    console.log("🚀 ~ BusPage ~ findSelling ~ body:", body)
    this.api.request(body, 'suivi/selling').subscribe(
      async (res: any) => {
        this.selling = res
        console.log("🚀 ~ BusPage ~ this.selling:", this.selling)

      },
      async (err: any) => {
      }
    );
  }
  close(){
    this.router.navigateByUrl('/bus/'+this.busid);
  }
  findBus(array: any, key: any) {
    const mybus = array.filter(
      (item: { id: any }) => item.id === key
    );
    return mybus || null;
  }
}
