import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
// import { Socket } from 'ngx-socket-io';
import * as io from 'socket.io-client';

export interface User {
  username: string;
  color: string;
  image: string | undefined;
  id: number;
}

export interface Message {
  username: string;
  content: string;
  id: number;
  self: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  private socket: SocketIOClient.Socket = io();

  constructor() {}

  public color: string = '#616161';
  public users: User[] = [];
  public messages: Message[] = [];
  public input: string = '';
  public name: string | undefined = 'John Doe';
  public ping: number = 0;

  @ViewChild('messagesEl') private scrool: ElementRef | undefined;
  private id: number | undefined;

  public sendMessage(): void {
    if (this.input.trim() != '') {
      let data = {
        username: this.name,
        id: this.id,
        content: this.input,
      };
      this.socket.emit('msg:in', data);
      this.input = '';
    }
  }

  scrollToBottom(): void {
    try {
      this.scrool
        ? (this.scrool.nativeElement.scrollTop = this.scrool.nativeElement.scrollHeight)
        : null;
    } catch {}
  }

  ngAfterViewInit(): void {
    let Fname = prompt('Entrer votre prenom:')?.toString();
    this.color = this.colors[Math.floor(Math.random() * this.colors.length)];

    this.name = Fname?.split(' ')[0]
      .trim()
      .match(/[a-zA-Z0-9\.\-\_]+/g)
      ?.join('')
      .substring(0, 10);
    if ((this.name?.length || 0) < 1) {
      this.name = this.names[
        Math.floor(Math.random() * this.names.length)
      ].trim();
    }

    this.socket.emit('user:in', {
      username: this.name,
      color: this.color,
      image: '',
    });
  }

  ngOnInit(): void {
    this.socket.on('user:out', (users: User[]) => {
      this.users = users.filter((user) => user.id != this.id);
    });

    this.socket.on('user:info', (id: number) => {
      this.id = id;
    });

    this.socket.on('msg:out', (msg: any) => {
      let message: Message = {
        username: msg.username,
        content: msg.content,
        id: msg.id,
        self: msg.id == this.id ? true : false,
      };
      this.messages.push(message);
      setTimeout(() => {
        this.scrollToBottom();
      }, 100);
    });

    this.socket.on('ping:ms', (count: number) => {
      this.ping = Math.abs(new Date().getMilliseconds() - count);
    });
  }

  private names: string[] = [
    'Faustino',
    'Gregoria',
    'Otto  ',
    'Louetta  ',
    'Chasity  ',
    'Lionel  ',
    'Lennie  ',
    'Bronwyn  ',
    'Reta  ',
    'Maybelle  ',
    'Amanda  ',
    'Nery  ',
    'Renna  ',
    'Julienne  ',
    'Minta  ',
    'Telma  ',
    'Jannette  ',
    'Merle  ',
    'Lyndon  ',
    'Chae  ',
    'Bong  ',
    'Carlee  ',
    'Bettye  ',
    'Vanda  ',
    'Francisca  ',
    'Letisha  ',
    'Jesse  ',
    'Marin  ',
    'Janina  ',
    'Coy  ',
    'Neta  ',
    'Waylon  ',
    'Coleman  ',
    'Rod  ',
    'Eura  ',
    'Ronnie  ',
    'Shayne  ',
    'Adolph  ',
    'Kandy  ',
    'Lu  ',
    'Coral',
    'Dagmar',
    'Colby',
    'Dillon',
    'Reginald',
    'Audra',
    'Wai',
    'Major',
    'Rosy',
    'Cathy',
    '    Grisel  ',
    'Abdul   ',
    'Myrtice   ',
    'Kamala   ',
    'Riley   ',
    'Luna   ',
    'Melisa   ',
    'Hillary   ',
    'Jeff   ',
    'Sarita   ',
    'Lon   ',
    'Shaunte   ',
    'Dannie   ',
    'Daria   ',
    'Johnette   ',
    'Kendrick   ',
    'Flavia   ',
    'Elenora   ',
    'Harold   ',
    'Frederica   ',
    'Gerardo   ',
    'Ali   ',
    'Thomas   ',
    'Amparo   ',
    'Tanika   ',
    'Arnoldo   ',
    'Kristopher   ',
    'Wanetta   ',
    'Agatha   ',
    'Deedee   ',
    'Imelda   ',
    'Tod   ',
    'Eulah   ',
    'Yon   ',
    'Sirena   ',
    'Casimira  ',
    'Tyrone   ',
    'Hannah  ',
    'Yuri   ',
    'Ellie   ',
    'Merrie   ',
    'Michale   ',
    'Muriel   ',
    'Kathe   ',
    'Myrtle   ',
    'Karol   ',
    'Clementine   ',
    'Earlene   ',
    'Isabella   ',
    'Renee   ',
  ];
  private colors: string[] = [
    '#f44336',
    '#e91e63',
    '#9c27b0',
    '#673ab7',
    '#3f51b5',
    '#3f51b5',
    '#3f51b5',
    '#3f51b5',
    '#009688',
    '#4caf50',
    '#8bc34a',
    '#cddc39',
    '#ffeb3b',
    '#ffc107',
    '#ff9800',
    '#ff5722',
    '#607d8b',
  ];
}
