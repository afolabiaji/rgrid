const fs = require("fs")
const User = require("../models/user")

//save file from data sent from front-end
exports.uploadFile = async (req, res, next) => {
    const id = req.body.user.userId

    try {
        fs.writeFile(`saved/${req.body.file.name}`,
            new Buffer.from(req.body.file.blob),
            (res) => { }
        );

        User
            .update({
                filePath: req.body.file.name,
            }, {
                where: {
                    id: +id
                }
            }).then(result => {
            })

        res.status(200).json(JSON.stringify({
            message: "File successfully uploaded",
            file: {
                path: req.body.file.name,
                blob: req.body.file.blob
            }
        }));

    } catch (err) {
        res.status(401).json({ "message": "Something went wrong" })
        throw err
    }


}

//send file data stored in user in db to front-end
exports.downloadFile = async (req, res, next) => {

    const id = req.body.user.userId
    try {
        const user = await User.findByPk(id)
        const url = user.filePath


        if(url){
            fs.readFile(`./saved/${url}`, 'utf8', (err, data) => {
                res.status(200).json(JSON.stringify(
                    {
                        file: {
                            name: url,
                            blob: data
                        }
                    }
                ))
            })
            
        } else {
            res.status(401).json({'message': 'no file found'})
        }
        
    } catch (err) {
        throw err
    }
}