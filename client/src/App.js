import logo from './logo.svg';
import './App.css';
import Products from './components/products'
import axios from 'axios'

function App () {
  // const [list, setList] = useState([])
  // const [pageNo, setPageNo] = useState(1)


  // const fetchData = async () => {
  //   await axios.get(`http://localhost:3000/products?_page=${pageNo}&_limit=9`)
  //   .then(({data})=> setList((prev) => prev.concat(data)))
  //   // .then((data) => console.log(data))
  //   // .then((data)=>setList(prev => {
  //   //     let a = [...prev, ...data]
  //   //     return [...new Set(a)]
  //   // }))
  //   setPageNo((prev) => prev + 1) 
  // }

  // useEffect(()=>{
  //   console.log('pageNO', pageNo)
  // },[pageNo])

  // useEffect(()=>{
  //   console.log('list', list)
  // },[list])

  // useEffect(()=>{
  //   fetchData()
  // },[])

  return (
    <div>
      <Products />
    </div>
  );
}

export default App;
