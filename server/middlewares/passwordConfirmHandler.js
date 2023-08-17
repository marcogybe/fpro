export const passwordConfirmHandler = (req, res, next)=>{
    const { password, confirmPassword } = req.body


    if (password !== confirmPassword) {
        const err = new Error("Please, check your password input again!");
        err.status = 400;
        next(err)
     } else next()
}