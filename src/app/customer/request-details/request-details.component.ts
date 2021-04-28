import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { IPayPalConfig, ICreateOrderRequest} from 'ngx-paypal';

@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.css']
})
export class RequestDetailsComponent implements OnInit {

  order_id:string;

  order: any = {};

  payment_success:boolean = false;

  payment_error:boolean = false;

  payPalConfig ? : IPayPalConfig;

  constructor(private api: SharedService, private router: Router, private activeRoute : ActivatedRoute) {
    this.order_id = this.activeRoute.snapshot.params['id'];
  }

  ngOnInit(){

    this.initConfig();

    this.activeRoute.data.subscribe(
      async(response) => {
        const responsedata = response.order.body;
        this.order = responsedata['message'].order;
      },
      async (error) => {
        if(error.status == 401){
          this.router.navigate(['Login']);
        }
      }
    )

  }

  initConfig(): void {
    this.payPalConfig = {
    currency: 'USD',
    clientId: 'AfTawR-A32oHYonuALDifj3JWTxB_IaHGbEBIkJG8pfu9rjskt2xKkjVX3y5WUIkJ0w0F07PqttFrC4P',
    createOrderOnClient: (data) => <ICreateOrderRequest>{
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: this.order.supplier_id.amount,
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value: this.order.supplier_id.amount
              }
            }
          },
          items: [
            {
              name: this.order.supplier_id.first_name + " " + this.order.supplier_id.last_name,
              quantity: '1',
              category: 'DIGITAL_GOODS',
              unit_amount: {
                currency_code: 'USD',
                value: this.order.supplier_id.amount,
              },
            }
          ]
        }
      ]
    },
    advanced: {
      commit: 'true'
    },
    style: {
      label: 'paypal',
      layout: 'vertical'
    },
    onApprove: (data, actions) => {

    },
    onClientAuthorization: (data) => {
      const formData = {
        payment_details : {
          transition_id : data.id,
          amount : data.purchase_units[0].amount.value,
          date : data.create_time,
          name : data.payer.name.given_name + " " + data.payer.name.surname,
          email : data.payer.email_address
        }
      }
  
      this.api.add_payment_details(this.order_id, formData).subscribe(
        async(response) => {
          const responsedata = response.body;
          if(responsedata['type'] == "success"){
            this.payment_success = true;
            this.api.send_payment_mails(this.order_id);
            this.ngOnInit();
          }
        },
        async (error) => {
          if(error.status == 401){
            this.router.navigate(['Login']);
          }
        }
      )

    },
    onCancel: (data, actions) => {
      this.payment_error = true;
    },
    onError: err => {
      this.payment_error = true;
    },
    onClick: (data, actions) => {
      //this.payment_error = true;
    },
  };
  }

}
