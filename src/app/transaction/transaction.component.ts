import { Component } from '@angular/core';

@Component({
  selector: 'transaction',
  template: `
    <div class="transaction">
		<div><input [(ngModel)]="date" placeholder="Date"></div>
		<div>{{checkNum}}</div>
		<div>{{payee}}</div>
		<div>{{amount}}</div>
		<div>{{memo}}</div>
		<div>{{categoryId}}</div>
    </div>
  `,
  styles: []
})
export class TransactionComponent {
  public date: string;
  public checkNum: number;
  public payee: string;
  public amount: number;
  public memo: string;
  public categoryId: number;
}
