

function main() {
    const form = document.querySelector('#inputForm')
    const input = document.getElementById('input')
    const output = document.querySelector('#output')
	const memview = document.getElementById("memView")
    form.addEventListener('input',(event)=>{
        event.preventDefault()
        let program = input.value
        output.innerHTML = executeCode(program)
    })
	
	
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

function executeCode(code){
	code+='#'
	console.log(code)
    let output = ''
    let readSpace=0
    let jump = false
    function dump(){
        let currMem = memory
        currMem[spot] = '>'+currMem[spot]+'<'
        output+=('<br>'+currMem.join(' ')+ ' pointer at '+(spot+1))
    }
    //write to memory
    
    for(let i=readSpace;i<code.length;i++){
        
        readSpace++
        if(code[i]==='/'){
            for(let x=readSpace;code[x]!='/';x++){
                readSpace++
				if(readSpace>code.length) break;
            }
            i=readSpace
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
		
        if(x==='.') output+=(memory[spot])
        if(x==='$'){
            for(let i=0;i<memory.length;i++){
                if(i!=spot){memory[i]=0}
            }
            spot=0
        }
        
        }
        basic(code[i])
        //conditional (how tf)
        
		
		
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































window.addEventListener('DOMContentLoaded',main())
