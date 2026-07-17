// ===============================
// SELECT ELEMENTS
// ===============================

const currentOperandText = document.getElementById("currentOperand");

const previousOperandText = document.getElementById("previousOperand");

const numberButtons = document.querySelectorAll("[data-number]");

const operationButtons = document.querySelectorAll("[data-operation]");

const actionButtons = document.querySelectorAll("[data-action]");


// ===============================
// CALCULATOR CLASS
// ===============================

class Calculator {

    constructor(previousOperandText, currentOperandText){

        this.previousOperandText = previousOperandText;

        this.currentOperandText = currentOperandText;

        this.clear();

    }


    clear(){

        this.currentOperand = "";

        this.previousOperand = "";

        this.operation = undefined;

    }


    delete(){

        this.currentOperand = 
        this.currentOperand.toString().slice(0,-1);

    }


    appendNumber(number){

        // Prevent multiple decimals

        if(number === "." && this.currentOperand.includes(".")){

            return;

        }


        this.currentOperand += number;

    }


    chooseOperation(operation){


        if(this.currentOperand === ""){

            return;

        }


        if(this.previousOperand !== ""){

            this.compute();

        }


        this.operation = operation;


        this.previousOperand = this.currentOperand;


        this.currentOperand = "";

    }



    compute(){


        let result;


        const previous = parseFloat(this.previousOperand);

        const current = parseFloat(this.currentOperand);



        if(isNaN(previous) || isNaN(current)){

            return;

        }



        switch(this.operation){


            case "+":

                result = previous + current;

                break;



            case "-":

                result = previous - current;

                break;



            case "*":

                result = previous * current;

                break;



            case "/":

                if(current === 0){

                    alert("Cannot divide by zero");

                    this.clear();

                    return;

                }


                result = previous / current;

                break;



            default:

                return;

        }



        this.currentOperand = result;


        this.operation = undefined;


        this.previousOperand = "";


    }



    percentage(){

        if(this.currentOperand !== ""){

            this.currentOperand =
            parseFloat(this.currentOperand) / 100;

        }

    }



    updateDisplay(){


        this.currentOperandText.innerText =
        this.currentOperand || "0";


        this.previousOperandText.innerText =
        this.previousOperand
        ?
        `${this.previousOperand} ${this.operation || ""}`
        :
        "";

    }


}



// ===============================
// CREATE CALCULATOR
// ===============================


const calculator = new Calculator(

    previousOperandText,

    currentOperandText

);



// ===============================
// NUMBER BUTTONS
// ===============================


numberButtons.forEach(button => {


    button.addEventListener("click",()=>{


        calculator.appendNumber(
            button.innerText
        );


        calculator.updateDisplay();


    });


});



// ===============================
// OPERATION BUTTONS
// ===============================


operationButtons.forEach(button=>{


    button.addEventListener("click",()=>{


        calculator.chooseOperation(

            button.dataset.operation

        );


        calculator.updateDisplay();


    });


});




// ===============================
// ACTION BUTTONS
// ===============================


actionButtons.forEach(button=>{


    button.addEventListener("click",()=>{


        const action = button.dataset.action;



        switch(action){


            case "clear":

                calculator.clear();

                break;



            case "delete":

                calculator.delete();

                break;



            case "calculate":

                calculator.compute();

                break;



            case "percentage":

                calculator.percentage();

                break;


        }



        calculator.updateDisplay();


    });


});




// ===============================
// KEYBOARD SUPPORT
// ===============================


document.addEventListener("keydown", event=>{


    if(

        (event.key >= 0 && event.key <=9)

        ||

        event.key === "."

    ){


        calculator.appendNumber(event.key);

        calculator.updateDisplay();


    }



    if(

        event.key === "+"

        ||

        event.key === "-"

        ||

        event.key === "*"

        ||

        event.key === "/"

    ){


        calculator.chooseOperation(event.key);

        calculator.updateDisplay();


    }



    if(event.key === "Enter"){


        calculator.compute();

        calculator.updateDisplay();


    }



    if(event.key === "Backspace"){


        calculator.delete();

        calculator.updateDisplay();


    }



    if(event.key === "Escape"){


        calculator.clear();

        calculator.updateDisplay();


    }


});
