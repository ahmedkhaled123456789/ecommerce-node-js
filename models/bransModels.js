const mongoose = require("mongoose");

//   create schema

const brandSchema = new mongoose.Schema(  {
  name: {
    type: String,
    required: [true, 'brand required'],
    unique: [true, 'brand must be unique'],
    minlength: [3, 'Too short brand name'],
    maxlength: [32, 'Too long brand name'],
  },
  // A and B => shopping.com/a-and-b
  slug: {
    type: String,
    lowercase: true,
  }, 
  image: String,
},
{ timestamps: true });
  

const setImageUrl=(doc) =>{
  if(doc.image){
    const imageUrl= `${process.env.BASE_URL}/brands/${doc.image}`

    doc.image = imageUrl
  }
}
brandSchema.post('init', (doc) =>{
  setImageUrl(doc)
})

brandSchema.post('save', (doc) =>{
  setImageUrl(doc)

})



const brandModel = mongoose.model("brand", brandSchema);
module.exports = brandModel;
