const express = require('express');
const multer = require('multer');
const excel = require('exceljs');
const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), (req, res) => {
  const filePath = req.file.path;
  const fileName = req.file.originalname;

  const workbook = new excel.Workbook();
  workbook.xlsx.readFile(filePath)
    .then((workbook) => {
      const worksheet = workbook.getWorksheet(1);
      const jsonData = [];

      worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
        if (rowNumber !== 1) {
          const data = {};
          row.eachCell((cell, colNumber) => {
            data[`column${colNumber}`] = cell.value;
          });
          jsonData.push(data);
        }
      });

      res.json({ fileName, jsonData });
    })
    .catch((err) => {
      res.status(500).json({ error: 'Error reading Excel file.' });
    });
});

module.exports = router;
