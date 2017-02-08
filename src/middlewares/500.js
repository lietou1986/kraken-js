
module.exports = function (template) {

    return function (err, req, res, next) {
        var model = { url: req.url, err: err, statusCode: 500 };

        if (req.xhr) {
            res.status(500).send(model);
        } else {
            logger.error('server error',err);
            res.status(500);
            res.render(template, model);
        }
    };
};