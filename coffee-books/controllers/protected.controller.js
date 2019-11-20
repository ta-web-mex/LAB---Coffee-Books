const Place = require("../models/Place")

exports.createGet = (_, res)=>{
    res.render("user/create");
}

exports.createPost = async (req,res, next) =>{
    const {_id} = req.user;
    const place = await Place.create({...req.body, author:_id})
    res.redirect("/")
}

  exports.placeEdit = (req, res) => {
    const { id } = req.params;
    Place.findById(id).then( place => {
      const config = {
        title: "Update product",
      action: `/place/:id/edit`,
      button: "Update"
      };
      res.render("createGet", {config, place} );
    });
  };
  exports.placeEditPost = (req, res) => {
    const {id } = req.params;
    const { name, location } = req.body;
    Place.findByIdAndUpdate(
      id,
      {
        $set:  {name, location}
      },
      {
        new: true
      }
    )
    .then(()=> res.redirect(`/place/{place._id}`))
    .catch(err => console.log(err));
  }