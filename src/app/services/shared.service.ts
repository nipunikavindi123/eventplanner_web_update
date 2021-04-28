import { Injectable } from '@angular/core';
import { HttpClient , HttpErrorResponse, HttpHeaders} from '@angular/common/http'
import * as moment from 'moment';

@Injectable({
    providedIn: 'root'
})

export class SharedService {

    public  base_url = "http://localhost:3030/api/v1";
  
    constructor(
        private http: HttpClient) {
    }

    login(formData){
        return this.http.post(this.base_url+'/login', formData, {observe: 'response'});
    }

    set_session(expires_in, access_token, refresh_token, role){
        const expiresAt = moment().add(expires_in,'second');
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('refresh_token', refresh_token);
        localStorage.setItem('role', role);
        localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
    }

    logout() {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("role");
        localStorage.removeItem("expires_at");
    }

    is_logged_in() {
        return moment().isBefore(this.get_expiration());
    }
    
    is_logged_out() {
        return !this.is_logged_in();
    }

    get_logged_user_role(){
        return localStorage.getItem('role');
    }
    
    get_expiration() {
        const expiration = localStorage.getItem("expires_at");
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    }     
    

    upload(formData) {
        return this.http.post<any>(this.base_url+'/file_uploader', formData, {
            reportProgress: true,
            observe: 'events'
        }); 
    }

    registration(formData){
       return this.http.post(this.base_url+'/registration', formData, {observe: 'response'});
    }

    check_role_access(){
        return this.http.get<any>(this.base_url+'/check_role_access');
    }

    get_current_user_details(){
        return this.http.get(this.base_url+'/shared/get_current_user_details', {observe: 'response'});
    }

    update_user_profile(formData){
        return this.http.post(this.base_url+'/shared/update_user_profile', formData, {observe: 'response'});
    }

    update_user_by_admin(id, formData){
        return this.http.post(this.base_url+'/admin/update_user_profile/'+id, formData, {observe: 'response'});
    }

    search_supplier_list(formData){
        return this.http.post(this.base_url+'/customer/search_supplier_list', formData, {observe: 'response'});
    }

    get_supplier_details(user_id){
        return this.http.get(this.base_url+'/shared/get_supplier_details/'+user_id, {observe: 'response'});
    }

    get_supplier_order_details(order_id){
        return this.http.get(this.base_url+'/supplier/get_supplier_order_details/'+order_id, {observe: 'response'});
    }

    add_event_request(formData){
        return this.http.post(this.base_url+'/customer/add_event_request', formData, {observe: 'response'});
    }

    get_customer_order_count(){
        return this.http.get(this.base_url+'/customer/get_customer_order_count/', {observe: 'response'});
    }

    get_admin_order_count(){
        return this.http.get(this.base_url+'/admin/get_admin_order_count/', {observe: 'response'});
    }

    get_admin_users(){
        return this.http.get(this.base_url+'/admin/get_admin_users/', {observe: 'response'});
    }

    get_user_details(user_id){
        return this.http.get(this.base_url+'/admin/get_user_details/'+user_id, {observe: 'response'});
    }

    get_supplier_order_count(){
        return this.http.get(this.base_url+'/supplier/get_supplier_order_count/', {observe: 'response'});
    }

    get_customer_order_details(id){
        return this.http.get(this.base_url+'/shared/get_customer_order_details/'+id, {observe: 'response'});
    }
    
    update_request_status(formData){
        return this.http.post(this.base_url+'/supplier/update_request_status', formData, {observe: 'response'});
    }

    add_payment_details(id, formData){
        return this.http.post(this.base_url+'/customer/add_payment_details/'+id, formData, {observe: 'response'});
    }

    add_contactus(formData){
        return this.http.post(this.base_url+'/add_contactus/', formData, {observe: 'response'});
    }

    get_inquiries(){
        return this.http.get(this.base_url+'/admin/get_inquiries/', {observe: 'response'});
    }

    delete_inquiries(id){
        return this.http.delete(this.base_url+'/admin/delete_inquiries/'+id, {observe: 'response'});
    }

    delete_user(id){
        return this.http.delete(this.base_url+'/admin/delete_user/'+id, {observe: 'response'});
    }

    send_payment_mails(id){
        return this.http.get(this.base_url+'/customer/send_payment_mails/'+id);
    }
  
}  