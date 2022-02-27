require('dotenv').config();
const webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

const driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();
// Function to open web browser and automatic login
async function openBrowserAndLogin(driver) {

    try {
        await driver.get(process.env.SITE_URL);
        await driver.findElement(By.css('header#masthead > div > div > div:nth-of-type(2) > div > ul > li:nth-of-type(2) > a > span > i')).click();
        await driver.findElement(By.css('input#username')).sendKeys(process.env.LOGIN_USERNAME);
        await driver.findElement(By.css('input#password')).sendKeys(process.env.LOGIN_PASSWORD);
        await driver.findElement(By.css('form#login > p:nth-of-type(3) > button')).click();
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }

}
// Function to search product
async function searchProduct(driver, productName) {
    //  redirect to search url
    await driver.get(`https://www.shoprootscience.com/?s=${productName}&post_type=product`);
    return true;

}
// Function to choose product
async function chooseProduct(driver, path) {

    await driver.findElement(By.css(path)).click();
    return true;

}
// Function to add quantity (1)
async function addQuantitys(driver) {

    await driver.findElement(By.css("div#product-59284 > div > div > div > div > div:nth-of-type(3) > div > form > button")).click();
    return true;

}
// Function to view product and checkout
async function checkout(driver) {

    await driver.findElement(By.css("header#masthead > div > div > div:nth-of-type(2) > div > ul > li > a > span > i")).click();
    await driver.findElement(By.css("div#post-261 > div > div > div > div > div:nth-of-type(2) > div > div")).click();
    return true;

}
// Function to fill billing information
async function billing(driver, firstname, lastname, Address, city, pincode, phone) {

    await driver.findElement(By.css("input#billing_first_name")).sendKeys(firstname);
    await driver.findElement(By.css("input#billing_last_name")).sendKeys(lastname);
    await driver.findElement(By.css("input#billing_address_1")).sendKeys(Address);
    await driver.findElement(By.css("input#billing_city")).sendKeys(city);
    await driver.findElement(By.css("input#billing_postcode")).sendKeys(pincode);
    await driver.findElement(By.css("input#billing_phone")).sendKeys(phone);
    return true;

}
// Driven code 
function main() {

    const login = openBrowserAndLogin(driver);
    login.then(async(result) => {
        if (result) {
            console.log("Login Successful");
            const search = searchProduct(driver, process.env.PRODUCT_NAME);
            search.then(async(result) => {
                if (result) {
                    console.log("Search Successful");
                    const choose = await chooseProduct(driver, "div#content > div > div:nth-of-type(2) > div:nth-of-type(2) > ul > li > div > a > div > img");
                    if (choose) {
                        console.log("Choose Successful");
                    }
                    const addQuantity = await addQuantitys(driver);
                    if (addQuantity) {
                        console.log("Add Successful");
                    }
                    const checkouts = await checkout(driver);
                    if (checkout) {
                        console.log("Checkout Successful");
                    }
                    const billinginformation = await billing(driver, process.env.FIRSTNAME, process.env.LASTNAME, process.env.ADDRESS, process.env.CITY, process.env.PINCODE, process.env.PHONE);
                    if (billing) {
                        console.log("billing successful");
                    }
                }
            })
        }
    })

}

// Function trigger
main();