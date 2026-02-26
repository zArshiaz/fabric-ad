import {Component, inject, input, OnInit, output, signal} from '@angular/core';
import {AddressOrderDto, ChangeOrderFormDto} from '../../dtos/order.dto';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {InputErrors} from '../input-errors/input-errors';
import {OrderService} from '../../services/order-service';
import {toast} from '../../utilities/swal-toast-utility';


@Component({
  selector: 'app-order-address',
  imports: [
    ReactiveFormsModule,
    InputErrors
  ],
  templateUrl: './order-address.html',
  styleUrl: './order-address.css',
})
export class OrderAddress implements OnInit {
  orderService = inject(OrderService)

  address = input.required<AddressOrderDto>()
  orderId = input.required<string>()
  orderChanged = output<void>()
  isShowInputs = signal(false)

  cityList = signal<string[]>([]);
  iranProvinces: { [province: string]: string[] } = {
    "آذربایجان شرقی": ["تبریز", "مراغه", "مرند", "میانه", "شبستر", "اهر"],
    "آذربایجان غربی": ["ارومیه", "خوی", "مهاباد", "بوکان", "میاندوآب"],
    "اردبیل": ["اردبیل", "پارس‌آباد", "مشگین‌شهر", "خلخال"],
    "اصفهان": ["اصفهان", "کاشان", "نجف‌آباد", "خمینی‌شهر", "فلاورجان"],
    "البرز": ["کرج", "هشتگرد", "نظرآباد", "محمدشهر"],
    "ایلام": ["ایلام", "دهلران", "آبدانان", "ایوان"],
    "بوشهر": ["بوشهر", "برازجان", "گناوه", "خورموج"],
    "تهران": ["تهران", "ری", "اسلامشهر", "شهریار", "پردیس", "قدس"],
    "چهارمحال و بختیاری": ["شهرکرد", "بروجن", "فارسان", "فرخ‌شهر"],
    "خراسان جنوبی": ["بیرجند", "قائن", "طبس", "فردوس"],
    "خراسان رضوی": ["مشهد", "نیشابور", "سبزوار", "تربت‌حیدریه", "قوچان"],
    "خراسان شمالی": ["بجنورد", "شیروان", "اسفراین", "جاجرم"],
    "خوزستان": ["اهواز", "آبادان", "خرمشهر", "دزفول", "شوشتر"],
    "زنجان": ["زنجان", "ابهر", "خرمدره", "قیدار"],
    "سمنان": ["سمنان", "شاهرود", "دامغان", "گرمسار"],
    "سیستان و بلوچستان": ["زاهدان", "زابل", "ایرانشهر", "چابهار"],
    "فارس": ["شیراز", "مرودشت", "کازرون", "لار", "جهرم"],
    "قزوین": ["قزوین", "تاکستان", "الوند"],
    "قم": ["قم", "جعفریه", "کهک"],
    "کردستان": ["سنندج", "سقز", "مریوان", "بانه"],
    "کرمان": ["کرمان", "سیرجان", "رفسنجان", "جیرفت"],
    "کرمانشاه": ["کرمانشاه", "اسلام‌آباد غرب", "هرسین", "کنگاور"],
    "کهگیلویه و بویراحمد": ["یاسوج", "دوگنبدان", "دهدشت"],
    "گلستان": ["گرگان", "گنبد کاووس", "علی‌آباد کتول", "بندر ترکمن"],
    "گیلان": ["رشت", "انزلی", "لاهیجان", "آستارا", "تالش"],
    "لرستان": ["خرم‌آباد", "بروجرد", "دورود", "کوهدشت"],
    "مازندران": ["ساری", "بابل", "آمل", "قائم‌شهر"],
    "مرکزی": ["اراک", "ساوه", "خمین", "محلات"],
    "هرمزگان": ["بندرعباس", "میناب", "بندر لنگه", "دهبارز"],
    "همدان": ["همدان", "ملایر", "نهاوند", "تویسرکان"],
    "یزد": ["یزد", "میبد", "اردکان", "بافق"]
  };


  addressForm = new FormGroup({
    'title': new FormControl('', [Validators.required, Validators.minLength(3)]),
    'phone': new FormControl('', [Validators.required, Validators.pattern(/^09\d{9}$/)]),
    "province": new FormControl('', [Validators.required]),
    "city": new FormControl('', [Validators.required]),
    "zipCode": new FormControl(0, [Validators.required, Validators.pattern(/^\d{10}$/)]),
    "address": new FormControl('', [Validators.required, Validators.minLength(3)]),
  })

  ngOnInit() {
    this.initInput()
  }

  showInputs() {
    this.initInput()
    this.isShowInputs.set(true);
  }

  closeInput() {
    this.isShowInputs.set(false);
  }

  initInput() {
    this.addressForm.patchValue({
      title: this.address().title,
      phone: this.address().phone,
      province: this.address().province,
      city: this.address().city,
      address: this.address().address,
      zipCode: this.address().zipCode
    })
    this.cityList.set(this.iranProvinces[this.address().province]);
  }

  onProvinceChange(event: any) {
    const selectedProvince = event.target.value;
    this.cityList.set(this.iranProvinces[selectedProvince] || [])
    this.addressForm.patchValue({city: ''});
  }

  submit() {
    if (this.addressForm.invalid) {
      this.addressForm.markAllAsTouched()
      return;
    }
    let newAddress = this.addressForm.value as ChangeOrderFormDto;
    this.orderService.changeAddress(this.orderId(), newAddress).subscribe({
      next: (res) => {
        toast.fire({
          icon: 'success',
          text: 'آدرس تغییر یافت'
        })
        console.log(res)

        this.orderChanged.emit();
        this.closeInput()
      },
      error: () => {
        toast.fire({
          icon: 'error',
          text: 'خطا در تغییر آدرس'
        })
      }
    })
  }

  protected readonly Object = Object;
}
