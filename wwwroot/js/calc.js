var totalBottom;
var totalMiddle;
var totalTop;
var numberUsed;
var operaterUsedOnce;
var operaterUsedLast;
var pressedEquals;
var deciPressed;
var currentCalc;
//var newCalc;


$(document).ready(function() {
    totalBottom = 0;
    totalMiddle = 0;
    totalTop = 0;
    numberUsed = false;
    operaterUsedOnce = false;
    operaterUsedLast = true;
    pressedEquals = false;
    deciPressed = false;
    //newCalc = true;
    currentCalc = [];
});

class Calc {
    constructor(skin) {
        this.skin = skin;
        $(".calc-box").empty();
    }

    buildCalc() {
        switch(this.skin) {
            case "iphone":
                makeIphone();
            break;
            case "classic":
                
            break;
            case "ti84":
                
            break;
        }
    }
}

//BIG BRAIN setInterval MEMERY
//dynamically changes text size depending on how many digits/symbols are
//present on the "screen". will gladly take advice on how to simplify this.
//will reject, however, the following: switch/case(in this situation nested ifs 
//are CONSIDERABLY faster processing) and selector grouping:
// $([id^="screen-row-field"]) (i need to access each one individually)
//(well i dont, but it will make it look ugly/confusing in the extremely
//unlikely event that someone inputs 70 total digits across the 3 "screens")
setInterval(function() {
    let bottomLength = $("#screen-row-field3").text().length;
    if (bottomLength < 16) {
        $("#screen-row-field3").css("font-size", "42pt");
    } else
    if (bottomLength > 15 && bottomLength < 17) {
        $("#screen-row-field3").css("font-size", "36pt");
    } else
    if (bottomLength > 17 && bottomLength < 20) {
        $("#screen-row-field3").css("font-size", "30pt");
    } else
    if (bottomLength > 20 && bottomLength < 26) {
        $("#screen-row-field3").css("font-size", "24pt");
    } else
    if (bottomLength > 26 && bottomLength < 32) {
        $("#screen-row-field3").css("font-size", "18pt");
    } else 
    if (bottomLength > 70) {
        alert("quit adding more numbers, im not nesting any more if statements AND YOU DONT NEED THIS MANY :rage:");
    }

    let middleLength = $("#screen-row-field2").text().length;
    if (middleLength < 16) {
        $("#screen-row-field2").css("font-size", "42pt");
    } else
    if (middleLength > 15 && middleLength < 17) {
        $("#screen-row-field2").css("font-size", "36pt");
    } else
    if (middleLength > 17 && middleLength < 20) {
        $("#screen-row-field2").css("font-size", "30pt");
    } else
    if (middleLength > 20 && middleLength < 26) {
        $("#screen-row-field2").css("font-size", "24pt");
    } else
    if (middleLength > 26 && middleLength < 32) {
        $("#screen-row-field2").css("font-size", "18pt");
    } else 
    if (middleLength > 70) {
        alert("ok this one might be long cos it has symbols.. but still.. why are u making massive calculations with this u hecking idiot");
    }

    let topLength = $("#screen-row-field1").text().length;
    if (topLength < 16) {
        $("#screen-row-field1").css("font-size", "42pt");
    } else
    if (topLength > 15 && topLength < 17) {
        $("#screen-row-field1").css("font-size", "36pt");
    } else
    if (topLength > 17 && topLength < 20) {
        $("#screen-row-field1").css("font-size", "30pt");
    } else
    if (topLength > 20 && topLength < 26) {
        $("#screen-row-field1").css("font-size", "24pt");
    } else
    if (topLength > 26 && topLength < 32) {
        $("#screen-row-field1").css("font-size", "18pt");
    } else 
    if (topLength > 70) {
        alert("ur adding mighty big numbers sir, it ay gonnae look pretti now");
    }
}, 50);


var  button_symbols = [
    "ac", "7", "4", "1", "0",
    "pm", "8", "5", "2", "0",
    "pct", "9", "6", "3", "deci",
    "divide", "multiply", "minus", "add", "equals"
];

//dis function finna be big n ugly
//PLEASE DO NOT JUDGE ME BY MY LOGIC
//ITS OVERCOMPLICATED AND UGLY :(
//it's this ugly because i wanted to do a lot of condition checking
//to make the calculator function as smoothly as possible.
function areaMouseClick(x, e) {
    switch(x.alt) {
        case "ac":
            if (e.shiftKey) {
                e.preventDefault();
                $("#screen-row-field1").contents().remove(); totalTop = 0;
                $("#screen-row-field2").contents().remove(); totalMiddle = 0;
                $("#screen-row-field3").contents().remove(); totalBottom = 0;
                numberUsed = false;
                operaterUsedOnce = false;
                operaterUsedLast = true;
                pressedEquals = false;
                currentCalc = [];
            }
            let dotChecker = $("#screen-row-field3").text()[$("#screen-row-field3").text().length -1];
            if (dotChecker == ".") { deciPressed = false; }
            let replaceString = $("#screen-row-field3").text().slice(0, -1);
            $("#screen-row-field3").contents().remove();
            $("#screen-row-field3").append(replaceString);
            if (totalBottom < 1) { totalBottom = 0 } else { totalBottom--; }
            console.log(totalBottom);
            break;
        case "deci":
            if (!deciPressed) {
                deciPressed = true;
                $("#screen-row-field3").append(".");
                totalBottom++;
            } else {
                alert("already used decimal this number");
            }
            break;
        case "1": 
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
        case "0":
            /*if (!lengthChecker(totalBottom)) {
                $("#screen-row-field3").append(x.alt);
                console.log($("#screen-row-field3").html());
                totalBottom++;
            } old method for making numbers not bleed out*/
            if (!pressedEquals) {
                //if (newCalc) { $("#screen-row-field3").contents.empty(); newcalc = false; }
                $("#screen-row-field3").append(x.alt);
                console.log($("#screen-row-field3").html());
                totalBottom++;
                numberUsed = true;
                operaterUsedLast = false;
            } else {
                alert("user an oeprator!");
            }
            break;
        case "deci":
            $("#screen-row-field1").append("test string");
            break;
        case "divide":
        case "multiply":
        case "minus":
        case "add":
        case "pct":
            if ((numberUsed == true && operaterUsedLast == false)
                || pressedEquals == true) {
                let s = $("#screen-row-field3").text();
                $("#screen-row-field2").append(s + getSymbol(x.alt));
                if (!s =="") { currentCalc.push(s); }
                currentCalc.push(getSymbol(x.alt));
                totalMiddle = $("#screen-row-field2").text().length;
                $("#screen-row-field3").contents().remove();
                totalBottom = 0;
                operaterUsedLast = true;
                operaterUsedOnce = true;
                pressedEquals = false;
                deciPressed = false;
            } else {
                alert("Selected a number first");
            }
            console.log("bottom length:"+totalBottom+"-middle length:"+totalMiddle);
            break;
        case "equals":
        console.log($("#screen-row-field3").text().length)
            if ($("#screen-row-field3").text().length > 0 
                && operaterUsedLast == false
                && operaterUsedOnce == true) {
                $("#screen-row-field1").contents().remove();
                let btm = $("#screen-row-field3").text();
                currentCalc.push(btm);
                console.log(currentCalc);
                $("#screen-row-field2").append(btm);
                $("#screen-row-field3").contents().remove();
                operatorUsedLast = false;
                operaterUsedOnce = false;
                numberUsed = false;
                pressedEquals = true;
                $("#screen-row-field1").append(calculateNumbers());
            } else {
                alert("enter a second number");
            }
            break;
    }
}

//i honestly thought this part would be the hardest. NOPE!
//jk LOL this is (kinda) wrong. it doesnt do BIDMAS/PEDMAS.
//it executes the operations in succession, and not the correct
//arithmetical order.
//HERES ME CREATING A METHOD THAT EVALUTES AN ARITHMETIC STRING
//WHEN THE FUNCTION ALRADY EXISTS GRRRRRRRRR
function calculateNumbers() {
    console.log(currentCalc);
    let finalInt;
    /*for (let x = 0; x < currentCalc.length; x+=2) {
        if (x == 0) {
            finalInt = currentCalc[x];
            console.log(finalInt);
        }
        switch(currentCalc[x-1]) {
            case "/":
                finalInt = Number(finalInt) / Number(currentCalc[x]);
                break;
            case "*":
                finalInt = Number(finalInt) * Number(currentCalc[x]);
                break;
            case "-":
                finalInt = Number(finalInt) - Number(currentCalc[x]);
                break;
            case "+":
                finalInt = Number(finalInt) + Number(currentCalc[x]);
                break;
            case "%":
                finalInt = Number(finalInt) % Number(currentCalc[x]);
                break;
        }
    }*/
    let finalString = $("#screen-row-field2").text() + $("#screen-row-field3").text();
    console.log(finalString);
    finalInt = eval(finalString);
    return finalInt;
}

//would limit the amount of digits the user can enter, this has been fixed
//with the aforementioned big dick methods up there ^
function lengthChecker(x) {
    if (x >= 15) {
        let oldstring;
        if ($("#screen-row-field1").text() != "Too many digits!") {
            oldstring = $("#screen-row-field1").text();
        }
        $("#screen-row-field1").contents().remove();
        $("#screen-row-field1").append("Too many digits!");
        setTimeout(function() {
            $("#screen-row-field1").contents().remove();
            $("#screen-row-field1").append(oldstring);
        }, 5000);
        return true;
    } else {
        return false;
    }
}

function getSymbol(x) {
    switch(x) {
        case "divide": return "/";
        case "multiply": return "*";
        case "minus": return "-";
        case "add": return "+";
        case "pct": return "%";
        default: return undefined; //in case i get "not all paths return value"
    }
}

function areaMouseOver(x) {
    if (x.id == "calc-click-area-zero" ||
        x.id == "calc-click-area04" ||
        x.id == "calc-click-area14") {
        $("#button-overlay-zero").css("z-index", "-1");
    } else {
        let yCoord = x.id.charAt(x.id.length-1);
        let xCoord = x.id.charAt(x.id.length-2);
        $("#button-overlay"+xCoord+yCoord).css("z-index", "-1");
    }
}

function areaMouseOut(x) {
    if (x.id == "calc-click-area-zero" ||
        x.id == "calc-click-area04" ||
        x.id == "calc-click-area14") {
        $("#button-overlay-zero").css("z-index", "11");
    } else {
        let yCoord = x.id.charAt(x.id.length-1);
        let xCoord = x.id.charAt(x.id.length-2);
        $("#button-overlay"+xCoord+yCoord).css("z-index", "11");
    }
}

function makeIphone() {
    $('#helpModal').modal({ show: false})
    $("#helpModal").modal("show");
    let counter = 0;
    let x = 72;
    let y = 330;
    let divx = Number(x-37);
    let divy = Number(y-38.5);
    let rad = 40;
    let offset = 87;
    let a, b;
    $(".calc-box").append("" +
    "<img src='media/images/ipxcalc.png' alt='calculator' usemap='#calcmap'/>" +
    "<map id='calc-map' name='calcmap'>");
    for (a = 0; a < 4; a++) {
        for (b = 0; b < 5; b++) {
            $("#calc-map")
            .append("" +
            "<area id='calc-click-area"+ a + b +"' shape='circle'" +
            "coords='" + 
            Number(x+(a*offset)) +"," + //x
            Number(y+(b*offset)) +"," + //y
            "40'"+ //radius
            "href='#'" +
            "onclick='areaMouseClick(this, event)'" +
            "onmouseover='areaMouseOver(this)'" +
            "onmouseout='areaMouseOut(this)'" +
            "alt='" + button_symbols[counter] + "'>");
            counter++;
        }
    }
    $(".calc-box").append("</map>");
    $(".calc-box").append("<div class='screen-wrapper'>");
    for (let i = 1; i < 4; i++) {
        $(".screen-wrapper").append(""+
        "<div class='screen-row'" +
        "id='screen-row" + i + "'>" + 
        "<p id='screen-row-field" + i + "'></p></div>");
    }
    $(".calc-box").append("</div>");

    for (a = 0; a < 4; a++) {
        for (b = 0; b < 5; b++) {
            $(".calc-box").append("<div class='button-overlay'" +
            "id='button-overlay"+ a + b +"'"+
            "style='top:" + Number(divy+(b*offset)) +"px;" + //y or 'top'
            "left: " + Number(divx+(a*offset)) + "px;' " + //x or 'left'
            "></div>");
        }
    }

    //ZERO FIXER - dis goin be a messy one, dont read here hehe
    //this is purely for aesthetics, i want my shit to look cute yo
    $("#button-overlay04").remove();
    $("#button-overlay14").remove();
    $(".calc-box").append("<div class='button-overlay'" +
    "id='button-overlay-zero'" +
    "style='top: 640px; left: 37px; width: 165px;'" +
    "></div>");
    $("#calc-map")
            .append("" +
            "<area id='calc-click-area-zero'" +
            "shape='circle'" +
            "coords='" + 
            "123," + //x
            " 678," + //y
            " 40'"+ //radius
            "href='#'" +
            "onclick='areaMouseClick(this)'" +
            "onmouseover='areaMouseOver(this)'" +
            "onmouseout='areaMouseOut(this)'" +
            "alt='0'>");
}

//canvas is too complicated atm hehe
/*
var myRect={x:0, y:0, w:50, h:50, color:"red"};
var c = document.getElementById("calc-canvas");
var ctx = c.getContext("2d");
ctx.fillStyle = myRect.color;
ctx.fillRect(myRect.x, myRect.y, myRect.w, myRect.h);
*/