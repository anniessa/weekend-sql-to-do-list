console.log('client.js');

$(document).ready(function() {
    console.log('jQuery sourced');
    
    $(document).on('click', '#addButton', addTask);
    $(document).on('click', '.taskComplete', taskComplete);
    $(document).on('click', '.deleteBtn', sweetAlert);
    
    getTask();
});

function addTask() {
    
    let taskToSend = {
        task: $('#addTask').val(),
        date: $('#addDate').val(),
        time: $('#addTime').val(),
        completed: false,
    };
    
    if (
        $('#addTask').val() == "" ||
        $('#addDate').val() == "" ||
        $('#addTime').val() == "" 
        ) {
            alert("All fields required.");
        } else {
            $('#addTask').val(""),
            $('#addDate').val(""),
            $('#addTime').val("")
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
        let taskComplete= $(this).data('completed');
        console.log(taskComplete);
        
        $.ajax({
            method: 'PUT',
            url: `/tasks/${id}`,
            data: { completed: !taskComplete}
        })
        .then((response) => {
            getTask();
        })
        .catch((error) => {
            console.log(error);
        })  
    }
    // tried to do the SweetAlert functionality below
    
    function sweetAlert() {
        let id = $(this).parents('tr').data('id'); 
        swal({
            title: "Are you sure you want to delete this task?",
            text: "There's no turning back!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            closeOnConfirm: false,
            closeOnCancel: false
        }) .then((response) => {
            if (!response.ok) {
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
                }) 
            } 
        })
    };
    
    
    // function deleteTask() {
    //     let id = $(this).parents('tr').data('id');
    
    //     $.ajax({
    //         method: 'DELETE',
    //         url: `/tasks/${id}`
    //     })
    //     .then((response) => {
    //         console.log('Deleted task', id);
    //         getTask();
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     });    
    // }
    
    // tasks parameter is an array of object sent from the database
    function render(tasks) {
        $('#taskList').empty();
        
        for (let task of tasks) {
            const dateReformat = new Date(task.date).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"});
            let taskComplete = task.completed ? '✅' : '⬜';
            
            $('#taskList').append(`
            <tr class="taskComplete" id="row-${task.id}" data-id="${task.id}" data-completed="${task.completed}">
            <td>${taskComplete}</td>
            <td>${task.task}</td>
            <td>${dateReformat}</td>
            <td>${task.time}</td>
            <td>
            <input class='deleteBtn' type='button' value='Delete Task'>
            </td>
            </tr>
            `) 
            
            if (task.completed == true) {
                $(`#row-${task.id}`).addClass('backgroundChange');
            } else {
                $(`#row-${task.id}`).removeClass('backgroundChange');
            };
            
        };
    }
    