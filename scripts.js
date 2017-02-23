window.onload = function() {
  $('.input-card').slice(10).css('display','none')
  $('.completedtrue').hide()
}

function NewObj(id,userTitle,userBody) {
  this.id = id
  this.title = userTitle
  this.body = userBody
  this.importance = ' normal'
  this.completed = false
}

function disableButton() {
$('.save-button').prop('disabled', true)
}

function setItem(updateValue, newValue) {
  localStorage.setItem(
    updateValue,JSON.stringify(newValue)
  )
}

function persist() {
  $('.input-card-container').html('')
  for (var i = 0; i < localStorage.length; i++) {
    var fromStorage = JSON.parse(
      localStorage.getItem(
        localStorage.key(i)
      ))
  if (fromStorage.completed == true){
    $('.completedtrue').hide()
  }
    newIdea(fromStorage)
  }
}

persist()
disableButton()

function newIdea(parsedOut) {
  $('.input-card-container').prepend(
  `<section class="input-card completed${parsedOut.completed}" id="${parsedOut.id}">
    <article class="card-title-box">
      <h1 class="card-title" contenteditable="true">${parsedOut.title}</h1>
      <button class="delete-btn" type="button" name="button"></button>
    </article>
      <p class="card-body" contenteditable="true">${parsedOut.body}</p>
    <article class="importance-box">
      <button class="importance-btns up-vote" type="button" name="button"></button>
      <button class="importance-btns down-vote" type="button" name="button"></button>
      <p class="importance-result">Importance: <p class="current-importance">${parsedOut.importance}</p></p>
      <button class="completed-btn" type="button" name="button">Completed</button>
    </article>
  </section>`)
}

// Completed Button Functionality

$('.show-complete').on('click', function(){
  $('.completedtrue').show()
  $('.completedfalse').hide()
})

$('.input-card-container').on('click', '.completed-btn',   function(){
  var changeComplete =  $(this).closest('.input-card').attr('id')
  var changeThisComplete = JSON.parse(localStorage.getItem(changeComplete))
  if (changeThisComplete.completed == true) {
    changeThisComplete.completed = false
    toggleClass($(this), changeComplete, changeThisComplete)
  } else {
    changeThisComplete.completed = true
    toggleClass($(this), changeComplete, changeThisComplete)
    $(this).parents('.input-card').removeClass('completedfalse')
  }
})

function toggleClass(location, changeComplete, changeThisComplete) {
 localStorage.setItem(changeComplete, JSON.stringify(changeThisComplete))
 location.closest('.input-card').toggleClass('completedtrue')
}

// Save and Delete Button Functionality

$('.save-button').click(function() {
  var id = $.now()
  var userTitle = $('.input-title').val()
  var userBody = $('.input-body').val()
  var newObj = new NewObj(id,userTitle,userBody)
  var strungOut = JSON.stringify(newObj)
  localStorage.setItem(id, strungOut)
  $('.input-title').val("")
  $('.input-body').val("")
  newIdea(newObj)
  disableButton()
  $('.input-card').slice(10).css('display','none')
})

$('.input-card-container').on('click', '.delete-btn', function() {
  $(this).parents().remove('.input-card')
  var grabId = $(this).parents('.input-card').attr('id')
  localStorage.removeItem(grabId)
})

// Change Card Importance

$('.input-card-container').on('click', '.down-vote', function() {
  var changeImportance = $(this).parents('.input-card').attr('id')
  var changeThisImportance = JSON.parse(
    localStorage.getItem(
      changeImportance)
  )
  var newQual = $(this).siblings('.current-importance')
  if (newQual.text() == ' critical') {
    newQual.text(' high')
  } else if (newQual.text() == ' high') {
    newQual.text(' normal')
  } else if (newQual.text() == ' normal') {
    newQual.text(' low')
  } else if (newQual.text() == ' low') {
    newQual.text(' none')
  }
  changeThisImportance.importance = newQual.text()
  localStorage.setItem(changeImportance, JSON.stringify(changeThisImportance))
})

$('.input-card-container').on('click', '.up-vote', function() {
  var changeImportance = $(this).parents('.input-card').attr('id')
  var changeThisImportance = JSON.parse(
    localStorage.getItem(
      changeImportance)
  )
  var newQual = $(this).siblings('.current-importance')
  if (newQual.text() == ' none') {
    newQual.text(' low')
  } else if (newQual.text() == ' low') {
    newQual.text(' normal')
  } else if (newQual.text() == ' normal') {
    newQual.text(' high')
  } else if (newQual.text() == ' high') {
    newQual.text(' critical')
  }
  changeThisImportance.importance = newQual.text()
  localStorage.setItem(changeImportance, JSON.stringify(changeThisImportance))
})

// Edit Existing Cards

$('.input-card-container').on('blur', '.card-title', function() {
  var updateTitle = $(this).parents('.input-card').attr('id')
  var newTitleValue = JSON.parse(
    localStorage.getItem(
      updateTitle)
  )
  newTitleValue.title = $('.card-title').text()
  setItem(updateTitle, newTitleValue)
})

$('.input-card-container').on('blur', '.card-body', function() {
  var updateBody = $(this).parents('.input-card').attr('id')
  var newBodyValue = JSON.parse(
    localStorage.getItem(
      updateBody)
    )
  newBodyValue.body = $('.card-body').text()
  setItem(updateBody, newBodyValue)
})

// Search Functionality

$('.search-text').on('keyup', function(){
  var searchToLowerCase = $(this).val().toLowerCase()
  $('.input-card').each(function(index, element){
    var text = $(element).children().text().toLowerCase()
    var match = !!text.match(searchToLowerCase)
    $(element).toggle(match)
  })
})

$('.search-text').on('focusout', function() {
  $('.completedtrue').hide()
  $('.input-card').slice(10).css('display','none')
})

// Disable Enter Default Behavior

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

// Disable Save Button

$('input[type=text]').on('keyup', function() {
  var titleInput = $('.input-title').val()
  var bodyInput = $('.input-body').val()
  if (titleInput !== '' && bodyInput !== '') {
    $('.save-button').prop('disabled', false)
  } else {
    $('.save-button').prop('disabled', true)
  }
})

// Importance Button Functionality

function filter (searchImportance){
  $('.current-importance').each(function(){
    var text = $(this).text()
    var match = !!text.match(searchImportance)
    $(this).closest('.input-card').toggle(match)
  })
}

$('.critical').on('click', function(){
  var searchImportance = $(this).text()
  filter(searchImportance)
  $('.completedtrue').hide()
})

$('.high').on('click', function(){
  var searchImportance = $(this).text()
  filter(searchImportance)
  $('.completedtrue').hide()
})

$('.normal').on('click', function(){
  var searchImportance = $(this).text()
  filter(searchImportance)
  $('.completedtrue').hide()
})

$('.low').on('click', function(){
  var searchImportance = $(this).text()
  filter(searchImportance)
  $('.completedtrue').hide()
})

$('.none').on('click', function(){
  var searchImportance = $(this).text()
  filter(searchImportance)
  $('.completedtrue').hide()
})

$('.show-more').on('click', function(){
  $('.input-card').show()
  $('.completedtrue').hide()
})
