"use strict"
var editMode = false;

function enableEditMode() {
    editMode = true;
}

function disableEditMode() {
    editMode = false;
}

var students = [
    {
        name: "Tran Tuan Dat",
        age: 20,
        phone: "0941017049",
        address: "Ha Nam"
    },
    {
        name: "Nguyen Thi Dieu Linh",
        age: 20,
        phone: "0941017049",
        address: "Ha Noi"
    },
];
// document ready
document.addEventListener('DOMContentLoaded', function() {
    renderStudent();
})

function renderStudent() {
    let htmls;
    htmls = students.map((student, index) => {
        return  `<li class="student">
                    <p><span>Name: </span>${student.name}</p>
                    <p><span>Age: </span>${student.age}</p>
                    <p><span>Phone: </span>${student.phone}</p>
                    <p><span>Addess: </span>${student.address}</p>
                    <i class="student-delete" onclick={onDeleteStudent(${index})}>x</i>
                    <i class="student-edit" onclick={onEditStudent(${index})}>Edit</i>
                </li>`
    })
    setHtml("#students-list", htmls.join(""));
}

// Onclick Create student
function onClickCreateStudent() {
    if (!editMode) {
        var name = getInputValue("name");
        var age = getInputValue("age");
        var phone = getInputValue("phone");
        var address = getInputValue("address");
        var student = {
            name,
            age,
            phone,
            address
        }
        // add Student
        addStudent(student);
        
    }else {
        editStudentHandle();  
    }
    // render view
    renderStudent();

}

var indexCurrentStudent;

function editStudentHandle() {
    var name = getInputValue("name");
    var age = getInputValue("age");
    var phone = getInputValue("phone");
    var address = getInputValue("address");
    editStudent(indexCurrentStudent, {
        name, 
        age, 
        phone,
        address
    })
    setHtml("#button", "Create");
    disableEditMode();
    studentFormReset();
}

// clear input value
function studentFormReset() {
    setInputValue("name", "");
    setInputValue("age", "");
    setInputValue("phone", "");
    setInputValue("address", "");
}

function editStudent(index, student) {
    students[index] = student;
}

function addStudent(student) {
    students.push(student);
}

// get input value

function getInputValue(selector) {
    var element = document.getElementById(selector);
    var elementValue = element.value;
    return elementValue;
}

// Set input value

function setInputValue(selector, value) {
    var element = document.getElementById(selector);
    element.value = value;
}

function onDeleteStudent(index) {
    if(confirm("Are you sure you want to delete")) {
        studentDelete(index);
        renderStudent();
    }
    
}

// delete student
function studentDelete(index) {
    students.splice(index, 1);
}


// on edit student
function onEditStudent(index) {
    indexCurrentStudent = index;
    var student = getStudent(index);
    setInputValue("name", student.name);
    setInputValue("age", student.age);
    setInputValue("phone", student.phone);
    setInputValue("address", student.address);
    enableEditMode();
    setHtml("#button", "Save")
}

function getStudent(index) {
    return students[index];
}

function setHtml(selector, html) {
    var element = document.querySelector(selector);
    element.innerHTML = html;
}
