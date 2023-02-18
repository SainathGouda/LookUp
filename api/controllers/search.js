import { db } from "../connect.js";

export const getSearch = (req, res) => {
    const { q } = req.query;
    const query = "SELECT * FROM users WHERE name = LOWER(?)";

    db.query(query, [q], (err, data) => {
        if (err) return res.status(500).json(err);
        //const { password, ...info } = data[5];
        console.log(data);
        return res.json(data);
    });
  };