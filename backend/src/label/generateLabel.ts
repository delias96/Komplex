import fs from "fs";
import Mustache from "mustache";
import path from "path";
import puppeteer from "puppeteer";

export const labelrender = async (labelObject: any): Promise<Buffer> => {
  const data = {
    trackingNumber: labelObject.trackingNumber,
    SenderDetails: [
      labelObject.senderName,
      labelObject.senderPostalCode,
      labelObject.senderCity,
      labelObject.senderAddress,
      labelObject.senderTelephone,
      labelObject.senderEmail,
    ],
    ReceiverDetails: [
      labelObject.receiverName,
      labelObject.receiverPostalCode,
      labelObject.receiverCity,
      labelObject.receiverAddress,
      labelObject.receiverTelephone,
      labelObject.receiverEmail,
    ],
    items: [
      {
        item: labelObject.packageDescription,
        weight: labelObject.packageWeight,
        measurement:
          labelObject.packageWeight +
          "x" +
          labelObject.packageLength +
          "x" +
          labelObject.packageHeight,
      },
    ],
  };

  const template = await fs.promises.readFile(path.join(__dirname, "labelTemplate.html"), "utf8");
  const filledTemplate = Mustache.render(template, data);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(filledTemplate, {
    waitUntil: "networkidle2",
  });
  const pdfBuffer = await page.pdf({ format: "a4", margin: {bottom: 25, left: 25,right: 25,top: 25} });

  await browser.close();

  return pdfBuffer
};
