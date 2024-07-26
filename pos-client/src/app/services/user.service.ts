import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { catchError, map, of, tap } from 'rxjs';
import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { User } from '../models/user.model';

declare const google: any;

const base_url = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public user?: User;

  constructor(private http: HttpClient, private router: Router) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.user?.uid || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  private saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  private clearToken() {
    localStorage.removeItem('token');
  }

  logout() {
    this.clearToken();

    // Revoke the Google token if the user logged in with Google
    if (this.user?.google) {
      google.accounts.id.revoke(this.user.email, () => {
        this.router.navigateByUrl('/login');
      });
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  validarToken() {
    return this.http
      .get(`${base_url}/login/renew`, {
        headers: {
          'x-token': this.token,
        },
      })
      .pipe(
        map((resp: any) => {
          
          const { email, google, nombre, role, img = '', uid } = resp.user;
          this.user = new User(nombre, email, '', img, google, role, uid);
          this.saveToken(resp.token);
          return true;
        }),
        catchError((error) => {
          console.error( error);
          return of(false);
        })
      );
  }

  crearUsuario(formData: RegisterForm) {
    return this.http.post(`${base_url}/users`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token)
      })
    )
  }

  actualizarPerfil(data: { email: string; name: string; role?: string }) {
    data = {
      ...data,
      role: this.user?.role,
    };

    return this.http.put(
      `${base_url}/users/${this.uid}`,
      data,
      this.headers
    );
  }

  login(formData: LoginForm) {
    return this.http.post(`${base_url}/login`, formData).pipe(
      tap((resp: any) => {
        this.saveToken(resp.token);
      })
    );
  }

  loginGoogle(token: string) {
    return this.http.post(`${base_url}/login/google`, { token }).pipe(
      tap((resp: any) => {
        // console.log(resp);
        this.saveToken(resp.token);
      })
    );
  }

  // cargarUsuarios(desde: number = 0) {

  //   const url = `${base_url}/usuarios?desde=${desde}`
  //   return this.http.get<CargarUsuario>(url, this.headers)
  //     .pipe(
  //       map(resp => {
  //         const usuarios = resp.usuarios.map(user => new Usuario(user.nombre, user.email, '', user.img, user.google, user.role, user.uid))

  //         return {
  //           total: resp.total,
  //           usuarios
  //         }
  //       }
  //       )
  //     )
  // }

  eliminarUsuario(user: User) {
    const url = `${base_url}/users/${user.uid}`;
    return this.http.delete(url, this.headers);
  }

  guardarUsuario(user: User) {
    return this.http.put(
      `${base_url}/users/${user.uid}`,
      user,
      this.headers
    );
  }
}
