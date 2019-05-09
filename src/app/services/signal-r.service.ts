import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import {AuthService} from './auth.service';
import {MessageService} from './message.service';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  private hubConnection: signalR.HubConnection;

  constructor(private authenticationService: AuthService,
              private messageService: MessageService,
              private toastr: ToastrService) { }

  public startConnection(): void {
    this.hubConnection = new signalR.HubConnectionBuilder()
        .withUrl('https://localhost:44363/message')
        .build();

    this.hubConnection
        .start()
        .then(() => {
          console.log('Connection started');
          this.addUserListListener();
          this.addMessageListener();
        })
        .catch(err => console.log('Error while starting connection: ' + err));
  }

  public stopConnection(): void {
    this.hubConnection.stop();
  }

  private updateUsers(data): void {
    this.hubConnection.invoke('updateUsers', data, this.authenticationService.currentUserValue.id)
        .catch(err => console.error(err));
  }

  public addUserListListener(): void {
    this.hubConnection.on('receiveUserId', (data) => {
      if (this.authenticationService.currentUserValue) {
        this.updateUsers(data);
      }
    });
  }

  public sendDirectMessage(userId, message): void {
    const msg = {
      msg: message.text,
      receiverId: userId,
      senderId: this.authenticationService.currentUserValue.id
    };
    this.hubConnection.invoke('sendMessage', msg)
        .catch(err => console.error(err));
  }

  public addMessageListener(): void {
    this.hubConnection.on('receiveMessage', (messageData) => {
      this.toastr.success(messageData.message, `${messageData.sender.user.firstName} ${messageData.sender.user.lastName}`);
      this.messageService.addDynamicMessage(messageData.message, messageData.sender);
    });
  }

}
