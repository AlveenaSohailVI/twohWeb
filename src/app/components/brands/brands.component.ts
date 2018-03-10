import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { SpinnerService } from '../../apiServices/spinner.service';
import { ApiService } from '../../apiServices/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BrandsService } from '../../apiServices/brands.service';
import { BrandsukService } from '../../apiServices/brandsuk.service';
import { HomeComponent } from '../home/home.component';
import { Router } from '@angular/router';

declare var $;


@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {
  show = false;
  @ViewChild('loginModal')
  loginmodal: ModalComponent;
  brand = { name: '', url: '', description: '', image: '' };
  constructor(
    private spinner: SpinnerService,
    private Api: ApiService,
    private formBuilder: FormBuilder,
    private _brands: BrandsService,
    private _brandsuk: BrandsukService,
    private homeComponent: HomeComponent,
    private router: Router,
    
  ) {
    this.setBrands();
    this.setBrandsuk();
  }
  brands;
  brandsuk;
  brandsToShow = [];
  @Output()
  contact = new EventEmitter();
  emitContact() {
    this.contact.emit();
  }
  setBrands() {
    if (this._brands.getBrands()) {
      this.brands = this._brands.getBrands();
    }
    else {
      this.Api.getBrands()
        .subscribe(
        (data) => {
          this.spinner.stop();
          // console.log(data);
          this.brands = data;
          this._brands.setBrands(data);
          // console.log("Brands:")
          // console.log(this.brands)
        },
        (err) => {
          // console.log(err);
        },
        () => {
          //  console.log('Brands api called')
           });
    }
  }
  setBrandsuk() {
    if (this._brandsuk.getBrands()) {
      this.brandsuk = this._brandsuk.getBrands();
    }
    else {
      this.Api.getBrandsuk()
        .subscribe(
        (data) => {
          this.spinner.stop();
          // console.log(data);
          this.brandsuk = data;
          this._brandsuk.setBrands(data);
          // console.log("Brands:")
          // console.log(this.brandsuk)
        },
        (err) => {
          // console.log(err);
        },
        () => { 
          // console.log('Brands api called')
         });
    }
  }
  orderNow() {
    // this.homeComponent.BuyNow();
    // BuyNow() {
      localStorage.removeItem('obj');
      // this.routerLink = '/buyNow';
      // console.log('aaa')
      // $("#usuk").hide();
      // if (localStorage.getItem('user') == null){
      // console.log('bbb');
      //   this.loginmodal.open();
      // }else if (localStorage.getItem('user') != null)
        this.show = true;
      
      // localStorage.removeItem('obj');
      // if (localStorage.getItem('user') == null)
      //   this.loginmodal.open();
      // else if (localStorage.getItem('user') != null)
      //   this.router.navigate(['/buyNow']);
    }
    selectCountry(country) {
      this.show = false;
      // console.log(country);
      if (country === 'usa') {
        this.router.navigate(['/buyNow']);
      }
      else if(country === 'uk') {
        this.router.navigate(['/buyNowuk']);
      }
  
    }
  
  setItemsToShow() {

    //breaks items array into 8 pieces
    let count1 = this.brands.length % 8;
    let count2 = 0;

    let temp = [];
    for (let item of this.brands) {
      temp.push(item);
      if (temp.length == 8 || count1 == count2) {
        if ((temp.length == count1 && count1 == count2) || temp.length == 8)
          this.brandsToShow.push(temp);
        if (temp.length == 8) {
          count2++;
          temp = [];
        }
      }

    }
    if (this.brandsToShow.length == 0)
      this.brandsToShow.push(temp);
    // console.log(this.brandsToShow);

  }

  PostMessage(obj) {

    // console.log(obj);
    this.Api.postMessage(obj)
      .subscribe(
      (data) => {
        this.spinner.stop();
        // console.log(data);
      },
      (err) => {
        // console.log(err);
      }
      )
  }
  closeMenu() {
    if (document.getElementById('cart-list').style.display != 'none')
      document.getElementById('cart-list').style.display = 'none';
    if (document.getElementById('user-details').style.display != 'none')
      document.getElementById('user-details').style.display = 'none';
    // console.log('closeMenu')
  }

  ngOnInit() {
  }

}
