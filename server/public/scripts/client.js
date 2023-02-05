console.log('client.js');

$(document).ready(function() {
    console.log('jQuery sourced');

    $(document).on('click', '#addButton', addTask);
    $(document).on('click', '.deleteBtn', deleteTask);

    getTask();
});

function addTask() {
    let taskToSend = {
        task: $('#addTask').val(),
        date: $('#addDate').val(),
        completed: false,
    };
    if (
        $('#addTitle').val() == "" ||
        $('#addDueDate').val() == ""
    ) {
        alert("All fields required.");
    } else {
        $('#addTitle').val(""),
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

function deleteTask() {
    let id = $(this).parents('tr').data('id');
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

        $('#taskList').append(`
      <tr data-id="${task.id}">
        <td>${task.task}</td>
        <td>${task.date}</td>
        <td>
            <input class='deleteBtn' type='button' value='Delete ❌'>
        </td>
      </tr>
    `)
    };
}
  