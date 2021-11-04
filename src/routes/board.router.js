const express = require("express");
const router = express.Router();
const Board = require("../models/board");
const User = require("../models/user");


router.get('/', (req, res) => {
    Board.findOne({body: })
        .then(board => res.json(board)) 
        .catch(err => res.status(404).json({ msg: 'DB not found post' }));
});

router.post('/add', async (req, res) => {
    try {
    
        const board = new Board({
            userId: req.body.id, //passport id 해야 가능....
            body: req.body.body
        });

        await board.save();    
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
        res.json({ message: '삭제 완료' });
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
                    body: req.body.body
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