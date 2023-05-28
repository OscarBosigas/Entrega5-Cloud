import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from './usuario';
import * as FileSaver from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private byUserUrl = 'https://back-76yejkspxa-uc.a.run.app/api/tasks?email';
  private byIdUrl = 'https://back-76yejkspxa-uc.a.run.app0/api/task';
  private deleteUrl = 'https://back-76yejkspxa-uc.a.run.app/api/task?id';
  private addUrl = 'https://back-76yejkspxa-uc.a.run.app/api/upload';
  private downloadUri = 'https://back-76yejkspxa-uc.a.run.app/api/download?file'

  constructor(private http: HttpClient) { }

  getTaskById(id:number, user: Usuario): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Token': user.token
    });

    return this.http.get(`${this.byIdUrl}/${id}`, { headers });
  }

  getTasksByUser(user:Usuario): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Token': user.token
    });

    return this.http.get(`${this.byUserUrl}=${user.email}`, { headers });
  }

  deleteTask(id: number, user: Usuario){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Token': user.token
    });
    return this.http.delete(`${this.deleteUrl}=${id}`, { headers });
  }

  addTask(formData: FormData){
    return this.http.post(this.addUrl, formData);
  }

  downloadFile(filename: string) {
    this.http.get(`${this.downloadUri}=${filename}`, { responseType: 'blob' })
      .subscribe((data: Blob) => {
        FileSaver.saveAs(data, filename);
      });
  }
}
