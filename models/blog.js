 const { concat } = require('lodash');
let mongoose = require('mongoose');

 let Scheme = mongoose.Schema;

 const blogScheme = new Scheme({
     title :{
         type:String,
         required:true
     },
     snippet :{
         type:String,
         required:true
     },
     body :{
         type:String,
         required:true
     }
 },{timestamps:true});

 const Blog = mongoose.model('Blog',blogScheme);

 module.exports = Blog;