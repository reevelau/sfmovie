/**
 * Movie.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    /*
    uuid: {
      type: 'string',
      primaryKey: true,
      required: true
    }
    */
    title : {
      type: 'string',
      primaryKey: true,
      required: true
    },

    release_year: {
      type: 'integer',
      required: true
    },

    locations : {
      collection: 'location',
      via: 'belong_to_movie',
      dominant: true
    },

    fun_facts : {
      type: 'string',
    },

    production_company : {
      type: 'string',
      required: true
    },

    distributor : {
      type: 'string',
    },

    director : {
      type: 'string',
      required: true
    },

    writer: {
      type: 'string',
    },

    actor_1 : {
      type: 'string',
    },

    actor_2 : {
      type: 'string',
    },

    actor_3: {
      type: 'string',
    }

  }
};

