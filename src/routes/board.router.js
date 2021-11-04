const express = require("express");
const router = express.Router();
const Board = require("../models/board");


router.get('/', (req, res) => {
    Board.find()
        .then(items => res.render('index', { items })) // res.send{}
        .catch(err => res.status(404).json({ msg: 'No items found' }));
});

router.post('/add', async (req, res) => {
    try {
        const board = new Board({
            content: req.body.body

        });
        await board.save().then(item => res.redirect('/post'));        
    } catch (err) {
        console.log(err);
        res.json({ message: false });
    }
});

router.post('/delete', async (req, res) => {
    try {
        await Board.remove({
            _id: req.body.id
        });
        res.json({ message: true });
    } catch (err) {
        console.log(err);
        res.json({ message: false });
    }
});

router.post('/update', async (req, res) => {
    try {
        await Board.updateOne(
            { _id: req.body.id },
            {
                $set: {
                    content: req.body.body
                }
            }
        );
        res.json({ message: '게시글이 수정 되었습니다.' });
    } catch (err) {
        console.log(err);
        res.json({ message: false });
    }
});



// router.post("/getBoardList", async (req, res) => {
//     try {
//         const _id = req.body._id;
//         const board = await Board.find({ writer: _id }, null, {
//             sort: { createdAt: -1 }
//         });
//         res.json({ list: board });
//     } catch (err) {
//         console.log(err);
//         res.json({ message: false });
//     }
// });


module.exports = router;