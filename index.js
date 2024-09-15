import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let data = [];
let postIdCounter = 1;  // To assign unique IDs to posts

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/create", (req, res) => {
    res.render("create");
});

app.post("/post", (req, res) => {
    let newPost = {
        id: postIdCounter++,
        Auther_name: req.body.auther_name,
        title: req.body.topic,
        content: req.body.content
    };

    data.push(newPost);
    console.log(data);

    res.redirect("/view");
});

app.get("/view", (req, res) => {
    res.render("view", { data: data });
});

// Edit route to render the edit page
app.get("/edit/:id", (req, res) => {
    const postId = parseInt(req.params.id);
    const postToEdit = data.find(post => post.id === postId);
   console.log(postToEdit);
    res.render("edit", { post: postToEdit });
});

// Update route to handle form submission for editing a post
app.post("/edit/:id", (req, res) => {
    const postId = parseInt(req.params.id);
    const postIndex = data.findIndex(post => post.id === postId);
    let newPost={
        id: postId,
        Auther_name:req.body.auther_name || data[postIndex].Auther_name,
        title:req.body.topic || data[postIndex].title,
        content:req.body.content || data[postIndex].content
    };
    console.log(`Updating Post ${postId}`);
    //Update the actual data with
    // Update the post with the new data
    data[postIndex]=newPost;
    
    res.redirect("/view");
});

// Delete route to handle post deletion
app.post("/delete/:id", (req, res) => {
    const postId = parseInt(req.params.id);
    data = data.filter(post => post.id !== postId);
console.log(data);
    res.redirect("/view");
});
app.get("/contact",(req,res)=>{
    res.render( "contact");
});

app.listen(port, () => {
    console.log(`Listening on port http://localhost:${port}`);
});
