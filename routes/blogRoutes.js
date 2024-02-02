const express=require('express')
const { getBlogsController, createBlogController, updateBlogController, deleteBlogController, getBlogByIdController, userBlogController } = require('../controllers/blogController')

const router=express.Router()

router.get('/all-blogs',getBlogsController)
router.post('/create-blog',createBlogController)
router.put('/update-blog/:id',updateBlogController)
router.delete('/delete-blog/:id',deleteBlogController)
router.get('/get-blog/:id',getBlogByIdController)

router.get('/user-blog/:id',userBlogController)

module.exports=router