const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const axios = require("axios");
const puppeteer = require("puppeteer");
const pptrFirefox = require("puppeteer-firefox");
const chromium = require("chromium");

let config = {
  //authenticate Big Commerce API
  headers: {
    "X-Auth-Client": process.env.BG_AUTH_CLIENT,
    "X-Auth-Token": process.env.BG_AUTH_TOKEN,
  },
};

router.post("/automatesupa", (req, res) => {
  let order_sku = req.body.sku;
  let order_number = req.body.order_number;
  let globalSku = "";
  let qty = req.body.qty;
  axios
    .get(
      `https://api.bigcommerce.com/stores/et4qthkygq/v2/orders/${order_number}`,
      config
    )
    .then(function (response) {
      axios
        .get(`${response.data.shipping_addresses.url}`, config)
        .then(function (response2) {
          axios
            .get(`${response.data.products.url}`, config)
            .then(function (response3) {
              let productOptions = response3.data;
              for (let index = 0; index < productOptions.length; index++) {
                const element = productOptions[index];
                if (order_sku === element.sku) {
                  let sku = element.sku;
                  let newSku = String(sku.slice(0, 5));
                  globalSku = newSku;
                  console.log(newSku);
                }
              }
              let shipping = response2.data[0];
              let contactphonenumber = String(
                response.data.billing_address.phone
              );
              let firstnumber = contactphonenumber[0];
              let secondnumber = contactphonenumber[1];
              let thirdnumber = contactphonenumber[2];
              let forthnumber = contactphonenumber[3];
              let fifthnumber = contactphonenumber[4];
              let sixthnumber = contactphonenumber[5];
              let seventhnumber = contactphonenumber[6];
              let eighthnumber = contactphonenumber[7];
              let ninthnumber = contactphonenumber[8];
              let tenthnumber = contactphonenumber[9];
              (async () => {
                const browser = await puppeteer.launch({
                  args: ["--no-sandbox", "--disable-setuid-sandbox"],
                  headless: false,
                });
                const page = await browser.newPage();
                await page.goto(
                  "https://secure.supacolor.com/secure/quickjob/quickjob.aspx"
                );
                const username = await page.$("#loginUsername");
                await username.type(process.env.USERNAME);
                const password = await page.$("#loginPassword");
                await password.type(process.env.PASSWORD);
                const login = await page.$("#btnLogin");
                await login.click();
                await page.waitFor(1000);
                await page.evaluate(
                  () =>
                    (document.getElementById("txtDeliveryContact").value = "")
                );
                await page.evaluate(
                  () =>
                    (document.getElementById("txtDeliveryEmailAddress").value =
                      "")
                );
                await page.evaluate(
                  () => (document.getElementById("txtDeliveryPhone").value = "")
                );
                await page.evaluate(
                  () =>
                    (document.getElementById("txtDeliveryAddress").value = "")
                );
                await page.select("[name='delivery-option']", "2 Day Air");
                const contactName = await page.$("#txtDeliveryContact");
                await contactName.type(
                  `${response.data.billing_address.first_name} ${response.data.billing_address.last_name}`
                );
                const contactEmail = await page.$("#txtDeliveryEmailAddress");
                await contactEmail.type(response.data.billing_address.email);
                const contactPhone = await page.$("#txtDeliveryPhone");
                await contactPhone.type(
                  `${firstnumber}${secondnumber}${thirdnumber}-${forthnumber}${fifthnumber}${sixthnumber}-${seventhnumber}${eighthnumber}${ninthnumber}${tenthnumber}`
                );
                const contactAddress = await page.$("#txtDeliveryAddress");
                await contactAddress.type(
                  `${response.data.billing_address.first_name} ${response.data.billing_address.last_name} \n ${shipping.street_1} ${shipping.street_2} \n ${shipping.city}, ${shipping.state} ${shipping.zip}`
                );
                await page.waitFor(1000);
                const addTransfer = await page.$("[data-action='add-item']");
                await addTransfer.click();
                await page.waitFor(1000);
                const addPriceCode = await page.$("[name='item_0_product_id']");
                await addPriceCode.type(`${globalSku}`);
                await page.evaluate(
                  () =>
                    (document.querySelector("[name='item_0_qty']").value = "")
                );
                const addQty = await page.$("[name='item_0_qty']");
                await addQty.type(`${qty}`);
              })()
                .then((result) => {
                  console.log("this worked!");
                  res.sendStatus(204); //No Content
                })
                .catch((error) => {
                  console.log("Error:", error);
                  res.sendStatus(500);
                });
            })
            .then((result) => {
              console.log("this worked!");
            })
            .catch((error) => {
              console.log("Error:", error);
              res.sendStatus(500);
            });
        })
        .then((result) => {
          console.log("this worked!");
        })
        .catch((error) => {
          console.log("Error:", error);
          res.sendStatus(500);
        });
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
});



module.exports = router;
