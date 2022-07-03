const express=require('express');
const mongoose = require('mongoose');
const app=express();
app.use(express.json());
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
main();
const ProductSCH= new mongoose.Schema({
    shops:[Number],
    weight:Number,
    country:String,
    name:String,
    category:String,
    type:String,
    size:String,
    price:[Number],
    material:String,
    link:[String],


});
const UserSCH= new mongoose.Schema({
    username:String,
    pass:String,
    email:String,
    name:String,
    mobile:String,
});
const SellerSCH= new mongoose.Schema({
    email:String,
    pass:String,
    username:String,
    mobile:Number,
    name:String,
    shops:[Number]
});

const ShopSCH=new mongoose.Schema({ 
    name:String,
    products:[Number]
});
var User=mongoose.model('User',UserSCH);
var Seller=mongoose.model('Seller',SellerSCH);
var Product=mongoose.model('Product',ProductSCH);
var Shop=mongoose.model('Shop',ShopSCH);
app.post('/api/login',async function(req,res){
    const{username,password}=req.body;
    const user=await User.findOne({username:username});
    if(user){
        if(user.pass==password){res.status(200).send({type:"user",user});
        }
        else{
            res.status(400).send({
                error: {message : "رمز اشتباه است"}});
            return;
        }
    }
    else{
        const seller=await Seller.findOne({username:username});
        if(seller){
            if(seller.pass==password){
                res.status(200).send({type:"seller",seller});
            }
            else{
                res.status(400).send({
                    error: { message : "رمز اشتباه است!"}});
                return;
            }
        }
        else{
            res.status(400).send({
                error: {message : "نام کاربری اشتباه است"
                }});
            return;
        }
    }

})
app.post('/api/search',async function(req,res){
    const{query,type,category}=req.body;
    const products=await Product.find({name:query});
    var result=[];
    for(let i=0;i<products.length;i++){
        for(let j=0;j<type.length;j++){
            if(products[i].type==type[j]){
                if(products[i].category==category[j]){
                    var shops = [];
                    for (const sid of products[i]['shops']) {
                        var shop = Shop.find({ _id: sid });
                        shops.push(shop[0]);
                    }
                    
 result.push({
                "pid": products[i]['_id'],
                "name":products[i].name,
                "material":products[i].material,
                "size":products[i].size,
               "category":products[i].category,
                        "type":products[i].type,
                        "weight":products[i].weight,
                "country":products[i].country,
                        "shops":shops,
                  "prices":products[i].price,
                        "links":products[i].link
                    });
                }
            }
        }
    }
    res.status(200).send(result);

})

app.post('/api/signup_customer',async function(req,res){
    const{username,password,email,name,mobile}=req.body;
    const user=await User.findOne({username:username});
    if(user){
        res.status(400).send({
            error: {message : "نام کاربری وجود دارد!"
            }});
        return;
    }
    else{
        const seller=await Seller.findOne({username:username});
        if(seller){
            res.status(400).send({
                error: {message : "نام کاربری وجود دارد!"}});
            return;
        }
        const user=new User({
            email:email,
name:name,mobile:mobile,username:username,pass:password
        });
        await user.save();
        res.status(200).send({
            code:200,message:"کاربر ساخته شد"
        });
    }

})
app.post('/api/signup_seller',async function(req,res){
    const{username,password,email,name,mobile}=req.body;
    const seller=await Seller.findOne({username:username});
    if(seller){
        res.status(400).send({
            error: { message : "نام کاربری وجود دارد!"
            }});
        return;
    }
    else{
        const user=await User.findOne({username:username});
        if(user){
            res.status(400).send({
                error: {message : "نام کاربری وجود دارد!"}});
            return;
        }
        else{
            const seller=new Seller({username:username,pass:password,email:email,name:name,mobile:mobile,shops:[]
            });
            seller.save();
            res.status(200).send({code:200,message:"فروشنده ثبت شد"});
        }
    }
})
app.post('/api/user/add_shop',async function(req,res){
    const{sid,shop_name}=req.body;
    const seller=await Seller.findOne({_id:sid});
    if(!seller){
        res.status(400).send({
            error: { message : "فروشنده یافت نشد"}});
        return;
    }
    else{
        const tshop=await Shop.findOne({_id:shop_name});
        if(tshop){
            res.status(400).send({
                error: {message : "مغازه وجود دارد"}});return;
        }
        const shop=new Shop({
            name:shop_name, products:[]
        });shop.save();
        seller['shops'].push(shop._id);seller.save();
        res.status(200).send({code:200,message:"مغازه اضافه شد"
        });
    }

})
app.post('/api/product',async function(req,res){
  const{id}=req.body;
  const product=await Product.findOne({_id:id});
  if(product){
    res.status(200).send(product);return;
  }
  else{
    res.status(400).send({error: {message : "کالای مورد نظر یافت نشد"}});
      return;}})




app.post('/api/user/shops',async function(req,res){
    const {uid}=req.body;
    const user=await Seller.findOne({_id:uid});
    if(!user){
        res.status(400).send({
error: { message : "کاربر یافت نشد"
            }});
        return;
    }
    var result=[];
    for (const shop of user['shops']){
const shop_obj=await Shop.findOne({_id:shop}); result.push(shop_obj);
    }
    res.status(200).send({
        data:result,code:200,message:"مغازه ها با موفقیت متصل شدند"
    });

})


app.post('/api/user/add_product/new',async function(req,res){
    const {uid,sid,name,category,type,weight,country,material,size,price,link}=req.body;
    const user=await Seller.findOne({_id:uid});
    if(!user){
        res.status(400).send({
            error: {
                message : "کاربر یافت نشد"
            }});
        return;
    }
    else{
        if(!user['shops'].includes(sid)){
            res.status(400).send({
                error: {
                    message : "مغازه یافت نشد"
                }});
            return;
        }
        else{
            const shop=await Shop.findOne({_id:sid});
            const product=await Product.findOne({name:name});
            if(product){
                res.status(400).send({
                    error: {
                        message : "کالا وجود دارد"
                    }});
                return;
            }
            else{
                const newProduct=new Product({
                    name:name,
                    category:category,
                    type:type,
                    weight:weight,
                    country:country,
                    material:material,
                    size:size,
                    link:[],
                    shops:[],
                    price:[]
                });
                newProduct.link.push(link);
                newProduct.shops.push(sid);
                newProduct.price.push(price);
                newProduct.save();
                shop['products'].push(newProduct._id);
                shop.save();
                res.status(200).send({
                    code:200,
                    message:"کالا اضافه شد"
                });
                return;
            }
        }
    }
})





async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/test');
    app.listen(3030,()=>console.log("listening on port 3030"));
}