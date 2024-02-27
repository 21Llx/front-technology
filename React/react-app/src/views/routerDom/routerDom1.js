import {Outlet,useNavigate,} from "react-router-dom"
import server from "../../server/index"
function RouterDom1(props){
  const {history} = props
  let navigate = useNavigate()
  function _download(buffer, name = 'file', suffix = 'xlsx') {
    const blob = new Blob([buffer]);
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    let filename = name + (new Date()).getTime() + '.' + suffix
    link.setAttribute('download', filename)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url);
  }
  
  function handleRoute(){
    // server({
    //   method: "post",
    //   url: "/api/etm/filterProdInConfirmBill/export",
    //   data:{"billIdList":["1680755997126774786"],"serviceType":"FLS080"},
    //   headers: {
    //     "Content-Type":"application/json"
    //   }
    // }).then(res=>{
    //   console.log(res)
    //   _download(res.data,"xx")
    // }).catch(err=>{
    //   console.log(err)
    // })
    navigate("/route3/fff?c=12&d=qwe",{
      state:{
        a:1,b:2
      },
      params: {xx:33}
    })
  }
  return(
    <div>
      <h2 onClick={handleRoute} >RouterDom1</h2>
      <Outlet a={123} />
    </div>
  )
}

export default RouterDom1