const router = require("express").Router();
const db = require("../../models");

router.get("/",(req,res) =>{
//console.log('inside router get')
// db.Workout.find({})
// .then(dbWorkouts => {
//   //  console.log('json:' + dbWorkouts)
//     res.json(dbWorkouts);
//   })
//   .catch(err => {
//       console.log("error:" +err)
//     res.status(400).json(err);
//   });
db.Workout.aggregate( [
    {
        $addFields: {
        
          totalDuration: { $sum : '$exercises.duration' }
        }
    }
    ])

.then(dbWorkouts => {
  //  console.log('json:' + dbWorkouts)
    res.json(dbWorkouts);
  })
  .catch(err => {
      console.log("error:" +err)
    res.status(400).json(err);
  });
});
module.exports = router;