const Place = require("../models/Place");

exports.index = (_,res)=> res.redirect("/feed");

exports.feedGet = async (req, res, next) => {
    const places = await Place.find().populate("author");
    res.render("feed", {places})
};


exports.placeDetail = async (req, res, next) => {
const {id} = req.params;
const place = await Place.findById(id).populate("author");
res.render("placeDetail", {
    place,
    coordinates: place.location.coordinates
})
}
//delete
exports.placeDelete = (req, res) => {
    const { id } = req.params;
    Place.findByIdAndDelete(id)
    .then(() => res.redirect("/"))
    .catch(err =>  console.log(err));
  }



  //update
//   exports.placeEdit = (req, res) => {
//     const { id } = req.params;
//     Place.findById(id).then( place => {
//       const config = {
//         title: "Update product",
//       action: `/placeDetail/${id}/edit`,
//       button: "Update"
//       };
//       res.render("createGet", {config, place} );
//     });
//   };
//   exports.placeEditPost = (req, res) => {
//     const {id } = req.params;
//     const { name, location } = req.body;
//     Place.findByIdAndUpdate(
//       id,
//       {
//         $set:  {name, location}
//       },
//       {
//         new: true
//       }
//     )
//     .then(()=> res.redirect(`/place/{place._id}`))
//     .catch(err => console.log(err));
//   }