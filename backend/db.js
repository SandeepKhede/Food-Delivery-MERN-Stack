const mongoose = require("mongoose");
const mongoUrl =
  "mongodb+srv://gofood:mern123@cluster0.ebby9pk.mongodb.net/gofoodmern?retryWrites=true&w=majority";

const mongoDB = async () => {
  await mongoose.connect(mongoUrl, { useNewUrlParser: true });
  console.log("conn mogodb");
  const fetched_data = await mongoose.connection.db.collection("food_items");
  //   console.log(fetched_data)
  fetched_data.find({}).toArray(async function (err, data) {
    const foodCategory = await mongoose.connection.db.collection("food_category");
    foodCategory.find({}).toArray(function (err, catData) {
      if (err) console.log(err);
      else {
        global.food_items = data;
        global.foodCategory = catData;
      }
    });
    // if(err)console.log(err)

    // else {
    //   global.food_items = data;
    //   console.log(global.food_items)
    // }
  });
};

module.exports = mongoDB();
