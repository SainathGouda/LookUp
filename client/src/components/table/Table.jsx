import "./table.scss";
import { Link } from "react-router-dom";

const Table = ({ data,setSearch,setQuery }) => {
  const handleClick = () => {
    setQuery("");
    setSearch(false);
  }

    return (
      <table>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>  
              <Link
                to={`/profile/${item.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
                onClick={handleClick}
              >
                <td className="name">{item.name}</td>
              </Link>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  export default Table;