import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core'
import type { Request } from 'express'
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    // console.log(request.body)
    // console.log(request.params)
    // console.log(request.headers)
    return true;
  }
}

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private Reflector: Reflector) { }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const admin = this.Reflector.get<string[]>('role', context.getHandler())
    const request = context.switchToHttp().getRequest<Request>()
    if(!admin){
      return true
    }
    if (admin.includes(request.body.role as string)) {
      return true;
    }else{
      return false
    }
   
  }
}