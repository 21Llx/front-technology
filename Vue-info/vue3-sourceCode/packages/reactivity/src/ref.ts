// ref内部采用 defineProperty  reactive采用 Proxy

import { hasChange, isObject } from "@vue/shared"
import { track, trigger } from "./effect"
import { TrackOptypes, TriggerOrTypes } from "./operator"
import { reactive } from "./reactive"

export function ref(value){
  //将普通类型变成对象
  return createRef(value)
}

export function shalowRef(value){
  //将普通类型变成对象
  return createRef(value,true)
}
const convert = (val)=> isObject(val)?reactive(val):val
class RefImpl{
  public _value
  public _is_Ref = true
  constructor(public rawValue,public shallow){
    this._value = shallow? convert(rawValue):rawValue
  }
  get value(){
    track(this,TrackOptypes.GET,'value')
    return this._value
  }
  set value(newValue){
    if(hasChange(newValue,this.rawValue)){
      this._value = this.shallow? convert(newValue):newValue
      this.rawValue = newValue
      trigger(this,TriggerOrTypes.SET,'value',newValue)
    }
    
  }
}

function createRef(rawValue,shallow=false){ 
    return new RefImpl(rawValue,shallow)
}
 