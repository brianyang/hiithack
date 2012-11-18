window.app = {
    //var currentVid, nextVids, nextVidCounter, tickerAud, whistleAud, interval, restInterval;


    sounds: {
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
            setTimeout(f2, interval - 5000);
        }
        
        , endRestInterval: function (currentVid, nextVids, nextVidCounter, tickerAud, whistleAud, interval, restInterval) {
            if (currentVid) {
                currentVid.pause();
            }
            tickerAud.pause();
            whistleAud.play();

            if (currentVid) {
                app.play.playExercise(currentVid, nextVids, nextVidCounter, tickerAud, whistleAud, interval, restInterval);
            }
        }
        
        , playRestInterval: function (currentVid, nextVids, nextVidCounter, tickerAud, whistleAud, interval, restInterval) {
            if (currentVid) {
                currentVid.muted = true;
                currentVid.play();
                
                //message: "Next Exercise: <exercise name>"
            }
            
            app.play.queueTicker(tickerAud, restInterval);

            var f1 = function() {
                app.play.endRestInterval(currentVid, nextVids, nextVidCounter, tickerAud, whistleAud, interval, restInterval);
            };
            setTimeout(f1, restInterval);
        }

        , endExercise: function(currentVid, nextVids, nextVidCounter, tickerAud, whistleAud, interval, restInterval) {
            currentVid.pause();
            tickerAud.pause();
            whistleAud.play();
           
            app.play.playRestInterval(nextVids[nextVidCounter], nextVids, nextVidCounter + 1, tickerAud, whistleAud, interval, restInterval);
        }

        , playExercise: function (currentVid, nextVids, nextVidCounter, tickerAud, whistleAud, interval, restInterval) {
            //message: "Go!"
            currentVid.muted = true;
            currentVid.play();
            app.play.queueTicker(tickerAud, interval);
            
            var f1 = function() {
                app.play.endExercise(currentVid, nextVids, nextVidCounter, tickerAud, whistleAud, interval, restInterval);
            };
            setTimeout(f1, interval);

        }

    }
};

$('body').on('click', '#StartButton', function() {
    app.play.playExercise(document.getElementById("vid1"), [document.getElementById("vid1"), document.getElementById("vid2"), document.getElementById("vid3")], 1, document.getElementById("tickAud"), document.getElementById("whistleAud"), 15000, 10000);
});

