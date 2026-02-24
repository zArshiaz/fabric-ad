import { HttpInterceptorFn } from '@angular/common/http';
import {ApiAddressesUtility} from '../utilities/api-addresses.utility';

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  if(req.url.startsWith('http')){
    return next(req)
  }else {
    let newReq=req.clone({
      url:ApiAddressesUtility.baseAddress+req.url,
      withCredentials:true
    })
    return next(newReq);
  }
};
