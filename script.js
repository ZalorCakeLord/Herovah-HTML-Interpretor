

function main() {
    const form = document.querySelector('#inputForm')
    const input = document.getElementById('input')
    const output = document.querySelector('#output')
	const memview = document.getElementById("memView")
	//const trueRun = document.getElementById("runMe").checked
    //form.addEventListener('input',(event)=>{
	//	let caretPos = document.getElementById("input").selectionStart; 
	//	console.log(caretPos)
    //    event.preventDefault()
    //    let program = input.value
	//	program+='#'
    //    output.innerHTML = executeCode(program)
    //})
	form.addEventListener('submit',onInput)
	input.addEventListener('input', onInput);
	//input.addEventListener('click', onInput);
	/*input.addEventListener('keydown', function(event) {
		if (event.keyCode >= 37 && event.keyCode <= 40) {
			event.preventDefault();
			onInput(event);
		}
	});*/
	//input.addEventListener('paste', onInput);
	//input.addEventListener('cut', onInput);
	
	/*function onArrowKey(event) {
		// Arrow keys have key codes 37 (left), 38 (up), 39 (right), 40 (down)
		if (event.keyCode >= 37 && event.keyCode <= 40) {
			let currentCaretPos = input.selectionStart;
			//detectCaretMovement(previousCaretPos, currentCaretPos);
			//previousCaretPos = currentCaretPos;
			console.log(currentCaretPos)
		}*
		
	}*/
	function onInput(event){
		let type = event.type
		let caretPos = document.getElementById("input").selectionStart; 
		console.log(caretPos)
        event.preventDefault()
        let program = input.value
		program+='#'
		event.type==="submit"?output.innerHTML =executeCode(program,true):output.innerHTML =executeCode(program,false)
        //output.innerHTML = executeCode(program)
	}
	
	
}





let alphabet = ['',"a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",' ','<br>','?','!',"<",">","/",".",",","+","-","*","=","(",")",'"']
let memory = [0,0,0,0,0,0,0] //not reliant on this being exact, could make bigger but I like 7
          //  0 1 2 3 4 5 6
//memory has seven slots
//slot zero states current run type
//either string (1) or math (2)
//string 
//current spot in memory designated by $spot

let code = ''
let spot = 0
let hold = 0

function displayString(num){
    return num+1>alphabet.length?alphabet[num+1]:'�'
}

function math(op){  //needs to be rewritten, thinking #spot and the next slot in memory (did this!)
    let out;

	switch (op) {
		case 1:
			out = memory[spot] + memory[spot + 1];
			return out;
			break;
		case 2:
			out = memory[spot] - memory[spot + 1];
			return out;
			break;
		case 3:
			out = memory[spot] / memory[spot + 1];
			return out;
			break;
		case 4:
			out = memory[spot] * memory[spot + 1];
			return out;
			break;
		case 5:
			out = memory[spot] % memory[spot + 1];
			return out;
			break;
	}

    
    return output+=('\nerror, invalid operation')
}

function memView(){
	let currMem = memory
    currMem[spot] = '>'+currMem[spot]+'<'
    output+=('<br>'+currMem.join(' ')+ ' pointer at '+(spot+1))
	return output
}
function isLetter(str) {
  return str.length === 1 && str.match(/[a-z]/i);
}

function executeCode(code,submitted){
	let loopKill = 10000
	console.log(code)
    let output = ''
    let readSpace=0
    let jump = false
    function dump(){
        let currMem = [...memory]
		let currentOp = " No operation selected."
		switch(currMem[0]){
			case 1:
				currentOp = " Emitting Text"
			break;
			case 2:
				currentOp = " Math: "
				switch(currMem[1]){
					case 1:
						currentOp+="Addition"
					break;
					case 2:
						currentOp+="Subtraction"
					break;
					case 3:
						currentOp+="Division"
					break;
					case 4:
						currentOp+="Multiplication"
					break;
					case 5:
						currentOp+="Modulus"
					break;
					default:
						currentOp+=" No valid mathematical operation selected."
					break;
				}
			break;
			default:
			break;
		}
		currMem[spot] = '<u>'+currMem[spot]+'</u>'
        output+=('<br>'+currMem.join(' ')+ currentOp+'<br>')
    }
    //write to memory
    let loopTo = false
	let loopPointer = false
    for(let i=readSpace;i<code.length;i++){
		//iterating through the program not the memory
        const readSpaceFix=x=>readSpace=i;
		
        readSpace++
        if(code[i]==='/'){
            for(let x=readSpace;code[x]!='/';x++){
                readSpace++
				if(readSpace>code.length) break;
            }
            i=readSpace
        }
		//loops: iterate until pointer is on 0
		//>>++. /2/ [>+.<-.>+.<-.]>>++ 0 2 0 2
		if(code[i]==="["){
			
			loopPointer = spot
			loopTo = i
			console.log(loopPointer,loopTo)
		}
		if(code[i]==="]"){
			console.log(loopTo,loopPointer,memory[loopPointer],loopKill)
			if(loopTo&&loopPointer&&memory[loopPointer]>1){
				if(loopKill<=0) break;
				loopKill--
				i=loopTo
				readSpaceFix()
				spot=loopPointer
			}
			if(memory[loopPointer]===1){
				memory[loopPointer]--
				loopKill = 10000
			}
		}
		
		
        function basic(x){
        if(x==='>') spot<6?spot++:spot=0
        if(x==='<') spot>0?spot--:spot=6
        if(x==='+') memory[spot]++
        if(x==='-') memory[spot]--
        if(x==='#') dump()
        if(x==='o') memory[spot] = 0
        if(x==='*') {spot=0;memory[1]=0}
        if(x==='{') memory[spot-1] = memory[spot]
        if(x==='}') memory[spot+1] = memory[spot]
		if(x==='^') hold = memory[spot]
		if(x==='|') memory[spot] = hold
		if(x===',') {
			if(submitted){
				let userInput;
				
				userInput = prompt('Provide Input: ');

				if (isNaN(+userInput)) {
					let letter = alphabet.indexOf(userInput);
					if (letter === -1) {
						alert("MUST BE A VALID NUMBER OR LETTER");
						return false;
					}
					userInput = letter;
				} else {
				userInput = +userInput;
				}
				memory[spot] = userInput
				
			}
		
		}
		
		
        if(x==='.') output+=(memory[spot])
        if(x==='$'){
            for(let i=0;i<memory.length;i++){
                if(i!=spot){memory[i]=0}
            }
            spot=0
        }
        
        }
        basic(code[i])
		//if()
        //conditional (how tf)
        // emit number i+>+
		
		
        if(code[i]==='X'){
            //execute currently held instructions
            //if displaystring (memory[0]===1)
            if(memory[0]===1){
                spot = 0
                let display = []
                for(let i=2;i<=6;i++){
                    memory[i]<alphabet.length&&memory[i]>=0?display.push(alphabet[memory[i]]):display.push('�')
                }
                output+=(display.join(''))
                
            }
            //math! [2,*,...]
            //         ^denotes operation, 1-5 = +-/*%, gonna use #spot and #spot+1
            if(memory[0]===2){
                memory[spot] = math(memory[1])
                
            }
        }
		if(code[i]==="="){
			//do stuff in () if memory[spot]===memory[spot+1]
			//make sure the opening parenthese is there
			if(code[i+1]==="("){
				let closeConditional = findNextIndexInString(code,")",i+1)
				//make sure closing parenthese exists
				if(closeConditional>0){
					//skip if not equal
					if(memory[spot]!==memory[spot+1]){
						i = closeConditional
						readSpaceFix()
					}
				}
			}
		}
    }
	
	
function findPreviousIndexInString(str, searchString, startIndex) {
  for (let i = startIndex - 1; i >= 0; i--) {
    if (str[i] === searchString) {
      return i;
    }
  }

  // Return -1 if no match is found before the given startIndex
  return -1;
}

function findNextIndexInString(str, searchString, startIndex) {
  for (let i = startIndex + 1; i < str.length; i++) {
    if (str[i] === searchString) {
      return i;
    }
  }

  // Return -1 if no match is found after the given startIndex
  return -1;
}

memory = [0,0,0,0,0,0,0]
spot=0
console.log(output)
return output
}




function time() {
  var currentdate = new Date();
  var datetime = (currentdate.getMonth()+1) + "/"
      + currentdate.getDate() + "/"
      + currentdate.getFullYear() + " @ "
      + currentdate.getHours().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + ":"
      + currentdate.getMinutes().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + ":"
      + currentdate.getSeconds().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
  document.getElementById('datetime').innerHTML=datetime;}

setInterval(time, 1000);


























window.addEventListener('DOMContentLoaded',main())
