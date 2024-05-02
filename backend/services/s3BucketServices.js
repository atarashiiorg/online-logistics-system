const AWS = require('aws-sdk')
let sdlBucket = new AWS.S3({
    accessKeyId: process.env.TEST_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.TEST_AWS_SECRET_ACCESS_KEY,
    region: process.env.TEST_AWS_REGION
});

const uploadImageToBucket = async (file) => {
    return new Promise((resolve, reject) => {
        const params = {
            Bucket: process.env.TEST_AWS_BUCKET,
            Key: process.env.TEST_AWS_BUCKET_FOLDER+"/" + file.filename,
            Body: file.buffer,
            ContentType: "image/jpeg",
            ACL: 'private'
        };

        sdlBucket.upload(params, async (err, data) => {
            try {
              if (err) {
                reject(err)
               } else {
              resolve(data)              
             }
            } catch (err) {
             reject(err)
            }
          });
    })
}

const deleteImageFromBucket=(image)=>{
    return new Promise((resolve, reject) => {
        const params = {
            Bucket:process.env.AWS_BUCKET,
            Key:image
        }
        sdlBucket.deleteObject(params,(err,data)=>{
            err?reject(err):resolve(data)
        })
    })
}

module.exports = {
    uploadImageToBucket,
    deleteImageFromBucket
};