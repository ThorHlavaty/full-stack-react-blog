var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const apiPostsRouter = require('./routes/api-posts')
const apiCommentsRouter = require('./routes/api-comments')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/posts', apiPostsRouter);
app.use('/api/v1/posts', apiCommentsRouter);

module.exports = app;
