var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;


// var driver_chr = new webdriver.Builder()
//     .forBrowser('chrome')
//     .build();

var driver_fx = new webdriver.Builder()
   .forBrowser('firefox')
   .build();

var driver_chr = new webdriver.Builder()
   .forBrowser('chrome')
   .build();

var driver_saf = new webdriver.Builder()
   .forBrowser('safari')
   .build();


searchTest(driver_chr);
searchTest(driver_fx);
searchTest(driver_saf);

function searchTest(driver) {
  driver.get('https://dbull7.github.io/ideabox/');
  driver.findElement(By.className('user-title')).sendKeys('plz');
  driver.findElement(By.className('user-body')).sendKeys('work');
  driver.findElement(By.className('save-button')).click();

  driver.sleep(3000).then(function() {
    driver.findElement(By.className('title-text')).getText().then(function(title) {
      if(title === 'plz') {
        console.log('Test passed');
      } else {
        console.log('Test failed');
      }
    });
  });

  driver.quit();
}
