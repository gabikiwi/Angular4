import { TransactionComponent } from './transaction/transaction.component';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class TransactionService {
  public transactions: TransactionComponent[] = [];
  private http: Http;

  constructor(http: Http) {
  	this.http = http;
  }

  getTransactions() {
	return this.http.get("//localhost:8080/api/trans/list?start=2017-01-01&end=2017-12-13");
  }
}
