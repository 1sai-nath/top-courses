import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Filter from "./components/Filter.jsx";
import Cards from "./components/Cards.jsx";
import { apiUrl, filterData } from "./data.jsx";
import { toast } from "react-toastify";
import Spinner from "./components/Spinner.jsx";

const App = () => {
  const [courses, setCourses] = useState(null);
  const [loading, Setloading] = useState(true);
  const [category, setCategory] = useState(filterData[0].title);

  async function fetchData() {
    Setloading(true);
    try {
      const response = await fetch(apiUrl);
      const output = await response.json();

      setCourses(output.data);
      // save data to variable
    } catch (error) {
      toast.error("something went wrong");
    }
    Setloading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-600">
      <div>
        <Navbar />
      </div>
      <div className="bg-slate-600">
        <div>
          <Filter
            filterData={filterData}
            category={category}
            setCategory={setCategory}
          />
        </div>
        <div className="w-11/12 max-w-[1200px] mx-auto flex flex-wrap justify-center items-cente min-h-[50vh]">
          {loading ? <Spinner /> : <Cards courses={courses} category={category} />}
        </div>
      </div>
    </div>
  );
};

export default App;
