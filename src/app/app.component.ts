import { Component, OnInit } from '@angular/core';
import * as enigmaJs from 'enigma.js';
import { SenseService } from './sense.service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SenseService]
})
export class AppComponent implements OnInit {

  matrix: any

  constructor(private senseService: SenseService) {

  }

  onChange(event) {
    let eventObj: MSInputMethodContext = <MSInputMethodContext> event
        let target: HTMLInputElement = <HTMLInputElement> eventObj.target
        let files: FileList = target.files
        let file = files[0]
        let reader = new FileReader()
        reader.onload = (evt: ProgressEvent) => {
          let target: FileReader = <FileReader> evt.target
          this.senseService.createApp(target.result)
          .then((layout: any) => {
            console.log(layout)
            this.matrix = layout.qHyperCube.qDataPages[0].qMatrix
          })
        }
        reader.readAsText(file)
  }
  
  ngOnInit() {
    this.senseService.connect()
  }
}
