/**
 * Location.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    /*
      association to movie

    */


    name :{
      type: 'string',
      primaryKey: true
    },

    lat: {
      type: 'float'
    },

    lng: {
      type: 'float'
    },

    formatted_address: {
      type: 'string'
    },

    belong_to_movie: {
      collection: 'movie',
      via: 'locations',
    }


  }
};

