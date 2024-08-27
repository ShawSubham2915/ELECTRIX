const addToCartModel = require("../../models/cartProduct")

const deleteAddToCartProduct = async(req,res) =>{
    try{
        const currentUserId = req.currentUserId
        const addToCartProductId = req.body._id

        const deleteProduct = await addToCartModel.deleteOne({_id : addToCartProductId})

        res.json({
            message : "product Deleted from Cart",
            data : deleteProduct,
            success : true,
            error : false
        })

    }catch(err){
        res.json({
            message : err?.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = deleteAddToCartProduct