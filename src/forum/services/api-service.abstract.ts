import { Injectable } from "@angular/core";
import { Observable, throwError, catchError, map } from "rxjs";
import {
    HttpClient,
    HttpErrorResponse,
    HttpHeaders,
    HttpParams
} from '@angular/common/http';
import { ParseLinkHeaderService } from "./parse-link-header.service";
import { StaticInjectorService } from "./static-injector.service";

const API_URL = '/api';
@Injectable({
    providedIn: 'root'
})
export abstract class ApiServiceAbstract {
    protected readonly httpClient: HttpClient;
    protected readonly parseLinkHeaderService: ParseLinkHeaderService;

    protected readonly httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'}),
        params: undefined
    };
    protected readonly httpOptionsMultipart = {
        headers: new HttpHeaders({enctype: 'multipart/form-data'})
    };

    protected constructor() {
        this.httpClient = StaticInjectorService.get(HttpClient);
        this.parseLinkHeaderService = StaticInjectorService.get(ParseLinkHeaderService);
    }

    protected handleError(error: HttpErrorResponse): Observable<never> {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
            return throwError(error);
        }
        // return an observable with a user-facing error message
        return throwError('Something bad happened; please try again later.');
    }

    protected postForObject<T>(uri: string, payload: any, params: any): Observable<T> {
        let httpOptions = this.httpOptions;
        if (params) {
            httpOptions = {
                headers: this.httpOptions.headers,
                params: new HttpParams({fromObject: params}),
            };
        }
        return this.httpClient.post<T>(`${API_URL}${uri}`, payload, httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }
    protected postForMultipart<T>(uri: string, payload: any, params: any): Observable<T> {
        let httpOptions = this.httpOptionsMultipart;
        if (params) {
            httpOptions = {
                headers: this.httpOptionsMultipart.headers,
            };
        }
        return this.httpClient.post<T>(`${API_URL}${uri}`, payload, httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }

  protected putForMultipart<T>(uri: string, payload: any, params: any): Observable<T> {
    let httpOptions = this.httpOptionsMultipart;
    if (params) {
      httpOptions = {
        headers: this.httpOptionsMultipart.headers,
      };
    }
    return this.httpClient.put<T>(`${API_URL}${uri}`, payload, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

    protected postForObjectRaw<T>(uri: string, payload: any, params: any): Observable<T> {
        let httpOptions = {};
        if (params) {
            httpOptions = {
                headers: this.httpOptions.headers,
                observe: 'response',
                params: new HttpParams({fromObject: params}),
            };
        }
        return this.httpClient.post<T>(`${API_URL}${uri}`, payload, httpOptions);
    }

    protected putForObject<T>(uri: string, payload: any, params: any): Observable<T> {
        let httpOptions = this.httpOptions;
        if (params) {
            httpOptions = {
                headers: this.httpOptions.headers,
                params: new HttpParams({fromObject: params}),

            };
        }
        return this.httpClient.put<T>(`${API_URL}${uri}`, payload, httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }

    protected patchForObject<T>(uri: string, payload: any, params: any): Observable<T> {
        let httpOptions = this.httpOptions;
        if (params) {
            httpOptions = {
                headers: this.httpOptions.headers,
                params: new HttpParams({fromObject: params}),

            };
        }
        return this.httpClient.patch<T>(`${API_URL}${uri}`, payload, httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }

    protected getForObject<T>(uri: string, params?: any, contentType?: string, responseType?: string): Observable<T> {
        let httpOptions = this.httpOptions;
        if (contentType) {
          this.httpOptions.headers['Content-Type'] = contentType;
        }
        if (responseType) {
          this.httpOptions['responseType'] = responseType;
        }
        if (params) {
            httpOptions = {
                headers: this.httpOptions.headers,
                params: new HttpParams({fromObject: params}),
            };
        }
        return this.httpClient.get<T>(`${API_URL}${uri}`, httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }

  protected getForPageableObject<T>(uri: string, params?: any, contentType?: string, responseType?: string): Observable<any> {
    let httpOptions = {};
    if (contentType) {
      this.httpOptions.headers['Content-Type'] = contentType;
    }
    if (responseType) {
      this.httpOptions['responseType'] = responseType;
    }
    if (params) {
      httpOptions = {
        headers: this.httpOptions.headers,
        params: new HttpParams({fromObject: params}),
        observe: 'response'
      };
    }

    return this.httpClient.get<any>(`${API_URL}${uri}`, httpOptions)
      .pipe(
        map((res) => ({
          links: this.parseLinkHeaderService.parseLinkHeader(res.headers.get('link')),
          totalItems: res.headers.get('X-Total-Count'),
          content: res.body
        })),
        catchError(this.handleError)
      );
  }

    protected delete<T>(uri: string, params?: any): Observable<T> {
        let httpOptions = this.httpOptions;
        if (params) {
            httpOptions = {
                headers: this.httpOptions.headers,
                params: new HttpParams({fromObject: params}),
            };
        }
        return this.httpClient.delete<T>(`${API_URL}${uri}`, httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }

    protected removeUndefinedAndNull(obj) {
        const propNames = Object.getOwnPropertyNames(obj);
        for (let i = 0; i < propNames.length; i++) {
            const propName = propNames[i];
            if (obj[propName] === null || obj[propName] === undefined || obj[propName] === '') {
                delete obj[propName];
            } else if (obj[propName].length === 1 && obj[propName][0] === '') {
                delete obj[propName];
            }

        }
        return obj;
    }

  protected postForMultipartObjectRaw<T>(uri: string, payload: any, params: any): Observable<T> {
    let httpOptions = {};
    if (params) {
      httpOptions = {
        headers: this.httpOptionsMultipart.headers,
        observe: 'response',
        params: new HttpParams({fromObject: params}),
        responseType: 'text'
      };
    }
    return this.httpClient.post<T>(`${API_URL}${uri}`, payload, httpOptions);
  }

}
