// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
var AppReady = false;
var dday;
var dprob;
var lifeleft = 0;

$(document).foundation();

$(document).on('change','#birthday-picker select', formParse);
$(document).on('change','input', formParse);

$(document).ready(function(){ 

  CookieCutter();

  // set up hover panels
  // although this can be done without JavaScript, we've attached these events
  // because it causes the hover to be triggered when the element is tapped on a touch device
  $('.flippy .front').click(function(){
    $('.flippy').addClass('flip');
  });
  $('.return').click(function(e){
    $('.flippy').removeClass('flip');
    e.preventDefault();
  });


  $("#birthday-picker").birthdaypicker(options={
    maxAge:119, minAge: 0, futureDates: false,
  });

  setInterval(function(){
    if (AppReady){
      lifeleft = moment.duration(moment(dday).diff(moment()));

      // Let's do days
      var day = Math.floor(lifeleft.asDays());
      daylang = " Days";
      if (day < 2 ) daylang = " Day"
      $('#days').text(day).digits();
      $('#daylang').text(daylang).digits();

      // Let's do hours
      var hours = lifeleft.hours();
      hourlang = " Hours";
      if (hours < 2 ) hourlang = " Hour"
        $('#hours').text(hours);
      $('#hourlang').text(hourlang);

      // Let's do minutes
      var minutes = lifeleft.minutes();
      minutelang = " Minutes";
      if (minutes < 2 ) minutelang = " Minute"
        $('#minutes').text(minutes);
      $('#minutelang').text(minutelang);

      // Let's do seconds
      $('#seconds').text(lifeleft.seconds());

      $('#deathprob').text(dprob);

    }
  }, 1000);


});

function CookieCutter(){
  var cookies = $.cookie('bd')

  if (typeof cookies == "undefined"){
    console.log('no cookies. returning');
    formParse();
    return;
  }

  var birthday = DateStrip(cookies.bd);
  var sex = StringSaver(cookies.s);
  var smoker = StringSaver(cookies.sm);

  if (sex != "f") sex = "m";
  if (smoker != 1) smoker = 0;

  if (moment(birthday).isValid()){
    console('cookie imported');
    $('#birthdate').val()
    $("input[name=sex,value="+sex+"]").attr('checked', 'checked');
    if (smoker == 1){
      $("input[name=smoker]").attr('checked', 'checked');
    }
  }
}


function formParse(){
  var birthday = $('#birthdate').val();
  var sex = $("input[name=sex]:checked").val();
  var smoker = $("input[name=smoker]:checked").length == 0 ? false : true;
  var keepcookie = $("input[name=cookie]:checked").length == 0 ? false : true;

  // Test for valid birthday and calculate death day.
  if (typeof birthday != "undefined" && moment(birthday).isValid()){
    var bday = moment(birthday);
    var age = moment().diff(bday, 'years');
    if (age > 0 && age < 119){
      var expectedLifeLEft;
      var dProb;
      if (sex == "f"){
        var expectedLifeLEft = data[age][2];
        var expectedDeathProb = data[age][0];
      }
      else {
        var expectedLifeLEft = data[age][5];
        var expectedDeathProb = data[age][3];
      }

      // Smokers get 10 years taken off.
      if (smoker == 1){
        expectedLifeLEft-=10;
        if (expectedLifeLEft < 0 ) expectedLifeLEft = 0;
      }

      // Probability that you will die this year.
      dprob = Math.round(expectedDeathProb * 100) + "%";
      if (dprob == "0%") dprob = "small";

      // Find the day you're going to die.
      dday = moment().add(expectedLifeLEft, 'years');

      AppReady = true;

      if (keepcookie){
        console.log('setcookie');
        $.cookie('bd', '{ bd: "'+birthday+'", s: "'+sex+'"}', { expires: 30 });        
      }
      console.log('validated');
      $('.return').show();
    }
  }
  else {
    AppReady = false;
    $('.return').hide();
    $('.flippy').addClass('flip');
  }
}

function DateStrip(text){
  text = input.val().replace(/[^a-zA-Z0-9-]/g, "");
  if(/_|\s/.test(text)) {
    text = text.replace(/_|\s/g, "");
      // logic to notify user of replacement
    }
    return text;
  }

  $.fn.digits = function(){ 
    return this.each(function(){ 
      $(this).text( $(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") ); 
    })
  }
