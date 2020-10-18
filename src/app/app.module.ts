import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PyComponent } from './py/py.component';
import { FormsModule } from '@angular/forms';
import { ApiService } from './service/api.service';
import { SimulationService } from './service/simulation.service';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

// const config: SocketIoConfig = { url: 'http://localhost:8080', options: {} };
const config: SocketIoConfig = { url: 'https://py-test-mean.herokuapp.com', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    PyComponent
  ],
  imports: [
    BrowserModule,
    SocketIoModule.forRoot(config),
    FormsModule
  ],
  providers: [ApiService, SimulationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
