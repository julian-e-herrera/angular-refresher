import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class PersonsService {

  personsChanged =new Subject<string[]>()
   persons: string[] =[]

  constructor(private http:HttpClient) {

  }


  fetchpersons() {
    this.http.get<any>('https://swapi.dev/api/people').pipe(
      map(
        resData => resData.results
          .map(
            (character: { name: string; }) => character.name)))
      .subscribe(
        transformData => this.personsChanged.next(transformData)
      )
  }
  addPerson(name: string) {
    this.persons.push(name)
    this.personsChanged.next(this.persons)
  }
  removePerson(name: string) {
    this.persons = this.persons.filter(person => person !== name)
    this.personsChanged.next(this.persons)
  }


}
