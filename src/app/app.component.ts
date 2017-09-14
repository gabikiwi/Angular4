import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
// this is an operator
import 'rxjs/add/operator/toPromise';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	title = 'Gabriels App';
	obj = {
		id: '1',
		name: 'ume membrii familie'
	};

	arrayVariable = ['ana', 'magda', 'gabriel'];

	isTrue = false;
	myName = 'Chivoiu';

	dukes = [{ name: 'offline', age: 2 }, { name: 'cached', age: 3 }];

	// I will inject the Http service after I import the class
	// and here we create a private field which is available in the whole class
	constructor(private http: Http) {

	}

	// this was added for the backend because we have an Observable Object which by adding
	// the operator toPromise;

	ngOnInit() {
		this.http.get('http://localhost:8081/dukes/resources/dukes')
		//convert raw result to json
		.toPromise().then(r => r.json()).then (r => this.dukes =r);
	}


}
