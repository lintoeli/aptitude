import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map, tap } from "rxjs";
import { Benchmark } from "src/app/models/benchmark.model";

@Injectable({
    providedIn: 'root'
  })
  export class BenchmarkAPIService{

    private baseLocalUrl = 'http://localhost:8080/benchmarks'; // URL servidor local
    private baseDeployUrl = 'https://aptitude.diversolab.io/benchmarks'; // URL servidor remoto

    constructor(private http: HttpClient) {}

    public getAllBenchmarks(): Observable<Benchmark[]> {
        return this.http.get<Benchmark[]>(`${this.baseDeployUrl}/all`);
    }
  }