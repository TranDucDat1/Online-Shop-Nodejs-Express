const Catalog = require('../models/catalog.model');

exports.createCatalog = async (data) => await Catalog.create(data);

exports.findCatalog = async () => await Catalog.find({});