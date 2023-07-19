const display = document.querySelector(".display .text-content");
const choice = document.querySelectorAll(".cell");
const number = document.querySelectorAll("#number")
const operatorButtons = document.querySelectorAll("#operator");
const clearButton = document.querySelector("#clear")
const equalButton = document.querySelector("#equal");
const deciButton = document.querySelector("#decimal");
const changeButton = document.querySelector("#changeSign");
const deleteButton = document.querySelector("#delete");
let previousValue = "";
let currentValue = "";
let firstNumber = "";
let secondNumber = "";
let operator;
let temp = "";

deleteButton.addEventListener("click", ()=>{
    updateDisplay("Delete");
})

changeButton.addEventListener("click", ()=>{
    updateDisplay("signChange");
}
)

clearButton.addEventListener("click", ()=>{
    clearDisplay();
})

deciButton.addEventListener("click", ()=>{
    updateDisplay(".");
})

equalButton.addEventListener("click", ()=>{
    updateDisplay("=");
}
)

number.forEach((button)=>
    button.addEventListener("click", ()=> {
    
    updateDisplay(Number(button.innerText))
    }
)

    )

operatorButtons.forEach((button)=>
    button.addEventListener("click", () => {
    updateDisplay(button.innerText)
    }
    )
)


function clearDisplay(){
    
    previousValue = "";
    currentValue = "";
    firstNumber = "";
    secondNumber= "";
    operator = undefined;
    display.innerText= "";
}

function updateDisplay(x){
    
    //if an operator is used while there is already an operator
    if ((x == "+" || x == "×" || x == "÷" || x == "-") && (display.innerText.slice(1).includes("+") || display.innerText.slice(1).includes("-") || display.innerText.slice(1).includes("×") || display.innerText.slice(1).includes("÷"))){ //if operator is used twice
        console.log("Something is wrong");
        operate(); //calling the operator function with existing variables;
        firstNumber = display.innerText; //making the first number what was returned from the operator function
        secondNumber = ""; //making the second number undefined
        operator = x; //changing the operator to what was inputted;
        display.innerText += " " + x; //making the display add on the operator that was inputtted
        currentValue = display.innerText + " "; //making the currentValue equal to the display
        previousValue = firstNumber + " " + operator; //changing the previousValue up to the operator
        
        
        
    }

    else if (x=="signChange"){ //if the change sign button is pressed 
        if (secondNumber == "" && currentValue.includes(operator) == false){ //when first number is getting a sign change
            
            firstNumber = "-" + firstNumber;
            temp = currentValue;
            currentValue = "-" + currentValue;
            previousValue = temp;
            display.innerText = currentValue;
        }
        else if ((secondNumber == " " || secondNumber == "" )&& currentValue.includes(operator)){ //if the changeSide is going to be
            
            secondNumber = secondNumber + "-";
            console.log(secondNumber);
            temp = currentValue;
            currentValue = currentValue + "-";
            previousValue = temp;
            display.innerText = currentValue;
        }
        else if (secondNumber != " " && secondNumber != "" && firstNumber != " "){
            currentValue = currentValue + "-";
            display.innerText = currentValue;
            secondNumber = "";
            operate();
            setTimeout(clearDisplay, 2000);
            
        }
        
    }

    else if (x=="Delete"){
        
        currentValue = currentValue.slice(0, currentValue.length -1);
        previousValue = previousValue.slice(0, previousValue.length - 1);
        console.log(currentValue);
        console.log(previousValue);
        display.innerText = currentValue;
        
    }

    //if the equals button is pressed
    else if (x=="="){ 
        operate(); //operate using the existing variables
        if (display.innerText == "You can't do that!"){
            
            setTimeout(clearDisplay, 2000);
        }
        else{
            if (Number(display.innerText).countDecimals() > 4){
                display.innerText = toFixed(display.innerText, 4);
            }
            firstNumber = display.innerText; //making the firstNumber the result of what was produced in the display after calling the operator function
            secondNumber = ""; //making secondNumber undefined for now
            previousValue = currentValue; //making the previousValue, the previous currentValue
            currentValue = firstNumber; //making currentValue equal to the firstNumber that is in the display
        }
    }


    //if a decimal button is pressed
    else if (x=="."){
        if (currentValue.includes(operator)){ //if we are on the second number
            secondNumber += String(x); //making the input added on to the current secondNumber
            temp = currentValue; //making the temp variable, the previous currentValue
            currentValue+=x; //making currentValue, itself + x
            previousValue=temp; //making previousValue equal to the previous current Value
            display.innerText = currentValue; //making hte display equal to the currentValue
        }
        else{
            firstNumber += String(x);
            temp = currentValue; //assigning temp variable to currentValue
            currentValue += x; //adding the decimal point to the currentValue
            previousValue = temp; //making the previousValue equal to the previous currentValue;
            display.innerText = currentValue; //making the display equal to currentValue
        }
    }

    //if operator button is pressed
    else if (x == "+" || x == "×" || x == "÷" || x == "-"){
        operator = x; //assigning the operator variable to the input
        previousValue = currentValue + " " + operator; //making the previousValue equal everything from the previous currentValue to the operator
        firstNumber = currentValue; //assigning the firstNumber to the previous currentValue
        currentValue = previousValue + " "; //assigning the currentValue to the previousValue + a space
        display.innerText = currentValue; //making the display equal to the current Value
    }

    //if an operator was the previous button clicked
    else if (currentValue.substring(currentValue.length -2, currentValue.length-1).includes(operator)){ 
        
        secondNumber = x; //the secondNumber is equal to the inputted number or decimal button
        temp=currentValue; //assigning temp variable to the previous currentValue
        currentValue += x; //making currentValue, itself + the inputted button 
        previousValue = temp; //making previousValue, the previous currentValue
        display.innerText = currentValue; //making the display equal to the currentValue;
    }

    //if something is added on to the secondNumber
    else if (currentValue.includes(operator)){ 
        
        secondNumber += String(x); //making the input added on to the current secondNumber
        temp = currentValue; //making the temp variable, the previous currentValue
        currentValue+=x; //making currentValue, itself + x
        previousValue=temp; //making previousValue equal to the previous current Value
        display.innerText = currentValue; //making hte display equal to the currentValue
    }

    //if something is being added on to the firstNumber
    else{
        temp=currentValue; //making temp variable a previous currentValue
        previousValue=temp; //making previosuValue equal to to the previous currentValue
        display.innerText += x; //adding on the inputted string to the display
        currentValue = display.innerText; //currentValue is equal to the display
        firstNumber = currentValue; //the firstNumber is the currentValue
    }

    
}

Number.prototype.countDecimals = function () {
    if(Math.floor(this.valueOf()) === this.valueOf()) return 0;
    return this.toString().split(".")[1].length || 0; 
}

function becomeNegative(){

}

function toFixed(value, precision) {
    var precision = precision || 0,
        power = Math.pow(10, precision),
        absValue = Math.abs(Math.round(value * power)),
        result = (value < 0 ? '-' : '') + String(Math.floor(absValue / power));

    if (precision > 0) {
        var fraction = String(absValue % power),
            padding = new Array(Math.max(precision - fraction.length, 0) + 1).join('0');
        result += '.' + padding + fraction;
    }
    return result;
}




function operate(){

    if (((operator == "÷") && (secondNumber==0)) || (secondNumber == "")){
        
        display.innerText = "You can't do that!";
        setTimeout(clearDisplay, 2000);
        
    }
    else if (operator == "+"){
        display.innerText= Number(firstNumber) + Number(secondNumber);
    }
    else if (operator == "-"){
        display.innerText= Number(firstNumber) - Number(secondNumber);
    }
    else if (operator == "×"){
        display.innerText = Number(firstNumber) * Number(secondNumber);
    }
    else if (operator == "÷"){
        display.innerText = Number(firstNumber)/Number(secondNumber);
    }
    else{
        console.log("Hi")
    }
}


let displayValue = "";

/*
function populateDisplay(){
    
    let clicks = 0;
    choice.forEach((one) => 
    one.addEventListener("click", ()=>{
        display.innerText = one.innerText;
        displayValue = one.innerText;
        console.log(one.id)
    }))
}


populateDisplay();
*/