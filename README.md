//  // redux -> 


// feature ->
// id-slice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const idSlice = createSlice({
  name: "id-slice",
  initialState: initialState,
  reducers: {
    setIds: (_, action) => {
      const { type } = action.payload;
      switch (type) {
        case "set": {
          const { payload } = action.payload;
          return payload;
        }
        case "reset": {
          return initialState;
        }
        default: {
          return initialState;
        }
      }
    },
  },
});

export const { setIds } = idSlice.actions;
export default idSlice.reducer;



// appProvider.js ->

import { Provider } from "react-redux";
import { store } from "./store";

const AppProvider = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);

export default AppProvider;


// store ->

import { useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import idSlice from "./feature/id-slice";

export const store = configureStore({
  reducer: {
    idSlice,
  },
});

export const useAppState = useSelector;



// index.js (Main)
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AppProvider from "./redux/appProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);



// Data -> (main) ->


import { React, useEffect, useState } from "react";
import { Trash2, Pencil } from "lucide-react";
import { useDispatch } from "react-redux";
import { setIds } from "../redux/feature/id-slice";

export const Data = ({ func2 }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/auth");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleClickDelete = async (_id) => {
    const data = {
      _id: _id,
    };

    try {
      const response = await fetch(`http://localhost:3001/api/auth/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      } else {
        alert("Deleted");
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      {Array.isArray(data) &&
        data.map((item) => (
          <div className="datacontainer" key={item._id}>
            <span>{item.data}</span>

            <button
              type="button"
              style={{ backgroundColor: "rgb(167 167 219)", border: 0 }}
              onClick={() => handleClickDelete(item._id)}
            >
              <Trash2 id="lucide1" />
            </button>
            <button
              type="button"
              style={{ border: 0 }}
              onClick={() => {
                // localStorage.setItem("_id",item._id);
                // alert(item._id);
                dispatch(setIds({ type: "set", payload: item._id }));
                // for display confirm dialog
                func2();
              }}
            >
              <Pencil id="lucide2" />
            </button>
          </div>
        ))}
    </>
  );
};





// Main (main) ->

import React, { useEffect, useState } from "react";
import { Todo } from "./todo";
import Cancel from "./cross1.png";
import { Confirmation } from "./Confirmation.jsx";
import { useSelector } from "react-redux";
import { useAppState } from "../redux/store.js";

export const Main = () => {
  debugger;
  const [message, setMessage] = useState("");
  const [visibility, setVisibility] = useState("hidden");

  const val = useAppState((state) => state.idSlice);

  useEffect(() => {
    console.log(val);
  }, [val]);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const del = () => {
    setMessage("");
  };

  const Add = async (e) => {
    e.preventDefault();

    try {
      const data1 = { data: message };
      const response = await fetch("http://localhost:3001/api/auth/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data1),
      });

      if (!response.ok) {
        alert("not added");
      } else {
        // alert("added successfully");
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleConfirm = () => {
    setVisibility("visible");
    // const val = localStorage.getItem("key");
  };

  const handleCancel = () => {
    setVisibility("hidden");
  };

  const handleYes = async () => {
    debugger;
    // alert(val);
    const data = {
      _id: val,
      data: "updated11",
    };

    const response = await fetch("http://localhost:3001/api/auth/update", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok" + response.statusText);
    } else {
      alert("done");
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <>
      <div className="mainContainer">
        <div className="successnotify">{/* Success notify */}</div>
        <div className="failnotify">{/* Fail notify */}</div>
        <div className="content">
          <input
            className="box"
            type="text"
            onChange={handleChange}
            value={message}
          />
          {message && (
            <img
              id="cancel"
              style={{ visibility: "visible" }}
              src={Cancel}
              alt="cancel"
              onClick={del}
            />
          )}

          <button id="button" onClick={Add}>
            Add
          </button>
          <div style={{ visibility: visibility }}>
            <Confirmation handleYes={handleYes} handleCancel={handleCancel} />
          </div>
          <div className="todo">
            <Todo func={handleConfirm} />
          </div>
        </div>
      </div>
    </>
  );
};






