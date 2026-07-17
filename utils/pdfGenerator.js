const fs = require('fs');
const PDFDocument = require('pdfkit');
const path = require('path');

const generateScroll = (name, ability, tier) => {
  const doc = new PDFDocument();
  const filePath = path.join(process.cwd(), 'public', `${name}_scroll.pdf`);
  const stream = fs.createWriteStream(filePath);
  doc.pipe(stream);

  doc.fontSize(26).fillColor('#FFD700').text('✨ SOVEREIGN COSMIC SCROLL ✨', { align: 'center' });
  doc.moveDown();
  doc.fontSize(18).fillColor('white').text(`Name: ${name}`, { align: 'center' });
  doc.text(`Superability: ${ability}`, { align: 'center' });
  doc.text(`Tier: ${tier}`, { align: 'center' });
  doc.moveDown();
  doc.fontSize(14).fillColor('#ADD8E6').text('~ Sealed by Malcolm AI ~', { align: 'center' });

  doc.end();
};

module.exports = generateScroll;
