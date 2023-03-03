import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PersonsService } from './persons.service';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html'
})
export class PersonsComponent implements OnInit,OnDestroy {

  personList: string[] | undefined
  private personsListSubs: Subscription
    //private personsService: PersonsService | undefined;
    = new Subscription;
  isFetching: boolean = false;

  constructor(private prsService:PersonsService) {
      //this.personList = prsService.persons
      //this.personsService =prsService
  }

  ngOnInit(): void {
    this.prsService.personsChanged.subscribe(persons =>this.personList=persons)
    this.personsListSubs = this.prsService.personsChanged.subscribe(persons => {
      this.personList = persons
      this.isFetching=false
    })
    this.isFetching=true
    this.prsService.fetchpersons()

  }

  onRemovePerson(personName: string) {
    this.prsService.removePerson(personName)
  }

  ngOnDestroy(): void {
      this.personsListSubs.unsubscribe()
  }
}
