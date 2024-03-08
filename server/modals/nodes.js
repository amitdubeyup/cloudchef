const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model(
  'Nodes',
  new Schema(
    {
      name: {
        type: String,
        default: null,
      },
      parentName: {
        type: String,
        default: null,
      },
      childrenNames: {
        type: Array,
        default: [],
      },
    },
    {
      timestamps: false,
      collection: 'Nodes',
    },
  ),
);
