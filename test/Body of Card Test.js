var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var driver_fx = new webdriver.Builder()
   .forBrowser('firefox')
   .build();

var driver_chr = new webdriver.Builder()
   .forBrowser('chrome')
   .build();

var driver_saf = new webdriver.Builder()
   .forBrowser('safari')
   .build();


bodyTest(driver_chr);
bodyTest(driver_fx);
bodyTest(driver_saf);

function bodyTest(driver) {
  driver.get('file:///Users/spencer.hilvitz/turing/2DoBox/index.html');
  driver.findElement(By.className('input-title')).sendKeys('plz');
  driver.findElement(By.className('input-body')).sendKeys('work');
  driver.findElement(By.className('save-button')).click();

  driver.sleep(3000).then(function() {
    driver.findElement(By.className('card-body')).getText().then(function(body) {
      if(body === 'work') {
        console.log('Test passed');
      } else {
        console.log('Test failed');
      }
    });
  });

  driver.quit();
}
