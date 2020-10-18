import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // private url = 'http://localhost:8080/api/';
  private url = 'https://py-test-mean.herokuapp.com/api/';

  constructor(
    private socket: Socket
  ) { }

  getRandomPoints(points: number) {
    this.socket.emit('requirepoints', points);
  }

  pointsEmitted() {
    return this.socket
      .fromEvent('newpoints');
  }

}
