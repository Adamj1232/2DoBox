function IdeaObj(id,ideaTitle,ideaBody) {
  this.id = id
  this.title = ideaTitle
  this.body = ideaBody
  this.quality = ' swill'
}

function newIdea(parsedOut) {
  $('.input-card-container').prepend(
  `<div class="input-card" id="${parsedOut.id}">
    <div class="card-title-box">
      <h1 class="card-title" contenteditable="true">${parsedOut.title}</h1>
      <button class="delete-btn" type="button" name="button"><img class="quality-image" src="./images/delete.svg" alt="delete button"></img></button>
    </div>
      <p class="card-body" contenteditable="true">${parsedOut.body}</p>
    <div class="quality-box">
      <button class="quality-btns up-vote" type="button" name="button"><img class="quality-image" src="./images/upvote.svg" alt="up vote button"></button>
      <button class="quality-btns down-vote" type="button" name="button"><img class="quality-image" src="./images/downvote.svg" alt="down vote button"></button>
      <p class="quality-result">Quality: <p class="current-quality">${parsedOut.quality}</p></p>
    </div>
  </div>`)
}

$('.save-button').click(function() {
  var id = $.now()
  var ideaTitle = $('.input-title').val()
  var ideaBody = $('.input-body').val()
  var ideaObj = new IdeaObj(id,ideaTitle,ideaBody)
  var strungOut = JSON.stringify(ideaObj)
  localStorage.setItem(id, strungOut)
  $('.input-title').val("")
  $('.input-body').val("")
  persistMafk()
})

function persistMafk() {
  $('.input-card-container').html('')
  for (var i = 0; i < localStorage.length; i++) {
    var fromStorage = JSON.parse(
      localStorage.getItem(
        localStorage.key(i)
      ))
    newIdea(fromStorage)
  }
}

$('.input-card-container').on('click', '.delete-btn', function() {
  $(this).parents().remove('.input-card')
  var sensitive = $(this).parents('.input-card').attr('id')
  localStorage.removeItem(sensitive)
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
  persistMafk()
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
  persistMafk()
})

$('.input-card-container').on('blur', '.card-title', function() {
  var updateTitle = $(this).parents('.input-card').attr('id')
  var newTitleValue = JSON.parse(
    localStorage.getItem(
      updateTitle)
    )
  newTitleValue.title = $('.card-title').text()
  localStorage.setItem(
    updateTitle,JSON.stringify(
      newTitleValue)
    )
})

$('.input-card-container').on('blur', '.card-body', function() {
  var updateBody = $(this).parents('.input-card').attr('id')
  var newBodyValue = JSON.parse(
    localStorage.getItem(
      updateBody)
    )
  newBodyValue.body = $('.card-body').text()
  localStorage.setItem(
    updateBody, JSON.stringify(
      newBodyValue)
    )
})

$('.search-text').on('keyup', function(){
  var lookFor = $(this).val().toLowerCase()
  $('.input-card').each(function(index, element){
    var text = $(element).children().text().toLowerCase();
    var match = !!text.match(lookFor);
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

persistMafk()
