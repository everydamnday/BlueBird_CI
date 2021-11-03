const express = require('express');
const router = express.Router();
const User = require('../models/user');

//회원가입
router.post('/join', async (req, res) => {
    try {
        let obj = { email: req.body.email };

        let user = await User.findOne(obj);
        console.log(user);

        if (user) {
            res.json({
                message: '이메일이 중복되었습니다. 새로운 이메일을 입력해주세요.',
                dupYn: '1'
            });
        } else {
            user = new User(obj);
            await user.save();
            res.json({ message: '회원가입 되었습니다!', dupYn: "0" });
        }
    } catch (err) {
        console.log(err);
        res.json({ message: false });
    }
});

//로그인
router.post('/login', async (req, res) => {
    try {
        //이메일 값으로 아이디가 존재하는지 확인
        await User.findOne({ email: req.body.email }, async (err, user) => {
            if (err) {
                console.log(err);
            } else {
                console.log(user);
                if (user) {
                    //아이디가 존재할 경우 이메일과 패스워드가 일치하는 회원이 있는지 확인
                    console.log(req.body.password);
                }
            }
        });
    }catch (err) {
        console.log(err);
        res.json({ message: '로그인 실패' });
    }
});

// router.get("/logout", (req, res) => {
//     console.log("/logout" + req.sessionID);
//     req.session.destroy(() => {
//         res.json({ message: true });
//     });
// });

router.post('/delete', async (req, res) => {
    try {
        await User.remove({
            _id: req.body._id
        });
        res.json({ message: true });
    } catch (err) {
        console.log(err);
        res.json({ message: false });
    }
});

router.post('/update', async (req, res) => {
    try {
        await User.update({
            _id: req.body._id,
            name: req.body.name
        });
        res.json({ message: true });
    } catch (err) {
        console.log(err);
        res.json({ message: false });
    }
});

router.post('/add', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.json({ message: true });
    } catch (err) {
        console.log(err);
        res.json({ message: false });
    }
});


module.exports = router;