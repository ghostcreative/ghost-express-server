import { Component, OnInit } from '@angular/core';
import { TransferHttp } from '../../modules/transfer-http/transfer-http';

@Component({
    selector: 'home-view',
    template: `<h3>{{subs | async}}</h3>`
})
export class HomeView implements OnInit {
    public subs: String;

    constructor(private http: TransferHttp) {}

    ngOnInit() {
        this.subs = 'Hello there';
    }
}