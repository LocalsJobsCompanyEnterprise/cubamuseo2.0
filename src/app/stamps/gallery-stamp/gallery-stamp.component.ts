import { Component, OnInit } from '@angular/core';
import { ConfigServiceService } from 'app/core/service/config-service.service';
import { ActivatedRoute } from '@angular/router';
import { SamplesServiceService } from 'app/core/service/samples-service.service';
import { EnviromentVariableServiceService } from 'app/core/service/enviroment-variable-service.service';
import { TalesServiceService } from 'app/core/service/tales-service.service';

@Component({
  selector: 'app-gallery-stamp',
  templateUrl: './gallery-stamp.component.html',
  styleUrls: ['./gallery-stamp.component.css']
})
export class GalleryStampComponent implements OnInit {

  gallery:any[];
  id:number;
  constructor(
    public config: ConfigServiceService,
    private activateRoute: ActivatedRoute,
    private talesService: TalesServiceService,
    private samplesService: SamplesServiceService,
    public enviromentVariable: EnviromentVariableServiceService,
    ) { 
    this.gallery = [];
    activateRoute.params.subscribe(
      data=>{
        if(data.id){
          this.id = data.id;
          this.initGallery(data.id)
        }
      }
    )
  }

  initGallery(id:number){
    if(id==0){
      this.talesService.getAllTales().subscribe(
        (data:any)=>{
          this.gallery = data;
          console.log(this.gallery)
        },err=>{
  
        }
      )
    }
    else{
      this.talesService.getTalesByCategory(id).subscribe(
        (data:any)=>{
          this.gallery = data;
          console.log(this.gallery)
        },err=>{
  
        }
      )
    }
   
  }

  initSections() {
    this.samplesService.getSamplesCategories().subscribe(
      (data: any[]) => {
        data.forEach(element => {
          this.enviromentVariable.sections.push(element);
        });
        console.log(this.enviromentVariable.sections)
        this.enviromentVariable.link = { path: '/gallery-stamp' }
      }, err => {
        console.log(err)
      }
    )
  }

  ngOnInit(): void {
    this.enviromentVariable.actualPage = 'stamps';
    this.enviromentVariable.sections=[];
    this.enviromentVariable.sections.push({
      idCategoriaEstampa:0,
      nombre:'Todas',
      imagenMenu:'todas.jpg',
      descripcion:'',
      publicada:1,
      orden:''
    });
    this.initSections();
  }

}
