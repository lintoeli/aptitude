import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map, tap } from "rxjs";
import { ColorRange } from "src/app/models/color-range.model";

@Injectable({
    providedIn: 'root'
  })
  export class ColorRangeAPIService{
    private baseLocalUrl = 'http://localhost:8080/colorRanges'; // URL servidor local
    private baseDeployUrl = 'https://aptitude.diversolab.io/colorRanges'; // URL servidor remoto

    constructor(private http: HttpClient) {}

    getAllRanges(): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseDeployUrl}/all`);
    }
  }