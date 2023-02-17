const mongoose = require("mongoose")

const connect = () => {
    mongoose
        .connect(
            "mongodb+srv://nicolly:10202810@todolist.yktnrti.mongodb.net/?retryWrites=true&w=majority",
            {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => console.log("Mongodb Connected..."))
        .catch((err) => console.error(err));
}
mongoose.set("strictQuery", true)


module.exports = connect;
