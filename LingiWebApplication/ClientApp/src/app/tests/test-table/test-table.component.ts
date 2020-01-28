import { Component, Inject, OnInit, ViewChild, Input } from '@angular/core';
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

    @Input() user: string;
    currentUser: string;

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor(
        private testService: TestService,
        private router: Router) {
    }

    ngOnInit() {
        if (this.user) {
            if (this.user == localStorage.getItem("user").toString()) {
                this.currentUser = localStorage.getItem("user").toString();
            }
            this.testService.getUserTests(this.user).subscribe(result => {
                this.dataSource.data = result
            }, error => console.error(error));
        }
        else {
            this.testService.getTests().subscribe(result => {
                this.dataSource.data = result
            }, error => console.error(error));
        }
        this.testService.getTypes().subscribe(result => {
            this.types = result
        }, error => console.error(error));

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.dataSource.filterPredicate = (data: any, filter: string) => {
            let myFilter = JSON.parse(filter);
            return (myFilter.type !== 'all' ? data.Type == myFilter.type : true)
                //&& (myFilter.level !== 'all' ? data.Level == myFilter.level : true)
                && ((data.Tags ? data.Tags.trim().toLowerCase().indexOf(myFilter.all) !== -1: false)
                || (data.Description ? data.Description.trim().toLowerCase().indexOf(myFilter.all) !== -1: false));
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

    onSolve(test: any) {
        switch (test.Type) {
            case "Flashcards":
                this.router.navigate(["flashcard", test.Id]);
                break;
            case "Quiz":
                this.router.navigate(["quiz", test.Id]);
                break;
        }
    }

    onEdit(test: any) {
        switch (test.Type) {
            case "Flashcards":
                this.router.navigate(["tests/edit/Flashcards/", test.Id]);
                break;
        }
    }
}
