const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require("bcryptjs");


//회원가입
router.post('/join', async (req, res) => {
    const { email, password } = req.body;

    try {
        // email을 비교하여 user가 이미 존재하는지 확인
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ errors: [{ message: "User already exists" }] });
        }

        // user에 name, email, password 값 할당
        user = new User({
            email,
            password,
        });

        // password를 암호화 하기
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        // db에 user 저장
        await user.save();
        // password 객체에서 삭제 
        user.password = undefined;

        res.json(user);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
}
);

//로그인
router.post('/login', async (req, res) => {
    User.findOne({
        email: req.body.email,
    }, (err, user) => {
        if (!bcrypt.compareSync(req.body.password, user.password)) {            
            return res.status(500).json({ message: '패스워드가 틀렸습니다.' });
        }
        
        user.password = undefined;

        if (err) return res.status(500).json({ message: 'error!' });
        else if (user)
            return res.json(user);

        else return res.status(404).json({ message: '유저 없음!' });
    });
});


router.post('/delete', async (req, res) => {
    try {
        await User.remove({
            _id: req.body.id
        });
        res.json({ message: '유저아이디가 삭제되었습니다.' });
    } catch (err) {
        console.log(err);
        res.json({ message: '삭제 실패' });
    }
});

router.post('/update', async (req, res) => {
    try {
        console.log("msg: test")
        await User.updateOne(
            { _id: req.body.id },
            { $set: { name: req.body.name} }
        );
        res.json({ message: '프로필 업데이트가 완료되었습니다' });
    } catch (err) {
        console.log(err);
        res.json({ message: '업데이트 실패.' });
    }
});

// router.get("/logout", (req, res) => {
//     console.log("/logout" + req.sessionID);
//     req.session.destroy(() => {
//         res.json({ message: true });
//     });
// });


module.exports = router;