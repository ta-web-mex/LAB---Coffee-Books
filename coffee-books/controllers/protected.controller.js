const Place = require("../models/Place")

exports.createGet = (_, res)=>{
    res.render("user/create");
}

exports.createPost = async (req,res, next) =>{
    const {_id} = req.user;
    const place = await Place.create({...req.body, author:_id})
    res.redirect("/")
}



//
//delete
exports.placeDelete = (req, res) => {
    const { id } = req.params;
    Place.findByIdAndDelete(id)
    .then(() => res.redirect("/feed"))
    .catch(err =>  console.log(err));
  }
  //update
  exports.placeEdit = (req, res) => {
    const { id } = req.params;
    Place.findById(id).then( place => {
      const config = {
        title: "Update product",
      action: `/placeDetial/${id}/edit`,
      button: "Update"
      };
      res.render("newplace", {config, place} );
    });
  };
  exports.placeEditPost = (req, res) => {
    const {id } = req.params;
    const { name, location, author } = req.body;
    Place.findByIdAndUpdate(
      id,
      {
        $set:  {name, location, author }
      },
      {
        new: true
      }
    )
    .then(()=> res.redirect(`/place/:id`))
    .catch(err => console.log(err));
  }