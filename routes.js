'use strict';

module.exports = function (app) {
    var todoList = require('./controller');

    app.route('/')
        .get(todoList.index);

    app.route('/users')
        .get(todoList.users);

    app.route('/product')
        .get(todoList.product);

    app.route('/users/:user_id')
        .get(todoList.findUsers);

    app.route('/users')
        .post(todoList.createUsers);

    app.route('/users')
        .put(todoList.updateUsers);

    app.route('/users')
        .delete(todoList.deleteUsers);
};