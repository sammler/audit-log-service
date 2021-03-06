const mongoose = require('mongoose');

const MongooseConfig = require('./../../config/mongoose-config');
const Schema = mongoose.Schema;

/* eslint-disable camelcase */
const schema = new Schema({

  event_domain: {
    type: String,
    lowercase: true,
    required: true
  },
  event: {
    type: String,
    lowercase: true,
    required: true
  },
  actor_group: {
    type: Schema.Types.ObjectId
  },
  actor: {
    type: Schema.Types.ObjectId
  },
  actor_details: {
    type: Object
  },
  action_type: {
    type: String,
    uppercase: true
  },
  description: {
    type: String,
    required: true
  },
  source: {
    type: String,
    required: true
  },
  level: {
    type: String,
    enum: ['fatal', 'error', 'debug', 'warn', 'data', 'info', 'verbose', 'trace'],
    default: 'info'
  },
  trace_id: {
    type: String
  },
  parent_trace_id: {
    type: String
  },
  details: {
    type: Object
  },
  debug_info: {
    type: Object
  },
  environment: {
    type: Object
  },
  actor_environment: {
    type: Object
  },
  ts: {
    type: Date,
    default: Date.now
  }
}, {
  collection: MongooseConfig.COLLECTION_PREFIX + MongooseConfig.COLLECTION_AUDIT_LOGS,
  strict: true
});
/* eslint-enable camelcase */

schema.statics.generate = function (opts) {

  const docs = [];
  for (let i = 0; i < opts.amount; i++) {
    const doc = {
      name: `log-entry ${i}`,
      source: 'generated',
      level: 'info',
      message: {
        text: `Detailed message for ${i}`
      }
    };
    docs.push(doc);
  }
  return this.collection.insertMany(docs)
    .then(result => {
      return Promise.resolve(result);
    })
    .catch(err => {
      return Promise.reject(err);
    });
};
const model = mongoose.model(MongooseConfig.COLLECTION_AUDIT_LOGS, schema);

module.exports = {
  Schema: schema,
  Model: model
};
