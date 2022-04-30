

function main() {
    const form = document.querySelector('#inputForm')
    const input = document.querySelector('#input')
    const output = document.querySelector('#output')
    form.addEventListener('submit',(event)=>{
        event.preventDefault()
        let program = input.value
        output.innerHTML = executeCode(program)
    })
}


let alphabet = ['',"a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",' ','<br>','?','!']
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
    return alphabet[num+1]
}

function math(op){  //needs to be rewritten, thinking #spot and the next slot in memory
    if(op===1){
        let out = memory[spot]+memory[spot+1]
        return out
    }
    if(op===2){
        let out = memory[spot]-memory[spot+1]
        return out
    }
    if(op===3){
        let out = memory[spot]/memory[spot+1]
        return out
    }
    if(op===4){
        let out = memory[spot]*memory[spot+1]
        return out
    }
    if(op===5){
        let out = memory[spot]%memory[spot+1]
        return out
    }
    
    return output+=('\nerror, invalid operation')
}

function executeCode(code){
    let output = ''
    let readSpace=0
    let jump = 0
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
            }
            i=readSpace
        }
        function basic(x){
        if(x==='>') spot++
        if(x==='<') spot--
        if(x==='+') memory[spot]++
        if(x==='-') memory[spot]--
        if(x==='#') dump()
        if(x==='o') memory[spot] = 0
        if(x==='*') {spot=0;memory[1]=0}
        if(x==='{') memory[spot-1] = memory[spot]
        if(x==='}') memory[spot+1] = memory[spot]
        if(x===')') jump = readSpace
        if(x==='(') {
            readSpace = jump
            i=jump
        }
        // if(x===',') {
        //     if(spot === 1) memory[spot] = +prompt('operator?: ')
        //     else memory[spot] = +prompt('input: ')
        // }
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
        if(code[i]===':'){
            let conditionalStatement = []
            let check = 0
            let point = 0
            for(let j=i;!conditionalStatement.includes(';');j++){
                readSpace++
                conditionalStatement.push(code[j])
                
            }
            for(let j=0;conditionalStatement[j]!='?';j++){
                if(conditionalStatement[j]==='+') check++
                if(conditionalStatement[j]==='-') check--
                point++
            }
            
             if(check===memory[spot]){
                 for(let i=point;conditionalStatement[i]!=';';i++){
                    if(conditionalStatement[i]===')') jump = readSpace
                    else if(conditionalStatement[i]==='(') {
                        readSpace = jump+1
                    }
                    else basic(conditionalStatement[i])
                 }
             }
            i=readSpace-1

        }
        if(code[i]==='X'){
            //execute currently held instructions
            //if displaystring (memory[0]===1)
            if(memory[0]===1){
                spot = 0
                let display = []
                for(let i=2;i<=6;i++){
                    display.push(alphabet[memory[i]])
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

memory = [0,0,0,0,0,0,0]
spot=0
return output
}































window.addEventListener('DOMContentLoaded',main())

