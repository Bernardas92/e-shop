import axios from "axios";
import { useSearch } from "../../context/search";
import { useNavigate } from "react-router-dom";
import {BsSearch} from "react-icons/bs"
import "../../index.css";

export default function Search() {
  // hooks
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(`/products/search/${values?.keyword}`);
      // console.log(data);
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form className="d-flex mt-2" onSubmit={handleSubmit}>
      <input
        type="search"
        style={{ borderRadius: "7px", width: "180px", height: "27px"}}
        className="form-control"
        placeholder="Search"
        onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        value={values.keyword}
      />
      <button
        className="d-flex p-2 "
        type="submit"
        style={{border: "none", backgroundColor: "transparent"}}
      >
        <BsSearch style={{color: "red"}} />
      </button>
    </form>
  );
}
