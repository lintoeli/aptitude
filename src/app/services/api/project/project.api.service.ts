import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map, tap } from "rxjs";
import { Project } from "src/app/models/project.model";

@Injectable({
    providedIn: 'root'
  })
  export class ProjectAPIService {

    private baseLocalUrl = 'http://localhost:8080/projects'; // URL servidor local
    private baseDeployUrl = ''; // URL servidor remoto

    constructor(private http: HttpClient) { }
  
    public getProjectByName(name: string): Observable<Project> {
      return this.http.get<any>(`${this.baseLocalUrl}/by-name`, { params: { name } })
        .pipe(
          map(data => {
            // Asumimos que el servidor devuelve un objeto que ya cumple con la interfaz Project
            return data as Project;
          })
        );
    }

    public getAllProjects(): Observable<Project[]> {
        return this.http.get<Project[]>(`${this.baseLocalUrl}/all`);
    }
  }