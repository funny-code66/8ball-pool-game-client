// import * as PIXI from 'pixi.js'
// import SceneManager from './core/SceneManager'

import Clock from '@gamestdio/timer'
window.clock = new Clock();

import Tweener from 'tweener'
window.Tweener = Tweener
window.tweener = new Tweener();

// define endpoint based on environment
const endpoint = (window.location.hostname.indexOf("herokuapp") === -1)
  ? "ws://localhost:3555" // development (local)
  : `${window.location.protocol.replace("http", "ws")}//${window.location.hostname}` // production (remote)

import { Client } from 'colyseus.js'
window._colyseus = new Client(endpoint);

export default class CApplication {


}
