$(document).ready(function(){
  
  var timer;
  var initialTime;
  var totalScore = 0;

  // $('#starter').on('click', function(){


  // });

 
  $(function(){$('#slider').slider(); });


  $(document).on('click','#starter',function(){
    initialTime = 10;
    timer = setInterval(function(){
      $('#timer').text(initialTime);
      initialTime--;
      if (initialTime<0){
        clearInterval(timer);
        postScore();
      }
    }, 1000);
    qBank();    
  });

  $('#answer1').keyup(function(){
    correctAnswer();
  });

  var test;
  var test2;

  var qBank = function(){
    test =Math.round(Math.random() * 10);
    test2 =Math.round(Math.random() * 10);
    $('#problemPlace').text(test + "+" + test2);

  };

  var correctAnswer = function(){
    if ($('#answer1').val() == eval(test + "+" + test2)) {
      $('#answer1').val('');
      totalScore = totalScore + 1;
      qBank();
      initialTime = initialTime + 1.3;
    }
  }; 

  function postScore(){
    $.ajax({
      type: 'post',
      url:  'https://stark-eyrie-2329.herokuapp.com/leaders/create',
      data: {'name': prompt("what's your name?"), 'score': totalScore},
      success: function(response){
        $('#rank1').val("You're ranked top " + (response.ranking*100).toFixed(2) + "%");
      },
      error: function(){}  
    })
  }

  
});

