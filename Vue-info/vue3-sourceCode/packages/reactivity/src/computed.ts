import { isFunction } from "@vue/shared";
import { effect, track, trigger } from "./effect";
import { TrackOptypes, TriggerOrTypes } from "./operator";

class ComputedRefImpl{
  public _dirty = true
  public _value
  public effect
  constructor(getter,public setter){
    
    this.effect = effect(getter,{
      lazy: true,
      scheduler:()=>{
        if(!this._dirty){
          this._dirty = true
          trigger(this,TriggerOrTypes.SET,"value")
        }
      }
    })
  }
  get value(){

    if(this._dirty){
      this._value = this.effect()
      console.log(this._value)
      this._dirty = false
    }
    track(this,TrackOptypes.GET,"value")
    return this._value
  }
  set value(newValue){
    this.setter(newValue)
  }
}

export function computed(getterOrOptions){
  let getter;
  let setter;
  if(isFunction(getterOrOptions)){
    getter = getterOrOptions
    setter = ()=>{

    }
  }else{
    getter = getterOrOptions.get
    setter = getterOrOptions.setter
  }
  return new ComputedRefImpl(getter,setter)
}