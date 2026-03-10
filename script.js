let tasks = JSON.parse(localStorage.getItem("tasks")) || []

function saveTasks(){
localStorage.setItem("tasks",JSON.stringify(tasks))
}

function render(){

let list=document.getElementById("list")
list.innerHTML=""

let doneCount=0

tasks.forEach((task,index)=>{

let li=document.createElement("li")

let left=document.createElement("div")

let checkbox=document.createElement("input")
checkbox.type="checkbox"
checkbox.checked=task.done

checkbox.onchange=function(){

tasks[index].done=checkbox.checked

saveTasks()

render()

}

left.appendChild(checkbox)

let text=document.createElement("span")
text.textContent=" "+task.text

left.appendChild(text)

let tag=document.createElement("span")
tag.className="tag"
tag.textContent=task.subject

left.appendChild(tag)

li.appendChild(left)

let del=document.createElement("button")
del.textContent="削除"

del.onclick=function(){

tasks.splice(index,1)

saveTasks()

render()

}

li.appendChild(del)

list.appendChild(li)

if(task.done) doneCount++

})

updateProgress(doneCount)

}

function addTask(){

let text=document.getElementById("task").value
let subject=document.getElementById("subject").value

if(text==="") return

tasks.push({
text:text,
subject:subject,
done:false
})

saveTasks()

document.getElementById("task").value=""

render()

}

function updateProgress(done){

let percent=0

if(tasks.length>0){
percent=(done/tasks.length)*100
}

document.getElementById("progress").style.width=percent+"%"

}

render()

/* timer */

let time=1500
let interval

function startTimer(){

if(interval) return

interval=setInterval(function(){

time--

let m=Math.floor(time/60)
let s=time%60

document.getElementById("timer").textContent=
m+":"+(s<10?"0":"")+s

if(time<=0){

clearInterval(interval)

interval=null

alert("休憩時間！")

}

},1000)

}

function resetTimer(){

clearInterval(interval)

interval=null

time=1500

document.getElementById("timer").textContent="25:00"

}