var app = new Vue({
    el: '#app',
    data: {
        todoTitle:'',
        deadline: '',
        file:'',
        Comment:'',
        todos: [
            {
                id: '444',
                title: '555',
                completed: false,
                editing:false,
                star:false,
            }
        ],
        visibility: 'all',
        addTask:false,
    },
    methods: {
        addTodo: function () {
            var value = this.newtodo.trim();
            var times = Date.now();
            if (!value) {
                return;
            }
            this.todos.push({
                id: times,
                title: value,
                completed: false,
                editing:false,
                star:false,
            });
            this.newtodo = '';
        },
        removeTodo: function (key) {
            this.todos.splice(key, 1);
        },

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

