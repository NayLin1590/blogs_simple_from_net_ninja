let express = require('express');

let mongoose = require('mongoose');

let Blog = require('./models/blog');

let app = express();    

let path = require('path');
const { result } = require('lodash');
const { title } = require('process');

let dbURL = 'mongodb://arizona:arizona15@personalblog-shard-00-00.1jthy.mongodb.net:27017,personalblog-shard-00-01.1jthy.mongodb.net:27017,personalblog-shard-00-02.1jthy.mongodb.net:27017/Personal_Blog?ssl=true&replicaSet=atlas-12k14p-shard-0&authSource=admin&retryWrites=true&w=majority'
mongoose.connect(dbURL,{useNewUrlParser:true , useUnifiedTopology:true})
    .then((result)=>app.listen(3000,()=>console.log("Keep up Good rate")))
    .catch((err) =>console.log(err));

app.use(express.static(path.join('views')));


// registe for view engine 
app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}))

app.get('/add-blog',(req,res)=>{
    let blog = new Blog({
        title:'Travel to Bagan',
        snippet:'Bagan (Burmese: ပုဂံ; MLCTS: pu.gam, IPA: [bəɡàɰ̃]; formerly Pagan) is an ancient city.',
        body:'Bagan (Burmese: ပုဂံ; MLCTS: pu.gam, IPA: [bəɡàɰ̃]; formerly Pagan) is an ancient city and a UNESCO World Heritage Site located in the Mandalay Region of Myanmar.[1] From the 9th to 13th centuries, the city was the capital of the Pagan Kingdom, the first kingdom that unified the regions that would later constitute modern Myanmar. During the kingdom \'s height between the 11th and 13th centuries, 4,446 Buddhist temples, pagodas and monasteries were constructed in the Bagan plains alone, of which the remains of 3,822 temples and pagodas still survive to the present day.'
    });
    blog.save()
        .then(result => res.send(result))
        .catch(err=>console.log(err))
});

// app.get('/all-blogs',(req,res)=>{
//     Blog.find()
//         .then(result => res.send(result))
//         .catch(err => console.log(err));
// });

// app.get('/single-blog',(req,res)=>{
//     Blog.findById('5f5f0a0644ab5f088465973d')
//         .then(result=> res.send(result))
//         .catch(err =>console.log(err))
// })

app.get('/',(req,res)=>{
    res.redirect('/blogs');
})

app.get('/blogs',(req,res)=>{
    //res.send("<h2>Hello World</h2>");
   // res.sendfile('./Views/Index.html',{root:__dirname});
//    const blogs = [
//        {title:'Travel to Bagan(an ancient city)' ,photo : 'image/Myanmar.jpg', snippet : 'Bagan (Burmese: ပုဂံ; MLCTS: pu.gam, IPA: [bəɡàɰ̃]; formerly Pagan) is an ancient city and a UNESCO World Heritage Site located in the Mandalay Region of Myanmar.[1] From the 9th to 13th centuries, the city was the capital of the Pagan Kingdom, the first kingdom that unified the regions that would later constitute modern Myanmar. During the kingdom \'s height between the 11th and 13th centuries, 4,446 Buddhist temples, pagodas and monasteries were constructed in the Bagan plains alone, of which the remains of 3,822 temples and pagodas still survive to the present day.'},
//        {title:'Travel to Kalaw( a hill town )',snippet:'The town was popular with the British during colonial rule. Kalaw is the main setting of the novel "The Art of Hearing Heartbeats" by Jan-Philipp Sendker. The hill station is located at an elevation of 1310 metres, 50 km from the Inle lake. Kalaw is famous for hiking and trekking.[1] Many trekking trails ranging from nearby places to Inle Lake and Pindaya.[2] The town still feels like a high-altitude holiday resort – the air is cool, the atmosphere is calm and the tree-lined streets still contain a smattering of colonial-era architecture – while the surrounding hills are fine for relatively easy day or overnight treks to Danu, Danaw, Palaung, Pa-O and Taung Yo villages.'}
//     ];

    Blog.find().sort({createdAt :-1})
        .then(result =>  res.render('index',{title : 'Home',blogs : result}))
        .catch(err => console.log(err));

});

app.post('/blogs',(req,res)=>{
    // console.log(req.body);
    let blog = new Blog(req.body);
    blog.save()
        .then(result => res.redirect("/blogs"))
        .catch(err => console.log(err));
});

app.get('/blogs/:id',(req,res)=>{
    let id = req.params.id;
    Blog.findById(id)
        .then(result => res.render('detail',{title:'Detail',blogDetail : result}))
        .catch(err => console.log(err));
});

app.delete('/blogs/:id',(req,res)=>{
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then(result =>{
            res.json({redirect:'/blogs'});
        })
        .catch(err =>{
            console.log(err);
        })
})

app.get('/about',(req,res)=>{
   // res.sendfile('./Views/About.html',{root:__dirname});
   res.render('about',{title:'About'});
});
app.get('/create',(req,res)=>{
    //res.redirect('/about');
    res.render('create',{title:'CreateBlog'});
});
app.get('/allBlog',(req,res)=>{
    res.render('allBlog',{title:'AllBlogs'})
})
app.use((req,res)=>{
    //res.sendfile('./Views/Error.html',{root:__dirname});
    res.status(404).render('error',{title:'PageNotFound'});
});