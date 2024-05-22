import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from '../services/loader.service';
import { ApiService } from '../services/api.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder!: string;
  recent: any[] = [];
  vehicules: any[] = [];
  searchTerm: any = '';
  filteredItems: string[] = [];
  search: boolean = false;
  user: any;
  searchV: boolean = false;
  private activatedRoute = inject(ActivatedRoute);
  constructor(
    private storage: Storage,
    private router: Router,
    private api: ApiService,
    private loader: LoaderService,
  ) {this.storage.create(); }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.storage.get('auth').then((res) => {
      this.user = res;
      console.log("🚀 ~ FolderPage ~ this.storage.get ~ this.user:", this.user)

    });
    this.storage.get('vehicule').then((res) => {
      this.vehicules = res;
      console.log("🚀 ~ FolderPage ~ this.storage.get ~ this.vehicules:", this.vehicules)
    });
  }
  reload(){
    this.storage.get('vehicule').then((res) => {
      this.vehicules = res;
      console.log("🚀 ~ FolderPage ~ this.storage.get ~ this.vehicules:", this.vehicules)
    });
  }
  find(trips: any) {
    const onlinevehicule = trips.filter(
      (item: { isActiveted: any }) => item.isActiveted === true
    );
    console.log('find trip ', onlinevehicule);
    return onlinevehicule || null;
  }
  clearSearch() {
    this.search = false;
    this.storage.get('vehicules').then((res) => {
      this.vehicules = res.vehicule;
    });
  }
  clearVSearch() {
    this.searchV = false;
    this.searchTerm = null;
    this.reload()
  }
  handleChange(e: any) {
    this.search = true;
    let finder = this.vehicules.filter(
      (item: { matricule: any }) => item.matricule == e.detail.value
    );
    console.log("🚀 ~ FolderPage ~ handleChange ~ finder:", finder)
  }
  handleVChange(e: any) {
    console.log("🚀 ~ FolderPage ~ handleVChange ~ e.detail.value:", e.detail.value)
    this.searchV = true;
    let finder = this.vehicules.filter(
      (item: { matricule: any }) => item.matricule == e.detail.value
    );
    if(finder.length > 0){
      this.vehicules = finder
    }
    console.log("🚀 ~ FolderPage ~ handleVChange ~ finder:", finder)
  }

  view(id: any) {
    const detail = this.vehicules.filter((item: { id: any }) => item.id === id);
    this.router.navigate(['bus/' + id]);
  }
}
