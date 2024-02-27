@Component
struct ChildCom{
  build(){
    Column() {
      Text(`childCom`).fontSize(50)
    }
  }
}
export default ChildCom