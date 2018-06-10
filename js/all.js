var app = new Vue({
    el: '#app',
    data: {
        todoTitle: '',
        todoDate: '',
        todoTime:'',
        todoFile: '',
        todoComment: '',
        cacheTodo: {},
        cacheTitle: '',
        cacheDate: '',
        cacheTime: '',
        cacheFile: '',
        cacheComment: '',
        todos: [
            //     {
            //     id: '444',
            //     title: '555',
            //     completed: false,
            //     editing: false,
            //     point: false,
            // }
        ],
        visibility: 'all',
        addTask: false,
    },
    methods: {
        addTodo: function () {
            var value = this.todoTitle.trim();
            var date = this.todoDate;
            var time = this.todoTime;
            var tComment = this.todoComment;
            var timestamp = Date.now();
            if (!value) {
                return;
            }
            this.todos.push({
                id: timestamp,
                title: value,
                deadlineDate:date,
                deadlineTime:time,
                file: '',
                comment:tComment,
                completed: false,
                editing: false,
                point: false,

            });
            this.todoTitle = '';
            this.todoDate = '';
            this.todoTime = '';
            this.todoFile = '';
            this.todoComment = '';
            this.addTask = false;
        },
        cancelAddTodo: function () {
            this.todoTitle = '';
            this.todoDate = '';
            this.todoTime = '';
            this.todoFile = '';
            this.todoComment = '';
            this.addTask = false;

        },
        removeTodo: function (todo) {
            var vm = this;
            var newIndex = vm.todos.findIndex(function (item,key) {
                return todo.id === item.id;
            })
            this.todos.splice(newIndex, 1);
        },
        editTodo: function (item) {
            this.cacheTodo = item;
            this.cacheTitle = item.title;
            this.cacheDate = item.deadlineDate,
            this.cacheTime = item.deadlineTime,
            this.cacheFile = '',
            this.cacheComment = item.comment;
        },
        cancelEdit: function () {
            this.cacheTodo.editing = false;
            this.cacheTodo = {};
        },
        doneEdit: function (item) {
            item.title = this.cacheTitle;
            item.deadlineDate = this.cacheDate;
            item.deadlineTime = this.cacheTime;
            // item.file = this.cacheFile;
            item.comment = this.cacheComment;
            
            this.cacheTitle = '';
            this.cacheDate = '';
            this.cacheTime = '';
            this.cacheComment = '';
            this.cacheTodo.editing = false;
            this.cacheTodo = {};
        }

    },
    computed: {
        filteredTodos: function () {
            if (this.visibility == 'all') {
                return this.todos;
            } else if (this.visibility == 'active') {
                var newtodos = [];
                this.todos.forEach(function (item) {
                    if (!item.completed) {
                        newtodos.push(item);
                    }
                });
                return newtodos;
            } else if (this.visibility == 'completed') {
                var newtodos = [];
                this.todos.forEach(function (item) {
                    if (item.completed) {
                        newtodos.push(item);
                    }
                });
                return newtodos;
            }
        }
    }
})