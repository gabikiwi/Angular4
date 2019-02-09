import { Component, OnInit } from '@angular/core';
import { TransactionComponent } from '../transaction/transaction.component';
import { TransactionService } from '../transaction.service';

@Component({
  selector: 'ledger',
  template: `
	<chart [type]="type" [data]="data" [options]="options"></chart>

	<div class="search-bar">
		<input type="text" (keyup)="searchChange($event)" placeholder="Search" />
		<span>{{visibleTotal | currency:'USD':true:'1.2-2' }}</span>
	</div>

    <table id="ledger">
		<tr *ngFor="let trans of visibleTrans; let even=even; let odd=odd" [ngClass]="{odd:odd,even:even}">
			<td>{{trans.date | date : 'MMM d yy'}}</td>
			<td>{{trans.payee}}</td>
			<td>{{trans.categoryId}}</td>
			<td>{{trans.amount | currency:'USD':true:'1.2-2' }}</td>
		</tr>
    </table>
  `,
  styleUrls: ['ledger.scss']
})
export class LedgerComponent implements OnInit {
  private allTrans: TransactionComponent[] = [];
  private allTotal: number;

  private report = {"success":true,"results":{"months":[1,2,3,4,5,6,7,8,9,10,11,12],"cam":{"0":[321.36,2765.22,-2234.51,-933.22,634.34,856.37,464.2,3187.2,-336.66,-1492.0,4161.96,-2513.58],"1":[-265.83,-430.07,-406.64,-269.53,-634.2,-566.78,-512.81,-523.48,-446.54,-629.95,-272.99,-308.32]},"ct":{"0":4880.6797,"1":-5267.14},"cav":{"0":406.7233,"1":-438.92834}}};

  visibleTrans: TransactionComponent[] = [];
  visibleTotal: number;

  type = 'line';
  data = {};
  options = {
    responsive: true,
    maintainAspectRatio: false
  };

  constructor(transSvc: TransactionService) {
	this.allTotal = 0;
  	transSvc.getTransactions().subscribe(result => {
		this.allTrans = result.json();
		this.visibleTrans = this.allTrans;

		this.allTrans.forEach(x => {
			this.allTotal += x.amount;
		});
	});

	let data = { labels: [], datasets: [] };
	let colors = ['rgba(0,0,220,0.5)', 'rgba(220,0,0,0.5)', 'green'];
	let categories = ['Uncategorized', 'Restaurants', '???'];

	if (this.report.success) {
		let monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		data.labels = [];
		this.report.results.months.forEach(month => {
			data.labels.push(monthNames[month - 1]);
		});
		for (var catId in this.report.results.cam) {
			var ds = {
				label : categories[catId],
				borderColor : colors[catId],
				backgroundColor : colors[catId],
				data : this.report.results.cam[catId]
			};
			data.datasets.push(ds);
		}

		this.data = data;
	}
  }

  public searchChange(input: any) {
  	let txt = input.target.value.toLowerCase();
	if (txt == "") {
		this.visibleTrans = this.allTrans;
		this.visibleTotal = this.allTotal;
		return;
	}

	this.visibleTrans = [];
	this.visibleTotal = 0;
	this.allTrans.forEach(x => {
		if (x.payee.toLowerCase().indexOf(txt) !== -1) {
			this.visibleTrans.push(x);
			this.visibleTotal += x.amount;
		}
	});
  }

  ngOnInit() {
  }
}
