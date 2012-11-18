window.app = {
    config: {
        initialized : 0
        ,currentVid : 0
        ,nextVids : 0
        ,nextVidCounter : 0 
        ,tickerAud : 0
        ,whistleAud : 0
        ,interval : 0
        ,restInterval : 0
    }

    ,sounds: {
        tick: function() {
            document.getElementById('tickAud').play();
        }
    }
    , play: {
        stopVideo: function (vid) {
            vid.pause();
        }

        , queueTicker: function (aud, interval) {
            var f2 = function () {
                aud.play();
            };
            setTimeout(f2, interval - 2000);
        }
        
        , endRestInterval: function () {
            if (app.config.currentVid) {
                app.config.currentVid.pause();
            }
            app.config.tickerAud.pause();
            app.config.whistleAud.play();

            if (app.config.currentVid) {
                app.play.playExercise();
            }
        }
        
        , playRestInterval: function () {
            if (app.config.currentVid) {
                app.config.currentVid.muted = true;
                app.config.currentVid.play();
                
                //message: "Next Exercise: <exercise name>"
            }
            
            app.play.queueTicker(app.config.tickerAud, app.config.restInterval);

            var f1 = function() {
                app.play.endRestInterval();
            };
            setTimeout(f1, app.config.restInterval);
        }

        , endExercise: function() {
            app.config.currentVid.pause();
            app.config.tickerAud.pause();
            app.config.whistleAud.play();
            app.config.currentVid = app.config.nextVids[app.config.nextVidCounter];
            app.config.nextVidCounter++;
            app.play.playRestInterval();
        }

        , playExercise: function () {
            //message: "Go!"
            app.config.currentVid.muted = true;
            app.config.currentVid.play();
            app.play.queueTicker(app.config.tickerAud, app.config.interval);
            
            var f1 = function() {
                app.play.endExercise();
            };
            setTimeout(f1, app.config.interval);

        }

    }
};

$('body').on('click', '#StartButton', function () {

    app.config.nextVidCounter = 1;
    app.config.nextVids = [document.getElementById("vid1"), document.getElementById("vid2"), document.getElementById("vid3")];
    app.config.currentVid = app.config.nextVids[app.config.nextVidCounter - 1];
    app.config.tickerAud = document.getElementById("tickAud");
    app.config.whistleAud = document.getElementById("whistleAud");
    app.config.interval = 8000;
    app.config.restInterval = 3000;

    app.play.playExercise();
});

