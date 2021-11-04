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
            return res
                .status(400)
                .json({ errors: [{ msg: "User already exists" }] });
        }

        // user에 name, email, password 값 할당
        user = new User({
            email,
            password,
        });

        // password를 암호화 하기
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);




        await user.save(); // db에 user 저장
        //await delete user.password; // password 객체에서 삭제 
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

        if (err) return res.status(500).json({ message: '에러!' });
        else if (user)
            return res.status(200).json(user);

        else return res.status(404).json({ message: '유저 없음!' });
    });
});


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
        await User.updateOne({
            _id: req.body._id,
            name: req.body.name
        });
        res.json({ message: true });
    } catch (err) {
        console.log(err);
        res.json({ message: false });
    }
});

router.get("/logout", (req, res) => {
    console.log("/logout" + req.sessionID);
    req.session.destroy(() => {
        res.json({ message: true });
    });
});


module.exports = router;