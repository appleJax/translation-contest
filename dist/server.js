require("source-map-support").install();
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var twitterUtils = __webpack_require__(17);

var utils = __webpack_require__(4);

module.exports = _extends({}, twitterUtils, utils);

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _slicedToArray(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return _sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

var MongoClient = __webpack_require__(12).MongoClient;

var url = process.env.MONGODB_URI;
var DB = process.env.MONGO_DB;

var _require = __webpack_require__(13),
    processUpload = _require.processUpload;

var _require2 = __webpack_require__(0),
    tryCatch = _require2.tryCatch;

module.exports = {
  getRandomQuestion: function getRandomQuestion() {
    return new Promise(
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(resolve, reject) {
        var mongo, newCards, oldCards, randomCard;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return tryCatch(MongoClient.connect(url));

              case 2:
                mongo = _context.sent;
                newCards = mongo.db(DB).collection('newCards');
                oldCards = mongo.db(DB).collection('oldCards');
                _context.next = 7;
                return tryCatch(newCards.findOne());

              case 7:
                randomCard = _context.sent;

                if (!(randomCard == null)) {
                  _context.next = 11;
                  break;
                }

                reject(new Error("Empty deck. Please Add More Cards to DB."));
                return _context.abrupt("return");

              case 11:
                _context.next = 13;
                return tryCatch(oldCards.insert(randomCard));

              case 13:
                _context.next = 15;
                return tryCatch(newCards.remove(randomCard));

              case 15:
                resolve(randomCard);
                mongo.close();

              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }());
  },
  revealAnswerWorkflow: function revealAnswerWorkflow(cardId) {
    return new Promise(
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(resolve, reject) {
        var mongo, oldCards, answerCard;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return tryCatch(MongoClient.connect(url));

              case 2:
                mongo = _context2.sent;
                oldCards = mongo.db(DB).collection('oldCards');
                _context2.next = 6;
                return tryCatch(oldCards.findOne({
                  cardId: cardId
                }));

              case 6:
                answerCard = _context2.sent;
                resolve(answerCard);
                _context2.next = 10;
                return tryCatch(removeLiveQuestion(mongo, cardId));

              case 10:
                mongo.close();

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function (_x3, _x4) {
        return _ref2.apply(this, arguments);
      };
    }());
  },
  addLiveQuestion: function () {
    var _addLiveQuestion = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(record, mediaUrls) {
      var cardId, mongo, liveQuestions, oldCards;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              cardId = record.cardId;
              _context3.next = 3;
              return tryCatch(MongoClient.connect(url));

            case 3:
              mongo = _context3.sent;
              liveQuestions = mongo.db(DB).collection('liveQuestions');
              oldCards = mongo.db(DB).collection('oldCards');
              _context3.next = 8;
              return tryCatch(liveQuestions.insert(_extends({}, record, {
                mediaUrls: mediaUrls
              })));

            case 8:
              _context3.next = 10;
              return tryCatch(oldCards.updateOne({
                cardId: cardId
              }, {
                $set: {
                  mediaUrls: mediaUrls
                },
                $unset: {
                  questionImg: '',
                  prevLineImg: ''
                }
              }));

            case 10:
              mongo.close();

            case 11:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    return function addLiveQuestion(_x5, _x6) {
      return _addLiveQuestion.apply(this, arguments);
    };
  }(),
  addMediaUrlsToCard: function () {
    var _addMediaUrlsToCard = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4(cardId, _ref3) {
      var _ref4, mediaUrl, mongo, oldCards;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _ref4 = _slicedToArray(_ref3, 1), mediaUrl = _ref4[0];
              _context4.next = 3;
              return tryCatch(MongoClient.connect(url));

            case 3:
              mongo = _context4.sent;
              oldCards = mongo.db(DB).collection('oldCards');
              _context4.next = 7;
              return tryCatch(oldCards.updateOne({
                cardId: cardId
              }, {
                $push: {
                  mediaUrls: mediaUrl
                },
                $unset: {
                  answerImg: ''
                }
              }));

            case 7:
              mongo.close();

            case 8:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    return function addMediaUrlsToCard(_x7, _x8) {
      return _addMediaUrlsToCard.apply(this, arguments);
    };
  }(),
  updateLiveQuestion: function () {
    var _updateLiveQuestion = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5(questionId, userPoints) {
      var mongo, liveQuestions, userId, points, update;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return tryCatch(MongoClient.connect(url));

            case 2:
              mongo = _context5.sent;
              liveQuestions = mongo.db(DB).collection('liveQuestions');
              userId = userPoints.userId, points = userPoints.points;
              update = {
                $push: {
                  alreadyAnswered: userId
                }
              };
              if (points > 0) update.$push.cachedPoints = userPoints;
              _context5.next = 9;
              return tryCatch(liveQuestions.update({
                questionId: questionId
              }, update));

            case 9:
              mongo.close();

            case 10:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    return function updateLiveQuestion(_x9, _x10) {
      return _updateLiveQuestion.apply(this, arguments);
    };
  }(),
  getLiveQuestions: function getLiveQuestions() {
    return new Promise(
    /*#__PURE__*/
    function () {
      var _ref5 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(resolve, reject) {
        var mongo, collection, liveQuestions;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return tryCatch(MongoClient.connect(url));

              case 2:
                mongo = _context6.sent;
                collection = mongo.db(DB).collection('liveQuestions');
                _context6.next = 6;
                return tryCatch(collection.find().toArray());

              case 6:
                liveQuestions = _context6.sent;
                resolve(liveQuestions);
                mongo.close();

              case 9:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      return function (_x11, _x12) {
        return _ref5.apply(this, arguments);
      };
    }());
  },
  addOrUpdateUser: function () {
    var _addOrUpdateUser = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee7(newUser) {
      var mongo, scoreboard, userId, user, _scoreboard$updateOne, name, handle, avatar, profileBanner, following;

      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return tryCatch(MongoClient.connect(url));

            case 2:
              mongo = _context7.sent;
              scoreboard = mongo.db(DB).collection('scoreboard');
              userId = newUser.userId;
              _context7.next = 7;
              return tryCatch(scoreboard.findOne({
                userId: userId
              }));

            case 7:
              user = _context7.sent;

              if (!user) {
                _context7.next = 14;
                break;
              }

              name = newUser.name, handle = newUser.handle, avatar = newUser.avatar, profileBanner = newUser.profileBanner, following = newUser.following;
              _context7.next = 12;
              return tryCatch(scoreboard.updateOne({
                userId: userId
              }, (_scoreboard$updateOne = {
                $set: {
                  name: name
                }
              }, _defineProperty(_scoreboard$updateOne, "$set", {
                handle: handle
              }), _defineProperty(_scoreboard$updateOne, "$set", {
                avatar: avatar
              }), _defineProperty(_scoreboard$updateOne, "$set", {
                profileBanner: profileBanner
              }), _defineProperty(_scoreboard$updateOne, "$set", {
                following: following
              }), _scoreboard$updateOne)));

            case 12:
              _context7.next = 16;
              break;

            case 14:
              _context7.next = 16;
              return tryCatch(scoreboard.insert(newUser));

            case 16:
              mongo.close();

            case 17:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    return function addOrUpdateUser(_x13) {
      return _addOrUpdateUser.apply(this, arguments);
    };
  }(),
  adjustScore: function adjustScore(req, res) {// TODO adjust a score manually
  },
  getScores: function () {
    var _getScores = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee8(req, res) {
      var mongo, collection, data;
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return tryCatch(MongoClient.connect(url));

            case 2:
              mongo = _context8.sent;
              collection = mongo.db(DB).collection('scoreboard');
              _context8.next = 6;
              return tryCatch(collection.find().sort('weeklyScore', -1).project({
                '_id': 0
              }).toArray());

            case 6:
              data = _context8.sent;
              res.json(data);
              mongo.close();

            case 9:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, this);
    }));

    return function getScores(_x14, _x15) {
      return _getScores.apply(this, arguments);
    };
  }(),
  // TODO - delete this method if not needed
  getScore: function () {
    var _getScore = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee9(req, res) {
      var handle, mongo, collection, user;
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              handle = req.params.handle;
              _context9.next = 3;
              return tryCatch(MongoClient.connect(url));

            case 3:
              mongo = _context9.sent;
              collection = mongo.db(DB).collection('scoreboard');
              _context9.next = 7;
              return tryCatch(collection.findOne({
                handle: handle
              }));

            case 7:
              user = _context9.sent;
              res.json(user);
              mongo.close();

            case 10:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, this);
    }));

    return function getScore(_x16, _x17) {
      return _getScore.apply(this, arguments);
    };
  }(),
  addDeck: function () {
    var _addDeck = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee10(req, res) {
      var filePath, newCards, mongo, collection, batch, i;
      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              filePath = req.file.path;
              _context10.next = 3;
              return tryCatch(processUpload(filePath));

            case 3:
              newCards = _context10.sent;
              _context10.next = 6;
              return tryCatch(MongoClient.connect(url));

            case 6:
              mongo = _context10.sent;
              collection = mongo.db(DB).collection('newCards');
              batch = collection.initializeUnorderedBulkOp();

              for (i = 0; i < newCards.length; ++i) {
                batch.insert(newCards[i]);
              }

              _context10.next = 12;
              return tryCatch(batch.execute());

            case 12:
              mongo.close();
              res.redirect('/');

            case 14:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10, this);
    }));

    return function addDeck(_x18, _x19) {
      return _addDeck.apply(this, arguments);
    };
  }(),
  getNewCards: function getNewCards(req, res) {
    getCollection(req, res, 'newCards');
  },
  getOldCards: function getOldCards(req, res) {
    getCollection(req, res, 'oldCards');
  },
  weeklyMonthlyReset: function () {
    var _weeklyMonthlyReset = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee11(resetWeeklyScore, resetMonthlyScore) {
      var mongo, collection, reset;
      return regeneratorRuntime.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _context11.next = 2;
              return tryCatch(MongoClient.connect(url));

            case 2:
              mongo = _context11.sent;
              collection = mongo.db(DB).collection('scoreboard');
              if (resetWeeklyScore && resetMonthlyScore) reset = _defineProperty({
                $set: {
                  weeklyScore: 0
                }
              }, "$set", {
                monthlyScore: 0
              });else if (resetWeeklyScore) reset = {
                $set: {
                  weeklyScore: 0
                }
              };else reset = {
                $set: {
                  monthlyScore: 0
                }
              };
              collection.update({}, reset, {
                multi: true
              });
              mongo.close();

            case 7:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11, this);
    }));

    return function weeklyMonthlyReset(_x20, _x21) {
      return _weeklyMonthlyReset.apply(this, arguments);
    };
  }(),
  getCards: function () {
    var _getCards = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee12(req, res) {
      var ids, mongo, collection, data;
      return regeneratorRuntime.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              ids = req.query.ids;
              _context12.next = 3;
              return tryCatch(MongoClient.connect(url));

            case 3:
              mongo = _context12.sent;
              collection = mongo.db(DB).collection('oldCards');
              _context12.next = 7;
              return tryCatch(collection.find({
                cardId: {
                  $in: ids
                }
              }).project({
                _id: 0,
                mediaUrls: 1
              }).toArray());

            case 7:
              data = _context12.sent;
              res.json(data);
              mongo.close();

            case 10:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12, this);
    }));

    return function getCards(_x22, _x23) {
      return _getCards.apply(this, arguments);
    };
  }()
}; // module.exports

function getCollection(_x24, _x25, _x26) {
  return _getCollection.apply(this, arguments);
}

function _getCollection() {
  _getCollection = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee15(req, res, collectionName) {
    var mongo, collection, data;
    return regeneratorRuntime.wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            _context15.next = 2;
            return tryCatch(MongoClient.connect(url));

          case 2:
            mongo = _context15.sent;
            collection = mongo.db(DB).collection(collectionName);
            _context15.next = 6;
            return tryCatch(collection.find().project({
              _id: 0
            }).toArray());

          case 6:
            data = _context15.sent;
            res.json(data);
            mongo.close();

          case 9:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15, this);
  }));
  return _getCollection.apply(this, arguments);
}

function removeLiveQuestion(mongo, cardId) {
  return new Promise(
  /*#__PURE__*/
  function () {
    var _ref6 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee13(resolve, reject) {
      var collection, currentQuestion;
      return regeneratorRuntime.wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              collection = mongo.db(DB).collection('liveQuestions');
              _context13.next = 3;
              return tryCatch(collection.findOne({
                cardId: cardId
              }));

            case 3:
              currentQuestion = _context13.sent;
              _context13.next = 6;
              return tryCatch(collection.remove(currentQuestion));

            case 6:
              _context13.next = 8;
              return tryCatch(addPointsToScoreboard(mongo, currentQuestion));

            case 8:
              resolve();

            case 9:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13, this);
    }));

    return function (_x27, _x28) {
      return _ref6.apply(this, arguments);
    };
  }());
}

function addPointsToScoreboard(mongo, _ref7) {
  var cachedPoints = _ref7.cachedPoints,
      cardId = _ref7.cardId;
  return new Promise(
  /*#__PURE__*/
  function () {
    var _ref8 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee14(resolve, reject) {
      var scoreboard, oldCards, answerPostedAt, ops, i, _cachedPoints$i, userId, points;

      return regeneratorRuntime.wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              scoreboard = mongo.db(DB).collection('scoreboard');
              oldCards = mongo.db(DB).collection('oldCards');
              answerPostedAt = new Date().getTime();
              oldCards.updateOne({
                cardId: cardId
              }, {
                $set: {
                  answerPostedAt: answerPostedAt
                }
              });
              ops = [];

              for (i = 0; i < cachedPoints.length; ++i) {
                _cachedPoints$i = cachedPoints[i], userId = _cachedPoints$i.userId, points = _cachedPoints$i.points;
                ops.push({
                  updateOne: {
                    "filter": {
                      userId: userId
                    },
                    "update": {
                      $inc: {
                        score: points,
                        weeklyScore: points,
                        monthlyScore: points
                      },
                      $push: {
                        correctAnswers: {
                          answerPostedAt: answerPostedAt,
                          cardId: cardId,
                          points: points
                        }
                      }
                    }
                  }
                });
              }

              if (!(ops.length === 0)) {
                _context14.next = 9;
                break;
              }

              resolve();
              return _context14.abrupt("return");

            case 9:
              _context14.next = 11;
              return tryCatch(scoreboard.bulkWrite(ops));

            case 11:
              resolve();

            case 12:
            case "end":
              return _context14.stop();
          }
        }
      }, _callee14, this);
    }));

    return function (_x29, _x30) {
      return _ref8.apply(this, arguments);
    };
  }());
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var twit = __webpack_require__(18);

var _process$env = process.env,
    TWITTER_API_KEY = _process$env.TWITTER_API_KEY,
    TWITTER_API_SECRET = _process$env.TWITTER_API_SECRET,
    TWITTER_TOKEN = _process$env.TWITTER_TOKEN,
    TWITTER_TOKEN_SECRET = _process$env.TWITTER_TOKEN_SECRET,
    TWITTER_ACCOUNT = _process$env.TWITTER_ACCOUNT; // const appConfig = {
//   consumer_key: TWITTER_API_KEY,
//   consumer_secret: TWITTER_API_SECRET,
//   app_only_auth: true
// }

var userConfig = {
  consumer_key: TWITTER_API_KEY,
  consumer_secret: TWITTER_API_SECRET,
  access_token: TWITTER_TOKEN,
  access_token_secret: TWITTER_TOKEN_SECRET
};
module.exports = new twit(userConfig);

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

function _readOnlyError(name) { throw new Error("\"" + name + "\" is read-only"); }

function _sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _slicedToArray(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return _sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }

var urlencode = __webpack_require__(19);

var WEBLOOKUP_URL = 'https://ejje.weblio.jp/content/';
var TWITTER_ACCOUNT = process.env.TWITTER_ACCOUNT;
var HOURS = 3600000;
module.exports = {
  HOURS: HOURS,
  formatQuestionAltText: function formatQuestionAltText(expression) {
    var hint = formatHint(expression);

    var _minMaxChars = minMaxChars(hint),
        _minMaxChars2 = _slicedToArray(_minMaxChars, 2),
        min = _minMaxChars2[0],
        max = _minMaxChars2[1];

    var minMax = min === max ? min : "".concat(min, " to ").concat(max);
    var s = max > 1 ? 's' : '';
    var screenReaderHint = "(".concat(minMax, " character").concat(s, ")");
    return expression.replace(/\{\{.+?\}\}/g, screenReaderHint);
  },
  formatQuestionText: function formatQuestionText(expression, engMeaning, notes, cardID) {
    var hint = formatHint(expression);

    var _minMaxChars3 = minMaxChars(hint),
        _minMaxChars4 = _slicedToArray(_minMaxChars3, 2),
        min = _minMaxChars4[0],
        max = _minMaxChars4[1];

    var minMax = min === max ? min : "".concat(min, "-").concat(max);
    var tweetText = "What ".concat(minMax, " character answer means \"").concat(engMeaning, "\"?");
    if (needsHint(hint)) tweetText += "\nHint: ".concat(hint);
    if (notes) tweetText += "\nNotes: ".concat(notes);
    tweetText += "\nQID".concat(cardID);
    return tweetText;
  },
  formatAnswerAltText: function formatAnswerAltText(expression) {
    return expression.replace(/\{\{.*?\:\:(.+?)\:\:.*?\}\}/g, '$1');
  },
  formatAnswerText: function formatAnswerText(answers, engMeaning, webLookup, cardId) {
    var s = answers.length > 1 ? 's' : '';
    var answerText = "Answer".concat(s, ": ").concat(answers.join(', '));
    answerText += "\nEnglish Meaning: \"".concat(engMeaning, "\"");
    answerText += '\nDefinition: ' + WEBLOOKUP_URL + urlencode(webLookup);
    answerText += "\nQID".concat(cardId);
    return answerText;
  },
  addQuestionLink: function addQuestionLink(answerText, questionId) {
    var questionLink = "Question: twitter.com/".concat(TWITTER_ACCOUNT, "/status/").concat(questionId);
    var lines = answerText.split('\n');
    lines.splice(-1, 0, questionLink);
    return lines.join('\n');
  },
  getAnswers: function getAnswers(expression, altAnswers) {
    var acceptedAnswer = expression.match(/\:\:(.+?)\:\:/)[1];
    var otherAnswers = [];
    if (altAnswers && altAnswers.length > 0) otherAnswers = altAnswers.split(',');
    return [acceptedAnswer].concat(otherAnswers);
  },
  calculateScore: function calculateScore(answerPostedAt, _ref) {
    var questionPostedAt = _ref.questionPostedAt,
        alreadyAnswered = _ref.alreadyAnswered;
    var timeToAnswer = Math.floor((new Date(answerPostedAt) - new Date(questionPostedAt)) / HOURS);
    var score = 24 - timeToAnswer;
    return Math.max(score, 0);
  },
  extractAnswer: function extractAnswer(text) {
    return text.trim().slice(TWITTER_ACCOUNT.length + 2);
  },
  getTimeUntil: function getTimeUntil(hour) {
    // https://stackoverflow.com/questions/4455282/call-a-javascript-function-at-a-specific-time-of-day
    var now = new Date();
    var millisUntilTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, 0, 0, 0) - now;
    if (millisUntilTime < 0) // already passed for today, wait until tomorrow
      millisUntilTime += (_readOnlyError("millisUntilTime"), 24 * HOURS);
    return millisUntilTime;
  },
  tryCatch: function tryCatch(promise) {
    return promise.then(function (data) {
      return data;
    }).catch(function (err) {
      console.error('Error:', err);
      return {};
    });
  },
  contains: function contains(item, list) {
    return valid(list.indexOf(item));
  }
}; // module.exports

function valid(index) {
  return index !== -1;
}

function needsHint(hint) {
  return hint.replace(/\[\]/g, '').trim().length !== 0;
}

function maxChars(hint) {
  var missingCharRegex = /\[.*?\]/g;
  var missingChars = (hint.match(missingCharRegex) || []).length;
  var gimmeChars = hint.replace(missingCharRegex, '').replace(/[\s+\(\)]/g, '').length;
  return missingChars + gimmeChars;
}

function minChars(hint) {
  var optionalChars = (hint.match(/\?/g) || []).length;
  return maxChars(hint) - optionalChars;
}

function minMaxChars(hint) {
  return [minChars(hint), maxChars(hint)];
}

function formatHint(expression) {
  var legend = expression.match(/\:\:.+?\:\:(.+?)\}\}/)[1];
  var normalized = groupMultiXs(groupXs(groupQuestionMarks(legend)));
  return flatten(split(normalized)).map(function (group) {
    if (group === '.') return '[]';
    if (group === '-') return '[] [] [] [] []';

    if (/\?/.test(group)) {
      var result = [];
      var numChars = Number(group.match(/\d+/)[0]);

      for (var i = 0; i < numChars; i++) {
        result.push('[?]');
      }

      if (result.length === 1) return '[?]';
      return '(' + result.join(' ') + ')';
    }

    if (/≠/.test(group)) {
      var negatedChars = group.replace(/≠/g, '');
      return "[\u2260".concat(negatedChars, "]");
    } // else (character gimme)


    return group;
  }).join(' ');
}

function groupQuestionMarks(string) {
  return string.replace(/(\?+)/g, function (match, p1) {
    return "(".concat(p1.length, "?)");
  });
}

function groupXs(string) {
  return string.replace(/≠[^(]/g, '($&)');
}

function groupMultiXs(string) {
  return string.replace(/≠\((.*)\)/g, '(≠$1)');
}

function split(str) {
  return str.split(/[\(\)]/).map(function (group) {
    return /\?|≠/.test(group) ? group : group.split('');
  });
}

function scalar(v) {
  return !Array.isArray(v);
}

function flatten(deep) {
  var flat = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  if (deep.length === 0) return flat;

  var _deep = _toArray(deep),
      head = _deep[0],
      tail = _deep.slice(1);

  return scalar(head) ? flatten(tail, flat.concat(head)) : flatten(tail, flat.concat(flatten(head)));
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(6);
module.exports = __webpack_require__(7);


/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

if (true) __webpack_require__(8).config();

var express = __webpack_require__(9);

var app = express();

var path = __webpack_require__(1);

var bodyParser = __webpack_require__(10);

var twitterBot = __webpack_require__(11);

app.set('port', process.env.PORT || 3000);
app.use(express.static(path.resolve(__dirname, '../dist')));
app.use(bodyParser.json());

__webpack_require__(20)(app);

twitterBot.start();
app.listen(app.get('port'), function () {
  return console.log('Listening on port', app.get('port'));
});
exports = module.exports = app;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

var DB = __webpack_require__(2);

var _require = __webpack_require__(0),
    HOURS = _require.HOURS,
    addQuestionLink = _require.addQuestionLink,
    calculateScore = _require.calculateScore,
    contains = _require.contains,
    extractAnswer = _require.extractAnswer,
    getFollowing = _require.getFollowing,
    getTimeUntil = _require.getTimeUntil,
    postMedia = _require.postMedia,
    tryCatch = _require.tryCatch;

var Twitter = __webpack_require__(3);

var TWITTER_ACCOUNT = process.env.TWITTER_ACCOUNT;
var ANSWER_INTERVAL = 60000;
var QUESTION_INTERVAL = 5000;
module.exports = {
  start: function start() {
    openStream();
    setInterval(tweetRandomQuestion, QUESTION_INTERVAL);
  } // start: () => {
  //   openStream();
  //   setStartTimes();
  // }

};

function setStartTimes() {
  var timeUntil7PM = getTimeUntil(19);
  var timeUntilMidnight = getTimeUntil(0);
  setTimeout(function () {
    setInterval(tweetRandomQuestion, QUESTION_INTERVAL);
  }, timeUntil7PM);
  setTimeout(function () {
    setInterval(weeklyMonthlyReset, 24 * HOURS);
  }, timeUntilMidnight);
}

function tweetRandomQuestion() {
  return _tweetRandomQuestion.apply(this, arguments);
}

function _tweetRandomQuestion() {
  _tweetRandomQuestion = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    var _ref3, cardId, questionText, questionImg, questionAltText, prevLineImg, prevLineAltText, answers, _ref4, questionId, questionPostedAt, mediaUrls, liveQuestion;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return tryCatch(DB.getRandomQuestion());

          case 2:
            _ref3 = _context2.sent;
            cardId = _ref3.cardId;
            questionText = _ref3.questionText;
            questionImg = _ref3.questionImg;
            questionAltText = _ref3.questionAltText;
            prevLineImg = _ref3.prevLineImg;
            prevLineAltText = _ref3.prevLineAltText;
            answers = _ref3.answers;

            if (cardId) {
              _context2.next = 12;
              break;
            }

            return _context2.abrupt("return");

          case 12:
            _context2.next = 14;
            return tryCatch(postMedia(questionText, questionImg, questionAltText, prevLineImg, prevLineAltText));

          case 14:
            _ref4 = _context2.sent;
            questionId = _ref4.questionId;
            questionPostedAt = _ref4.questionPostedAt;
            mediaUrls = _ref4.mediaUrls;
            liveQuestion = {
              cardId: cardId,
              questionId: questionId,
              questionText: questionText,
              answers: answers,
              questionPostedAt: questionPostedAt,
              cachedPoints: [],
              alreadyAnswered: []
            };
            DB.addLiveQuestion(liveQuestion, mediaUrls);
            setTimeout(function () {
              return tweetAnswer(cardId, questionId);
            }, ANSWER_INTERVAL);

          case 21:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));
  return _tweetRandomQuestion.apply(this, arguments);
}

function tweetAnswer(_x, _x2) {
  return _tweetAnswer.apply(this, arguments);
}

function _tweetAnswer() {
  _tweetAnswer = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(cardId, questionId) {
    var _ref5, answerText, answerImg, answerAltText, _ref6, mediaUrls;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return tryCatch( // EFFECTS:
            // - removes question from liveQuestions
            // - adds cached points to scoreboard
            //
            // RETURNS:
            // AnswerCard
            DB.revealAnswerWorkflow(cardId));

          case 2:
            _ref5 = _context3.sent;
            answerText = _ref5.answerText;
            answerImg = _ref5.answerImg;
            answerAltText = _ref5.answerAltText;
            _context3.next = 8;
            return tryCatch(postMedia(addQuestionLink(answerText, questionId), answerImg, answerAltText));

          case 8:
            _ref6 = _context3.sent;
            mediaUrls = _ref6.mediaUrls;
            DB.addMediaUrlsToCard(cardId, mediaUrls);

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));
  return _tweetAnswer.apply(this, arguments);
}

function openStream() {
  var stream = Twitter.stream('statuses/filter', {
    track: "@".concat(TWITTER_ACCOUNT)
  });
  stream.on('tweet',
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(_ref) {
      var questionId, answerPostedAt, text, _ref$user, userId, name, handle, avatar, profileBanner, liveQuestions, foundQuestion, alreadyAnswered, acceptedAnswers, userAnswer, points, following, newUser;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              questionId = _ref.in_reply_to_status_id_str, answerPostedAt = _ref.created_at, text = _ref.text, _ref$user = _ref.user, userId = _ref$user.id, name = _ref$user.name, handle = _ref$user.screen_name, avatar = _ref$user.profile_image_url_https, profileBanner = _ref$user.profile_banner_url;
              _context.next = 3;
              return tryCatch(DB.getLiveQuestions());

            case 3:
              liveQuestions = _context.sent;
              foundQuestion = liveQuestions.filter(function (obj) {
                return obj.questionId === questionId;
              })[0];

              if (!foundQuestion) {
                _context.next = 21;
                break;
              }

              alreadyAnswered = foundQuestion.alreadyAnswered, acceptedAnswers = foundQuestion.answers;

              if (!contains(userId, alreadyAnswered)) {
                _context.next = 9;
                break;
              }

              return _context.abrupt("return");

            case 9:
              userAnswer = extractAnswer(text);

              if (!contains(userAnswer, acceptedAnswers)) {
                _context.next = 20;
                break;
              }

              points = calculateScore(answerPostedAt, foundQuestion);
              _context.next = 14;
              return tryCatch(getFollowing(userId));

            case 14:
              following = _context.sent;
              newUser = {
                userId: userId,
                name: name,
                handle: handle,
                avatar: avatar,
                profileBanner: profileBanner,
                following: following,
                score: 0,
                monthlyScore: 0,
                weeklyScore: 0,
                correctAnswers: []
              };
              DB.addOrUpdateUser(newUser);
              DB.updateLiveQuestion(questionId, {
                userId: userId,
                points: points
              });
              _context.next = 21;
              break;

            case 20:
              DB.updateLiveQuestion(questionId, {
                userId: userId,
                points: 0
              });

            case 21:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function (_x3) {
      return _ref2.apply(this, arguments);
    };
  }());
  stream.on('disconnect', function (disconnectMsg) {
    console.error('Tweet stream disconnected:', disconnectMsg);
    setTimeout(function () {
      return stream.start();
    }, 100);
  });
}

function weeklyMonthlyReset() {
  var now = Date.now();
  var resetWeeklyScore = now.getDay() === 0;
  var resetMonthlyScore = now.getDate() === 1;
  if (resetWeeklyScore || resetMonthlyScore) DB.weeklyMonthlyReset(resetWeeklyScore, resetMonthlyScore);
}

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("mongodb");

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

function _sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _slicedToArray(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return _sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

var fs = __webpack_require__(14);

var PNG = __webpack_require__(15).PNG;

var path = __webpack_require__(1);

var unzip = __webpack_require__(16);

var UPLOADS_PATH = path.resolve(__dirname, '../uploads');

var _require = __webpack_require__(0),
    formatQuestionAltText = _require.formatQuestionAltText,
    formatQuestionText = _require.formatQuestionText,
    formatAnswerAltText = _require.formatAnswerAltText,
    formatAnswerText = _require.formatAnswerText,
    getAnswers = _require.getAnswers,
    tryCatch = _require.tryCatch;

module.exports = {
  processUpload: processUpload,
  parseAnkiJson: parseAnkiJson,
  optimizeImages: optimizeImages
};

function processUpload(zipfilePath) {
  return new Promise(
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(resolve, reject) {
      var stream;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              stream = fs.createReadStream(zipfilePath).pipe(unzip.Extract({
                path: 'uploads'
              }));
              stream.on('close',
              /*#__PURE__*/
              _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee() {
                var files, newCards;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        files = fs.readdirSync(UPLOADS_PATH);
                        _context.next = 3;
                        return tryCatch(optimizeImages(UPLOADS_PATH + '/media'));

                      case 3:
                        console.log('Finished optimizing images!');
                        newCards = extractCardInfo(files);
                        cleanUp(files);
                        resolve(newCards);

                      case 7:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, this);
              })));

            case 2:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
}

function optimizeImages(dirPath) {
  return new Promise(function (resolve, reject) {
    var filesProcessing = [];
    fs.readdirSync(dirPath).forEach(function (file) {
      if (/.*\.png$/.test(file)) {
        var currentFile = dirPath + "/" + file;
        var contents = fs.readFileSync(currentFile);
        var writeStream = fs.createWriteStream(currentFile);
        var currentImage = new Promise(function (res, rej) {
          return writeStream.on('close', res);
        });
        filesProcessing.push(currentImage);
        new PNG({
          filterType: 4,
          deflateLevel: 1
        }).parse(contents, function (err, png) {
          // Give upper left pixel an opacity
          // of 254 so Twitter won't convert
          // to jpeg
          png.data[3] -= 1;
          png.pack().pipe(writeStream);
        });
      }
    });
    Promise.all(filesProcessing).then(resolve);
  });
}

function extractCardInfo(files) {
  var allNewCards = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = files[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _file = _step.value;
      var currentFile = "".concat(UPLOADS_PATH, "/").concat(_file);
      var stats = fs.statSync(currentFile);

      if (stats.isFile() && _file.match(/.+\.json$/)) {
        var newCards = parseAnkiJson(currentFile);
        allNewCards = allNewCards.concat(newCards);
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return allNewCards;
}

function parseAnkiJson(filePath) {
  var contents = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  return contents.notes.map(function (card) {
    var _card$fields = _slicedToArray(card.fields, 14),
        expression = _card$fields[0],
        // reading,
    // japMeaning,
    engMeaning = _card$fields[3],
        // officialEng,
    questionImg = _card$fields[5],
        answerImg = _card$fields[6],
        // audio
    prevLineImg = _card$fields[8],
        prevLineAltText = _card$fields[9],
        altAnswers = _card$fields[10],
        webLookup = _card$fields[11],
        // use for every answer so people can look up pronunciation
    // https://ejje.weblio.jp/content/[webLookup (e.g. 切り換える)]
    notes = _card$fields[12],
        cardId = _card$fields[13];

    var _map = [expression, engMeaning, notes].map(stripHtml);

    var _map2 = _slicedToArray(_map, 3);

    expression = _map2[0];
    engMeaning = _map2[1];
    notes = _map2[2];
    var answers = getAnswers(expression, altAnswers);
    return {
      cardId: cardId,
      questionText: formatQuestionText(expression, engMeaning, notes, cardId),
      questionImg: getBase64(questionImg),
      questionAltText: formatQuestionAltText(expression),
      prevLineImg: getBase64(prevLineImg),
      prevLineAltText: prevLineAltText,
      answerText: formatAnswerText(answers, engMeaning, webLookup, cardId),
      answerImg: getBase64(answerImg),
      answerAltText: formatAnswerAltText(expression),
      answers: answers,
      mediaUrls: []
    };
  });
}

function stripHtml(string) {
  return string.replace(/<.*?>|&.*;/g, '');
}

function getSrc(string) {
  return (string.match(/src="(.+)"/) || [,])[1];
}

function getBase64(string) {
  if (!string || string.length === 0) return;
  var base64;

  try {
    base64 = fs.readFileSync("".concat(UPLOADS_PATH, "/media/").concat(getSrc(string)), {
      encoding: 'base64'
    });
  } catch (e) {// returning undefined...
  }

  return base64;
}

function cleanUp(files) {
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = files[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var _file2 = _step2.value;
      var root = "".concat(UPLOADS_PATH, "/").concat(_file2);
      if (fs.lstatSync(root).isFile()) fs.unlinkSync(root);else if (fs.lstatSync(root).isDirectory()) deleteFolderRecursive(root);
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }
}

function deleteFolderRecursive(rootPath) {
  if (fs.existsSync(rootPath)) {
    fs.readdirSync(rootPath).forEach(function (file) {
      var curPath = rootPath + "/" + file;

      if (fs.lstatSync(curPath).isDirectory()) {
        // recurse
        deleteFolderRecursive(curPath);
      } else {
        // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(rootPath);
  }
}

;

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("pngjs2");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("unzip-stream");

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

var Twitter = __webpack_require__(3);

var _require = __webpack_require__(4),
    tryCatch = _require.tryCatch;

module.exports = {
  //
  // post a tweet with media
  //
  postMedia: function postMedia(status, b64Image1, altText1, b64Image2, altText2) {
    return new Promise(
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(resolve, reject) {
        var mediaId1, media_ids, mediaId2, params;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return tryCatch(uploadMedia(b64Image1, altText1));

              case 2:
                mediaId1 = _context.sent;
                media_ids = [mediaId1];

                if (!b64Image2) {
                  _context.next = 9;
                  break;
                }

                _context.next = 7;
                return tryCatch(uploadMedia(b64Image2, altText2));

              case 7:
                mediaId2 = _context.sent;
                media_ids.unshift(mediaId2);

              case 9:
                params = {
                  status: status,
                  media_ids: media_ids,
                  tweet_mode: 'extended',
                  include_ext_alt_text: true
                };
                Twitter.post('statuses/update', params, function (err, data, response) {
                  if (err) {
                    console.error(err);
                    reject(new Error("Posting status failed."));
                  }

                  ;
                  console.log('Ext entities:', data.extended_entities.media);
                  var mediaUrls = data.extended_entities.media.map(function (obj) {
                    return {
                      image: obj.media_url_https,
                      altText: obj.ext_alt_text
                    };
                  });
                  var result = {
                    questionId: data.id_str,
                    questionPostedAt: data.created_at,
                    mediaUrls: mediaUrls
                  };
                  resolve(result);
                });

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }());
  },
  getFollowing: function getFollowing(userId) {
    return new Promise(function (resolve, reject) {
      Twitter.get('friends/ids', {
        userId: userId
      }, function (err, data, response) {
        if (err) console.error(err);
        resolve(data.ids);
      });
    });
  }
}; // module.exports
// EFFECTS:
// uploads a single image with altText to Twitter
//
// RETURNS:
// media_id which is necessary for
// attaching media to a tweet
//

function uploadMedia(b64Image, altText) {
  return new Promise(function (resolve, reject) {
    // first we must post the media to Twitter
    Twitter.post('media/upload', {
      media_data: b64Image
    }, function (err, data, response) {
      if (err) {
        console.error(err);
        reject(new Error("Media upload failed."));
        return;
      } // now we can assign alt text to the media, for use by screen readers and
      // other text-based presentations and interpreters


      var mediaIdStr = data.media_id_string;
      var meta_params = {
        media_id: mediaIdStr,
        alt_text: {
          text: altText
        }
      };
      Twitter.post('media/metadata/create', meta_params, function (err, data, response) {
        if (err) {
          console.error(err);
          reject(new Error("Media upload succeeded, media creation failed."));
        } // now we can reference the media and post a tweet (media will attach to the tweet)


        resolve(mediaIdStr);
      });
    });
  });
}

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("twit");

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("urlencode");

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var DB = __webpack_require__(2);

var upload = __webpack_require__(21)({
  dest: 'uploads/'
});

module.exports = function (app) {
  // CORS
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.header('Access-Control-Max-Age', '86400'); // 24 hours

    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
  app.get('/api/live', function (req, res) {
    res.json(DB.getLiveQuestions());
  });
  app.get('/api/scores', function (req, res) {
    DB.getScores(req, res);
  });
  app.get('/api/cards', function (req, res) {
    DB.getCards(req, res);
  }); // TODO - Delete this endpoint if not needed

  app.get('/api/score/:handle', function (req, res) {
    DB.getScore(req, res);
  });
  app.get('/api/cards/old', function (req, res) {
    DB.getOldCards(req, res);
  }); // TODO - add authentication to following endpoints

  app.post('/deck/new', upload.single('zipfile'), function (req, res) {
    DB.addDeck(req, res);
  });
  app.post('/scores/edit', function (req, res) {
    DB.adjustScore(req, res);
  });
  app.get('/cards/new', function (req, res) {
    DB.getNewCards(req, res);
  });
}; // module.exports

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("multer");

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgY2RlYjc5N2E5NDdjNjJkNTQ5MmYiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL2luZGV4LmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcInBhdGhcIiIsIndlYnBhY2s6Ly8vLi9zcmMvZGJPcHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3R3aXR0ZXJDb25maWcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL3V0aWxzLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImJhYmVsLXBvbHlmaWxsXCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJkb3RlbnZcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJleHByZXNzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYm9keS1wYXJzZXJcIiIsIndlYnBhY2s6Ly8vLi9zcmMvdHdpdHRlckJvdC5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtb25nb2RiXCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2Nlc3NBbmtpSnNvbi5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJmc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcInBuZ2pzMlwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInVuemlwLXN0cmVhbVwiIiwid2VicGFjazovLy8uL3NyYy91dGlscy90d2l0dGVyVXRpbHMuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidHdpdFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInVybGVuY29kZVwiIiwid2VicGFjazovLy8uL3NyYy9hcGkuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibXVsdGVyXCIiXSwibmFtZXMiOlsidHdpdHRlclV0aWxzIiwicmVxdWlyZSIsInV0aWxzIiwibW9kdWxlIiwiZXhwb3J0cyIsIk1vbmdvQ2xpZW50IiwidXJsIiwicHJvY2VzcyIsImVudiIsIk1PTkdPREJfVVJJIiwiREIiLCJNT05HT19EQiIsInByb2Nlc3NVcGxvYWQiLCJ0cnlDYXRjaCIsImdldFJhbmRvbVF1ZXN0aW9uIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJjb25uZWN0IiwibW9uZ28iLCJuZXdDYXJkcyIsImRiIiwiY29sbGVjdGlvbiIsIm9sZENhcmRzIiwiZmluZE9uZSIsInJhbmRvbUNhcmQiLCJFcnJvciIsImluc2VydCIsInJlbW92ZSIsImNsb3NlIiwicmV2ZWFsQW5zd2VyV29ya2Zsb3ciLCJjYXJkSWQiLCJhbnN3ZXJDYXJkIiwicmVtb3ZlTGl2ZVF1ZXN0aW9uIiwiYWRkTGl2ZVF1ZXN0aW9uIiwicmVjb3JkIiwibWVkaWFVcmxzIiwibGl2ZVF1ZXN0aW9ucyIsInVwZGF0ZU9uZSIsIiRzZXQiLCIkdW5zZXQiLCJxdWVzdGlvbkltZyIsInByZXZMaW5lSW1nIiwiYWRkTWVkaWFVcmxzVG9DYXJkIiwibWVkaWFVcmwiLCIkcHVzaCIsImFuc3dlckltZyIsInVwZGF0ZUxpdmVRdWVzdGlvbiIsInF1ZXN0aW9uSWQiLCJ1c2VyUG9pbnRzIiwidXNlcklkIiwicG9pbnRzIiwidXBkYXRlIiwiYWxyZWFkeUFuc3dlcmVkIiwiY2FjaGVkUG9pbnRzIiwiZ2V0TGl2ZVF1ZXN0aW9ucyIsImZpbmQiLCJ0b0FycmF5IiwiYWRkT3JVcGRhdGVVc2VyIiwibmV3VXNlciIsInNjb3JlYm9hcmQiLCJ1c2VyIiwibmFtZSIsImhhbmRsZSIsImF2YXRhciIsInByb2ZpbGVCYW5uZXIiLCJmb2xsb3dpbmciLCJhZGp1c3RTY29yZSIsInJlcSIsInJlcyIsImdldFNjb3JlcyIsInNvcnQiLCJwcm9qZWN0IiwiZGF0YSIsImpzb24iLCJnZXRTY29yZSIsInBhcmFtcyIsImFkZERlY2siLCJmaWxlUGF0aCIsImZpbGUiLCJwYXRoIiwiYmF0Y2giLCJpbml0aWFsaXplVW5vcmRlcmVkQnVsa09wIiwiaSIsImxlbmd0aCIsImV4ZWN1dGUiLCJyZWRpcmVjdCIsImdldE5ld0NhcmRzIiwiZ2V0Q29sbGVjdGlvbiIsImdldE9sZENhcmRzIiwid2Vla2x5TW9udGhseVJlc2V0IiwicmVzZXRXZWVrbHlTY29yZSIsInJlc2V0TW9udGhseVNjb3JlIiwicmVzZXQiLCJ3ZWVrbHlTY29yZSIsIm1vbnRobHlTY29yZSIsIm11bHRpIiwiZ2V0Q2FyZHMiLCJpZHMiLCJxdWVyeSIsIiRpbiIsIl9pZCIsImNvbGxlY3Rpb25OYW1lIiwiY3VycmVudFF1ZXN0aW9uIiwiYWRkUG9pbnRzVG9TY29yZWJvYXJkIiwiYW5zd2VyUG9zdGVkQXQiLCJEYXRlIiwiZ2V0VGltZSIsIm9wcyIsInB1c2giLCIkaW5jIiwic2NvcmUiLCJjb3JyZWN0QW5zd2VycyIsImJ1bGtXcml0ZSIsInR3aXQiLCJUV0lUVEVSX0FQSV9LRVkiLCJUV0lUVEVSX0FQSV9TRUNSRVQiLCJUV0lUVEVSX1RPS0VOIiwiVFdJVFRFUl9UT0tFTl9TRUNSRVQiLCJUV0lUVEVSX0FDQ09VTlQiLCJ1c2VyQ29uZmlnIiwiY29uc3VtZXJfa2V5IiwiY29uc3VtZXJfc2VjcmV0IiwiYWNjZXNzX3Rva2VuIiwiYWNjZXNzX3Rva2VuX3NlY3JldCIsInVybGVuY29kZSIsIldFQkxPT0tVUF9VUkwiLCJIT1VSUyIsImZvcm1hdFF1ZXN0aW9uQWx0VGV4dCIsImV4cHJlc3Npb24iLCJoaW50IiwiZm9ybWF0SGludCIsIm1pbk1heENoYXJzIiwibWluIiwibWF4IiwibWluTWF4IiwicyIsInNjcmVlblJlYWRlckhpbnQiLCJyZXBsYWNlIiwiZm9ybWF0UXVlc3Rpb25UZXh0IiwiZW5nTWVhbmluZyIsIm5vdGVzIiwiY2FyZElEIiwidHdlZXRUZXh0IiwibmVlZHNIaW50IiwiZm9ybWF0QW5zd2VyQWx0VGV4dCIsImZvcm1hdEFuc3dlclRleHQiLCJhbnN3ZXJzIiwid2ViTG9va3VwIiwiYW5zd2VyVGV4dCIsImpvaW4iLCJhZGRRdWVzdGlvbkxpbmsiLCJxdWVzdGlvbkxpbmsiLCJsaW5lcyIsInNwbGl0Iiwic3BsaWNlIiwiZ2V0QW5zd2VycyIsImFsdEFuc3dlcnMiLCJhY2NlcHRlZEFuc3dlciIsIm1hdGNoIiwib3RoZXJBbnN3ZXJzIiwiY29uY2F0IiwiY2FsY3VsYXRlU2NvcmUiLCJxdWVzdGlvblBvc3RlZEF0IiwidGltZVRvQW5zd2VyIiwiTWF0aCIsImZsb29yIiwiZXh0cmFjdEFuc3dlciIsInRleHQiLCJ0cmltIiwic2xpY2UiLCJnZXRUaW1lVW50aWwiLCJob3VyIiwibm93IiwibWlsbGlzVW50aWxUaW1lIiwiZ2V0RnVsbFllYXIiLCJnZXRNb250aCIsImdldERhdGUiLCJwcm9taXNlIiwidGhlbiIsImNhdGNoIiwiY29uc29sZSIsImVycm9yIiwiZXJyIiwiY29udGFpbnMiLCJpdGVtIiwibGlzdCIsInZhbGlkIiwiaW5kZXhPZiIsImluZGV4IiwibWF4Q2hhcnMiLCJtaXNzaW5nQ2hhclJlZ2V4IiwibWlzc2luZ0NoYXJzIiwiZ2ltbWVDaGFycyIsIm1pbkNoYXJzIiwib3B0aW9uYWxDaGFycyIsImxlZ2VuZCIsIm5vcm1hbGl6ZWQiLCJncm91cE11bHRpWHMiLCJncm91cFhzIiwiZ3JvdXBRdWVzdGlvbk1hcmtzIiwiZmxhdHRlbiIsIm1hcCIsImdyb3VwIiwidGVzdCIsInJlc3VsdCIsIm51bUNoYXJzIiwiTnVtYmVyIiwibmVnYXRlZENoYXJzIiwic3RyaW5nIiwicDEiLCJzdHIiLCJzY2FsYXIiLCJ2IiwiQXJyYXkiLCJpc0FycmF5IiwiZGVlcCIsImZsYXQiLCJoZWFkIiwidGFpbCIsImNvbmZpZyIsImV4cHJlc3MiLCJhcHAiLCJib2R5UGFyc2VyIiwidHdpdHRlckJvdCIsInNldCIsIlBPUlQiLCJ1c2UiLCJzdGF0aWMiLCJfX2Rpcm5hbWUiLCJzdGFydCIsImxpc3RlbiIsImdldCIsImxvZyIsImdldEZvbGxvd2luZyIsInBvc3RNZWRpYSIsIlR3aXR0ZXIiLCJBTlNXRVJfSU5URVJWQUwiLCJRVUVTVElPTl9JTlRFUlZBTCIsIm9wZW5TdHJlYW0iLCJzZXRJbnRlcnZhbCIsInR3ZWV0UmFuZG9tUXVlc3Rpb24iLCJzZXRTdGFydFRpbWVzIiwidGltZVVudGlsN1BNIiwidGltZVVudGlsTWlkbmlnaHQiLCJzZXRUaW1lb3V0IiwicXVlc3Rpb25UZXh0IiwicXVlc3Rpb25BbHRUZXh0IiwicHJldkxpbmVBbHRUZXh0IiwibGl2ZVF1ZXN0aW9uIiwidHdlZXRBbnN3ZXIiLCJhbnN3ZXJBbHRUZXh0Iiwic3RyZWFtIiwidHJhY2siLCJvbiIsImluX3JlcGx5X3RvX3N0YXR1c19pZF9zdHIiLCJjcmVhdGVkX2F0IiwiaWQiLCJzY3JlZW5fbmFtZSIsInByb2ZpbGVfaW1hZ2VfdXJsX2h0dHBzIiwicHJvZmlsZV9iYW5uZXJfdXJsIiwiZm91bmRRdWVzdGlvbiIsImZpbHRlciIsIm9iaiIsImFjY2VwdGVkQW5zd2VycyIsInVzZXJBbnN3ZXIiLCJkaXNjb25uZWN0TXNnIiwiZ2V0RGF5IiwiZnMiLCJQTkciLCJ1bnppcCIsIlVQTE9BRFNfUEFUSCIsInBhcnNlQW5raUpzb24iLCJvcHRpbWl6ZUltYWdlcyIsInppcGZpbGVQYXRoIiwiY3JlYXRlUmVhZFN0cmVhbSIsInBpcGUiLCJFeHRyYWN0IiwiZmlsZXMiLCJyZWFkZGlyU3luYyIsImV4dHJhY3RDYXJkSW5mbyIsImNsZWFuVXAiLCJkaXJQYXRoIiwiZmlsZXNQcm9jZXNzaW5nIiwiZm9yRWFjaCIsImN1cnJlbnRGaWxlIiwiY29udGVudHMiLCJyZWFkRmlsZVN5bmMiLCJ3cml0ZVN0cmVhbSIsImNyZWF0ZVdyaXRlU3RyZWFtIiwiY3VycmVudEltYWdlIiwicmVqIiwiZmlsdGVyVHlwZSIsImRlZmxhdGVMZXZlbCIsInBhcnNlIiwicG5nIiwicGFjayIsImFsbCIsImFsbE5ld0NhcmRzIiwic3RhdHMiLCJzdGF0U3luYyIsImlzRmlsZSIsIkpTT04iLCJjYXJkIiwiZmllbGRzIiwic3RyaXBIdG1sIiwiZ2V0QmFzZTY0IiwiZ2V0U3JjIiwiYmFzZTY0IiwiZW5jb2RpbmciLCJlIiwicm9vdCIsImxzdGF0U3luYyIsInVubGlua1N5bmMiLCJpc0RpcmVjdG9yeSIsImRlbGV0ZUZvbGRlclJlY3Vyc2l2ZSIsInJvb3RQYXRoIiwiZXhpc3RzU3luYyIsImN1clBhdGgiLCJybWRpclN5bmMiLCJzdGF0dXMiLCJiNjRJbWFnZTEiLCJhbHRUZXh0MSIsImI2NEltYWdlMiIsImFsdFRleHQyIiwidXBsb2FkTWVkaWEiLCJtZWRpYUlkMSIsIm1lZGlhX2lkcyIsIm1lZGlhSWQyIiwidW5zaGlmdCIsInR3ZWV0X21vZGUiLCJpbmNsdWRlX2V4dF9hbHRfdGV4dCIsInBvc3QiLCJyZXNwb25zZSIsImV4dGVuZGVkX2VudGl0aWVzIiwibWVkaWEiLCJpbWFnZSIsIm1lZGlhX3VybF9odHRwcyIsImFsdFRleHQiLCJleHRfYWx0X3RleHQiLCJpZF9zdHIiLCJiNjRJbWFnZSIsIm1lZGlhX2RhdGEiLCJtZWRpYUlkU3RyIiwibWVkaWFfaWRfc3RyaW5nIiwibWV0YV9wYXJhbXMiLCJtZWRpYV9pZCIsImFsdF90ZXh0IiwidXBsb2FkIiwiZGVzdCIsIm5leHQiLCJoZWFkZXIiLCJzaW5nbGUiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7OztBQzdEQSxJQUFNQSxlQUFlLG1CQUFBQyxDQUFRLEVBQVIsQ0FBckI7O0FBQ0EsSUFBTUMsUUFBUSxtQkFBQUQsQ0FBUSxDQUFSLENBQWQ7O0FBRUFFLE9BQU9DLE9BQVAsZ0JBQ0tKLFlBREwsRUFFS0UsS0FGTCxFOzs7Ozs7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RUFBb0JDLEdBQXBCO0FBQ0QsR0FGRDtBQUlBeUosTUFBSVUsR0FBSixDQUFRLFlBQVIsRUFBc0IsVUFBQ3BLLEdBQUQsRUFBTUMsR0FBTixFQUFjO0FBQ2xDM0QsT0FBRzZFLFdBQUgsQ0FBZW5CLEdBQWYsRUFBb0JDLEdBQXBCO0FBQ0QsR0FGRDtBQUlELENBaERELEMsQ0FnREUsaUI7Ozs7OztBQ25ERixtQyIsImZpbGUiOiJzZXJ2ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA1KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBjZGViNzk3YTk0N2M2MmQ1NDkyZiIsImNvbnN0IHR3aXR0ZXJVdGlscyA9IHJlcXVpcmUoJy4vdHdpdHRlclV0aWxzJyk7XG5jb25zdCB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIC4uLnR3aXR0ZXJVdGlscyxcbiAgLi4udXRpbHNcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy91dGlscy9pbmRleC5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBhdGhcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJwYXRoXCJcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgTW9uZ29DbGllbnQgPSByZXF1aXJlKCdtb25nb2RiJykuTW9uZ29DbGllbnQ7XG5jb25zdCB1cmwgPSBwcm9jZXNzLmVudi5NT05HT0RCX1VSSTtcbmNvbnN0IERCID0gcHJvY2Vzcy5lbnYuTU9OR09fREI7XG5jb25zdCB7IHByb2Nlc3NVcGxvYWQgfSA9IHJlcXVpcmUoJy4vcHJvY2Vzc0Fua2lKc29uJyk7XG5jb25zdCB7IHRyeUNhdGNoIH0gPSByZXF1aXJlKCdVdGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZ2V0UmFuZG9tUXVlc3Rpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IG1vbmdvID0gYXdhaXQgdHJ5Q2F0Y2goTW9uZ29DbGllbnQuY29ubmVjdCh1cmwpKTtcbiAgICAgIGNvbnN0IG5ld0NhcmRzID0gbW9uZ28uZGIoREIpLmNvbGxlY3Rpb24oJ25ld0NhcmRzJyk7XG4gICAgICBjb25zdCBvbGRDYXJkcyA9IG1vbmdvLmRiKERCKS5jb2xsZWN0aW9uKCdvbGRDYXJkcycpO1xuICAgICAgY29uc3QgcmFuZG9tQ2FyZCA9IGF3YWl0IHRyeUNhdGNoKG5ld0NhcmRzLmZpbmRPbmUoKSk7XG4gICAgICBpZiAocmFuZG9tQ2FyZCA9PSBudWxsKSB7XG4gICAgICAgIHJlamVjdChuZXcgRXJyb3IoXCJFbXB0eSBkZWNrLiBQbGVhc2UgQWRkIE1vcmUgQ2FyZHMgdG8gREIuXCIpKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXdhaXQgdHJ5Q2F0Y2gob2xkQ2FyZHMuaW5zZXJ0KHJhbmRvbUNhcmQpKTtcbiAgICAgIGF3YWl0IHRyeUNhdGNoKG5ld0NhcmRzLnJlbW92ZShyYW5kb21DYXJkKSk7XG4gICAgICByZXNvbHZlKHJhbmRvbUNhcmQpO1xuICAgICAgbW9uZ28uY2xvc2UoKTtcbiAgICB9KTtcbiAgfSxcblxuICByZXZlYWxBbnN3ZXJXb3JrZmxvdyhjYXJkSWQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgbW9uZ28gPSBhd2FpdCB0cnlDYXRjaChNb25nb0NsaWVudC5jb25uZWN0KHVybCkpO1xuICAgICAgY29uc3Qgb2xkQ2FyZHMgPSBtb25nby5kYihEQikuY29sbGVjdGlvbignb2xkQ2FyZHMnKTtcbiAgICAgIGNvbnN0IGFuc3dlckNhcmQgPSBhd2FpdCB0cnlDYXRjaChvbGRDYXJkcy5maW5kT25lKHsgY2FyZElkIH0pKTtcbiAgICAgIHJlc29sdmUoYW5zd2VyQ2FyZCk7XG4gICAgICBhd2FpdCB0cnlDYXRjaChyZW1vdmVMaXZlUXVlc3Rpb24obW9uZ28sIGNhcmRJZCkpO1xuICAgICAgbW9uZ28uY2xvc2UoKTtcbiAgICB9KTtcbiAgfSxcblxuICBhc3luYyBhZGRMaXZlUXVlc3Rpb24ocmVjb3JkLCBtZWRpYVVybHMpIHtcbiAgICBjb25zdCB7IGNhcmRJZCB9ID0gcmVjb3JkO1xuICAgIGNvbnN0IG1vbmdvID0gYXdhaXQgdHJ5Q2F0Y2goTW9uZ29DbGllbnQuY29ubmVjdCh1cmwpKTtcbiAgICBjb25zdCBsaXZlUXVlc3Rpb25zID0gbW9uZ28uZGIoREIpLmNvbGxlY3Rpb24oJ2xpdmVRdWVzdGlvbnMnKTtcbiAgICBjb25zdCBvbGRDYXJkcyA9IG1vbmdvLmRiKERCKS5jb2xsZWN0aW9uKCdvbGRDYXJkcycpO1xuICAgIGF3YWl0IHRyeUNhdGNoKGxpdmVRdWVzdGlvbnMuaW5zZXJ0KHtcbiAgICAgIC4uLnJlY29yZCxcbiAgICAgIG1lZGlhVXJsc1xuICAgIH0pKTtcbiAgICBhd2FpdCB0cnlDYXRjaChcbiAgICAgIG9sZENhcmRzLnVwZGF0ZU9uZShcbiAgICAgICAge2NhcmRJZH0sXG4gICAgICAgIHtcbiAgICAgICAgICAkc2V0OiB7IG1lZGlhVXJscyB9LFxuICAgICAgICAgICR1bnNldDogeyBxdWVzdGlvbkltZzogJycsIHByZXZMaW5lSW1nOiAnJyB9XG4gICAgICAgIH1cbiAgICAgIClcbiAgICApXG4gICAgbW9uZ28uY2xvc2UoKTtcbiAgfSxcblxuICBhc3luYyBhZGRNZWRpYVVybHNUb0NhcmQoY2FyZElkLCBbbWVkaWFVcmxdKSB7XG4gICAgY29uc3QgbW9uZ28gPSBhd2FpdCB0cnlDYXRjaChNb25nb0NsaWVudC5jb25uZWN0KHVybCkpO1xuICAgIGNvbnN0IG9sZENhcmRzID0gbW9uZ28uZGIoREIpLmNvbGxlY3Rpb24oJ29sZENhcmRzJyk7XG4gICAgYXdhaXQgdHJ5Q2F0Y2goXG4gICAgICBvbGRDYXJkcy51cGRhdGVPbmUoXG4gICAgICAgIHtjYXJkSWR9LFxuICAgICAgICB7XG4gICAgICAgICAgJHB1c2g6IHsgbWVkaWFVcmxzOiBtZWRpYVVybCB9LFxuICAgICAgICAgICR1bnNldDogeyBhbnN3ZXJJbWc6ICcnIH1cbiAgICAgICAgfVxuICAgICAgKVxuICAgIClcbiAgICBtb25nby5jbG9zZSgpO1xuICB9LFxuXG4gIGFzeW5jIHVwZGF0ZUxpdmVRdWVzdGlvbihxdWVzdGlvbklkLCB1c2VyUG9pbnRzKSB7XG4gICAgY29uc3QgbW9uZ28gPSBhd2FpdCB0cnlDYXRjaChNb25nb0NsaWVudC5jb25uZWN0KHVybCkpO1xuICAgIGNvbnN0IGxpdmVRdWVzdGlvbnMgPSBtb25nby5kYihEQikuY29sbGVjdGlvbignbGl2ZVF1ZXN0aW9ucycpO1xuICAgIGNvbnN0IHsgdXNlcklkLCBwb2ludHMgfSA9IHVzZXJQb2ludHM7XG4gICAgY29uc3QgdXBkYXRlID0ge1xuICAgICAgJHB1c2g6IHtcbiAgICAgICAgYWxyZWFkeUFuc3dlcmVkOiB1c2VySWQsXG4gICAgICB9XG4gICAgfTtcblxuICAgIGlmIChwb2ludHMgPiAwKVxuICAgICAgdXBkYXRlLiRwdXNoLmNhY2hlZFBvaW50cyA9IHVzZXJQb2ludHM7XG5cbiAgICBhd2FpdCB0cnlDYXRjaChcbiAgICAgIGxpdmVRdWVzdGlvbnMudXBkYXRlKHtxdWVzdGlvbklkfSwgdXBkYXRlKVxuICAgICk7XG4gICAgbW9uZ28uY2xvc2UoKTtcbiAgfSxcblxuICBnZXRMaXZlUXVlc3Rpb25zKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBtb25nbyA9IGF3YWl0IHRyeUNhdGNoKE1vbmdvQ2xpZW50LmNvbm5lY3QodXJsKSk7XG4gICAgICBjb25zdCBjb2xsZWN0aW9uID0gbW9uZ28uZGIoREIpLmNvbGxlY3Rpb24oJ2xpdmVRdWVzdGlvbnMnKTtcbiAgICAgIGNvbnN0IGxpdmVRdWVzdGlvbnMgPSBhd2FpdCB0cnlDYXRjaChjb2xsZWN0aW9uLmZpbmQoKS50b0FycmF5KCkpO1xuICAgICAgcmVzb2x2ZShsaXZlUXVlc3Rpb25zKTtcbiAgICAgIG1vbmdvLmNsb3NlKCk7XG4gICAgfSk7XG4gIH0sXG5cbiAgYXN5bmMgYWRkT3JVcGRhdGVVc2VyKG5ld1VzZXIpIHtcbiAgICBjb25zdCBtb25nbyA9IGF3YWl0IHRyeUNhdGNoKE1vbmdvQ2xpZW50LmNvbm5lY3QodXJsKSk7XG4gICAgY29uc3Qgc2NvcmVib2FyZCA9IG1vbmdvLmRiKERCKS5jb2xsZWN0aW9uKCdzY29yZWJvYXJkJyk7XG4gICAgY29uc3QgeyB1c2VySWQgfSA9IG5ld1VzZXI7XG4gICAgY29uc3QgdXNlciA9IGF3YWl0IHRyeUNhdGNoKHNjb3JlYm9hcmQuZmluZE9uZSh7dXNlcklkfSkpO1xuICAgIGlmICh1c2VyKSB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIG5hbWUsXG4gICAgICAgIGhhbmRsZSxcbiAgICAgICAgYXZhdGFyLFxuICAgICAgICBwcm9maWxlQmFubmVyLFxuICAgICAgICBmb2xsb3dpbmdcbiAgICAgIH0gPSBuZXdVc2VyO1xuXG4gICAgICBhd2FpdCB0cnlDYXRjaChcbiAgICAgICAgc2NvcmVib2FyZC51cGRhdGVPbmUoeyB1c2VySWQgfSwge1xuICAgICAgICAgICAgJHNldDogeyBuYW1lIH0sXG4gICAgICAgICAgICAkc2V0OiB7IGhhbmRsZSB9LFxuICAgICAgICAgICAgJHNldDogeyBhdmF0YXIgfSxcbiAgICAgICAgICAgICRzZXQ6IHsgcHJvZmlsZUJhbm5lciB9LFxuICAgICAgICAgICAgJHNldDogeyBmb2xsb3dpbmcgfVxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXdhaXQgdHJ5Q2F0Y2goc2NvcmVib2FyZC5pbnNlcnQobmV3VXNlcikpO1xuICAgIH1cbiAgICBtb25nby5jbG9zZSgpO1xuICB9LFxuXG4gIGFkanVzdFNjb3JlKHJlcSwgcmVzKSB7XG4gICAgLy8gVE9ETyBhZGp1c3QgYSBzY29yZSBtYW51YWxseVxuICB9LFxuXG4gIGFzeW5jIGdldFNjb3JlcyhyZXEsIHJlcykge1xuICAgIGNvbnN0IG1vbmdvID0gYXdhaXQgdHJ5Q2F0Y2goTW9uZ29DbGllbnQuY29ubmVjdCh1cmwpKTtcbiAgICBjb25zdCBjb2xsZWN0aW9uID0gbW9uZ28uZGIoREIpLmNvbGxlY3Rpb24oJ3Njb3JlYm9hcmQnKTtcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgdHJ5Q2F0Y2goXG4gICAgICBjb2xsZWN0aW9uLmZpbmQoKVxuICAgICAgICAgICAgICAgIC5zb3J0KCd3ZWVrbHlTY29yZScsIC0xKVxuICAgICAgICAgICAgICAgIC5wcm9qZWN0KHsnX2lkJzogMH0pXG4gICAgICAgICAgICAgICAgLnRvQXJyYXkoKVxuICAgICk7XG4gICAgcmVzLmpzb24oZGF0YSk7XG4gICAgbW9uZ28uY2xvc2UoKTtcbiAgfSxcblxuICAvLyBUT0RPIC0gZGVsZXRlIHRoaXMgbWV0aG9kIGlmIG5vdCBuZWVkZWRcbiAgYXN5bmMgZ2V0U2NvcmUocmVxLCByZXMpIHtcbiAgICBjb25zdCB7IGhhbmRsZSB9ID0gcmVxLnBhcmFtcztcbiAgICBjb25zdCBtb25nbyA9IGF3YWl0IHRyeUNhdGNoKE1vbmdvQ2xpZW50LmNvbm5lY3QodXJsKSk7XG4gICAgY29uc3QgY29sbGVjdGlvbiA9IG1vbmdvLmRiKERCKS5jb2xsZWN0aW9uKCdzY29yZWJvYXJkJyk7XG4gICAgY29uc3QgdXNlciA9IGF3YWl0IHRyeUNhdGNoKGNvbGxlY3Rpb24uZmluZE9uZSh7aGFuZGxlfSkpO1xuICAgIHJlcy5qc29uKHVzZXIpO1xuICAgIG1vbmdvLmNsb3NlKCk7XG4gIH0sXG5cbiAgYXN5bmMgYWRkRGVjayhyZXEsIHJlcykge1xuICAgIGNvbnN0IGZpbGVQYXRoID0gcmVxLmZpbGUucGF0aDtcbiAgICBjb25zdCBuZXdDYXJkcyA9IGF3YWl0IHRyeUNhdGNoKHByb2Nlc3NVcGxvYWQoZmlsZVBhdGgpKTtcbiAgICBjb25zdCBtb25nbyA9IGF3YWl0IHRyeUNhdGNoKE1vbmdvQ2xpZW50LmNvbm5lY3QodXJsKSk7XG4gICAgY29uc3QgY29sbGVjdGlvbiA9IG1vbmdvLmRiKERCKS5jb2xsZWN0aW9uKCduZXdDYXJkcycpO1xuICAgIGNvbnN0IGJhdGNoID0gY29sbGVjdGlvbi5pbml0aWFsaXplVW5vcmRlcmVkQnVsa09wKCk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5ld0NhcmRzLmxlbmd0aDsgKytpKSB7XG4gICAgICBiYXRjaC5pbnNlcnQobmV3Q2FyZHNbaV0pO1xuICAgIH1cblxuICAgIGF3YWl0IHRyeUNhdGNoKGJhdGNoLmV4ZWN1dGUoKSk7XG4gICAgbW9uZ28uY2xvc2UoKTtcblxuICAgIHJlcy5yZWRpcmVjdCgnLycpO1xuICB9LFxuXG4gIGdldE5ld0NhcmRzKHJlcSwgcmVzKSB7XG4gICAgZ2V0Q29sbGVjdGlvbihyZXEsIHJlcywgJ25ld0NhcmRzJyk7XG4gIH0sXG5cbiAgZ2V0T2xkQ2FyZHMocmVxLCByZXMpIHtcbiAgICBnZXRDb2xsZWN0aW9uKHJlcSwgcmVzLCAnb2xkQ2FyZHMnKTtcbiAgfSxcblxuICBhc3luYyB3ZWVrbHlNb250aGx5UmVzZXQocmVzZXRXZWVrbHlTY29yZSwgcmVzZXRNb250aGx5U2NvcmUpIHtcbiAgICBjb25zdCBtb25nbyA9IGF3YWl0IHRyeUNhdGNoKE1vbmdvQ2xpZW50LmNvbm5lY3QodXJsKSk7XG4gICAgY29uc3QgY29sbGVjdGlvbiA9IG1vbmdvLmRiKERCKS5jb2xsZWN0aW9uKCdzY29yZWJvYXJkJyk7XG5cbiAgICBsZXQgcmVzZXQ7XG4gICAgaWYgKHJlc2V0V2Vla2x5U2NvcmUgJiYgcmVzZXRNb250aGx5U2NvcmUpXG4gICAgICByZXNldCA9IHtcbiAgICAgICAgJHNldDogeyB3ZWVrbHlTY29yZTogIDAgfSxcbiAgICAgICAgJHNldDogeyBtb250aGx5U2NvcmU6IDAgfVxuICAgICAgfTtcbiAgICBlbHNlIGlmIChyZXNldFdlZWtseVNjb3JlKVxuICAgICAgcmVzZXQgPSB7ICRzZXQ6IHsgd2Vla2x5U2NvcmU6IDAgfSB9O1xuICAgIGVsc2VcbiAgICAgIHJlc2V0ID0geyAkc2V0OiB7IG1vbnRobHlTY29yZTogMCB9IH07XG5cbiAgICBjb2xsZWN0aW9uLnVwZGF0ZShcbiAgICAgIHt9LCByZXNldCwgeyBtdWx0aTogdHJ1ZSB9XG4gICAgKTtcblxuICAgIG1vbmdvLmNsb3NlKCk7XG4gIH0sXG5cbiAgYXN5bmMgZ2V0Q2FyZHMocmVxLCByZXMpIHtcbiAgICBjb25zdCB7IGlkcyB9ID0gcmVxLnF1ZXJ5O1xuICAgIGNvbnN0IG1vbmdvID0gYXdhaXQgdHJ5Q2F0Y2goTW9uZ29DbGllbnQuY29ubmVjdCh1cmwpKTtcbiAgICBjb25zdCBjb2xsZWN0aW9uID0gbW9uZ28uZGIoREIpLmNvbGxlY3Rpb24oJ29sZENhcmRzJyk7XG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHRyeUNhdGNoKFxuICAgICAgY29sbGVjdGlvbi5maW5kKHtjYXJkSWQ6IHskaW46IGlkc319KVxuICAgICAgICAgICAgICAgIC5wcm9qZWN0KHtfaWQ6IDAsIG1lZGlhVXJsczogMX0pXG4gICAgICAgICAgICAgICAgLnRvQXJyYXkoKVxuICAgICk7XG4gICAgcmVzLmpzb24oZGF0YSk7XG4gICAgbW9uZ28uY2xvc2UoKTtcbiAgfVxuXG59IC8vIG1vZHVsZS5leHBvcnRzXG5cblxuYXN5bmMgZnVuY3Rpb24gZ2V0Q29sbGVjdGlvbihyZXEsIHJlcywgY29sbGVjdGlvbk5hbWUpIHtcbiAgY29uc3QgbW9uZ28gPSBhd2FpdCB0cnlDYXRjaChNb25nb0NsaWVudC5jb25uZWN0KHVybCkpO1xuICBjb25zdCBjb2xsZWN0aW9uID0gbW9uZ28uZGIoREIpLmNvbGxlY3Rpb24oY29sbGVjdGlvbk5hbWUpO1xuICBjb25zdCBkYXRhID0gYXdhaXQgdHJ5Q2F0Y2goXG4gICAgY29sbGVjdGlvbi5maW5kKClcbiAgICAgICAgICAgICAgLnByb2plY3Qoe19pZDogMH0pXG4gICAgICAgICAgICAgIC50b0FycmF5KClcbiAgKTtcbiAgcmVzLmpzb24oZGF0YSk7XG4gIG1vbmdvLmNsb3NlKCk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUxpdmVRdWVzdGlvbihtb25nbywgY2FyZElkKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgY29uc3QgY29sbGVjdGlvbiA9IG1vbmdvLmRiKERCKS5jb2xsZWN0aW9uKCdsaXZlUXVlc3Rpb25zJyk7XG4gICAgY29uc3QgY3VycmVudFF1ZXN0aW9uID0gYXdhaXQgdHJ5Q2F0Y2goY29sbGVjdGlvbi5maW5kT25lKHtjYXJkSWR9KSk7XG4gICAgYXdhaXQgdHJ5Q2F0Y2goY29sbGVjdGlvbi5yZW1vdmUoY3VycmVudFF1ZXN0aW9uKSk7XG4gICAgYXdhaXQgdHJ5Q2F0Y2goYWRkUG9pbnRzVG9TY29yZWJvYXJkKG1vbmdvLCBjdXJyZW50UXVlc3Rpb24pKTtcbiAgICByZXNvbHZlKCk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBhZGRQb2ludHNUb1Njb3JlYm9hcmQobW9uZ28sIHsgY2FjaGVkUG9pbnRzLCBjYXJkSWQgfSkge1xuICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGNvbnN0IHNjb3JlYm9hcmQgPSBtb25nby5kYihEQikuY29sbGVjdGlvbignc2NvcmVib2FyZCcpO1xuICAgIGNvbnN0IG9sZENhcmRzID0gbW9uZ28uZGIoREIpLmNvbGxlY3Rpb24oJ29sZENhcmRzJyk7XG4gICAgY29uc3QgYW5zd2VyUG9zdGVkQXQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICBvbGRDYXJkcy51cGRhdGVPbmUoe2NhcmRJZH0sIHskc2V0OiB7YW5zd2VyUG9zdGVkQXR9fSk7XG4gICAgY29uc3Qgb3BzID0gW107XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNhY2hlZFBvaW50cy5sZW5ndGg7ICsraSkge1xuICAgICAgY29uc3QgeyB1c2VySWQsIHBvaW50cyB9ID0gY2FjaGVkUG9pbnRzW2ldO1xuICAgICAgb3BzLnB1c2goe1xuICAgICAgICB1cGRhdGVPbmUgOiB7XG4gICAgICAgICAgXCJmaWx0ZXJcIiA6IHsgdXNlcklkIH0sXG4gICAgICAgICAgXCJ1cGRhdGVcIiA6IHtcbiAgICAgICAgICAgICRpbmM6IHtcbiAgICAgICAgICAgICAgc2NvcmU6IHBvaW50cyxcbiAgICAgICAgICAgICAgd2Vla2x5U2NvcmU6IHBvaW50cyxcbiAgICAgICAgICAgICAgbW9udGhseVNjb3JlOiBwb2ludHNcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAkcHVzaDoge1xuICAgICAgICAgICAgICBjb3JyZWN0QW5zd2Vyczoge1xuICAgICAgICAgICAgICAgIGFuc3dlclBvc3RlZEF0LFxuICAgICAgICAgICAgICAgIGNhcmRJZCxcbiAgICAgICAgICAgICAgICBwb2ludHNcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChvcHMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXNvbHZlKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgYXdhaXQgdHJ5Q2F0Y2goc2NvcmVib2FyZC5idWxrV3JpdGUob3BzKSk7XG4gICAgcmVzb2x2ZSgpO1xuICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9kYk9wcy5qcyIsImNvbnN0IHR3aXQgPSByZXF1aXJlKCd0d2l0Jyk7XG5jb25zdCB7XG4gIFRXSVRURVJfQVBJX0tFWSxcbiAgVFdJVFRFUl9BUElfU0VDUkVULFxuICBUV0lUVEVSX1RPS0VOLFxuICBUV0lUVEVSX1RPS0VOX1NFQ1JFVCxcbiAgVFdJVFRFUl9BQ0NPVU5UXG59ID0gcHJvY2Vzcy5lbnY7XG5cbi8vIGNvbnN0IGFwcENvbmZpZyA9IHtcbi8vICAgY29uc3VtZXJfa2V5OiBUV0lUVEVSX0FQSV9LRVksXG4vLyAgIGNvbnN1bWVyX3NlY3JldDogVFdJVFRFUl9BUElfU0VDUkVULFxuLy8gICBhcHBfb25seV9hdXRoOiB0cnVlXG4vLyB9XG5cbmNvbnN0IHVzZXJDb25maWcgPSB7XG4gIGNvbnN1bWVyX2tleTogVFdJVFRFUl9BUElfS0VZLFxuICBjb25zdW1lcl9zZWNyZXQ6IFRXSVRURVJfQVBJX1NFQ1JFVCxcbiAgYWNjZXNzX3Rva2VuOiBUV0lUVEVSX1RPS0VOLFxuICBhY2Nlc3NfdG9rZW5fc2VjcmV0OiBUV0lUVEVSX1RPS0VOX1NFQ1JFVFxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgdHdpdCh1c2VyQ29uZmlnKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy90d2l0dGVyQ29uZmlnLmpzIiwiY29uc3QgdXJsZW5jb2RlID0gcmVxdWlyZSgndXJsZW5jb2RlJyk7XG5jb25zdCBXRUJMT09LVVBfVVJMID0gJ2h0dHBzOi8vZWpqZS53ZWJsaW8uanAvY29udGVudC8nO1xuY29uc3QgeyBUV0lUVEVSX0FDQ09VTlQgfSA9IHByb2Nlc3MuZW52O1xuXG5jb25zdCBIT1VSUyA9IDM2MDAwMDA7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXG4gIEhPVVJTLFxuXG4gIGZvcm1hdFF1ZXN0aW9uQWx0VGV4dChleHByZXNzaW9uKSB7XG4gICAgY29uc3QgaGludCA9IGZvcm1hdEhpbnQoZXhwcmVzc2lvbik7XG4gICAgY29uc3QgW21pbiwgbWF4XSA9IG1pbk1heENoYXJzKGhpbnQpO1xuICAgIGNvbnN0IG1pbk1heCA9IG1pbiA9PT0gbWF4ID8gbWluIDogYCR7bWlufSB0byAke21heH1gO1xuICAgIGNvbnN0IHMgPSBtYXggPiAxID8gJ3MnIDogJyc7XG4gICAgY29uc3Qgc2NyZWVuUmVhZGVySGludCA9IGAoJHttaW5NYXh9IGNoYXJhY3RlciR7c30pYDtcbiAgICByZXR1cm4gZXhwcmVzc2lvbi5yZXBsYWNlKC9cXHtcXHsuKz9cXH1cXH0vZywgc2NyZWVuUmVhZGVySGludCk7XG4gIH0sXG5cbiAgZm9ybWF0UXVlc3Rpb25UZXh0KGV4cHJlc3Npb24sIGVuZ01lYW5pbmcsIG5vdGVzLCBjYXJkSUQpIHtcbiAgICBjb25zdCBoaW50ID0gZm9ybWF0SGludChleHByZXNzaW9uKTtcbiAgICBjb25zdCBbbWluLCBtYXhdID0gbWluTWF4Q2hhcnMoaGludCk7XG4gICAgY29uc3QgbWluTWF4ID0gbWluID09PSBtYXggPyBtaW4gOiBgJHttaW59LSR7bWF4fWA7XG4gICAgbGV0IHR3ZWV0VGV4dCA9IGBXaGF0ICR7bWluTWF4fSBjaGFyYWN0ZXIgYW5zd2VyIG1lYW5zIFwiJHtlbmdNZWFuaW5nfVwiP2A7XG4gICAgaWYgKG5lZWRzSGludChoaW50KSlcbiAgICAgIHR3ZWV0VGV4dCArPSBgXFxuSGludDogJHtoaW50fWA7XG5cbiAgICBpZiAobm90ZXMpIHR3ZWV0VGV4dCArPSBgXFxuTm90ZXM6ICR7bm90ZXN9YDtcblxuICAgIHR3ZWV0VGV4dCArPSBgXFxuUUlEJHtjYXJkSUR9YDtcbiAgICByZXR1cm4gdHdlZXRUZXh0O1xuICB9LFxuXG4gIGZvcm1hdEFuc3dlckFsdFRleHQoZXhwcmVzc2lvbikge1xuICAgIHJldHVybiBleHByZXNzaW9uLnJlcGxhY2UoL1xce1xcey4qP1xcOlxcOiguKz8pXFw6XFw6Lio/XFx9XFx9L2csICckMScpO1xuICB9LFxuXG4gIGZvcm1hdEFuc3dlclRleHQoYW5zd2VycywgZW5nTWVhbmluZywgd2ViTG9va3VwLCBjYXJkSWQpIHtcbiAgICBjb25zdCBzID0gYW5zd2Vycy5sZW5ndGggPiAxID8gJ3MnIDogJyc7XG4gICAgbGV0IGFuc3dlclRleHQgPSBgQW5zd2VyJHtzfTogJHthbnN3ZXJzLmpvaW4oJywgJyl9YDtcbiAgICBhbnN3ZXJUZXh0ICs9IGBcXG5FbmdsaXNoIE1lYW5pbmc6IFwiJHtlbmdNZWFuaW5nfVwiYDtcbiAgICBhbnN3ZXJUZXh0ICs9ICdcXG5EZWZpbml0aW9uOiAnICsgV0VCTE9PS1VQX1VSTCArIHVybGVuY29kZSh3ZWJMb29rdXApO1xuICAgIGFuc3dlclRleHQgKz0gYFxcblFJRCR7Y2FyZElkfWA7XG4gICAgcmV0dXJuIGFuc3dlclRleHQ7XG4gIH0sXG5cbiAgYWRkUXVlc3Rpb25MaW5rKGFuc3dlclRleHQsIHF1ZXN0aW9uSWQpIHtcbiAgICBjb25zdCBxdWVzdGlvbkxpbmsgPSBgUXVlc3Rpb246IHR3aXR0ZXIuY29tLyR7VFdJVFRFUl9BQ0NPVU5UfS9zdGF0dXMvJHtxdWVzdGlvbklkfWA7XG4gICAgY29uc3QgbGluZXMgPSBhbnN3ZXJUZXh0LnNwbGl0KCdcXG4nKTtcbiAgICBsaW5lcy5zcGxpY2UoLTEsIDAsIHF1ZXN0aW9uTGluayk7XG4gICAgcmV0dXJuIGxpbmVzLmpvaW4oJ1xcbicpO1xuICB9LFxuXG4gIGdldEFuc3dlcnMoZXhwcmVzc2lvbiwgYWx0QW5zd2Vycykge1xuICAgIGNvbnN0IGFjY2VwdGVkQW5zd2VyID0gZXhwcmVzc2lvbi5tYXRjaCgvXFw6XFw6KC4rPylcXDpcXDovKVsxXTtcbiAgICBsZXQgb3RoZXJBbnN3ZXJzID0gW107XG4gICAgaWYgKGFsdEFuc3dlcnMgJiYgYWx0QW5zd2Vycy5sZW5ndGggPiAwKVxuICAgICAgb3RoZXJBbnN3ZXJzID0gYWx0QW5zd2Vycy5zcGxpdCgnLCcpO1xuXG4gICAgcmV0dXJuIFthY2NlcHRlZEFuc3dlcl0uY29uY2F0KG90aGVyQW5zd2Vycyk7XG4gIH0sXG5cbiAgY2FsY3VsYXRlU2NvcmUoYW5zd2VyUG9zdGVkQXQsIHtxdWVzdGlvblBvc3RlZEF0LCBhbHJlYWR5QW5zd2VyZWR9KSB7XG4gICAgY29uc3QgdGltZVRvQW5zd2VyID0gTWF0aC5mbG9vcihcbiAgICAgIChuZXcgRGF0ZShhbnN3ZXJQb3N0ZWRBdCkgLSBuZXcgRGF0ZShxdWVzdGlvblBvc3RlZEF0KSkgLyBIT1VSU1xuICAgICk7XG4gICAgY29uc3Qgc2NvcmUgPSAyNCAtIHRpbWVUb0Fuc3dlcjtcblxuICAgIHJldHVybiBNYXRoLm1heChzY29yZSwgMCk7XG4gIH0sXG5cbiAgZXh0cmFjdEFuc3dlcih0ZXh0KSB7XG4gICAgcmV0dXJuIHRleHQudHJpbSgpLnNsaWNlKFRXSVRURVJfQUNDT1VOVC5sZW5ndGggKyAyKTtcbiAgfSxcblxuICBnZXRUaW1lVW50aWwoaG91cikge1xuICAgIC8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzQ0NTUyODIvY2FsbC1hLWphdmFzY3JpcHQtZnVuY3Rpb24tYXQtYS1zcGVjaWZpYy10aW1lLW9mLWRheVxuICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgY29uc3QgbWlsbGlzVW50aWxUaW1lID0gbmV3IERhdGUoXG4gICAgICBub3cuZ2V0RnVsbFllYXIoKSxcbiAgICAgIG5vdy5nZXRNb250aCgpLFxuICAgICAgbm93LmdldERhdGUoKSxcbiAgICAgIGhvdXIsIDAsIDAsIDApIC0gbm93O1xuXG4gICAgaWYgKG1pbGxpc1VudGlsVGltZSA8IDApIC8vIGFscmVhZHkgcGFzc2VkIGZvciB0b2RheSwgd2FpdCB1bnRpbCB0b21vcnJvd1xuICAgICAgbWlsbGlzVW50aWxUaW1lICs9IDI0KkhPVVJTO1xuXG4gICAgcmV0dXJuIG1pbGxpc1VudGlsVGltZTtcbiAgfSxcblxuICB0cnlDYXRjaChwcm9taXNlKSB7XG4gICByZXR1cm4gcHJvbWlzZVxuICAgICAudGhlbihkYXRhID0+IGRhdGEpXG4gICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yOicsZXJyKTtcbiAgICAgICByZXR1cm4ge307XG4gICAgIH0pO1xuICB9LFxuXG4gIGNvbnRhaW5zKGl0ZW0sIGxpc3QpIHtcbiAgICByZXR1cm4gdmFsaWQobGlzdC5pbmRleE9mKGl0ZW0pKTtcbiAgfVxuXG59IC8vIG1vZHVsZS5leHBvcnRzXG5cblxuZnVuY3Rpb24gdmFsaWQoaW5kZXgpIHtcbiAgcmV0dXJuIGluZGV4ICE9PSAtMTtcbn1cblxuZnVuY3Rpb24gbmVlZHNIaW50KGhpbnQpIHtcbiAgcmV0dXJuIGhpbnQucmVwbGFjZSgvXFxbXFxdL2csICcnKS50cmltKCkubGVuZ3RoICE9PSAwO1xufVxuXG5mdW5jdGlvbiBtYXhDaGFycyhoaW50KSB7XG4gIGNvbnN0IG1pc3NpbmdDaGFyUmVnZXggPSAvXFxbLio/XFxdL2c7XG4gIGNvbnN0IG1pc3NpbmdDaGFycyA9IChoaW50Lm1hdGNoKG1pc3NpbmdDaGFyUmVnZXgpIHx8IFtdKS5sZW5ndGhcbiAgY29uc3QgZ2ltbWVDaGFycyA9IGhpbnQucmVwbGFjZShtaXNzaW5nQ2hhclJlZ2V4LCAnJykucmVwbGFjZSgvW1xccytcXChcXCldL2csICcnKS5sZW5ndGg7XG5cbiAgcmV0dXJuIG1pc3NpbmdDaGFycyArIGdpbW1lQ2hhcnM7XG59XG5cbmZ1bmN0aW9uIG1pbkNoYXJzKGhpbnQpIHtcbiAgY29uc3Qgb3B0aW9uYWxDaGFycyA9IChoaW50Lm1hdGNoKC9cXD8vZykgfHwgW10pLmxlbmd0aFxuICByZXR1cm4gbWF4Q2hhcnMoaGludCkgLSBvcHRpb25hbENoYXJzO1xufVxuXG5mdW5jdGlvbiBtaW5NYXhDaGFycyhoaW50KSB7XG4gIHJldHVybiBbbWluQ2hhcnMoaGludCksIG1heENoYXJzKGhpbnQpXTtcbn1cblxuZnVuY3Rpb24gZm9ybWF0SGludChleHByZXNzaW9uKSB7XG4gIGNvbnN0IGxlZ2VuZCA9IGV4cHJlc3Npb24ubWF0Y2goL1xcOlxcOi4rP1xcOlxcOiguKz8pXFx9XFx9LylbMV07XG4gIGNvbnN0IG5vcm1hbGl6ZWQgPSBncm91cE11bHRpWHMoZ3JvdXBYcyhncm91cFF1ZXN0aW9uTWFya3MobGVnZW5kKSkpO1xuXG4gIHJldHVybiBmbGF0dGVuKHNwbGl0KG5vcm1hbGl6ZWQpKS5tYXAoZ3JvdXAgPT4ge1xuICAgIGlmIChncm91cCA9PT0gJy4nKVxuICAgICAgcmV0dXJuICdbXSc7XG5cbiAgICBpZiAoZ3JvdXAgPT09ICctJylcbiAgICAgIHJldHVybiAnW10gW10gW10gW10gW10nXG5cbiAgICBpZiAoL1xcPy8udGVzdChncm91cCkpIHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuICAgICAgY29uc3QgbnVtQ2hhcnMgPSBOdW1iZXIoZ3JvdXAubWF0Y2goL1xcZCsvKVswXSlcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtQ2hhcnM7IGkrKylcbiAgICAgICAgcmVzdWx0LnB1c2goJ1s/XScpXG5cbiAgICAgIGlmIChyZXN1bHQubGVuZ3RoID09PSAxKVxuICAgICAgICByZXR1cm4gJ1s/XSc7XG5cbiAgICAgIHJldHVybiAnKCcgKyByZXN1bHQuam9pbignICcpICsgJyknXG4gICAgfVxuXG4gICAgaWYgKC/iiaAvLnRlc3QoZ3JvdXApKSB7XG4gICAgICBjb25zdCBuZWdhdGVkQ2hhcnMgPSBncm91cC5yZXBsYWNlKC/iiaAvZywgJycpO1xuICAgICAgcmV0dXJuIGBb4omgJHtuZWdhdGVkQ2hhcnN9XWBcbiAgICB9XG4gICAgLy8gZWxzZSAoY2hhcmFjdGVyIGdpbW1lKVxuICAgIHJldHVybiBncm91cDtcbiAgfSkuam9pbignICcpO1xufVxuXG5mdW5jdGlvbiBncm91cFF1ZXN0aW9uTWFya3Moc3RyaW5nKSB7XG4gIHJldHVybiBzdHJpbmcucmVwbGFjZSgvKFxcPyspL2csIChtYXRjaCwgcDEpID0+IGAoJHtwMS5sZW5ndGh9PylgKTtcbn1cblxuZnVuY3Rpb24gZ3JvdXBYcyhzdHJpbmcpIHtcbiAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKC/iiaBbXihdL2csICcoJCYpJyk7XG59XG5cbmZ1bmN0aW9uIGdyb3VwTXVsdGlYcyhzdHJpbmcpIHtcbiAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKC/iiaBcXCgoLiopXFwpL2csICco4omgJDEpJylcbn1cblxuZnVuY3Rpb24gc3BsaXQoc3RyKSB7XG4gIHJldHVybiBzdHIuc3BsaXQoL1tcXChcXCldLylcbiAgICAgICAgICAgIC5tYXAoZ3JvdXAgPT5cbiAgICAgICAgICAgICAgL1xcP3ziiaAvLnRlc3QoZ3JvdXApXG4gICAgICAgICAgICAgID8gZ3JvdXBcbiAgICAgICAgICAgICAgOiBncm91cC5zcGxpdCgnJylcbiAgICAgICAgICAgICk7XG59XG5cbmZ1bmN0aW9uIHNjYWxhcih2KSB7XG4gIHJldHVybiAhQXJyYXkuaXNBcnJheSh2KTtcbn1cblxuZnVuY3Rpb24gZmxhdHRlbihkZWVwLCBmbGF0ID0gW10pIHtcbiAgaWYgKGRlZXAubGVuZ3RoID09PSAwKVxuICAgIHJldHVybiBmbGF0O1xuXG4gIGxldCBbaGVhZCwgLi4udGFpbF0gPSBkZWVwO1xuICByZXR1cm4gc2NhbGFyKGhlYWQpXG4gICAgPyBmbGF0dGVuKHRhaWwsIGZsYXQuY29uY2F0KGhlYWQpKVxuICAgIDogZmxhdHRlbih0YWlsLCBmbGF0LmNvbmNhdChmbGF0dGVuKGhlYWQpKSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdXRpbHMvdXRpbHMuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJiYWJlbC1wb2x5ZmlsbFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImJhYmVsLXBvbHlmaWxsXCJcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09ICdkZXYnKVxuICByZXF1aXJlKCdkb3RlbnYnKS5jb25maWcoKTtcblxuY29uc3QgZXhwcmVzcyA9IHJlcXVpcmUoJ2V4cHJlc3MnKTtcbmNvbnN0IGFwcCA9IGV4cHJlc3MoKTtcbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG5jb25zdCBib2R5UGFyc2VyID0gcmVxdWlyZSgnYm9keS1wYXJzZXInKTtcbmNvbnN0IHR3aXR0ZXJCb3QgPSByZXF1aXJlKCcuL3R3aXR0ZXJCb3QnKTtcblxuYXBwLnNldCgncG9ydCcsIChwcm9jZXNzLmVudi5QT1JUIHx8IDMwMDApKTtcbmFwcC51c2UoZXhwcmVzcy5zdGF0aWMocGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4uL2Rpc3QnKSkpO1xuYXBwLnVzZShib2R5UGFyc2VyLmpzb24oKSk7XG5cbnJlcXVpcmUoJy4vYXBpJykoYXBwKTtcblxudHdpdHRlckJvdC5zdGFydCgpO1xuXG5hcHAubGlzdGVuKGFwcC5nZXQoJ3BvcnQnKSwgKCkgPT5cbiAgY29uc29sZS5sb2coJ0xpc3RlbmluZyBvbiBwb3J0JywgYXBwLmdldCgncG9ydCcpKVxuKTtcblxuZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gYXBwO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NlcnZlci5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImRvdGVudlwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImRvdGVudlwiXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV4cHJlc3NcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJleHByZXNzXCJcbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYm9keS1wYXJzZXJcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJib2R5LXBhcnNlclwiXG4vLyBtb2R1bGUgaWQgPSAxMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBEQiA9IHJlcXVpcmUoJy4vZGJPcHMnKTtcbmNvbnN0IHtcbiAgSE9VUlMsXG4gIGFkZFF1ZXN0aW9uTGluayxcbiAgY2FsY3VsYXRlU2NvcmUsXG4gIGNvbnRhaW5zLFxuICBleHRyYWN0QW5zd2VyLFxuICBnZXRGb2xsb3dpbmcsXG4gIGdldFRpbWVVbnRpbCxcbiAgcG9zdE1lZGlhLFxuICB0cnlDYXRjaFxufSA9IHJlcXVpcmUoJ1V0aWxzJyk7XG5jb25zdCBUd2l0dGVyID0gcmVxdWlyZSgnLi90d2l0dGVyQ29uZmlnJyk7XG5jb25zdCB7IFRXSVRURVJfQUNDT1VOVCB9ID0gcHJvY2Vzcy5lbnY7XG5cbmNvbnN0IEFOU1dFUl9JTlRFUlZBTCA9IDYwMDAwO1xubGV0IFFVRVNUSU9OX0lOVEVSVkFMID0gNTAwMDtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHN0YXJ0OiAoKSA9PiB7XG4gICAgb3BlblN0cmVhbSgpO1xuICAgIHNldEludGVydmFsKHR3ZWV0UmFuZG9tUXVlc3Rpb24sIFFVRVNUSU9OX0lOVEVSVkFMKVxuICB9XG4gIC8vIHN0YXJ0OiAoKSA9PiB7XG4gIC8vICAgb3BlblN0cmVhbSgpO1xuICAvLyAgIHNldFN0YXJ0VGltZXMoKTtcbiAgLy8gfVxufTtcblxuZnVuY3Rpb24gc2V0U3RhcnRUaW1lcygpIHtcbiAgY29uc3QgdGltZVVudGlsN1BNID0gZ2V0VGltZVVudGlsKDE5KTtcbiAgY29uc3QgdGltZVVudGlsTWlkbmlnaHQgPSBnZXRUaW1lVW50aWwoMCk7XG5cbiAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgc2V0SW50ZXJ2YWwodHdlZXRSYW5kb21RdWVzdGlvbiwgUVVFU1RJT05fSU5URVJWQUwpO1xuICB9LCB0aW1lVW50aWw3UE0pO1xuXG4gIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIHNldEludGVydmFsKHdlZWtseU1vbnRobHlSZXNldCwgMjQqSE9VUlMpO1xuICB9LCB0aW1lVW50aWxNaWRuaWdodCk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHR3ZWV0UmFuZG9tUXVlc3Rpb24oKSB7XG4gIGNvbnN0IHtcbiAgICBjYXJkSWQsXG4gICAgcXVlc3Rpb25UZXh0LFxuICAgIHF1ZXN0aW9uSW1nLFxuICAgIHF1ZXN0aW9uQWx0VGV4dCxcbiAgICBwcmV2TGluZUltZyxcbiAgICBwcmV2TGluZUFsdFRleHQsXG4gICAgYW5zd2Vyc1xuICB9ID0gYXdhaXQgdHJ5Q2F0Y2goREIuZ2V0UmFuZG9tUXVlc3Rpb24oKSk7XG4gIGlmICghY2FyZElkKSByZXR1cm47XG5cbiAgY29uc3Qge1xuICAgIHF1ZXN0aW9uSWQsXG4gICAgcXVlc3Rpb25Qb3N0ZWRBdCxcbiAgICBtZWRpYVVybHNcbiAgfSA9IGF3YWl0IHRyeUNhdGNoKFxuICAgIHBvc3RNZWRpYShcbiAgICAgIHF1ZXN0aW9uVGV4dCxcbiAgICAgIHF1ZXN0aW9uSW1nLFxuICAgICAgcXVlc3Rpb25BbHRUZXh0LFxuICAgICAgcHJldkxpbmVJbWcsXG4gICAgICBwcmV2TGluZUFsdFRleHRcbiAgICApXG4gICk7XG5cbiAgY29uc3QgbGl2ZVF1ZXN0aW9uID0ge1xuICAgIGNhcmRJZCxcbiAgICBxdWVzdGlvbklkLFxuICAgIHF1ZXN0aW9uVGV4dCxcbiAgICBhbnN3ZXJzLFxuICAgIHF1ZXN0aW9uUG9zdGVkQXQsXG4gICAgY2FjaGVkUG9pbnRzOiBbXSxcbiAgICBhbHJlYWR5QW5zd2VyZWQ6IFtdXG4gIH07XG4gIERCLmFkZExpdmVRdWVzdGlvbihsaXZlUXVlc3Rpb24sIG1lZGlhVXJscyk7XG4gIHNldFRpbWVvdXQoKCkgPT4gdHdlZXRBbnN3ZXIoY2FyZElkLCBxdWVzdGlvbklkKSwgQU5TV0VSX0lOVEVSVkFMKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gdHdlZXRBbnN3ZXIoY2FyZElkLCBxdWVzdGlvbklkKSB7XG4gIGNvbnN0IHtcbiAgICBhbnN3ZXJUZXh0LFxuICAgIGFuc3dlckltZyxcbiAgICBhbnN3ZXJBbHRUZXh0XG4gIH0gPSBhd2FpdCB0cnlDYXRjaChcbiAgICAvLyBFRkZFQ1RTOlxuICAgIC8vIC0gcmVtb3ZlcyBxdWVzdGlvbiBmcm9tIGxpdmVRdWVzdGlvbnNcbiAgICAvLyAtIGFkZHMgY2FjaGVkIHBvaW50cyB0byBzY29yZWJvYXJkXG4gICAgLy9cbiAgICAvLyBSRVRVUk5TOlxuICAgIC8vIEFuc3dlckNhcmRcbiAgICBEQi5yZXZlYWxBbnN3ZXJXb3JrZmxvdyhjYXJkSWQpXG4gICk7XG5cbiAgY29uc3QgeyBtZWRpYVVybHMgfSA9IGF3YWl0IHRyeUNhdGNoKFxuICAgIHBvc3RNZWRpYShcbiAgICAgIGFkZFF1ZXN0aW9uTGluayhhbnN3ZXJUZXh0LCBxdWVzdGlvbklkKSxcbiAgICAgIGFuc3dlckltZyxcbiAgICAgIGFuc3dlckFsdFRleHRcbiAgICApXG4gICk7XG5cbiAgREIuYWRkTWVkaWFVcmxzVG9DYXJkKGNhcmRJZCwgbWVkaWFVcmxzKTtcbn1cblxuZnVuY3Rpb24gb3BlblN0cmVhbSgpIHtcbiAgY29uc3Qgc3RyZWFtID0gVHdpdHRlci5zdHJlYW0oJ3N0YXR1c2VzL2ZpbHRlcicsIHsgdHJhY2s6IGBAJHtUV0lUVEVSX0FDQ09VTlR9YCB9KTtcblxuICBzdHJlYW0ub24oJ3R3ZWV0JywgYXN5bmMgKHtcbiAgICBpbl9yZXBseV90b19zdGF0dXNfaWRfc3RyOiBxdWVzdGlvbklkLFxuICAgIGNyZWF0ZWRfYXQ6IGFuc3dlclBvc3RlZEF0LFxuICAgIHRleHQsXG4gICAgdXNlcjoge1xuICAgICAgaWQ6IHVzZXJJZCxcbiAgICAgIG5hbWUsXG4gICAgICBzY3JlZW5fbmFtZTogaGFuZGxlLFxuICAgICAgcHJvZmlsZV9pbWFnZV91cmxfaHR0cHM6IGF2YXRhcixcbiAgICAgIHByb2ZpbGVfYmFubmVyX3VybDogcHJvZmlsZUJhbm5lclxuICAgIH1cbiAgfSkgPT4ge1xuICAgIGNvbnN0IGxpdmVRdWVzdGlvbnMgPSBhd2FpdCB0cnlDYXRjaChEQi5nZXRMaXZlUXVlc3Rpb25zKCkpO1xuICAgIGNvbnN0IGZvdW5kUXVlc3Rpb24gPSBsaXZlUXVlc3Rpb25zLmZpbHRlcihcbiAgICAgIG9iaiA9PiBvYmoucXVlc3Rpb25JZCA9PT0gcXVlc3Rpb25JZFxuICAgIClbMF07XG5cbiAgICBpZiAoZm91bmRRdWVzdGlvbikge1xuICAgICAgY29uc3Qge1xuICAgICAgICBhbHJlYWR5QW5zd2VyZWQsXG4gICAgICAgIGFuc3dlcnM6IGFjY2VwdGVkQW5zd2Vyc1xuICAgICAgfSA9IGZvdW5kUXVlc3Rpb247XG4gICAgICBpZiAoY29udGFpbnModXNlcklkLCBhbHJlYWR5QW5zd2VyZWQpKVxuICAgICAgICByZXR1cm47XG5cbiAgICAgIGNvbnN0IHVzZXJBbnN3ZXIgPSBleHRyYWN0QW5zd2VyKHRleHQpO1xuICAgICAgaWYgKGNvbnRhaW5zKHVzZXJBbnN3ZXIsIGFjY2VwdGVkQW5zd2VycykpIHtcbiAgICAgICAgY29uc3QgcG9pbnRzID0gY2FsY3VsYXRlU2NvcmUoYW5zd2VyUG9zdGVkQXQsIGZvdW5kUXVlc3Rpb24pO1xuICAgICAgICBjb25zdCBmb2xsb3dpbmcgPSBhd2FpdCB0cnlDYXRjaChnZXRGb2xsb3dpbmcodXNlcklkKSk7XG4gICAgICAgIGNvbnN0IG5ld1VzZXIgPSB7XG4gICAgICAgICAgdXNlcklkLFxuICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgaGFuZGxlLFxuICAgICAgICAgIGF2YXRhcixcbiAgICAgICAgICBwcm9maWxlQmFubmVyLFxuICAgICAgICAgIGZvbGxvd2luZyxcbiAgICAgICAgICBzY29yZTogMCxcbiAgICAgICAgICBtb250aGx5U2NvcmU6IDAsXG4gICAgICAgICAgd2Vla2x5U2NvcmU6IDAsXG4gICAgICAgICAgY29ycmVjdEFuc3dlcnM6IFtdXG4gICAgICAgIH07XG4gICAgICAgIERCLmFkZE9yVXBkYXRlVXNlcihuZXdVc2VyKTtcbiAgICAgICAgREIudXBkYXRlTGl2ZVF1ZXN0aW9uKHF1ZXN0aW9uSWQsIHsgdXNlcklkLCBwb2ludHMgfSk7XG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIERCLnVwZGF0ZUxpdmVRdWVzdGlvbihxdWVzdGlvbklkLCB7IHVzZXJJZCwgcG9pbnRzOiAwIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgc3RyZWFtLm9uKCdkaXNjb25uZWN0JywgKGRpc2Nvbm5lY3RNc2cpID0+IHtcbiAgICBjb25zb2xlLmVycm9yKCdUd2VldCBzdHJlYW0gZGlzY29ubmVjdGVkOicsIGRpc2Nvbm5lY3RNc2cpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4gc3RyZWFtLnN0YXJ0KCksIDEwMCk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiB3ZWVrbHlNb250aGx5UmVzZXQoKSB7XG4gIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gIGNvbnN0IHJlc2V0V2Vla2x5U2NvcmUgPSBub3cuZ2V0RGF5KCkgPT09IDA7XG4gIGNvbnN0IHJlc2V0TW9udGhseVNjb3JlID0gbm93LmdldERhdGUoKSA9PT0gMTtcblxuICBpZiAocmVzZXRXZWVrbHlTY29yZSB8fCByZXNldE1vbnRobHlTY29yZSlcbiAgICBEQi53ZWVrbHlNb250aGx5UmVzZXQocmVzZXRXZWVrbHlTY29yZSwgcmVzZXRNb250aGx5U2NvcmUpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3R3aXR0ZXJCb3QuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtb25nb2RiXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwibW9uZ29kYlwiXG4vLyBtb2R1bGUgaWQgPSAxMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBmcyA9IHJlcXVpcmUoJ2ZzJyk7XG5jb25zdCBQTkcgPSByZXF1aXJlKCdwbmdqczInKS5QTkc7XG5jb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xuY29uc3QgdW56aXAgPSByZXF1aXJlKCd1bnppcC1zdHJlYW0nKTtcbmNvbnN0IFVQTE9BRFNfUEFUSCA9IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuLi91cGxvYWRzJyk7XG5jb25zdCB7XG4gIGZvcm1hdFF1ZXN0aW9uQWx0VGV4dCxcbiAgZm9ybWF0UXVlc3Rpb25UZXh0LFxuICBmb3JtYXRBbnN3ZXJBbHRUZXh0LFxuICBmb3JtYXRBbnN3ZXJUZXh0LFxuICBnZXRBbnN3ZXJzLFxuICB0cnlDYXRjaFxufSA9IHJlcXVpcmUoJ1V0aWxzJyk7XG5cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHByb2Nlc3NVcGxvYWQsXG4gIHBhcnNlQW5raUpzb24sXG4gIG9wdGltaXplSW1hZ2VzXG59XG5cbmZ1bmN0aW9uIHByb2Nlc3NVcGxvYWQoemlwZmlsZVBhdGgpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBjb25zdCBzdHJlYW0gPSBmcy5jcmVhdGVSZWFkU3RyZWFtKHppcGZpbGVQYXRoKVxuICAgICAgLnBpcGUodW56aXAuRXh0cmFjdCh7IHBhdGg6ICd1cGxvYWRzJyB9KSk7XG5cbiAgICBzdHJlYW0ub24oJ2Nsb3NlJywgYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgZmlsZXMgPSBmcy5yZWFkZGlyU3luYyhVUExPQURTX1BBVEgpO1xuICAgICAgYXdhaXQgdHJ5Q2F0Y2gob3B0aW1pemVJbWFnZXMoVVBMT0FEU19QQVRIICsgJy9tZWRpYScpKTtcbiAgICAgIGNvbnNvbGUubG9nKCdGaW5pc2hlZCBvcHRpbWl6aW5nIGltYWdlcyEnKTtcbiAgICAgIGNvbnN0IG5ld0NhcmRzID0gZXh0cmFjdENhcmRJbmZvKGZpbGVzKTtcblxuICAgICAgY2xlYW5VcChmaWxlcyk7XG4gICAgICByZXNvbHZlKG5ld0NhcmRzKTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIG9wdGltaXplSW1hZ2VzKGRpclBhdGgpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBjb25zdCBmaWxlc1Byb2Nlc3NpbmcgPSBbXTtcbiAgICBmcy5yZWFkZGlyU3luYyhkaXJQYXRoKS5mb3JFYWNoKGZpbGUgPT4ge1xuICAgICAgaWYgKC8uKlxcLnBuZyQvLnRlc3QoZmlsZSkpIHtcbiAgICAgICAgY29uc3QgY3VycmVudEZpbGUgPSBkaXJQYXRoICsgXCIvXCIgKyBmaWxlO1xuICAgICAgICBjb25zdCBjb250ZW50cyA9IGZzLnJlYWRGaWxlU3luYyhjdXJyZW50RmlsZSk7XG4gICAgICAgIGNvbnN0IHdyaXRlU3RyZWFtID0gZnMuY3JlYXRlV3JpdGVTdHJlYW0oY3VycmVudEZpbGUpO1xuICAgICAgICBjb25zdCBjdXJyZW50SW1hZ2UgPSBuZXcgUHJvbWlzZSgocmVzLCByZWopID0+XG4gICAgICAgICAgd3JpdGVTdHJlYW0ub24oJ2Nsb3NlJywgcmVzKVxuICAgICAgICApO1xuICAgICAgICBmaWxlc1Byb2Nlc3NpbmcucHVzaChjdXJyZW50SW1hZ2UpO1xuICAgICAgICBuZXcgUE5HKHsgZmlsdGVyVHlwZTogNCwgZGVmbGF0ZUxldmVsOiAxIH0pXG4gICAgICAgICAgLnBhcnNlKGNvbnRlbnRzLCAoZXJyLCBwbmcpID0+IHtcbiAgICAgICAgICAgIC8vIEdpdmUgdXBwZXIgbGVmdCBwaXhlbCBhbiBvcGFjaXR5XG4gICAgICAgICAgICAvLyBvZiAyNTQgc28gVHdpdHRlciB3b24ndCBjb252ZXJ0XG4gICAgICAgICAgICAvLyB0byBqcGVnXG4gICAgICAgICAgICBwbmcuZGF0YVszXSAtPSAxO1xuICAgICAgICAgICAgcG5nLnBhY2soKS5waXBlKHdyaXRlU3RyZWFtKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBQcm9taXNlLmFsbChmaWxlc1Byb2Nlc3NpbmcpLnRoZW4ocmVzb2x2ZSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBleHRyYWN0Q2FyZEluZm8oZmlsZXMpIHtcbiAgbGV0IGFsbE5ld0NhcmRzID0gW107XG4gIGZvciAobGV0IGZpbGUgb2YgZmlsZXMpIHtcbiAgICBjb25zdCBjdXJyZW50RmlsZSA9IGAke1VQTE9BRFNfUEFUSH0vJHtmaWxlfWA7XG4gICAgY29uc3Qgc3RhdHMgPSBmcy5zdGF0U3luYyhjdXJyZW50RmlsZSk7XG5cbiAgICBpZiAoc3RhdHMuaXNGaWxlKCkgJiYgZmlsZS5tYXRjaCgvLitcXC5qc29uJC8pKSB7XG4gICAgICBjb25zdCBuZXdDYXJkcyA9IHBhcnNlQW5raUpzb24oY3VycmVudEZpbGUpO1xuICAgICAgYWxsTmV3Q2FyZHMgPSBhbGxOZXdDYXJkcy5jb25jYXQobmV3Q2FyZHMpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gYWxsTmV3Q2FyZHM7XG59XG5cbmZ1bmN0aW9uIHBhcnNlQW5raUpzb24oZmlsZVBhdGgpIHtcbiAgY29uc3QgY29udGVudHMgPSBKU09OLnBhcnNlKGZzLnJlYWRGaWxlU3luYyhmaWxlUGF0aCwgJ3V0ZjgnKSk7XG4gIHJldHVybiBjb250ZW50cy5ub3Rlcy5tYXAoY2FyZCA9PiB7XG4gICAgbGV0IFtcbiAgICAgIGV4cHJlc3Npb24sXG4gICAgICAsIC8vIHJlYWRpbmcsXG4gICAgICAsLy8gamFwTWVhbmluZyxcbiAgICAgIGVuZ01lYW5pbmcsXG4gICAgICAsIC8vIG9mZmljaWFsRW5nLFxuICAgICAgcXVlc3Rpb25JbWcsXG4gICAgICBhbnN3ZXJJbWcsXG4gICAgICAsIC8vIGF1ZGlvXG4gICAgICBwcmV2TGluZUltZyxcbiAgICAgIHByZXZMaW5lQWx0VGV4dCxcbiAgICAgIGFsdEFuc3dlcnMsXG4gICAgICB3ZWJMb29rdXAsIC8vIHVzZSBmb3IgZXZlcnkgYW5zd2VyIHNvIHBlb3BsZSBjYW4gbG9vayB1cCBwcm9udW5jaWF0aW9uXG4gICAgICAgICAgICAgICAgIC8vIGh0dHBzOi8vZWpqZS53ZWJsaW8uanAvY29udGVudC9bd2ViTG9va3VwIChlLmcuIOWIh+OCiuaPm+OBiOOCiyldXG4gICAgICBub3RlcyxcbiAgICAgIGNhcmRJZFxuICAgIF0gPSBjYXJkLmZpZWxkcztcblxuICAgIFtleHByZXNzaW9uLCBlbmdNZWFuaW5nLCBub3Rlc10gPSBbZXhwcmVzc2lvbiwgZW5nTWVhbmluZywgbm90ZXNdLm1hcChzdHJpcEh0bWwpO1xuICAgIGNvbnN0IGFuc3dlcnMgPSBnZXRBbnN3ZXJzKGV4cHJlc3Npb24sIGFsdEFuc3dlcnMpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGNhcmRJZCxcbiAgICAgIHF1ZXN0aW9uVGV4dDogICAgZm9ybWF0UXVlc3Rpb25UZXh0KGV4cHJlc3Npb24sIGVuZ01lYW5pbmcsIG5vdGVzLCBjYXJkSWQpLFxuICAgICAgcXVlc3Rpb25JbWc6ICAgICBnZXRCYXNlNjQocXVlc3Rpb25JbWcpLFxuICAgICAgcXVlc3Rpb25BbHRUZXh0OiBmb3JtYXRRdWVzdGlvbkFsdFRleHQoZXhwcmVzc2lvbiksXG4gICAgICBwcmV2TGluZUltZzogICAgIGdldEJhc2U2NChwcmV2TGluZUltZyksXG4gICAgICBwcmV2TGluZUFsdFRleHQsXG4gICAgICBhbnN3ZXJUZXh0OiAgICAgIGZvcm1hdEFuc3dlclRleHQoYW5zd2VycywgZW5nTWVhbmluZywgd2ViTG9va3VwLCBjYXJkSWQpLFxuICAgICAgYW5zd2VySW1nOiAgICAgICBnZXRCYXNlNjQoYW5zd2VySW1nKSxcbiAgICAgIGFuc3dlckFsdFRleHQ6ICAgZm9ybWF0QW5zd2VyQWx0VGV4dChleHByZXNzaW9uKSxcbiAgICAgIGFuc3dlcnMsXG4gICAgICBtZWRpYVVybHM6IFtdXG4gICAgfTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHN0cmlwSHRtbChzdHJpbmcpIHtcbiAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKC88Lio/PnwmLio7L2csICcnKTtcbn1cblxuZnVuY3Rpb24gZ2V0U3JjKHN0cmluZykge1xuICByZXR1cm4gKHN0cmluZy5tYXRjaCgvc3JjPVwiKC4rKVwiLykgfHwgWyxdKVsxXTtcbn1cblxuZnVuY3Rpb24gZ2V0QmFzZTY0KHN0cmluZykge1xuICBpZiAoIXN0cmluZyB8fCBzdHJpbmcubGVuZ3RoID09PSAwKSByZXR1cm47XG5cbiAgbGV0IGJhc2U2NDtcbiAgdHJ5IHtcbiAgICBiYXNlNjQgPSBmcy5yZWFkRmlsZVN5bmMoXG4gICAgICBgJHtVUExPQURTX1BBVEh9L21lZGlhLyR7Z2V0U3JjKHN0cmluZyl9YCxcbiAgICAgIHsgZW5jb2Rpbmc6ICdiYXNlNjQnIH1cbiAgICApO1xuICB9IGNhdGNoIChlKSB7XG4gICAgLy8gcmV0dXJuaW5nIHVuZGVmaW5lZC4uLlxuICB9XG4gIHJldHVybiBiYXNlNjQ7XG59XG5cbmZ1bmN0aW9uIGNsZWFuVXAoZmlsZXMpIHtcbiAgZm9yIChsZXQgZmlsZSBvZiBmaWxlcykge1xuICAgIGNvbnN0IHJvb3QgPSBgJHtVUExPQURTX1BBVEh9LyR7ZmlsZX1gO1xuXG4gICAgaWYgKGZzLmxzdGF0U3luYyhyb290KS5pc0ZpbGUoKSlcbiAgICAgIGZzLnVubGlua1N5bmMocm9vdCk7XG4gICAgZWxzZSBpZiAoZnMubHN0YXRTeW5jKHJvb3QpLmlzRGlyZWN0b3J5KCkpXG4gICAgICBkZWxldGVGb2xkZXJSZWN1cnNpdmUocm9vdCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZGVsZXRlRm9sZGVyUmVjdXJzaXZlKHJvb3RQYXRoKSB7XG4gIGlmIChmcy5leGlzdHNTeW5jKHJvb3RQYXRoKSkge1xuICAgIGZzLnJlYWRkaXJTeW5jKHJvb3RQYXRoKS5mb3JFYWNoKGZpbGUgPT4ge1xuICAgICAgY29uc3QgY3VyUGF0aCA9IHJvb3RQYXRoICsgXCIvXCIgKyBmaWxlO1xuICAgICAgaWYgKGZzLmxzdGF0U3luYyhjdXJQYXRoKS5pc0RpcmVjdG9yeSgpKSB7IC8vIHJlY3Vyc2VcbiAgICAgICAgZGVsZXRlRm9sZGVyUmVjdXJzaXZlKGN1clBhdGgpO1xuICAgICAgfSBlbHNlIHsgLy8gZGVsZXRlIGZpbGVcbiAgICAgICAgZnMudW5saW5rU3luYyhjdXJQYXRoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBmcy5ybWRpclN5bmMocm9vdFBhdGgpO1xuICB9XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3Byb2Nlc3NBbmtpSnNvbi5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiZnNcIlxuLy8gbW9kdWxlIGlkID0gMTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicG5nanMyXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicG5nanMyXCJcbi8vIG1vZHVsZSBpZCA9IDE1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInVuemlwLXN0cmVhbVwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInVuemlwLXN0cmVhbVwiXG4vLyBtb2R1bGUgaWQgPSAxNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBUd2l0dGVyID0gcmVxdWlyZSgnLi4vdHdpdHRlckNvbmZpZycpO1xuY29uc3QgeyB0cnlDYXRjaCB9ID0gcmVxdWlyZSgnVXRpbHMvdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cbiAgLy9cbiAgLy8gcG9zdCBhIHR3ZWV0IHdpdGggbWVkaWFcbiAgLy9cbiAgcG9zdE1lZGlhKHN0YXR1cywgYjY0SW1hZ2UxLCBhbHRUZXh0MSwgYjY0SW1hZ2UyLCBhbHRUZXh0Mikge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBtZWRpYUlkMSA9IGF3YWl0IHRyeUNhdGNoKHVwbG9hZE1lZGlhKGI2NEltYWdlMSwgYWx0VGV4dDEpKTtcbiAgICAgIGNvbnN0IG1lZGlhX2lkcyA9IFttZWRpYUlkMV07XG4gICAgICBpZiAoYjY0SW1hZ2UyKSB7XG4gICAgICAgIGNvbnN0IG1lZGlhSWQyID0gYXdhaXQgdHJ5Q2F0Y2godXBsb2FkTWVkaWEoYjY0SW1hZ2UyLCBhbHRUZXh0MikpO1xuICAgICAgICBtZWRpYV9pZHMudW5zaGlmdChtZWRpYUlkMik7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHBhcmFtcyA9IHsgc3RhdHVzLCBtZWRpYV9pZHMsIHR3ZWV0X21vZGU6ICdleHRlbmRlZCcsIGluY2x1ZGVfZXh0X2FsdF90ZXh0OiB0cnVlIH07XG4gICAgICBUd2l0dGVyLnBvc3QoJ3N0YXR1c2VzL3VwZGF0ZScsIHBhcmFtcywgKGVyciwgZGF0YSwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKVxuICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoXCJQb3N0aW5nIHN0YXR1cyBmYWlsZWQuXCIpKTtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc29sZS5sb2coJ0V4dCBlbnRpdGllczonLCBkYXRhLmV4dGVuZGVkX2VudGl0aWVzLm1lZGlhKTtcbiAgICAgICAgY29uc3QgbWVkaWFVcmxzID0gZGF0YS5leHRlbmRlZF9lbnRpdGllcy5tZWRpYS5tYXAoXG4gICAgICAgICAgb2JqID0+ICh7XG4gICAgICAgICAgICBpbWFnZTogb2JqLm1lZGlhX3VybF9odHRwcyxcbiAgICAgICAgICAgIGFsdFRleHQ6IG9iai5leHRfYWx0X3RleHRcbiAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgICAgICBjb25zdCByZXN1bHQgPSB7XG4gICAgICAgICAgcXVlc3Rpb25JZDogICAgICAgZGF0YS5pZF9zdHIsXG4gICAgICAgICAgcXVlc3Rpb25Qb3N0ZWRBdDogZGF0YS5jcmVhdGVkX2F0LFxuICAgICAgICAgIG1lZGlhVXJsc1xuICAgICAgICB9O1xuICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSxcblxuICBnZXRGb2xsb3dpbmcodXNlcklkKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIFR3aXR0ZXIuZ2V0KCdmcmllbmRzL2lkcycsIHsgdXNlcklkIH0sIChlcnIsIGRhdGEsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIGlmIChlcnIpIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgcmVzb2x2ZShkYXRhLmlkcyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG59IC8vIG1vZHVsZS5leHBvcnRzXG5cblxuLy8gRUZGRUNUUzpcbi8vIHVwbG9hZHMgYSBzaW5nbGUgaW1hZ2Ugd2l0aCBhbHRUZXh0IHRvIFR3aXR0ZXJcbi8vXG4vLyBSRVRVUk5TOlxuLy8gbWVkaWFfaWQgd2hpY2ggaXMgbmVjZXNzYXJ5IGZvclxuLy8gYXR0YWNoaW5nIG1lZGlhIHRvIGEgdHdlZXRcbi8vXG5mdW5jdGlvbiB1cGxvYWRNZWRpYShiNjRJbWFnZSwgYWx0VGV4dCkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIC8vIGZpcnN0IHdlIG11c3QgcG9zdCB0aGUgbWVkaWEgdG8gVHdpdHRlclxuICAgIFR3aXR0ZXIucG9zdCgnbWVkaWEvdXBsb2FkJywgeyBtZWRpYV9kYXRhOiBiNjRJbWFnZSB9LCAoZXJyLCBkYXRhLCByZXNwb25zZSkgPT4ge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgIHJlamVjdChuZXcgRXJyb3IoXCJNZWRpYSB1cGxvYWQgZmFpbGVkLlwiKSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIC8vIG5vdyB3ZSBjYW4gYXNzaWduIGFsdCB0ZXh0IHRvIHRoZSBtZWRpYSwgZm9yIHVzZSBieSBzY3JlZW4gcmVhZGVycyBhbmRcbiAgICAgIC8vIG90aGVyIHRleHQtYmFzZWQgcHJlc2VudGF0aW9ucyBhbmQgaW50ZXJwcmV0ZXJzXG4gICAgICBjb25zdCBtZWRpYUlkU3RyID0gZGF0YS5tZWRpYV9pZF9zdHJpbmc7XG4gICAgICBjb25zdCBtZXRhX3BhcmFtcyA9IHsgbWVkaWFfaWQ6IG1lZGlhSWRTdHIsIGFsdF90ZXh0OiB7IHRleHQ6IGFsdFRleHQgfSB9XG5cbiAgICAgIFR3aXR0ZXIucG9zdCgnbWVkaWEvbWV0YWRhdGEvY3JlYXRlJywgbWV0YV9wYXJhbXMsIChlcnIsIGRhdGEsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihcIk1lZGlhIHVwbG9hZCBzdWNjZWVkZWQsIG1lZGlhIGNyZWF0aW9uIGZhaWxlZC5cIikpO1xuICAgICAgICB9XG4gICAgICAgIC8vIG5vdyB3ZSBjYW4gcmVmZXJlbmNlIHRoZSBtZWRpYSBhbmQgcG9zdCBhIHR3ZWV0IChtZWRpYSB3aWxsIGF0dGFjaCB0byB0aGUgdHdlZXQpXG4gICAgICAgIHJlc29sdmUobWVkaWFJZFN0cik7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdXRpbHMvdHdpdHRlclV0aWxzLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidHdpdFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInR3aXRcIlxuLy8gbW9kdWxlIGlkID0gMThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidXJsZW5jb2RlXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwidXJsZW5jb2RlXCJcbi8vIG1vZHVsZSBpZCA9IDE5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IERCID0gcmVxdWlyZSgnLi9kYk9wcycpO1xuY29uc3QgdXBsb2FkID0gcmVxdWlyZSgnbXVsdGVyJykoeyBkZXN0OiAndXBsb2Fkcy8nIH0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChhcHApID0+IHtcblxuICAvLyBDT1JTXG4gIGFwcC51c2UoKHJlcSwgcmVzLCBuZXh0KSA9PiB7XG4gICAgcmVzLmhlYWRlcignQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJywgJyonKTtcbiAgICByZXMuaGVhZGVyKCdBY2Nlc3MtQ29udHJvbC1BbGxvdy1NZXRob2RzJywgJ0dFVCwgT1BUSU9OUycpO1xuICAgIHJlcy5oZWFkZXIoJ0FjY2Vzcy1Db250cm9sLU1heC1BZ2UnLCAnODY0MDAnKTsgLy8gMjQgaG91cnNcbiAgICByZXMuaGVhZGVyKCdBY2Nlc3MtQ29udHJvbC1BbGxvdy1IZWFkZXJzJyxcbiAgICAgICAgICAgICAgICdPcmlnaW4sIFgtUmVxdWVzdGVkLVdpdGgsIENvbnRlbnQtVHlwZSwgQWNjZXB0Jyk7XG4gICAgbmV4dCgpO1xuICB9KTtcblxuICBhcHAuZ2V0KCcvYXBpL2xpdmUnLCAocmVxLCByZXMpID0+IHtcbiAgICByZXMuanNvbihEQi5nZXRMaXZlUXVlc3Rpb25zKCkpO1xuICB9KTtcblxuICBhcHAuZ2V0KCcvYXBpL3Njb3JlcycsIChyZXEsIHJlcykgPT4ge1xuICAgIERCLmdldFNjb3JlcyhyZXEsIHJlcyk7XG4gIH0pO1xuXG4gIGFwcC5nZXQoJy9hcGkvY2FyZHMnLCAocmVxLCByZXMpID0+IHtcbiAgICBEQi5nZXRDYXJkcyhyZXEsIHJlcyk7XG4gIH0pO1xuXG4gIC8vIFRPRE8gLSBEZWxldGUgdGhpcyBlbmRwb2ludCBpZiBub3QgbmVlZGVkXG4gIGFwcC5nZXQoJy9hcGkvc2NvcmUvOmhhbmRsZScsIChyZXEsIHJlcykgPT4ge1xuICAgIERCLmdldFNjb3JlKHJlcSwgcmVzKTtcbiAgfSk7XG5cbiAgYXBwLmdldCgnL2FwaS9jYXJkcy9vbGQnLCAocmVxLCByZXMpID0+IHtcbiAgICBEQi5nZXRPbGRDYXJkcyhyZXEsIHJlcyk7XG4gIH0pO1xuXG5cbiAgLy8gVE9ETyAtIGFkZCBhdXRoZW50aWNhdGlvbiB0byBmb2xsb3dpbmcgZW5kcG9pbnRzXG5cbiAgYXBwLnBvc3QoJy9kZWNrL25ldycsIHVwbG9hZC5zaW5nbGUoJ3ppcGZpbGUnKSwgKHJlcSwgcmVzKSA9PiB7XG4gICAgREIuYWRkRGVjayhyZXEsIHJlcyk7XG4gIH0pO1xuXG4gIGFwcC5wb3N0KCcvc2NvcmVzL2VkaXQnLCAocmVxLCByZXMpID0+IHtcbiAgICBEQi5hZGp1c3RTY29yZShyZXEsIHJlcyk7XG4gIH0pO1xuXG4gIGFwcC5nZXQoJy9jYXJkcy9uZXcnLCAocmVxLCByZXMpID0+IHtcbiAgICBEQi5nZXROZXdDYXJkcyhyZXEsIHJlcyk7XG4gIH0pO1xuXG59IC8vIG1vZHVsZS5leHBvcnRzXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXBpLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibXVsdGVyXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwibXVsdGVyXCJcbi8vIG1vZHVsZSBpZCA9IDIxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=