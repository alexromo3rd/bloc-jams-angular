(function () {
  function SongPlayer(Fixtures) {
    var SongPlayer = {};

    /** 
    * @desc Buzz object audio file
    * @type {Object}
    */
    var currentBuzzObject = null;

    /**
    * @function setSong
    * @desc Stops currently playing song and loads new audio file as currentBuzzObject
    * @param {Object} song
    */
    var setSong = function(song) {
      if (currentBuzzObject) {
        stopSong(song);
      } 

      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });

      SongPlayer.currentSong = song;
    };

    var playSong = function(song) {
      if (currentBuzzObject) {
        currentBuzzObject.play();
        song.playing = true;
      }
    };

    /**
    * @function getSongIndex
    * @desc Gets the function of the currently playing song
    * @param {Object} song
    */
    var getSongIndex = function(song) {
      return SongPlayer.currentAlbum.songs.indexOf(song);
    };

    /**
    * @function stopSong
    * @desc Stops the song from playing
    * @param {Object} song
    */
    var stopSong = function(song) {
      currentBuzzObject.stop();
      SongPlayer.currentSong.playing = null;
    }

    /**
    * @desc Active song object from list of songs
    * @type {Object}
    */
    SongPlayer.currentSong = null;

    /**
    * @desc Stores current album information from Fixtures.js
    * @type {Object} album
    */
    SongPlayer.currentAlbum = Fixtures.getAlbum();

    SongPlayer.play = function(song) {
      song = song || SongPlayer.currentSong;
      if (SongPlayer.currentSong !== song) {
        setSong(song);
        playSong(song);
      } else if (SongPlayer.currentSong === song) {
        if (currentBuzzObject.isPaused()) {
          playSong(song);
        }
      }
    };

    SongPlayer.pause = function(song) {
      song = song || SongPlayer.currentSong;
      currentBuzzObject.pause();
      song.playing = false;
    };

    /**
    * @desc Function to get the current song index and decrease by 1
    * @type {Object}
    */
    SongPlayer.previous = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex--;

      if (currentSongIndex < 0) {
        stopSong(song);
      } else {
        var song = SongPlayer.currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }
    };

    /**
    * @desc Function to get the current song index and increase by 1
    * @type {Object}
    */
    SongPlayer.next = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex++;

      if (currentSongIndex > SongPlayer.currentAlbum.songs.length) {
        stopSong(song);
      } else {
        var song = SongPlayer.currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }
    };

    return SongPlayer;
  }
  
  angular
    .module('blocJams')
    .factory('SongPlayer', SongPlayer);
})();