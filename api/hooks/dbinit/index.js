/**
 * dbinit hook
 */
const request = require('request');
const async = require('async');
const dburl = 'https://data.sfgov.org/resource/wwmu-gmzc.json?$limit=2000&&$$app_token=GdesEtaKTbsHuZUVMTzqGpXlT';

function createRecordHelper(cb){
  var r = this;
  function callback(){
    sails.log.debug(`done processing ${r.title}`);
    cb();
  }
  sails.log.debug(`processing ${r.title}`);
  var dbrecord = {
    title: r.title,

    actor_1: r.actor_1,
    actor_2: r.actor_2,
    actor_3: r.actor_3,
    
    director: r.director,
    distributor: r.distributor,
    fun_facts: r.fun_facts,

    production_company: r.production_company,
    release_year: r.release_year,
    writer: r.writer
  };

  Movie.findOrCreate( {title: r.title}, dbrecord).exec((error, dbMovieRecord)=>{
    // insert location?
    if(error){
      sails.log.error(`error when findOrCreate ${r.title}, ${error}`);
      callback();
      return;
    }

    if(typeof r.locations === 'undefined'){
      sails.log.debug(`movie ${r.title} has no locations`);
      callback();
      return;
    }

    sails.log.debug(`creating location with ${r.locations}`);
    var newLocation = {
      name: r.locations,
    };
    Location.findOrCreate({name: r.locations}, newLocation).exec(
      (l_error, dbLocationRecord)=>{
        if( l_error ){
          sails.log.error('error ');
          callback();
          return;
        }
        sails.log.debug(`created location ${dbLocationRecord.name}`);
        dbMovieRecord.locations.add(dbLocationRecord.name);
        dbMovieRecord.save(saveErr =>{
          if(saveErr)
            sails.log.error(`error when saving movie record: ${saveErr}`);
        });

        dbLocationRecord.belong_to_movie.add(dbMovieRecord.title);
        dbLocationRecord.save(saveErr =>{
          if(saveErr)
            sails.log.error(`error when saving location record: ${saveErr}`);
        });

        callback();
      }
    );
  });
}


module.exports = function (sails) {
  return {

    // Run when sails loads-- be sure and call `next()`.
    initialize: function (next) {
      

      sails.on('hook:orm:loaded', function () {
        
        request.get(dburl,( error, response, body)=>{
          sails.log.debug("initializing database");

          let allrecords = JSON.parse(body);

          var seriesFunc = [];
          allrecords.forEach( (r,index) =>{
            // fields
            seriesFunc.push(createRecordHelper.bind(r));
          });

          async.series(seriesFunc, (err, results)=>{
            if(err){
              sails.log.error(`error when populating db ${err}`);
              return;
            }
            sails.log.debug(`done initializing`);
          });

          return next();
        });
      });
    }

  };
};
