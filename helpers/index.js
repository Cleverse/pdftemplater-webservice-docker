const storage = require("@google-cloud/storage")();
const path = require("path");

const Config = require("../config");

const templateBucket = storage.bucket(Config.GCS_TEMPLATE_BUCKET_NAME);

module.exports.uploadToGCS = async (pdfPath, destination, filename) => {
  const storageBucket = storage.bucket(Config.GCS_STORAGE_BUCKET_NAME);
  const result = await storageBucket.upload(pdfPath, {
    destination: path.join(destination, filename),
    gzip: true,
    metadata: {
      cacheControl: "public, max-age=31536000"
    }
  });
  // DEBUG
  const { selfLink, id, mediaLink } = result;
  return { selfLink, id, mediaLink };
};

module.exports.getTemplatePath = async templateId => {
  console.log(`templates/${templateId}` + ".docx");
  const file = templateBucket.file(`${templateId}.docx`);
  const destination = `/tmp/${templateId}.docx`;
  const options = { destination };
  await file.download(options);
  return destination;
};
