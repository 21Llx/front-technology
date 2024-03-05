import { Injectable, NestInterceptor, CallHandler } from '@nestjs/common'
import { map } from 'rxjs/operators'
import {Observable} from 'rxjs'
 
 
 
interface data<T>{
    data:T
}
// 定义统一的接口成功返回值
@Injectable()
export class Response<T = any> implements NestInterceptor {
    intercept(context, next: CallHandler):Observable<data<T>> {
        return next.handle().pipe(map(data => {
            return {
               data,
               status:0,
               success:true,
               message:"执行成功"
            }
        }))
    }
}