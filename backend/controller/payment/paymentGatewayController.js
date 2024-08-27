const Razorpay =  require('razorpay');
const crypto =  require("crypto");


// const razorpayInstance = new Razorpay({
//     key_id: process.env.RAZORPAY_KEY_ID,
//     key_secret: process.env.RAZORPAY_SECRET_URL
// })

module.exports.orders = (req, res) => {
    let razorpayInstance = new Razorpay(
        {key_id : process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET_URL  
   })

   var options = {
    amount : req.body.totalPayment * 100,
    currency: "INR",
   };

   razorpayInstance.orders.create(options, function (err, order){
    if(err){
        return res.send({code : 500 , message : 'Server Err',err:err})
    }
        return res.send({ 
            code : 200 , 
            message : 'order created',
            data : order
        })
   });
}

module.exports.verify = (req, res) => {
    let body = req.body.response.razorpay_order_id + "|" + req.body.response.razorpay_payment_id;

    var expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET_URL)
        .update(body.toString())
        .digest('hex');

    if (expectedSignature === req.body.response.razorpay_signature) {
        res.send({ code: 200, message: 'Sign Valid' });
    } else {

        res.send({ code: 500, message: 'Sign Invalid' });
    }
}