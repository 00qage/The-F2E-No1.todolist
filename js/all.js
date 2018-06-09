var app = new Vue({
    el: '#app',
    data: {
        todoTitle: '',
        todoDeadline: '',
        todoFile: '',
        todoComment: '',
        cacheTodo: {},
        cacheTitle: '',
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
            var times = Date.now();
            if (!value) {
                return;
            }
            this.todos.push({
                id: times,
                deadline: '',
                file: '',
                comment: '',
                title: value,
                completed: false,
                editing: false,
                point: false,

            });
            this.todoTitle = '';
            this.addTask = false;
        },
        cancelAddTodo: function () {
            this.todoTitle = '';
            this.addTask = false;

        },
        removeTodo: function (key) {
            this.todos.splice(key, 1);
        },
        editTodo: function (item) {
            this.cacheTodo = item;
            this.cacheTitle = item.title;
        },
        cancelEdit: function () {
            this.cacheTodo.editing = false;
            this.cacheTodo = {};
        },
        doneEdit: function (item) {
            item.title = this.cacheTitle;
            this.cacheTitle = '';
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