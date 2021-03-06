import { Component, OnInit } from '@angular/core';
//import { ConfigServiceService } from 'src/app/core/service/config-service.service';
import { ActivatedRoute, Router } from '@angular/router';
//import { EnviromentVariableServiceService } from 'src/app/core/service/enviroment-variable-service.service';
import { ConfigServiceService } from 'app/core/service/config-service.service';
import { CollectionServiceService } from 'app/core/service/collection-service.service';
import { EnviromentVariableServiceService } from 'app/core/service/enviroment-variable-service.service';
//import { CollectionServiceService } from 'src/app/core/service/collection-service.service';

@Component({
  selector: 'app-superior-collection',
  templateUrl: './superior-collection.component.html',
  styleUrls: ['./superior-collection.component.scss']
})
export class SuperiorCollectionComponent implements OnInit {

  collection: any;
  gallery: any[];
  galleryXX: any[];
  constructor(
    public config: ConfigServiceService,
    private activateRoute: ActivatedRoute,
    public enviromentVariable: EnviromentVariableServiceService,
    private collectionService: CollectionServiceService,
    private router: Router
  ) {
    this.collection = {
      descripcion: '',
      titulo: '',
      imagen: '',
      nombre: '',
      id: ''
    }
    this.gallery = [];
    this.galleryXX = [];

    if (this.enviromentVariable.sections.length == 0)
      this.initSections()
    activateRoute.params.subscribe(
      data => {
        if (data.id)
          this.collectionService.getSectionById(data.id).subscribe(
            (data: any) => {
              if (data.nombre) {
                this.collection = {
                  descripcion: data.descripcion,
                  titulo: data.titulo,
                  imagen: data.imagen,
                  nombre: data.nombre,
                  id: data.idSeccion
                }
              } else {
                this.collection = {
                  descripcion: data[0].descripcion,
                  titulo: data[0].titulo,
                  imagen: data[0].imagen,
                  nombre: data[0].nombre,
                  nombre_es:data[0].nombre_es,
                  id: data[0].idSeccion
                }
              }


              this.initGalery()
              console.log(this.collection.nombre);
            }, err => {

            }
          )
      }
    )
  }


  initSections() {
    this.collectionService.getCollectionsSections().subscribe(
      (data: any[]) => {
        this.enviromentVariable.sections = [];
        this.enviromentVariable.sections = data;
        this.enviromentVariable.link = { path: '/superior-collection' }
      }, err => {
        console.log(err)
      }
    )
  }

  initGalery() {
    this.gallery = [];
    this.galleryXX = [];
    this.collectionService.getSectionCategory(this.collection.id).subscribe(
      (data: any[]) => {
        data.forEach(element => {
          if (element.sigloXIX.data[0] == 1) {
            this.gallery.push(element)
          } else {
            this.galleryXX.push(element)
          }
        });
      }, err => {
      }
    )
  }

  getSection() {
    let data: any = this.enviromentVariable.getSection()
    if (data == 0) {
      return 0
    } else {
      if (this.enviromentVariable.getLanguage() === 'es') {
        return JSON.parse(data).nombre
      } else {
        return JSON.parse(data).nombre_es
      }
    }

  }

  setBreadcrumb(item) {
    this.enviromentVariable.breadcrumbList[2] = {
      name: item.nombre,
      path: '/inferior-collection/' + item.idCategoria
    };
    this.enviromentVariable.setBreadcrumb(this.enviromentVariable.breadcrumbList);
  }

  initBreadcrumb() {
    let data: any = this.enviromentVariable.getSection();
    this.enviromentVariable.breadcrumbList[1] = {
      name: JSON.parse(data).nombre,
      path: '/superior-collection/' + JSON.parse(data).idSeccion
    };
    this.enviromentVariable.breadcrumbList.splice(2, 1);
    this.enviromentVariable.setBreadcrumb(this.enviromentVariable.breadcrumbList);
  }

  ngOnInit(): void {
    this.enviromentVariable.actualPage = 'collection';
    this.initBreadcrumb();

  }

}
