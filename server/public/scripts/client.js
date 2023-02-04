console.log('client.js');

$(document).ready(function() {
    console.log('jQuery sourced');

    $(document).on('click', '#addButton', addTask);

    getTask();
});

function addTask() {
    let taskToSend = {
        title: $('#addTask').val(),
        notes: $('#addNotes').val(),
        date: $('#addDueDate').val(),
        completed: false,
    };
    if (
        $('#addTitle').val() == "" ||
        $('#addNotes').val() == "" ||
        $('#addDueDate').val() == ""
    ) {
        alert("All fields required.");
    } else {
        $('#addTitle').val(""),
        $('#addNotes').val(""),
        $('#addDueDate').val("")
    };
    saveTask(taskToSend);
    
};

function saveTask(taskToSend) {
    console.log('in saveTask', taskToSend);

    $.ajax({
        type: 'POST',
        url: '/tasks',
        data: taskToSend
    })
    .then(() => {
        getTask();
    })
    .catch((error) => {
        console.log('POST request for /tasks failed', error);
        $('body').prepend("<h2>failed POST request</h2>");
    });
};

function getTask() {
    console.log('in getTask');
    $.ajax({
        method: 'GET',
        url: '/tasks'
    })
    .then((response) => {
        console.log('in getTask:', response);
        render(response);
    });
}


function render(tasks) {

    for (let task of tasks) {
        $('#taskList').append(
      `<ul>
        <li data-id=${task.id}><button data-completed=${task.completed}> ⚪ </button>
        ${task.title} ${task.notes} ${task.date}</li>
        <input class='cancel-btn' type='button' value='❌'>
      </ul>`
        )  
    };
}