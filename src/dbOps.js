import { MongoClient } from 'mongodb';
import { processUpload } from './processAnkiJson';
import {
  calculateNewStats,
  formatFlashCards,
  getSpoilerText,
  getLiveAnswers,
  isSpoiled,
  tryCatch
} from 'Utils';

const {
  MONGODB_URI: url,
  MONGO_DB:    DB
} = process.env;

const PAGE_SIZE = 100;

export default ({

  async addDeck(req, res) {
    const filePath = req.file.path;
    const newCards = await tryCatch(processUpload(filePath));
    const mongo = await tryCatch(MongoClient.connect(url));
    const newCardCollection = mongo.db(DB).collection('newCards');
    const oldCardCollection = mongo.db(DB).collection('oldCards');
    const oldCards = await tryCatch(
      oldCardCollection.find()
                       .project({_id: 0, cardId: 1})
                       .toArray()
                       .then(cards =>
                         Promise.resolve(
                           cards.map(card => card.cardId)
                         ))
    );

    const ops = [];
    for (let i = 0; i < newCards.length; ++i) {
      const newCard = newCards[i];
      const { cardId } = newCard;
      if (oldCards.indexOf(cardId) === -1)
        ops.push({
          replaceOne: {
             filter: { cardId },
             replacement: newCard,
             upsert: true
          }
        });
    }

    if (ops.length === 0) {
      mongo.close();
      res.redirect('/');
      return;
    }

    await tryCatch(newCardCollection.bulkWrite(ops));
    mongo.close();

    res.redirect('/');
  },

  async addLiveQuestion(record, mediaUrls) {
    const { cardId } = record;
    const mongo = await tryCatch(MongoClient.connect(url));
    const liveQuestions = mongo.db(DB).collection('liveQuestions');
    const oldCards = mongo.db(DB).collection('oldCards');
    await tryCatch(
      liveQuestions.insert({
        ...record,
        mediaUrls
      })
    );
    await tryCatch(
      oldCards.updateOne(
        { cardId },
        {
          $set: { mediaUrls },
          $unset: {
            questionImg: '',
            questionAltText: '',
            prevLineImg: '',
            prevLineAltText: ''
          }
        }
      )
    )
    mongo.close();
  },

  addOrUpdateUser(newUser) {
    return new Promise(async (resolve, reject) => {
      const mongo = await tryCatch(MongoClient.connect(url));
      const scoreboard = mongo.db(DB).collection('scoreboard');
      const { userId } = newUser;
      const user = await tryCatch(scoreboard.findOne({userId}));
      if (user) {
        const {
          name,
          handle,
          avatar,
          profileBanner,
          following
        } = newUser;

        await tryCatch(
          scoreboard.updateOne({ userId }, {
              $set: { name },
              $set: { handle },
              $set: { avatar },
              $set: { profileBanner },
              $set: { following }
          })
        );
      } else {
        await tryCatch(scoreboard.insert(newUser));
      }
      mongo.close();
      resolve(user || newUser);
    });
  },

  adjustScore(req, res) {
    // TODO adjust a score manually
  },

  async createUser({ body: user }, res) {
    const mongo = await tryCatch(MongoClient.connect(url));
    const scoreboard = mongo.db(DB).collection('scoreboard');
    await tryCatch(
      scoreboard.insert(user)
    );
    mongo.close();
  },

  async getDeck({ params: { slug }}, res) {
    const mongo = await tryCatch(MongoClient.connect(url));
    const deckTitles    = mongo.db(DB).collection('deckTitles');
    const liveQuestions = mongo.db(DB).collection('liveQuestions');
    const oldCards      = mongo.db(DB).collection('oldCards');

    const deck = await tryCatch(
      deckTitles.findOne({ slug })
    );

    if (!deck) {
      res.json(null);
      mongo.close();
      return;
    }

    const liveCards = await tryCatch(
      liveQuestions.find()
                   .project({
                     _id:    0,
                     cardId: 1
                   })
                   .toArray()
                   .then(cards =>
                     Promise.resolve(
                       cards.map(card => card.cardId)
                     ))
    );

    const rawCards = await tryCatch(
      oldCards.find({
        game: deck.fullTitle,
        cardId: {
          $not: { $in: liveCards }
        }
      })
      .project({
        _id:            0,
        answerId:       1,
        answerPostedAt: 1,
        answers:        1,
        cardId:         1,
        mediaUrls:      1,
        questionText:   1,
      })
      .sort({ answerPostedAt: -1 })
      .toArray()
    );

    if (rawCards.length === 0) {
      res.json(null);
      mongo.close();
      return;
    }

    const cards = formatFlashCards(rawCards);
    res.json(cards);
    mongo.close();
  },

  getDeckTitles(req, res) {
    getCollection(req, res, 'deckTitles');
  },

  async getEarnedCards({ query: { ids } }, res) {
    if (!ids || ids.length === 0) {
      res.json(null);
      return;
    }
    const mongo = await tryCatch(MongoClient.connect(url));
    const oldCards = mongo.db(DB).collection('oldCards');
    const earnedCards = await tryCatch(
      getCards(ids, oldCards)
    );
    res.json(earnedCards);
    mongo.close();
  },

  getLiveQuestions() {
    return new Promise(async (resolve, reject) => {
      const mongo = await tryCatch(MongoClient.connect(url));
      const collection = mongo.db(DB).collection('liveQuestions');
      const liveQuestions = await tryCatch(collection.find().toArray());
      resolve(liveQuestions);
      mongo.close();
    });
  },

  getNewCards(req, res) {
    getCollection(req, res, 'newCards');
  },

  getOldCards(req, res) {
    getCollection(req, res, 'oldCards');
  },

  getRandomQuestion() {
    return new Promise(async (resolve, reject) => {
      const mongo = await tryCatch(MongoClient.connect(url));
      const newCards = mongo.db(DB).collection('newCards');
      const oldCards = mongo.db(DB).collection('oldCards');
      let randomCard = await tryCatch(
        newCards.aggregate([{ $sample: { size: 1 }}])
                .toArray()
                .then(cards => Promise.resolve(cards[0]))
      );
      if (randomCard == null) {
        reject(new Error(
          'Empty deck. Please Add More Cards to DB.'
        ));
        mongo.close();
        return;
      }

      const [
        liveCards,
        recentCards
      ] = await tryCatch(
        Promise.all([
          getSpoilerCards('liveQuestions', mongo),
          getSpoilerCards('recentAnswers', mongo)
        ])
      );

      const spoilerText = getSpoilerText(liveCards.concat(recentCards));
      const liveAnswers = getLiveAnswers(liveCards);

      let spoiled = isSpoiled(randomCard, spoilerText, liveAnswers);
      let tries = 0;
      while(spoiled) {
        if (tries > 20) {
          reject(new Error(
            "All new cards contain spoilers. Please try again later."
          ));
          mongo.close();
          return;
        }
        randomCard = await tryCatch(
          newCards.aggregate([{ $sample: { size: 1 }}])
                  .toArray()
                  .then(cards => Promise.resolve(cards[0]))
        );
        spoiled = isSpoiled(randomCard, spoilerText, liveAnswers);
        tries++;
      }

      await tryCatch(oldCards.insert(randomCard));
      await tryCatch(newCards.remove(randomCard));
      resolve(randomCard);
      mongo.close();
    });
  },

  async getRecentAnswers(req, res) {
    const mongo = await tryCatch(MongoClient.connect(url));
    const recentAnswers = mongo.db(DB).collection('recentAnswers');
    const oldCards = mongo.db(DB).collection('oldCards');
    const cardIds = await tryCatch(
      recentAnswers.find()
                   .toArray()
                   .then(cards =>
                     Promise.resolve(
                       cards.map(card => card.cardId)
                     ))
    );
    const answerCards = await tryCatch(
      getCards(cardIds, oldCards)
    );
    if (answerCards.length === 0)
      res.json(null);
    else
      res.json(answerCards);

    mongo.close();
  },

  // TODO - delete this method if not needed
  async getScore(req, res) {
    const { handle } = req.params;
    const mongo = await tryCatch(MongoClient.connect(url));
    const scoreboard = mongo.db(DB).collection('scoreboard');
    const user = await tryCatch(scoreboard.findOne({handle}));
    res.json(user);
    mongo.close();
  },

  async getScores({query: { page = 1, view = 'weeklyStats', search = ''} }, res) {
    const mongo = await tryCatch(MongoClient.connect(url));
    const scoreboard = mongo.db(DB).collection('scoreboard');
    const users = await tryCatch(
      scoreboard.find({
        handle: { $regex: search, $options: 'i' },
        [`${view}.score`]: { $gt: 0 }
      })
      .sort({[`${view}.score`]: -1, handle: 1})
      .limit(PAGE_SIZE*page)
      .toArray()
    );
    if (users.length === 0) {
      res.json(null);
      mongo.close();
      return;
    }
    res.json(users);
    mongo.close();
  },

  async getUser({ params: { userId } }, res) {
    const mongo = await tryCatch(MongoClient.connect(url));
    const scoreboard = mongo.db(DB).collection('scoreboard');
    const user = await tryCatch(
      scoreboard.findOne({ userId })
    );

    if (!user) {
      res.json(null);
      mongo.close();
      return;
    }

    res.json(user);
    mongo.close();
  },

  async getUserStats({ query: { handle } }, res) {
    const mongo = await tryCatch(MongoClient.connect(url));
    const scoreboard = mongo.db(DB).collection('scoreboard');
    const oldCards = mongo.db(DB).collection('oldCards');
    const user = await tryCatch(scoreboard.findOne({handle}));

    if (!user) {
      res.json(null);
      mongo.close();
      return;
    }

    const cardIds = user.allTimeStats.correct.map(record => record.cardId);
    const earnedCards = await tryCatch(
      getCards(cardIds, oldCards)
    );
    user.earnedCards = earnedCards;
    res.json(user);
    mongo.close();
  },

  async processAnswerCard(answerId, answerPostedAt, cardId, mediaUrl) {
    const mongo = await tryCatch(MongoClient.connect(url));
    const oldCards = mongo.db(DB).collection('oldCards');
    const cardReference = await tryCatch(
      oldCards.findOneAndUpdate(
        { cardId },
        { $push:  { mediaUrls: mediaUrl },
          $set:   { answerId, answerPostedAt },
          $unset: { answerImg: '', answerAltText: '' }
        },
        { projection: {
            _id:            0,
            answerPostedAt: 1,
            cardId:         1
          },
          returnOriginal: false
        }
      )
    );
    await tryCatch(addToRecentAnswers(cardReference.value, mongo));
    mongo.close();
  },

  revealAnswerWorkflow(cardId) {
    return new Promise(async (resolve, reject) => {
      const mongo = await tryCatch(MongoClient.connect(url));
      const oldCards = mongo.db(DB).collection('oldCards');
      const answerCard = await tryCatch(
        oldCards.findOne({ cardId })
      );
      resolve(answerCard);
      await tryCatch(removeLiveQuestion(cardId, mongo));
      mongo.close();
    });
  },

  async serveLiveQuestions(req, res) {
    const mongo = await tryCatch(MongoClient.connect(url));
    const collection = mongo.db(DB).collection('liveQuestions');
    const liveQuestions = await tryCatch(
      collection.find()
                .sort({ questionPostedAt: -1 })
                .toArray()
    );
    if (liveQuestions.length === 0)
      res.json(null)
    else
      res.json(liveQuestions);

    mongo.close();
  },

  updateLiveQuestion(questionId, userPoints) {
    return new Promise(async (resolve, reject) => {
      const mongo = await tryCatch(MongoClient.connect(url));
      const liveQuestions = mongo.db(DB).collection('liveQuestions');
      const { userId } = userPoints;

      await tryCatch(
        liveQuestions.update(
          { questionId }, {
            $push: {
              alreadyAnswered: userId,
              cachedPoints: userPoints
            }
          }
        )
      );
      mongo.close();
      resolve();
    });
  },

  async updateStats(resetWeeklyStats, resetMonthlyStats) {
    const mongo = await tryCatch(MongoClient.connect(url));
    const scoreboard = mongo.db(DB).collection('scoreboard');
    const users = await tryCatch(scoreboard.find().toArray());
    const bulkUpdateOps = [];

    let i = 0;
    let end = users.length;
    for (; i < end; i++) {
      const user = users[i];
      const { userId, dailyStats } = user;
      const newDailyStats = calculateNewStats(dailyStats);

      const op = {
        updateOne: {
          filter: { userId },
          update: {
            $set: {
              'dailyStats': newDailyStats
            }
          }
        }
      };

      if (resetWeeklyStats) {
        const { weeklyStats } = user;
        const newWeeklyStats = calculateNewStats(weeklyStats, true);
        op.updateOne.update.$set.weeklyStats = newWeeklyStats;
      }

      if (resetMonthlyStats) {
        const { monthlyStats } = user;
        const newMonthlyStats = calculateNewStats(monthlyStats, true);
        op.updateOne.update.$set.monthlyStats = newMonthlyStats;
      }

      bulkUpdateOps.push(op);
    }

    if (bulkUpdateOps.length === 0) {
      mongo.close();
      return;
    }

    await tryCatch(scoreboard.bulkWrite(bulkUpdateOps));
    mongo.close();
  }

}) // dbOps export


// private functions

function addPointsToScoreboard({ cachedPoints, cardId }, mongo) {
  return new Promise(async (resolve, reject) => {
    const scoreboard = mongo.db(DB).collection('scoreboard');

    const cachedUpdates = {};
    let i = 0;
    let end = cachedPoints.length
    for (; i < end; ++i) {
      const { userId, points, timeToAnswer } = cachedPoints[i];
      const op = {
        updateOne: {
          filter: { userId },
          update: {
            $inc: {
              'allTimeStats.score': points,
              'monthlyStats.score': points,
              'weeklyStats.score':  points,
              'dailyStats.score':   points,
              'allTimeStats.attempts': 1,
              'monthlyStats.attempts': 1,
              'weeklyStats.attempts':  1,
              'dailyStats.attempts':   1,
              'allTimeStats.totalPossible': 1,
              'monthlyStats.totalPossible': 1,
              'weeklyStats.totalPossible':  1,
              'dailyStats.totalPossible':   1
            },
            $set: {
              // NOTE
              // - timeToAnswer is the seconds it took the user to answer the CURRENT QUESTION
              // - this value is being stored here for reference
              // - it will later be overwritten by a new calculated average
              //
              // - missing info needed for calculation:
              //   - current DB value of allTimeStats.attempts
              //   - current DB value of allTimeStats.avgTimeToAnswer
              'allTimeStats.avgTimeToAnswer': timeToAnswer
            }
          }
        }
      };
      if (points > 0) {
        op.updateOne.update.$push = {
          'allTimeStats.correct': {
            cardId,
            points,
            timeToAnswer
          }
        };
        op.updateOne.update.$inc['monthlyStats.correct'] = 1;
        op.updateOne.update.$inc['weeklyStats.correct']  = 1;
        op.updateOne.update.$inc['dailyStats.correct']   = 1;

      } else {
        op.updateOne.update.$push = {
          'allTimeStats.incorrect': cardId
        }
      }

      cachedUpdates[userId] = op;
    }

    const allUsers = await tryCatch(scoreboard.find().toArray());
    const ops = [];

    i = 0;
    end = allUsers.length;
    for (; i < end; ++i) {
      const currentUser = allUsers[i];
      let update = cachedUpdates[currentUser.userId];

      if (!update) { // user did not attempt to answer the current question
        update = {
          updateOne: {
            filter: { userId: currentUser.userId },
            update: {
              $inc: {
                'allTimeStats.totalPossible': 1,
                'monthlyStats.totalPossible': 1,
                'weeklyStats.totalPossible':  1,
                'dailyStats.totalPossible':   1
              }
            }
          }
        };

      } else { // User attempted to answer the current question

        const newTimeToAnswer = update.updateOne.update.$set['allTimeStats.avgTimeToAnswer'];
        update.updateOne.update.$set['allTimeStats.avgTimeToAnswer'] = average(
          newTimeToAnswer,
          currentUser.allTimeStats.avgTimeToAnswer,
          currentUser.allTimeStats.attempts
        );
      }

      ops.push(update);
    }

    if (ops.length === 0) {
      resolve();
      return;
    }

    await tryCatch(scoreboard.bulkWrite(ops));
    await tryCatch(recalculateRank(scoreboard));
    resolve();
  });
}

function addToRecentAnswers(recentAnswer, mongo) {
  return new Promise(async (resolve, reject) => {
    const collection = mongo.db(DB).collection('recentAnswers');
    const recentAnswers = await tryCatch(
      collection.find()
                .sort({ answerPostedAt: 1 })
                .toArray()
    );
    if (recentAnswers.length > 9) {
      const cardId = recentAnswers[0].cardId;
      await tryCatch(collection.remove({ cardId }));
    }
    await tryCatch(
      collection.insert(recentAnswer)
    );
    resolve();
  });
}

function getCards(ids, collection) {
  return new Promise(async (resolve, reject) => {
    const data = await tryCatch(
      collection.find({ cardId: { $in: ids }})
                .project({
                  _id:            0,
                  answerId:       1,
                  answerPostedAt: 1,
                  answers:        1,
                  cardId:         1,
                  mediaUrls:      1,
                  questionText:   1,
                })
                .sort({ answerPostedAt: -1 })
                .toArray()
    );

    const cards = formatFlashCards(data);
    resolve(cards);
  });
}

async function getCollection(req, res, collectionName) {
  const mongo = await tryCatch(MongoClient.connect(url));
  const collection = mongo.db(DB).collection(collectionName);
  const data = await tryCatch(
    collection.find()
              .project({ _id: 0 })
              .toArray()
  );
  res.json(data);
  mongo.close();
}

function getSpoilerCards(collectionName, mongo) {
  return new Promise(async (resolve, reject) => {
    const oldCards = mongo.db(DB).collection('oldCards');
    const collection = mongo.db(DB).collection(collectionName);
    const ids = await tryCatch(
      collection.find()
                .toArray()
                .then(cards =>
                  Promise.resolve(
                    cards.map(card => card.cardId)
                  ))
    );
    const spoilerCards = await tryCatch(
      oldCards.find({ cardId: { $in: ids }})
              .project({
                _id:             0,
                answers:         1,
                mediaUrls:       1
              })
              .toArray()
    );
    resolve(spoilerCards);
  });
}

function recalculateRank(scoreboard) {
  return new Promise(async (resolve, reject) => {
    const stats = await tryCatch(scoreboard.aggregate([
      { $project: {
          _id: 0,
          orderBy: { $literal: [ 'weeklyStats', 'monthlyStats', 'allTimeStats' ] },
          userId: 1,
          'allTimeStats.score': 1,
          'allTimeStats.rank':  1,
          'monthlyStats.score': 1,
          'monthlyStats.rank':  1,
          'weeklyStats.score':  1,
          'weeklyStats.rank':   1
        }
      },
      { $unwind: '$orderBy' },
      { $group:
        { _id:
          { orderBy: '$orderBy',
            score:
            { $switch: {
                branches: [
                   { case: { $eq: ['$orderBy', 'weeklyStats' ] }, then: '$weeklyStats.score'  },
                   { case: { $eq: ['$orderBy', 'monthlyStats'] }, then: '$monthlyStats.score' },
                ],
                default: '$allTimeStats.score'
              }
            }
          },
          users: { $push: '$$CURRENT' }
        }
      },
      { $sort: { '_id.score': -1 } },
      { $group:
        { _id: '$_id.orderBy',
          scores: {
            $push: {
              score: '$_id.score',
              users: '$users'
            }
          }
        }
      }
    ], { allowDiskUse: true }).toArray());

    const usersToUpdate = {};
    const currentRanks = {
      allTimeStats: 1,
      monthlyStats: 1,
      weeklyStats:  1
    };
    stats.forEach(({ _id: category, scores }) => {
      const end = scores.length;
      let i = 0;
      for (; i < end; i++) {
        const currentStat = scores[i];
        if (currentStat.score === 0) continue;

        currentStat.users.forEach(user => {
          const previousRank = user[category].rank;
          const currentRank = currentRanks[category];
          if (previousRank !== currentRank) {
            const cachedUpdate = usersToUpdate[user.userId] || {};
            cachedUpdate[category] = currentRank;
            usersToUpdate[user.userId] = cachedUpdate;
          }
        });
        currentRanks[category] += currentStat.users.length;
      }
    });

    const bulkUpdateOps = [];
    const userIdsToUpdate = Object.keys(usersToUpdate);
    const end = userIdsToUpdate.length;
    let i = 0;
    for (; i < end; i++) {
      const currentUser = userIdsToUpdate[i];
      const userId = currentUser;
      const op = {
        updateOne: {
          filter: { userId },
          update: {
            $set: {}
          }
        }
      };
      const userUpdates = usersToUpdate[currentUser];
      Object.keys(currentRanks).forEach(category => {
        const newRank = userUpdates[category];
        if (newRank)
          op.updateOne.update.$set[`${category}.rank`] = newRank;
      });

      bulkUpdateOps.push(op);

    } // for loop

    if (bulkUpdateOps.length === 0) {
      resolve();
      return;
    }
    await tryCatch(scoreboard.bulkWrite(bulkUpdateOps));
    resolve();
  });
}

function removeLiveQuestion(cardId, mongo) {
  return new Promise(async (resolve, reject) => {
    const collection = mongo.db(DB).collection('liveQuestions');
    const currentQuestion = await tryCatch(
      collection.findOne({cardId})
    );
    await tryCatch(collection.remove(currentQuestion));
    await tryCatch(addPointsToScoreboard(currentQuestion, mongo));
    resolve();
  });
}
