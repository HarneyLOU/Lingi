import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TestService } from '../../services/test.service';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-test-table',
    templateUrl: './test-table.component.html',
    styleUrls: ['./test-table.component.css']
})

export class TestTableComponent implements OnInit{
    displayedColumns: string[] = ['id', 'description', 'category', 'level'];
    tests: Test[];
    dataSource = new MatTableDataSource<Test>();

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    constructor(private testService: TestService, private http: HttpClient,
        @Inject('BASE_URL') private baseUrl: string) {
        
    }

    ngOnInit() {
        this.http.get<Test[]>(this.baseUrl + "api" + "/test").subscribe(result => {
            this.dataSource.data = result
            this.tests = result
        }, error => console.error(error));

        this.dataSource.paginator = this.paginator;
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
}
