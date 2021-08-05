const START = 1;
const STOP = 2;
const COMPLETE = 3;
class Maze {
  constructor() {
    this._state = STOP;
    this._init();
  }

  _init() {
    $("#start").click(() => this._startListener());
  }

  _startListener() {
    if (this._state !== START) {
      if (this._state === STOP) {
        function onLose() {
          if (this._state == START) {
            this._state = COMPLETE;
            this._onLoseListener();
          }
        }
        function onWin() {
          if (this._state == START) {
            this._state = COMPLETE;
            this._onWinListener();
          }
        }
        $(".boundary").mouseenter(() => onLose.call(this));
        $("#maze").mouseenter(() => onLose.call(this));
        $("#maze").mouseleave(() => onLose.call(this));
        $("#end").mouseenter(() => onWin.call(this));
      }
      this._state = START;
      this._onStartListener();
    }
  }

  onStart(callback) {
    this._onStartListener = callback;
  }
  onLose(callback) {
    this._onLoseListener = callback;
  }
  onWin(callback) {
    this._onWinListener = callback;
  }
}

$(function () {
  let maze = new Maze();
  maze.onStart(() => {
    $(".boundary").removeClass("boundary-lose").addClass("boundary-normal");
    $("#status").text('Click the "S" to begin.');
  });
  maze.onLose(() => {
    $(".boundary").addClass("boundary-lose").removeClass("boundary-normal");
    $("#status").text("Tooo Sad :( you lost! Click S to retry.");
  });
  maze.onWin(() => {
    $("#status").text("woooo hoooo, you win. Click S to start again :).");
  });
});
