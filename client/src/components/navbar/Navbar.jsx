import "./navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CloseIcon from '@mui/icons-material/Close';
import Table from "../table/Table";
import { Link, useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";
import { makeRequest } from "../../axios";
import { useState, useContext, useEffect } from "react";
import axios from "axios";

const Navbar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const [err, setErr] = useState("");
  const [search, setSearch] = useState(false);

  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
      const fetchData = async () => {
          const res = await makeRequest.get(`/searchs?q=${query}`);
          setData(res.data);
      };
      if (query.length === 0 || query.length > 2) fetchData();

  }, [query]);

  const handleLogout = async (e) => {
    e.preventDefault();
  
    try {
      await axios.post("http://localhost:8800/api/auth/logout");
      navigate("/login");
    } catch (err) {
      setErr(err.response.data);
    }
  };

  const handleClick = () => {
    setSearch(false);
    setQuery("");
  }

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>LookUp</span>
        </Link>
        <HomeOutlinedIcon />
        {darkMode ? (
          <WbSunnyOutlinedIcon onClick={toggle} />
        ) : (
          <DarkModeOutlinedIcon onClick={toggle} />
        )}
        <GridViewOutlinedIcon />
        <div className="search">
          <div className="icon">
            {search ? <CloseIcon onClick={handleClick}/> : <SearchOutlinedIcon/>}
            <input 
              type="text" 
              placeholder="Search..."
              value={query} 
              onClick={() => setSearch(true)}
              onChange={(e) => setQuery(e.target.value.toLowerCase())}
            /> 
          </div>
          <div className="func">
            {search && <Table data={data} setSearch={setSearch} setQuery={setQuery}/>}
          </div>
        </div>
      </div>
      <div className="right">
        <PersonOutlinedIcon />
        <EmailOutlinedIcon />
        <NotificationsOutlinedIcon />
        <div className="user">
          <img
            src={"/upload/" + currentUser.profilePic}
            alt=""
          />
          <span onClick={handleLogout}>logout</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;