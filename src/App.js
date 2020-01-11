import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  const [view, setview] = useState(1);
  const [arr, setarr] = useState([]);
  const [arr2, setarr2] = useState([]);
  const [sortarr, setsortarr] = useState([]);
  const [num, setnum] = useState("");
  const getarray = async () => {
    let res = await fetch("https://api.myjson.com/bins/gks1o").then(Response =>
      Response.json()
    );
    let data = res.first_array;
    console.log(data);
    setarr(data);
    setsortarr(data);
    setview(2);
  };
  const handlechange = e => {
    let inp = e.target.value;
    console.log(inp, e);
    setnum(inp);
  };
  const handlesubmit = () => {
    let n1 = parseInt(num);
    let index = sortarr.findIndex(obj => obj === n1);
    console.log(index, "ss", sortarr);
    if (n1 > 0 && n1 < 100 && index === -1) {
      arr2.push(n1);
      let abc = [...sortarr];
      abc.push(n1);
      setsortarr(abc);
      console.log(sortarr);
      setnum("");
    }
    if (index >= 0) {
      alert("number is present in list please enter another number");
    }
    if (n1 < 0 || n1 > 100) {
      alert("number is out of range");
    }
  };
  const handlesort = () => {
    let tmp = [...sortarr];
    tmp.sort();
    setsortarr(tmp);
  };
  const handlepost = () => {
    let url = "reacthcode.free.beeceptor.com/my/api/path/";
    let payload = {
      first_array: arr,
      second_array: arr2,
      sorted_array: sortarr.sort()
    };
    fetch(
      url +
        {
          method: "POST",
          body: JSON.stringify(payload)
        }
    ).then(res => {
      if (res.status === 200) {
        alert("successfully submit");
        setview(1);
      }
    });
  };
  if (view === 1) {
    return (
      <div className="container text-center m-3">
        <button className="btn btn-primary" onClick={getarray}>
          GetArray
        </button>
      </div>
    );
  }
  if (view === 2) {
    return (
      <div className="container text-center">
        <button
          className="btn btn-primary m-3"
          onClick={handlepost}
          disabled={sortarr.length < 6}
        >
          InputArray
        </button>
        <div className="row m-5">
          {sortarr.map(obj => (
            <div className="col-2 border bg-success" key={obj} disabled>
              {obj}
            </div>
          ))}
          {sortarr.length < 6 && (
            <input
              className="col-2 border"
              onChange={handlechange}
              value={num}
            />
          )}
        </div>
        {sortarr.length < 6 ? (
          <button onClick={handlesubmit} className="btn btn-primary">
            Add
          </button>
        ) : (
          <button onClick={handlesort} className="btn btn-warning">
            Sort list
          </button>
        )}
      </div>
    );
  }
}

export default App;
