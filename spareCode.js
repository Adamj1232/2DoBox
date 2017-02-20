
$('.card-selector').on('click', '.up-vote', function() {
  var changeQuality = $('.idea-card').attr('id')
  var changeThisQuality = JSON.parse(localStorage.getItem(changeQuality))
  var newQual = $(this).siblings('.current-quality')

  if (newQual.text() == 'swill') {
    newQual.text('plausible')
  } else if (newQual.text() == 'plausible') {
    newQual.text('genius')
  }

  changeThisQuality.quality = newQual.text()
  localStorage.setItem(changeQuality, JSON.stringify(changeThisQuality))
  persistMafk()
})
