// =============================
// Student Management System
// Part 1
// =============================

// Load students from Local Storage
let students = JSON.parse(localStorage.getItem("students")) || [];

// HTML Elements

const form = document.getElementById("studentForm");
const table = document.getElementById("studentTable");
const totalStudents = document.getElementById("totalStudents");
const avgCgpa = document.getElementById("avgCgpa");
const placedStudents = document.getElementById("placedStudents");
const activityList = document.getElementById("activityList");

// =============================
// Save Student
// =============================

form.addEventListener("submit", function(e){

    e.preventDefault();

    const student = {

        id: Date.now(),

        name: document.getElementById("name").value,

        roll: document.getElementById("roll").value,

        dept: document.getElementById("dept").value,

        year: document.getElementById("year").value,

        cgpa: document.getElementById("cgpa").value,

        status: document.getElementById("status").value

    };

    students.push(student);

    localStorage.setItem("students", JSON.stringify(students));

    form.reset();

    displayStudents();

});
function displayStudents(){

table.innerHTML="";

students.forEach((student,index)=>{

table.innerHTML += `

<tr>

<td>

<img
src="https://ui-avatars.com/api/?name=${student.name}&background=2563eb&color=fff"
class="student-img">

</td>

<td>${student.name}</td>

<td>${student.roll}</td>

<td>${student.dept}</td>

<td>${student.year}</td>

<td>${student.cgpa}</td>

<td>

<span class="badge bg-${student.status=="Placed"?"success":"danger"}">

${student.status}

</span>

</td>

<td>

<button class="btn btn-warning btn-sm">

<i class="bi bi-pencil-square"></i>

</button>

<button
class="btn btn-danger btn-sm"
onclick="deleteStudent(${index})">

<i class="bi bi-trash"></i>

</button>

</td>

</tr>

`;

});

dashboard();

}
function deleteStudent(index){

students.splice(index,1);

localStorage.setItem("students",JSON.stringify(students));

displayStudents();

}
function dashboard(){

totalStudents.innerHTML = students.length;

let total=0;

let placed=0;

students.forEach(student=>{

total += Number(student.cgpa);

if(student.status=="Placed"){

placed++;

}

});

avgCgpa.innerHTML =
students.length?
(total/students.length).toFixed(2):0;

placedStudents.innerHTML=placed;

recentActivity();

}
function recentActivity(){

activityList.innerHTML="";

students.slice(-5).reverse().forEach(student=>{

activityList.innerHTML +=

`<li>

${student.name}
added to
${student.dept}

</li>`;

});

}
displayStudents();