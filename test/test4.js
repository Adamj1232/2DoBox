var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;


// var driver_chr = new webdriver.Builder()
//     .forBrowser('chrome')
//     .build();

// var driver_fx = new webdriver.Builder()
//    .forBrowser('firefox')
//    .build();

var driver_chr = new webdriver.Builder()
   .forBrowser('chrome')
   .build();

// var driver_saf = new webdriver.Builder()
//    .forBrowser('safari')
//    .build();


searchTest(driver_chr);
// searchTest(driver_fx);
// searchTest(driver_saf);

function searchTest(driver) {
  driver.get('file:///Users/admin/Turing/2DoBoxPivot/index.html');
  driver.findElement(By.className('input-title')).sendKeys('better');
  driver.findElement(By.className('input-body')).sendKeys('work');
  driver.findElement(By.className('save-button')).click();


  driver.findElement(By.className('input-title')).sendKeys('must');
  driver.findElement(By.className('input-body')).sendKeys('work');
  driver.findElement(By.className('save-button')).click();
  driver.findElement(By.className('delete-btn')).click();

  driver.sleep(3000).then(function() {
  driver.findElement(By.className('card-title')).getText().then(function(title) {
      if(title === 'better')
      {
        console.log('Test passed');
      } else {
        console.log('Test failed');
      }
    })
  })
  driver.quit();
}
