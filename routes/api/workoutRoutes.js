const router = require("express").Router();
const db = require("../../models");

//add route to fetch all the workout from the workout collection during page load" 
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
// Aggregate function used to sum and return as 'totalDuration' along with all the field values from the workout collection 
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

// create a new excercise in workout collection 

router.post("/",({body},res) =>{
  
  db.Workout.create(body)
 
  .then(dbWorkouts => {
    res.json(dbWorkouts);
  })
  .catch(err => {
    res.json(err);
  });
});
// Update excersise in workout collection
    router.put("/:id",(req,res) =>{
             
         db.Workout.findOneAndUpdate({
            _id: req.params.id
        }, {
            $push: {
                exercises: req.body
            }
        }, {
            new: true
        })
        
        .then(dbWorkouts => {
          //  console.log('json:' + dbWorkouts)
            res.json(dbWorkouts);
          })
          .catch(err => {
              console.log("error:" +err)
            res.status(400).json(err);
          });
        });


// Route used to display as chart and graph inn stats page
router.get("/range",(req,res) =>{

  db.Workout.aggregate( [
      {
          $addFields: {
          
            totalDuration: { $sum : '$exercises.duration' }
          }
      }
      ])
      .sort({'day':1}).limit(7)
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