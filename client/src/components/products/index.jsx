import React, { useEffect, useState, useCallback, useRef } from "react";
import "./style.css";
import axios from "axios";

const Product = () => {
  const [list, setList] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [loador, setLoader] = useState(false);
  const [sortBy, setSortBy] = useState('')
  let paginate = 1;
  //   const [goingUp, setGoingUp] = useState(false);

  const ref = useRef();

  const handleSort = (arr) => {
    if(sortBy){
      const sorted =  [...arr].sort(function (a, b) {
        if (a[sortBy] > b[sortBy]) return 1;
        if (a[sortBy] < b[sortBy]) return -1;
        return 0;
      });
      return sorted
    }else{
      return arr
    }    
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

  const fetchData = async () => {
    await axios
      .get(`http://localhost:3000/products?_page=${paginate}&_limit=9&_sort=${sortBy}`)
      .then(async({ data }) => {
        console.log('data', data)
        let newArray = [...list].concat(data)
        console.log('New Array',newArray)
        return handleSort(newArray) 
      }).then((res)=>{
        setList((prev) => prev.concat(res))
      })
      setLoader(false);
      paginate += 1;
  };

  const handleloadMore = useCallback(async (e) => {
    if (
      window.innerHeight + e.target.documentElement.scrollTop >=
      e.target.scrollingElement.scrollHeight
    ) {
      // Do load more content here!
      console.log("loadmore");
      await fetchData();
      setLoader(true);
    }
  }, []);

  useEffect(() => {
    const div = ref.current;
    console.log("useEffect");
    fetchData();
    // if (div) {
    const listner = (e) => handleloadMore(e);
    window.addEventListener("scroll", listner, { passive: true });
    return () => {
      document.removeEventListener("scroll", listner);
      //   };
    };
  }, []);

  useEffect(() => {
    console.log("pageNO", pageNo);
  }, [pageNo]);

  // useEffect(()=>{
  //     handleloadMore()
  // })

  useEffect(()=>{
    const a =  handleSort([...list])
    setList([...a])
  },[sortBy])

  return (
    <div>
      <div>
        <button value='price' onClick={(e) => setSortBy(e.target.value)}>Sort by price</button>
        <button value='id' onClick={(e) => setSortBy(e.target.value)}>Sort by id</button>
        <button value='size' onClick={(e) => setSortBy(e.target.value)}>Sort by size</button>
      </div>
        <div className="grid-container" ref={ref}>
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
    </div>
  );
};

export default Product;
