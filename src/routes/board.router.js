const express = require("express");
const router = express.Router();
const Board = require("../models/board");
const User = require("../models/user");


router.get('/', (req, res) => {
    Board.find()
        .then(board => res.json(board)) 
        .catch(err => res.status(404).json({ message: 'post를 찾을수 없습니다.' }));
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
        res.json({ message: 'post 저장에 실패했습니다.' });
    }
});

router.post('/delete', async (req, res) => {
    try {
        await Board.remove({
            _id: req.body.id
        });
        res.json({ message: 'post 삭제 완료' });
    } catch (err) {
        console.log(err);
        res.json({ message: 'post가 삭제되지 않았습니다.' });
    }
});

router.post('/update', async (req, res) => {
    try {
        await Board.updateOne(
            { _id: req.body.id },
            { $set: { body: req.body.body } }
        );
        res.json({ message: 'post 수정 완료.' });
    } catch (err) {
        console.log(err);
        res.json({ message: 'post가 수정되지 않았습니다.' });
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