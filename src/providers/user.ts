import { Injectable } from '@angular/core';

@Injectable()
export class User {

  private userID;
  private userToken;
  getID = () => { return this.userID }
  getToken = () => { return this.userToken }
  setID = (ID) => { this.userID = ID }
  setToken = (token) => { this.userToken = token }

}
