const { ReviewService } = require('../service');

// đã đăng nhập thì được comment, sau sẽ bổ sung tính năng mua hàng mới được comment
exports.createReview = async (req, res) => {
    const data = {
        user_id: req.user.user_id,
        product_id: req.body.product_id,
        comment: req.body.comment,
        rate: Number(req.body.rate)
    };
    try {
        await ReviewService.createReview(data);
        return res.status(200).send('thanh cong');
    } catch (error) {
        console.log('error:', error);
        return res.status(500).send('Lỗi server');
    }
}
