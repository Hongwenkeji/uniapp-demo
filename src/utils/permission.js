import router from "../router";

router.beforeEach=(to,form,next)=>{
    next()
}
router.afterEach=(to,form)=>{
    // console.log(to,form);
}
