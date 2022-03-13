import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { concatMap, finalize, tap } from "rxjs/operators";

@Injectable()
export class LoadingService {
  // Subjects are just like observables but we can control the value that they emit. yes they can emit values!.
  // Also the difference between the Subject() and BehviouSubject() is that in BehaviourSubject it remembers the prvious value. It is usful in ansynchronous applications.
  private loadingSubject = new BehaviorSubject<boolean>(false);

  loading$: Observable<boolean> = this.loadingSubject.asObservable();

  showLoaderUntilCompleted<T>(obs$: Observable<T>): Observable<T> {
    return of(null).pipe(
      tap(() => this.loadingOn()),
      concatMap(() => obs$),
      finalize(() => this.loadingOff())
    );
  }

  loadingOn() {
    //   the next method on loadingSubject is used to emit new values to the subject.
    this.loadingSubject.next(true);
  }

  loadingOff() {
    this.loadingSubject.next(false);
  }
}
