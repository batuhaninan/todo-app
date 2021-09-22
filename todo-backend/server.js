require("dotenv").config();
const express = require('express');
const cors = require('cors');

const app = express();

const PORT = process.env.NODE_DOCKER_PORT || 8080;

var corsOptions = {
    origin: [process.env.CLIENT_ORIGIN || "http://localhost:8081", "http://localhost:3000"]
}

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const db = require("./models");
db.sequelize.sync();

app.get("/", (req, res) => {
    res.json({ message: "Main page"})
});


require("./routes/user.routes")(app);
require("./routes/todo.routes")(app);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
})



