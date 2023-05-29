const formidable = require("formidable");

export const config = {
  api: {
    bodyParser: false,
  },
};

// export default async function handle(req, res) {
//   if (req.method === 'POST') {
//     console.log("Headers:", req.headers);

//     const form = new formidable.IncomingForm();

//     form.parse(req, (err, fields, files) => {
//       if (err) {
//         console.error('Error', err);
//         throw err;
//       }
//       console.log('Fields', fields);
//       console.log('Files', files);
//     });
//   }

// export const Parse = async (req) => {
//   console.log("Im in the start of Parse");

//   console.log("Im in the try of Parse");
//   console.log("about to call new Promise");
//   const data = new Promise((resolve, reject) => {
//     console.log("im in the new Promise");
//     console.log("about to call formidable");
//     const form = formidable({ multiples: true });
//     console.log("form = formidable({ multiples: true })");
//     console.log("about to call form.parse");
//     form.parse(req, (err, fields, files) => {
//       console.log("form.parse");
//       if (err) {
//         console.log("Error occurred during form parsing: ", err);
//         reject(err);
//       }
//       console.log("about to call resolve");
//       resolve({ fields, files });
//     });
//   });
// };

const Parse = (req) => {
  return new Promise((resolve, reject) => {
    const form = formidable({ multiples: true });

    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
      }

      resolve({ fields, files });
    });
  });
};

export default Parse;
