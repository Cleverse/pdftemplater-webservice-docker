const storage = require('@google-cloud/storage')()

const Config = require('../config')

const templateBucket = storage.bucket(Config.GCS_TEMPLATE_BUCKET_NAME)

module.exports.uploadToGCS = async (pdfPath, destination, filename) => {
    const storageBucket = storage.bucket(Config.GCS_STORAGE_BUCKET_NAME)
    await storageBucket.upload(pdfPath, {
        destination: `${destination}/${filename}`,
        gzip: true,
        metadata: {
          cacheControl: 'public, max-age=31536000',
        }
    })
}

module.exports.getTemplatePath = async (templateId) => {
    const file = templateBucket.file(`templates/${templateId}` + '.docx')
    const destination = `/tmp/${templateId}.docx`
    const options = { destination }
    await file.download(options)
    return destination
}