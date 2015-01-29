#!/usr/bin/env node
var game = require('./lib/game');
var seeds = require('./lib/seeds');

game.play(seeds.default);
