import {useParams,useLocation,useSearchParams,useLoaderData} from "react-router-dom"
function RouterDom3(props){
  let params = useParams()
  let lo = useLocation()
  let loader = useLoaderData()
  console.log(loader)
  let {search,setSearch} = useSearchParams()
  console.log(params)
  console.log(lo)
  // console.log(search.get("c"))
  return(
    <div>
      <h2>RouterDom3</h2>
    </div>
  )
}

export default RouterDom3