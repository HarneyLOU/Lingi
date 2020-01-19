import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { TestService } from '../test.service';
import { Router } from '@angular/router';

import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
    selector: 'app-test-table',
    templateUrl: './test-table.component.html',
    styleUrls: ['./test-table.component.css'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({ height: '0px', minHeight: '0' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
})

export class TestTableComponent implements OnInit{
    columnsToDisplay: string[] = ['Id', 'Tags', 'Type', 'Level', 'Rate'];
    tests: Test[];
    dataSource = new MatTableDataSource<Test>();
    expandedElement: Test | null;

    types: Type[];

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor(
        private testService: TestService,
        private router: Router,
        @Inject('BASE_URL') private baseUrl: string) {
    }

    ngOnInit() {
        this.testService.getTests().subscribe(result => {
            this.dataSource.data = result
            //this.tests = result
        }, error => console.error(error));

        this.testService.getTypes().subscribe(result => {
            this.types = result
        }, error => console.error(error));

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.dataSource.filterPredicate = (data: any, filter: string) => {
            let myFilter = JSON.parse(filter);
            return (myFilter.type !== 'all' ? data.Type == myFilter.type : true)
                //&& (myFilter.level !== 'all' ? data.Level == myFilter.level : true)
                && (data.Tags.trim().toLowerCase().indexOf(myFilter.all) !== -1
                || data.Description.trim().toLowerCase().indexOf(myFilter.all) !== -1);
        };
    }

    filterValues = {
        all: '',
        type: 'all',
        level: 'all'
    };

    applyFilter(filterValue: string, key: string) {
        switch (key) {
            case 'type':
                this.filterValues.type = filterValue;
                break;
            case 'all':
                this.filterValues.all = filterValue.trim().toLowerCase();
                break;
        }
        this.dataSource.filter = JSON.stringify(this.filterValues);
        
    }

    onSelect(test: any) {
        switch (test.Type) {
            case "Flashcards":
                //this.router.navigate(["flashcard", test.Id], { state: { desc: test.Description }});
                this.router.navigate(["flashcard", test.Id]);
                break;
        }
    }
}
