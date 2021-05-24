const fs = require('fs');
const db = require('../database/database');
const { connexionUser } = require('./users');
const connection = db.databaseConnect();
const jwt = require('jsonwebtoken');

exports.createPost = (req, res) => {
    try{
        // Récupération de l'url de l'image
        let imageUrl;
        if(req.file){
            imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
        } else {
            imageUrl = null;
        }
        const userId = req.body.userId;
        const comment = req.body.comment;
        if(comment == null  && imageUrl == null){
            return res.status(400).json({message: 'Il faut remplir au moins un champ'})
        }
        const sql = 'INSERT INTO post (user_id, comment, imageurl) VALUES ?';
        const values = [[userId, comment, imageUrl]]
        connection.query( sql, [values], function(err, result){
            if (err) throw err;
            console.log(result);
            return res.status(200).json({message: 'Post créé'})
        });
    }
    catch(err){
        res.status(400).json({err})
    }
};

exports.getLikesOfEachPosts = () => {
    return Promise.all(posts.map(post => {
        const sqllikes = `SELECT (SELECT COUNT(*) FROM Likes WHERE (post_id=${post.post_id} AND rate=1)) AS LikesNumber, (SELECT COUNT(*) FROM Likes WHERE(post_id=${post.post_id} AND rate=-1)) AS DislikesNumber, (SELECT rate FROM Likes WHERE (post_id = ${post.post_id} AND user_id = ${userId})) AS UserReaction`;
        return new Promise((resolve, reject) => {
            connection.query(sqllikes, function(error, result){
                if (error) reject(error);
                const likes = result[0].LikesNumber;
                const disLikes = result[0].DislikesNumber;
                const userReaction = result[0].UserReaction;
                resolve({ ...post, likes: likes, disLikes: disLikes, userReaction: userReaction})
            })
        })
        })
    ) 
}

exports.getPosts = (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        // On récupère les posts et les likes correspondant
        const data = new Promise(function(resolve, reject) {
            connection.query(`SELECT lastName, firstName, comment, imageurl, post_date, post_id, id FROM users JOIN post ON users.id = post.user_id ORDER BY post_id DESC`, function(err, result){
                if (err) throw err;
                const posts = result
                resolve(posts)
            })
        });
        data.then(function(posts){
            return Promise.all(posts.map(post => {
                const sqllikes = `SELECT (SELECT COUNT(*) FROM Likes WHERE (post_id=${post.post_id} AND rate=1)) AS LikesNumber, (SELECT COUNT(*) FROM Likes WHERE(post_id=${post.post_id} AND rate=-1)) AS DislikesNumber, (SELECT rate FROM Likes WHERE (post_id = ${post.post_id} AND user_id = ${userId})) AS UserReaction`;
                return new Promise((resolve, reject) => {
                    connection.query(sqllikes, function(error, result){
                        if (error) reject(error);
                        const likes = result[0].LikesNumber;
                        const disLikes = result[0].DislikesNumber;
                        const userReaction = result[0].UserReaction;
                        resolve({ ...post, likes: likes, disLikes: disLikes, userReaction: userReaction})
                    })
                })
                })
            ) 
        }).then(data => {
            console.log(data)
            res.status(200).json(data)
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({error})
    }
    
};

exports.deletePost = (req, res) => {
    try {
        const postId = req.params.id;
        const sqlGet = 'SELECT imageurl FROM post WHERE post_id = ?';
        const sqlDlt = 'DELETE FROM post WHERE post_id = ?';
        connection.query(sqlGet, postId, function(err, result){
            if(err)console.log(err);
            const fileUrl = result[0].imageurl;
            if(fileUrl == null){
                console.log('pas dimage à suppr')
                deleteOne()
            } else if(fileUrl !== null){
                console.log('suppression image')
                const imageUrl = result[0].imageurl.split('/images/')[1]
                fs.unlink(`images/${imageUrl}`, () => {
                    deleteOne()
                })
            }
        })
        const deleteOne = () => {
            connection.query(sqlDlt, postId, function(err, result){
                if(err) throw err;
                return res.status(200).json({message: 'Post supprimé'});
            })
        }
    } catch(err){
        res.status(400).json({err})
    } 
};

exports.getOnePost = (req, res) => {
    try{
        const postId = req.params.id;
        console.log('recuperation dun seul post' + postId)
        const sql = "SELECT users.firstName, users.lastName, post.comment, post.imageurl FROM `post` INNER JOIN users ON post.user_id = users.id WHERE post.post_id = ? "
        connection.query(sql, postId, function(err, result){
            if(err) throw err;
            return res.status(200).json({result});
        })
    } catch(err){
        res.status(400).json({err})
    }
};

exports.likePost = (req, res) => {
    try {
        const sql = 'INSERT INTO `Likes` (rate, user_id, post_id) VALUES ?';
        const postId = JSON.parse(req.params.id);
        const userId = JSON.parse(req.body.userId);
        const like = req.body.like;
        console.log(like)
        const values = [[like, userId, postId]]
        connection.query(sql, [values], function(err, result){
            if(err) throw err;
            return res.status(200).json(result)
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json(error)
    }
}