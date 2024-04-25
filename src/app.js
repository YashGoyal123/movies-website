const express = require('express');
const path = require("path");
const bcrypt = require('bcrypt');
const bodyParser = require("body-parser");
const conn = require("./db/conn");
const Register = require("./models/register");
const Movie = require("./models/moviesList")
const app = express();
const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public");
app.use(express.json());
app.use(express.static(static_path));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get("/", (req, res) => {
    res.sendFile(path.join(static_path, "signin.html"));
});
app.get("/home", (req, res) => {
    res.sendFile(path.join(static_path, "home.html"));
});
app.get("/sign", (req, res) => {
    res.sendFile(path.join(static_path, "signin.html"));
});

app.get("/signup", (req, res) => {
    res.sendFile(path.join(static_path, "signup.html"));
});


app.post("/register", async (req, res) => {
    try {
        const firstname = req.body.firstName;
        const lastname = req.body.lastName;
        const email = req.body.emailAddress;
        const phone = req.body.phone;
        const gender = req.body.gender;
        const password = req.body.Password;
        const confirmpassword = req.body.Password;

        if (password !== confirmpassword) {
            return res.status(400).send("Passwords do not match");
        }

        // Hash the password before saving it
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new Register({ firstname, lastname, email, gender, phone, password: hashedPassword });
        const savedUser = await newUser.save();

        console.log(savedUser);

        res.status(201).redirect('/signin.html?alert=User_created_successfully');
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
});

app.get("/logout",(req,res)=>{
    res.redirect('/?alert=logout_success');
})
app.post("/login", async (req, res) => {
    const uemail = req.body.Uemail;
    const upassword = req.body.upassword;

    try {
        const user = await Register.findOne({ email: uemail });
        if (user) {
            // Compare hashed password
            const passwordMatch = await bcrypt.compare(upassword, user.password);
            if (passwordMatch) {
                res.redirect('/home');
                res.send({message:"login successful"});
            } else {
                res.redirect('/?alert=incorrect_credentials');
            }
        } else {
            console.log("User not found");
            res.send({ success: false, message: "User not found" });
        }
    } catch (err) {
        console.error("Error fetching data:", err);
        res.status(500).send("An error occurred");
    }
});


app.listen(port, () => {
    console.log(`Server is running at port number ${port}`);
});


app.post("/play-movie", async (req, res) => {
    try {
        const movie = await Movie.findOne();
        if (movie) {
            res.redirect(movie.movie_url);
        } else {
            console.error('No movies found');
            res.status(404).send('No movies found');
        }
    } catch (error) {
        console.error('Failed to fetch movie:', error);
        res.status(500).send('Failed to fetch movie');
    }
});


app.get('/movies_list', async (req, res) => {
    try {
        const movieList = await Movie.find();
            res.json(movieList);
        }
        catch (error) {
        console.error('Failed to find movies:', error);
        res.status(500).json({ success: false, error: 'Failed to find movies' });
    }
});
app.get("/logout", (req, res) => {
    res.redirect('/?alert=logout_success');
});


app.post("/add-to-watchlist", async (req, res) => {
    const {uemail } = req.body.Uemail;

    try {
        const user = await user.findById(uemail);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        user.watchlist.push(movieId);
        await user.save();

        res.status(200).json({ success: true, message: "Movie added to watchlist successfully" });
    } catch (error) {
        console.error("Error adding movie to watchlist:", error);
        res.status(500).json({ success: false, error: "Failed to add movie to watchlist" });
    }
});
app.delete('/delete-account', async (req, res) => {
    const userId = req.body.userId;
    try {
        const deletedUser = await Register.findByIdAndDelete(userId);
        
        if (deletedUser) {
            res.status(200).json({ success: true, message: 'User account deleted successfully' });
        } else {
            res.status(404).json({ success: false, message: 'User not found' });
        }
    } catch (error) {
        console.error('Error deleting user account:', error);
        res.status(500).json({ success: false, error: 'An error occurred while deleting user account' });
    }
});

