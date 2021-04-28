import { Component, OnInit, ViewChild} from '@angular/core';
import { Router } from "@angular/router";
import { SharedService } from '../../services/shared.service';


@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})


export class EventsComponent implements OnInit{
   
  supplier_collection:string[];

  center: google.maps.LatLngLiteral = {lat: 7.8731, lng: 80.7718};

  zoom = 8;

  markerOptions: google.maps.MarkerOptions = {draggable: false};

  markerPositions: google.maps.LatLngLiteral[] = [];



  constructor(private api: SharedService, private router: Router) { 

  }

  ngOnInit(){

  }

  onClickSupplierType(event){
    const selected_value = event.target.value;
    const formData = {
      type : selected_value
    }
    this.api.search_supplier_list(formData).subscribe(
      async(response) => {
        const responsedata = response.body;
        this.supplier_collection =  responsedata['message'].events;

        for (let index = 0; index < responsedata['message'].events.length; index++) {
          this.markerPositions.push({
            'lat': Number(responsedata['message'].events[index].geolocation.latitude), 
            'lng': Number(responsedata['message'].events[index].geolocation.longitude)
          });
        }

        //this.markerPositions.push({'lat': Number("6.982920235906174"), 'lng': Number("79.92421089046475")});
      },
      async (error) => {
        if(error.status == 401){
          this.router.navigate(['Login']);
        }
      }
    );
  }

  

}
