import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @Input('pending_count') pending_count: number;

  @Input('accept_count') accept_count: number;

  @Input('cancel_count') cancel_count: number;

  dtOptions: DataTables.Settings = {};

  orders : any;

  constructor(private api: SharedService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    const that = this;
    this.api.get_customer_order_count().subscribe(
      async(response) => {
        const responsedata = response.body;
        this.pending_count =  responsedata['message'].pending_count;
        this.accept_count  =  responsedata['message'].accept_count;
        this.cancel_count  =  responsedata['message'].cancel_count;
      },
      async (error) => {
        if(error.status == 401){
          this.router.navigate(['Login']);
        }
      }
    )

    this.dtOptions = {
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        that.http.post<any>(
            this.api.base_url+'/customer/populate_dt_customer_order_list',
            dataTablesParameters, {}
          ).subscribe(resp => {
            that.orders = resp.data;
            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: []
            });
          });
      },
      columns: [{ data: 'supplier_id.first_name' }, { data: 'date' }, { data: 'time' }, { data: 'status' }, { data: 'id' }]
    }

  }

  

}
