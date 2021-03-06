import { Component, OnInit } from '@angular/core';
import { ModalService } from 'app/_modal';
import { EnviromentVariableServiceService } from 'app/core/service/enviroment-variable-service.service';
import { data } from 'jquery';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  test: Date = new Date();

  mail: any = {
    from: '',
    subject: '',
    text: '',
    name: ''
  }

  constructor(
    private modalService: ModalService,
    private enviromentVariableService: EnviromentVariableServiceService
  ) { }

  ngOnInit() {
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    if (!this.modalService.widht)
      this.modalService.widht = '900px';
    this.modalService.close(id);
  }

  send() {
    this.enviromentVariableService.sendMail(this.mail).subscribe(
      data => {
        if (data)
          alert('Se ha enviado el correo exitosamente')
      }, err => {
        alert('Error al enviar el correo')
      }
    )
  }

}
