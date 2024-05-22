import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bus',
  templateUrl: './bus.page.html',
  styleUrls: ['./bus.page.scss'],
})
export class BusPage implements OnInit {
  vehicules: any[] = [];
  sellings: any[] = [];
  bus: any
  id: number = 0;
  searchV: any;
  searchTerm: any = null;

  constructor(
    private storage: Storage,
    private router: Router,
    private api: ApiService,
    private route: ActivatedRoute,
  ) {
    this.storage.create();
    this.route.params.subscribe(async (params) => {
      this.id = Number(params['id']);
    });

  }

  findSellings(id: number){
    let body = {
      id: this.id,
    };
    console.log("🚀 ~ BusPage ~ findSellings ~ body:", body)
    this.api.request(body, 'suivi/sellings').subscribe(
      async (res: any) => {
        this.sellings = res
        console.log("🚀 ~ BusPage ~ this.sellings:", this.sellings)

      },
      async (err: any) => {
      }
    );
  }
  ngOnInit() {
    this.storage.get('vehicule').then((res) => {
      this.vehicules = res;
      let find = this.findBus(this.vehicules, this.id);
      this.bus= find[0];
      this.findSellings(this.id)
    });
  }
  findBus(array: any, key: any) {
    const mybus = array.filter(
      (item: { id: any }) => item.id === key
    );
    return mybus || null;
  }
  clearVSearch() {
    this.searchV = false;
    this.searchTerm = null;
    this.reload()
  }
  reload() {
    this.findSellings(this.id)
  }
  handleVChange(e: any) {
    console.log("🚀 ~ BusPage ~ handleVChange ~ e:", e.detail.value)
    this.searchV = true;
    let finder = this.sellings.filter(
      (item: { sellingDate: any }) => item.sellingDate == e.detail.value
    );
    if(finder.length > 0){
      this.sellings = finder
    }
    console.log("🚀 ~ FolderPage ~ handleVChange ~ finder:", finder)
  }
  view(id: any) {
    //const detail = this.vehicules.filter((item: { id: any }) => item.id === id);
    this.router.navigate(['selling/bus/'+ this.id +'/service/'+ id]);
  }
  close(){
    this.router.navigateByUrl('/');
  }
}
