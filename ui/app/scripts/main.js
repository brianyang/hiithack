require.config({
  shim: {
  },

  paths: {
    hm: 'vendor/hm',
    esprima: 'vendor/esprima',
    jquery: 'vendor/jquery.min',
    pubsub: 'pubsub'
  }
});

require(['app'], function(app) {
  // use app here
  console.log(app);
});



require(['pubsub'], function (app) {
    console.log('pub')
    console.log(app.pubsub);
    pubsub = app.pubsub;

    stopVid1 = function(){
      var vid1 = document.getElementById('vid1').outerHTML
      $('#vid1').remove()
    }
    stopVid2 = function(){
      var vid2 = document.getElementById('vid2').outerHTML
      $('#vid2').remove()
    }
    stopVid3 = function(){
      var vid3 = document.getElementById('vid3').outerHTML
      $('#vid3').remove()
    }
    pubsub.subscribe('stop1',stopVid1)
    pubsub.subscribe('stop2',stopVid2)
    pubsub.subscribe('stop3',stopVid3)

    // pubsub.subscribe('stop2',stopVid2)



  require(['timer'], function (app) {
      console.log('timer')
      console.log(app);
  });



});


