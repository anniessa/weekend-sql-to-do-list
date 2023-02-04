console.log('client.js');

$(document).ready(function() {
    console.log('jQuery sourced');

    $(document).on('click', '#addButton', addTask);
    $(document).on('click', 'li', taskComplete);
    $(document).on('click', '.deleteBtn', deleteTask);

    getTask();
});

function addTask() {
    let taskToSend = {
        task: $('#addTask').val(),
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

function taskComplete() {
    let id = $(this).data('id');
    let isCompleted = $(this).data('completed');
    console.log(isCompleted);

    $.ajax({
        method: 'PUT',
        url: `/tasks/${id}`,
        data: {completed: !isCompleted}
    })
    .then((response) => {
        console.log(response);
        getTask();
    })
    .catch((error) => {
        console.log(error);
    });  
}

function deleteTask() {
    let id = $(this).parents('li').data('id');
    $.ajax({
        method: 'DELETE',
        url: `/tasks/${id}`
    })
    .then((response) => {
        console.log('Deleted task', id);
        getTask();
    })
    .catch((error) => {
        console.log(error);
    });
}


function render(tasks) {
    $('#taskList').empty();

    for (let task of tasks) {
        let taskIsComplete = task.completed ? '✅' : 'Not Complete ';
        console.log(taskIsComplete); 
        $('#taskList').append(
      `<ul>
        <li class="newTask" data-id=${task.id} data-completed=${task.completed}>
        ${taskIsComplete} ${task.task} ${task.notes} ${task.date} <input class='deleteBtn' type='button' value='Delete ❌'></li>
      </ul>`
        )  
    };
}