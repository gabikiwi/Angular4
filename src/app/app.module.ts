import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { TransactionComponent } from './transaction/transaction.component';
import { FormsModule } from '@angular/forms';
import { LedgerComponent } from './ledger/ledger.component';
import { TransactionService } from './transaction.service';
import { ChartModule } from 'angular2-chartjs';

@NgModule({
  declarations: [
    AppComponent,
    TransactionComponent,
    LedgerComponent
  ],
  imports: [
    BrowserModule,
	FormsModule,
	HttpModule,
	ChartModule
  ],
  providers: [
	TransactionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
