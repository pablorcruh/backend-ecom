export const verifyToken = async(req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
    } catch (error) {
        console.log(error.message)
    }
}