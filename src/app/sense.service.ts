import { Injectable } from '@angular/core'
import * as enigmaJs from 'enigma.js'

@Injectable()
export class SenseService {

  envconfig = require('../config.json')
  qixSchema = require('../../node_modules/enigma.js/schemas/qix/3.1/schema.json')

  qix: any
  config = {
    schema: this.qixSchema,
    session: {
      host: this.envconfig.host,
      prefix: this.envconfig.prefix,
      insecure: false
    }
  }

  constructor() {

  }

  connect() {
    return new Promise((resolve, reject) => {
      enigmaJs.getService('qix', this.config)
        .then(qix => {
          this.qix = qix
          resolve()
        })
    })
  }

  createApp(data): Promise<Array<any>> {
    let script = `LOAD * Inline [
        ${data}
      ];
    `

    return new Promise((resolve, reject) => {
      this.qix.global.createSessionApp()
        .then(app => app.setScript(script)
          .then(() => app.doReload())
          .then(() => {
            const barchartProperties = {
              qInfo: {
                qType: 'visualization',
                qId: '',
              },
              type: 'my-d3-barchart',
              labels: true,
              qHyperCubeDef: {
                qDimensions: [{
                  qDef: {
                    qFieldDefs: ['Name'],
                    qSortCriterias: [{
                      qSortByAscii: 1,
                    }],
                  },
                }],
                qMeasures: [{
                  qDef: {
                    qDef: 'Avg([Horsepower])',
                  },
                  qSortBy: {
                    qSortByNumeric: -1,
                  },
                }],
                qInterColumnSortOrder: [1, 0],
                qInitialDataFetch: [{ qTop: 0, qHeight: 500, qLeft: 0, qWidth: 17 }],
                qSuppressZero: false,
                qSuppressMissing: true,
              },
            };
            app.createSessionObject(barchartProperties).then((model) => {
              let object = model;

              const update = () => object.getLayout().then((layout) => {
                resolve(layout)
              });

              object.on('changed', update);
              update();
            });
          }));
    })
  }

}