import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const  useFetch = (sortBy, page) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [list, setList] = useState([]);

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

  const sendQuery = useCallback(async () => {
    try {
      await setLoading(true);
      await setError(false);
      const res = await axios.get(`http://localhost:3000/products?_page=${page}&_limit=9&_sort=${sortBy}`);

      await setList((prev) =>{
        let newArr = [...prev, ...res.data] 
        let sortedArr = handleSort(newArr)
        return[
            ...sortedArr
        ]
      });

      setLoading(false);
    } catch (err) {
      setError(err);
    }
  }, [sortBy, page]);

  useEffect(() => {
    sendQuery(sortBy);
  }, [sortBy, sendQuery, page]);

  return { loading, error, list };
}

export default useFetch;