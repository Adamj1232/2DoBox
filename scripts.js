function NewObj(id,userTitle,userBody) {
  this.id = id
  this.title = userTitle
  this.body = userBody
  this.quality = ' swill'
  this.completed = false;
}

window.onload = function() {
  $('.completedtrue').hide();
}

$('.showComplete').on('click', function(){
  $('.completedtrue').show();
})

disableButton();

function disableButton() {
$('.save-button').prop('disabled', true);
};

function setItem(updateValue, newValue) {
  localStorage.setItem(
    updateValue,JSON.stringify(
      newValue)
    )
  }

function persist() {
  $('.input-card-container').html('')
  for (var i = 0; i < localStorage.length; i++) {
    var fromStorage = JSON.parse(
      localStorage.getItem(
        localStorage.key(i)
      ))
    newIdea(fromStorage)
  }
}

function newIdea(parsedOut) {
  $('.input-card-container').prepend(
  `<section class="input-card completed${parsedOut.completed}" id="${parsedOut.id}">
    <article class="card-title-box">
      <h1 class="card-title" contenteditable="true">${parsedOut.title}</h1>
      <button class="delete-btn" type="button" name="button"><img class="quality-image" src="./images/delete.svg" alt="delete button"></img></button>
    </article>
      <p class="card-body" contenteditable="true">${parsedOut.body}</p>
    <article class="quality-box">
      <button class="quality-btns up-vote" type="button" name="button"><img class="quality-image" src="./images/upvote.svg" alt="up vote button"></button>
      <button class="quality-btns down-vote" type="button" name="button"><img class="quality-image" src="./images/downvote.svg" alt="down vote button"></button>
      <p class="quality-result">Quality: <p class="current-quality">${parsedOut.quality}</p></p>
      <button class="completed-btn" type="button" name="button">Completed</button>
    </article>
  </section>`)
}

$('.input-card-container').on('click', '.completed-btn', function(){
  var changeComplete = $(this).parents('.input-card').attr('id')
  var changeThisComplete = JSON.parse(
    localStorage.getItem(
      changeComplete)
    )
  toggleClass(changeThisComplete);
  localStorage.setItem(changeComplete, JSON.stringify(changeThisComplete))
  persist()
})

function toggleClass(changeThisComplete) {
  if (changeThisComplete.completed == true) {
    changeThisComplete.completed = false;
  } else {
    changeThisComplete.completed = true;
  }
}

$('.save-button').click(function() {
  var id = $.now()
  var userTitle = $('.input-title').val()
  var userBody = $('.input-body').val()
  var newObj = new NewObj(id,userTitle,userBody)
  var strungOut = JSON.stringify(newObj)
  localStorage.setItem(id, strungOut)
  $('.input-title').val("")
  $('.input-body').val("")
  persist()
  disableButton()
})

$('.input-card-container').on('click', '.delete-btn', function() {
  $(this).parents().remove('.input-card')
  var grabId = $(this).parents('.input-card').attr('id')
  localStorage.removeItem(grabId)
})

$('.input-card-container').on('click', '.down-vote', function() {
  var changeQuality = $(this).parents('.input-card').attr('id')
  var changeThisQuality = JSON.parse(
    localStorage.getItem(
      changeQuality)
    )
  var newQual = $(this).siblings('.current-quality')
  if (newQual.text() == ' genius') {
    newQual.text(' plausible')
  } else if (newQual.text() == ' plausible') {
    newQual.text(' swill')
  }
  changeThisQuality.quality = newQual.text()
  localStorage.setItem(changeQuality, JSON.stringify(changeThisQuality))
  persist()
})

$('.input-card-container').on('click', '.up-vote', function() {
  var changeQuality = $(this).parents('.input-card').attr('id')
  var changeThisQuality = JSON.parse(
    localStorage.getItem(
      changeQuality)
    )
  var newQual = $(this).siblings('.current-quality')
  if (newQual.text() == ' swill') {
    newQual.text(' plausible')
  } else if (newQual.text() == ' plausible') {
    newQual.text(' genius')
  }
  changeThisQuality.quality = newQual.text()
  localStorage.setItem(changeQuality, JSON.stringify(changeThisQuality))
  persist()
})

$('.input-card-container').on('blur', '.card-title', function() {
  var updateTitle = $(this).parents('.input-card').attr('id')
  var newTitleValue = JSON.parse(
    localStorage.getItem(
      updateTitle)
    )
  newTitleValue.title = $('.card-title').text()
  setItem(updateTitle, newTitleValue);
})

$('.input-card-container').on('blur', '.card-body', function() {
  var updateBody = $(this).parents('.input-card').attr('id')
  var newBodyValue = JSON.parse(
    localStorage.getItem(
      updateBody)
    )
  newBodyValue.body = $('.card-body').text()
  setItem(updateBody, newBodyValue);
})

$('.search-text').on('keyup', function(){
  var searchToLowerCase = $(this).val().toLowerCase()
  $('.input-card').each(function(index, element){
    var text = $(element).children().text().toLowerCase();
    var match = !!text.match(searchToLowerCase);
    $(element).toggle(match);
  })
})

$('.input-card-container').on('keypress','.card-title, .card-body', function(e){
  if (e.which === 13){
    e.preventDefault()
  $('.card-title, .card-body').blur()
  }
})

$('.input-title').on('keypress', function(e) {
  if (e.which === 13) {
    e.preventDefault()
  $('.save-button').click()
  }
})

$('.input-body').on('keypress', function(e) {
  if (e.which === 13) {
    e.preventDefault()
  $('.save-button').click()
  }
})

$('input[type=text]').on('keyup', function() {
  var titleInput = $('.input-title').val();
  var bodyInput = $('.input-body').val();
  if (titleInput !== '' && bodyInput !== '') {
    $('.save-button').prop('disabled', false)
  } else {
    $('.save-button').prop('disabled', true)
  }
})

persist()
