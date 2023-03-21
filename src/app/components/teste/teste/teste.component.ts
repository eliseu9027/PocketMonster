import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teste',
  templateUrl: './teste.component.html',
  styleUrls: ['./teste.component.scss']
})


export class TesteComponent{

  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

}
