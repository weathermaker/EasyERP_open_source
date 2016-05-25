var express = require('express');
var router = express.Router();
var TasksHandler = require('../handlers/tasks');
var authStackMiddleware = require('../helpers/checkAuth');
var MODULES = require('../constants/modules');


module.exports = function (models, event) {
    'use strict';
    var moduleId = MODULES.TASKS;
    var handler = new TasksHandler(models, event);
    var accessStackMiddlware = require('../helpers/access')(moduleId, models);

    router.post('/', authStackMiddleware, accessStackMiddlware, handler.createTask);

    router.get('/priority', authStackMiddleware, accessStackMiddlware, handler.getTasksPriority);

    router.get('/getLengthByWorkflows', authStackMiddleware, accessStackMiddlware, handler.getLengthByWorkflows);

    router.get('/:viewType', authStackMiddleware, accessStackMiddlware, handler.getTasks);

    router.patch('/:_id', authStackMiddleware, accessStackMiddlware, handler.taskUpdateOnlySelectedFields);

    router.delete('/:_id', authStackMiddleware, accessStackMiddlware, handler.removeTask);

    return router;
};