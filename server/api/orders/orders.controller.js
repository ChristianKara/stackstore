'use strict';

var _ = require('lodash');
var Orders = require('./orders.model');

// Get list of orderss
exports.index = function(req, res) {
    Orders.find(function(err, orderss) {
        if (err) {
            return handleError(res, err);
        }
        return res.json(200, orderss);
    });
};

// Get a single orders
exports.show = function(req, res) {
    Orders.findById(req.params.id, function(err, orders) {
        if (err) {
            return handleError(res, err);
        }
        if (!orders) {
            return res.send(404);
        }
        return res.json(orders);
    });
};

// Creates a new orders in the DB.
exports.create = function(req, res) {
    Orders.create(req.body, function(err, orders) {
        if (err) {
            return handleError(res, err);
        }
        return res.json(201, orders);
    });
};

// Updates an existing orders in the DB.
exports.update = function(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    Orders.findById(req.params.id, function(err, orders) {
        if (err) {
            return handleError(res, err);
        }
        if (!orders) {
            return res.send(404);
        }
        var updated = _.merge(orders, req.body);
        updated.save(function(err) {
            if (err) {
                return handleError(res, err);
            }
            return res.json(200, orders);
        });
    });
};

// Deletes a orders from the DB.
exports.destroy = function(req, res) {
    Orders.findById(req.params.id, function(err, orders) {
        if (err) {
            return handleError(res, err);
        }
        if (!orders) {
            return res.send(404);
        }
        orders.remove(function(err) {
            if (err) {
                return handleError(res, err);
            }
            return res.send(204);
        });
    });
};

function handleError(res, err) {
    return res.send(500, err);
}