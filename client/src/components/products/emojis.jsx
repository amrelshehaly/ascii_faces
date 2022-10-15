import React , {useState, useCallback, useRef, useEffect} from 'react'
import useFetch from "./useFetch";
import './style.css'

const Emojis = ()  => {
    const [sortBy, setSortBy] = useState("");
    const [page, setPage] = useState(1);
    const { loading, error, list } = useFetch(sortBy, page);
    const loader = useRef(null);
  
    const handleChange = (e) => {
        console.log(e.target.value)
        setSortBy(e.target.value);
    };

    const handleDate = (rawDate) => {
        let currentDay = new Date();
        let date = new Date(rawDate);
        let result = currentDay - date;
        let resultDays = Math.round(result / (1000 * 3600 * 24));
    
        // let resultWeeks = Math.round(result / (1000 * 3600 * 24 * 7))
    
        if (resultDays < 7) {
          return `${resultDays} days ago`;
        } else {
          return `Date ${date.toDateString()}`;
        }
    };
  
    const handleObserver = useCallback((entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        setPage((prev) => prev + 1);
      }
    }, []);
  
    useEffect(() => {
      const option = {
        root: null,
        rootMargin: "20px",
        threshold: 0.1
      };
      const observer = new IntersectionObserver(handleObserver, option);
      if (loader.current) observer.observe(loader.current);
    }, [handleObserver]);
  
    return (
      <div className="container">
        {/* <h1 style={{textAlign:'center'}}>Emoji Products</h1> */}
       {loading && <div className='loading'></div>}
       <div className='filterBtns'>
        <h4>Sort By:</h4>
        <button className='filterBtn' value='price' onClick={handleChange} >Price</button>
        <button className='filterBtn' value='size' onClick={handleChange} >Size</button>
        <button className='filterBtn' value='id' onClick={handleChange} >ID</button>
       </div>
        <div className="grid-container">
          {list.map((val, idx) => {
            return (
              <div className="grid-item" key={idx}>
                <div>
                  <div style={{ fontSize: val.size }}>{val.face}</div>
                  <div>Price ${(parseFloat(val.price) / 100).toFixed(2)}</div>
                  <div style={{ fontSize: "15px" }}>{handleDate(val.date)}</div>
                </div>
              </div>
            );
          })}
        </div>
        {loading && <p>Loading...</p>}
        {error && <p>Error!</p>}
        <div ref={loader} />
      </div>
    );
  }

export default Emojis;