var answer = 0, operand1, operator, operand2;
var newnum = true;
var decimal = false;
var op_time = true;
var log = [];

$(".num-button").click(function(){
  if (newnum) {
    $("#display").html($(this).attr('id'));
    if (operator) { log.push(operator); }
    else { $("#log").empty(); }
    newnum = false;
  }
  else {
  $("#display").append($(this).attr('id'));
  }
  if (!decimal && parseFloat($("#display").html()) === 0){
    $("#display").html("0");
    newnum = true;
  }
  op_time = true;
  $("#log").html(log.join(''));
})

$(".op-button").click(function(){
  decimal = false;
  if (operator){
    if (op_time){
      operand2 = parseFloat($("#display").html());
      log.push(operand2);
      answer = getAnswer(operator, operand1, operand2);
      $("#display").html(answer);
      operand1 = answer;
    }
  }
  else {
    operand1 = parseFloat($("#display").html());
    log.push(operand1);
  }
  operator = $(this).html();
  $(".op-button").removeClass("op-active");
  $(this).addClass("op-active");
  op_time = false;
  newnum = true;
  $("#log").html(log.join(''));
})

$("#eq").click(function(){
  operand2 = parseFloat($("#display").html());
  answer = operand1 || operand1 === 0 ? getAnswer(operator, operand1, operand2) : operand2;
  $("#display").html(answer);
  log.push(operand2, "=", answer);
  $("#log").html(log.join(''));
  reset();
})

$("#dec").click(function(){
  if (!decimal) {
    if (newnum) {
      $("#display").html("0.");
      if (operator) { log.push(operator); }
      else { $("#log").empty(); }
    }
    else { $("#display").append("."); }
  newnum = false;
  decimal = true;
  }
})

$("#AC").click(function(){
  reset();
  $("#display").html("0");
  $("#log").empty();
})

$("#C").click(function(){
  $("#display").html("0");
  log.pop();
  newnum = true;
  op_time = false;
})

function getAnswer(op, first, second){
  var ans;  
  switch (op) {
    case "÷":
      if (first === 0 || second === 0){
        return "Zero div error"
      }
      ans = first / second;
      break;
    case "×":
      ans = first * second;
      break;
    case "-":
      ans = first - second;
      break;
    case "+":
      ans = first + second;
      break;
  }
  return Number((ans).toFixed(12)); // Quick fix for floating point precision errors
}

function reset(){
  answer = 0;
  operator = false;
  operand1 = false;
  decimal = false;
  newnum = true;
  log = [];
  $(".op-button").removeClass("op-active");
}

$(document).ready(function(){
  reset();
  $("#display").html("0");
});
