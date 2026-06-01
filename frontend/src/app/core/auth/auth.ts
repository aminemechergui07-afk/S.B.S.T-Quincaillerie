import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  constructor() {}

  isLoggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }

  getDataFromToken() {
    const token = localStorage.getItem('token');

    if (!token) {
      return null;
    }

    try {
      return JSON.parse(window.atob(token.split('.')[1]));
    } catch (error) {
      localStorage.removeItem('token');
      return null;
    }
  }
}
