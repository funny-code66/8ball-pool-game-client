var CANVAS_WIDTH = 1920;
var CANVAS_HEIGHT = 1080;

var EDGEBOARD_X = 126;
var EDGEBOARD_Y = 100;

var FPS = 60;
var FPS_TIME = 1000 / FPS;
var DISABLE_SOUND_MOBILE = false;
var FONT_GAME = "Montserrat";
var PRIMARY_FONT_COLOR = '#fff';
var FONT_STROKE_COLOR = "rgba(0,0,0,0)";

var STATE_LOADING = 0;
var STATE_MENU = 1;
var STATE_GAME = 2;

var ON_MOUSE_DOWN = 0;
var ON_MOUSE_UP = 1;
var ON_MOUSE_OVER = 2;
var ON_MOUSE_OUT = 3;
var ON_BALL_INTO_HOLE = 4;
var ON_BALL_WITH_BALL = 5;
var ON_BALL_WITH_BANK = 6;
var ON_LOST = 7;
var ON_WON = 8;
var ON_RESTART = 9;
var ON_EXIT_GAME = 10;
var ON_SELECT_LANG = 11;

var SOUNDTRACK_VOLUME_DEFAULT = 1.0;
var SOUNDTRACK_VOLUME_IN_GAME = 0.1;

var GAME_MODE_EIGHT = 0;
var GAME_MODE_NINE = 1;
var GAME_MODE_TIME = 2;

var GAME_MODE_CPU = 0;
var GAME_MODE_TWO = 1;

var STATE_TABLE_PLACE_CUE_BALL_BREAKSHOT = 0;
var STATE_TABLE_PLACE_CUE_BALL = 1;
var STATE_TABLE_MOVE_STICK = 2;
var STATE_TABLE_SHOOT = 3;
var STATE_TABLE_SHOOTING = 4;

var COMMAND_STICK_MAX_SPEED = 5;
var COMMAND_STICK_SPEED_INCREMENT = 0.05;
var COMMAND_STICK_START_SPEED = 0.05;

var HAND_ANIM_NUM_FRAMES = 20;

var ON_CUE_PLACEABLE = 0;
var ON_CUE_NOT_PLACEABLE = 1;
var PREVISION_TRAJECTORY_COLORS = [
    ["#fff", "#f00"],
    ["#00f", "#f00"]
];

var EASY = 0;
var MEDIUM = 1;
var HARD = 2;

var GAME_DIFFICULTY_PARAMS = [];
GAME_DIFFICULTY_PARAMS[EASY] = [
    { max: 0.99, min: 0.9 },
    { max: 0.9, min: 0.85 },
    { max: 0.87, min: 0.8 },
    { max: 0.8, min: 0.75 },
    { max: 0.7, min: 0.6 }
];

GAME_DIFFICULTY_PARAMS[MEDIUM] = [
    { max: 0.99, min: 0.95 },
    { max: 0.97, min: 0.93 },
    { max: 0.9, min: 0.87 },
    { max: 0.85, min: 0.8 },
    { max: 0.83, min: 0.8 }
];

GAME_DIFFICULTY_PARAMS[HARD] = [
    { max: 0.99, min: 0.99 },
    { max: 0.99, min: 0.97 },
    { max: 0.97, min: 0.95 },
    { max: 0.95, min: 0.93 },
    { max: 0.93, min: 0.9 }
];

var TABLE_CENTER;
var TABLE_CENTER_COORDINATE;
var FIELD_POINTS = [
    { x: 88, y: 46 },// 0
    { x: 130, y: 81 },// 1
    { x: 607, y: 81 },// 2
    { x: 620, y: 32 },// 3
    { x: 659, y: 32 },// 4
    { x: 673, y: 81 },// 5
    { x: 1150, y: 81 },// 6
    { x: 1193, y: 44 },// 7
    { x: 1226, y: 77 },// 8
    { x: 1189, y: 121 },// 9
    { x: 1189, y: 591 },// 10
    { x: 1226, y: 636 },// 11
    { x: 1193, y: 667 },// 12
    { x: 1150, y: 631 },// 13
    { x: 673, y: 631 },// 14
    { x: 658, y: 679 },// 15
    { x: 622, y: 679 },// 16
    { x: 607, y: 631 },// 17
    { x: 130, y: 631 },// 18
    { x: 86, y: 665 },// 19
    { x: 55, y: 635 },// 20
    { x: 91, y: 592 },// 21
    { x: 91, y: 114 },// 22
    { x: 53, y: 74 }// 23
];
/*
var FIELD_POINTS = [
                    {x:88,  y:46},// 0
                    {x:123, y:81},// 1
                    {x:614, y:81},// 2
                    {x:620, y:32},// 3
                    {x:659, y:32},// 4
                    {x:666, y:81},// 5
                    {x:1157,y:81},// 6
                    {x:1193,y:44},// 7
                    {x:1226,y:77},// 8
                    {x:1189,y:114},// 9
                    {x:1189,y:598},// 10
                    {x:1226,y:636},// 11
                    {x:1193,y:667},// 12
                    {x:1157,y:630},// 13
                    {x:666, y:630},// 14
                    {x:658, y:679},// 15
                    {x:622, y:679},// 16
                    {x:614, y:630},// 17
                    {x:123, y:630},// 18
                    {x:86,  y:665},// 19
                    {x:55,  y:635},// 20
                    {x:91,  y:599},// 21
                    {x:91,  y:114},// 22
                    {x:53,  y:74}// 23
            ];
*/
var HOLE_POINT_TO_DETECT = [ // ID POINTS OF EDGE WHERE CLOSEST TO EDGE HOLE 
    [1, 22]
    [2, 5],
    [6, 9],
    [10, 13],
    [14, 17],
    [18, 21]
];

var HOLE_CENTER_POS = [
    { x: 91, y: 79 },
    { x: 640, y: 65 },
    { x: 1189, y: 84 },
    { x: 1189, y: 632 },
    { x: 640, y: 646 },
    { x: 91, y: 632 }
];

// var HOLE_CENTER_POS = [
//     { x: 95, y: 85 },
//     { x: 640, y: 72 },
//     { x: 1185, y: 88 },
//     { x: 1185, y: 628 },
//     { x: 640, y: 639 },
//     { x: 95, y: 628 }
// ];

var HOLE_CPU_POINTS = [
    { x: 105, y: 97 },
    { x: 640, y: 80 },
    { x: 1173, y: 97 },
    { x: 1173, y: 613 },
    { x: 640, y: 632 },
    { x: 105, y: 613 }
];

var MAX_FORCE_PER_DISTANCE = 850;

var TABLE_UPPER_BUMPER = [
    { x: 366, y: 63, sprite: "bumper_top_left", regX: 2, regY: 0 },
    { x: 915, y: 63, sprite: "bumper_top_right", regX: 2, regY: 0 },
    { x: 1206, y: 356, sprite: "bumper_right", regX: 1, regY: 2 },
    { x: 915, y: 649, sprite: "bumper_bottom_right", regX: 2, regY: 1 },
    { x: 366, y: 649, sprite: "bumper_bottom_left", regX: 2, regY: 1 },
    { x: 74, y: 356, sprite: "bumper_left", regX: 0, regY: 2 }
];

var POS_RAIL_EXIT = { x: 250, y: 742 };
var OFFSET_X_RAILS = new Array();
OFFSET_X_RAILS[GAME_MODE_EIGHT] = 890;
OFFSET_X_RAILS[GAME_MODE_NINE] = 890;
OFFSET_X_RAILS[GAME_MODE_TIME] = 890;
var TIME_RAILS = 5000;
var CUE_BALL_HIT_AREA_DIMENSION = 100;

var ON_PRESS_DOWN_BALL = "mousedown";
var ON_PRESS_MOVE_BALL = "pressmove";
var ON_PRESS_UP_BALL = "pressup";

var POOL_HOLE_RADIUS = 30;
var DIST_BALL_HOLE = 66;
var BALL_DIAMETER = 28;
var BALL_DIAMETER_QUADRO = Math.pow(BALL_DIAMETER, 2);
var BALL_RADIUS = BALL_DIAMETER / 2;
var BALL_RADIUS_QUADRO = Math.pow(BALL_RADIUS, 2);
var BALL_NUMBER;
var CUE_BALL_POS = { x: 357, y: 356 };
var CUE_BALL_RESPOT_1 = { x: 109, y: 102 };
var CUE_BALL_RESPOT_3 = { x: 1168, y: 616 };
var RACK_POS;

var STARTING_RACK_POS = new Array();
STARTING_RACK_POS[GAME_MODE_EIGHT] = [
    { x: 916, y: 356 },
    { x: 941, y: 370 },
    { x: 941, y: 342 },
    { x: 966, y: 384 },
    { x: 966, y: 356 },//BALL 8
    { x: 966, y: 328 },
    { x: 991, y: 398 },
    { x: 991, y: 370 },
    { x: 991, y: 342 },
    { x: 991, y: 314 },
    { x: 1016, y: 412 },
    { x: 1016, y: 384 },
    { x: 1016, y: 356 },
    { x: 1016, y: 328 },
    { x: 1016, y: 300 }
];

STARTING_RACK_POS[GAME_MODE_NINE] = [
    { x: 916, y: 356 },
    { x: 949, y: 376 },
    { x: 949, y: 335 },
    { x: 982, y: 396 },
    { x: 982, y: 356 },
    { x: 982, y: 316 },
    { x: 1015, y: 376 },
    { x: 1015, y: 335 },
    { x: 1048, y: 356 }
];

STARTING_RACK_POS[GAME_MODE_TIME] = [
    { x: 916, y: 356 },
    { x: 949, y: 376 },
    { x: 949, y: 335 },
    { x: 982, y: 396 },
    { x: 982, y: 356 },
    { x: 982, y: 316 },
    { x: 1015, y: 416 },
    { x: 1015, y: 376 },
    { x: 1015, y: 335 },
    { x: 1015, y: 295 },
    { x: 1048, y: 436 },
    { x: 1048, y: 396 },
    { x: 1048, y: 356 },
    { x: 1048, y: 316 },
    { x: 1048, y: 276 }
];

var RECT_COLLISION = new createjs.Rectangle(124, 117, 1037, 483);
var MAX_SPIN_VALUE = 50;
var K_IMPACT_BALL = 0.97;
var K_FRICTION = 0.985;
var K_MIN_FORCE = 0.016;
var MAX_POWER_SHOT = 200;
var MIN_POWER_SHOT = 10;
var MAX_POWER_FORCE_BALL = 40;

var MAX_BACK_SPIN_CUE_FORCE = 3;

var MAIN_TABLE_EDGE = [1, 5, 9, 13, 17, 21];

//THREE JS
var BALL_3D_DIAMETER = BALL_DIAMETER;
var TEXTURE_NAME = [
    { path: "sprites/textures/ball_0.jpg", name: "cue_ball" },
    { path: "sprites/textures/ball_1.jpg", name: "ball_1" },
    { path: "sprites/textures/ball_2.jpg", name: "ball_2" },
    { path: "sprites/textures/ball_3.jpg", name: "ball_3" },
    { path: "sprites/textures/ball_4.jpg", name: "ball_4" },
    { path: "sprites/textures/ball_5.jpg", name: "ball_5" },
    { path: "sprites/textures/ball_6.jpg", name: "ball_6" },
    { path: "sprites/textures/ball_7.jpg", name: "ball_7" },
    { path: "sprites/textures/ball_8.jpg", name: "ball_8" },
    { path: "sprites/textures/ball_9.jpg", name: "ball_9" },
    { path: "sprites/textures/ball_10.jpg", name: "ball_10" },
    { path: "sprites/textures/ball_11.jpg", name: "ball_11" },
    { path: "sprites/textures/ball_12.jpg", name: "ball_12" },
    { path: "sprites/textures/ball_13.jpg", name: "ball_13" },
    { path: "sprites/textures/ball_14.jpg", name: "ball_14" },
    { path: "sprites/textures/ball_15.jpg", name: "ball_15" }
];

var BALL_Z_POSITION = 50;
var DAMPING_BALL_EFFECT = 0.9;

//DEBUG
var DEBUG_SHOW_2D_SPRITE = false;
var DEBUG_SHOW_TABLE_CENTER_SHAPE = false;
var DEBUG_SHOW_HOLE_CENTER_POS_SHAPE = false;
var DEBUG_SHOW_EDGE_TABLE = false;
var DEBUG_SHOW_RECT_COLLISION = false;
var DEBUG_SHOW_CPU_BALL_TRAJECTORY = false;
var DEBUG_SHOW_PREDICT_TRAJECTORY_COLLISION = false;
var SHOW_TRAJECTORY_UNSUCCESSFUL_SHOTS = false;

var TIME_ANIMATION_SHOT_ELASTIC = 1500;
var TIME_ANIMATION_SHOT_BACK = 300;
var ADD_POINT_RATIO_EVERY_SHOT_EDGE_COLLISION = 1;

var ENABLE_FULLSCREEN;
var ENABLE_CHECK_ORIENTATION;
var POINTS_FOR_BALL_POT;
var POINTS_FOR_FAULT;

var NUM_LANGUAGES = 7;
var LANG_EN = 0;
var LANG_ES = 1;
var LANG_FR = 2;
var LANG_DE = 3;
var LANG_PT = 4;
var LANG_IT = 5;
var LANG_RU = 6;

var LANG_CODES = {};
LANG_CODES["en"] = LANG_EN;
LANG_CODES["es"] = LANG_ES;
LANG_CODES["fr"] = LANG_FR;
LANG_CODES["de"] = LANG_DE;
LANG_CODES["pt"] = LANG_PT;
LANG_CODES["it"] = LANG_IT;
LANG_CODES["ru"] = LANG_RU;

