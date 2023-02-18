import "./news.scss";
import { useState } from "react";

const News = () => {
    const [articles, setArticle] = useState([]);

    const getArticles = async (e) => {
        //e.preventDefault();

        let res = await fetch("https://newsapi.org/v2/everything?q=random&apiKey=26bc3cdce1a24c9891e83e112afe88b0");
        let result = await res.json();
        let data = Array.from(result);

        setArticle(data);
    };

    getArticles();

    return(
        <div className="news">
        
        </div>
    );
}

export default News;