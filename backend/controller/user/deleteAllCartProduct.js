const addToCartModel = require("../../models/cartProduct")

const deleteAllCartProduct = async(req,res) =>{
    try{
       

        const deleteProduct = await addToCartModel.deleteMany()

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

module.exports = deleteAllCartProduct