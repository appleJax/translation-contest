import Models from 'Models'
import Twitter from 'Config/twitter'
import { tryCatch } from 'Utils'

const { TWITTER_ACCOUNT } = process.env
const { LiveQuestion } = Models

export async function addAltAnswer(req) {
  const {
    body: {
      cardId: rawCardId,
      altAnswer: rawAltAnswer
    }
  } = req

  if (!rawCardId || !rawAltAnswer) {
    throw new Error('Form fields must not be empty. Please try again.')
  }

  const cardId = rawCardId.replace(/QID/i, '').trim()
  const altAnswer = rawAltAnswer.trim()

  const cardToCorrect = await getLiveQuestion(cardId)
  if (!cardToCorrect) {
    throw new Error(`QID${cardId} was not found in live questions. Please check the QID and try again.`)
  }

  const newAnswers = cardToCorrect.answers.concat(altAnswer)
  const newUserPoints = cardToCorrect.userPoints.map(entry => {
    if (entry.answer !== altAnswer) {
      return entry
    }

    entry.points = calculateNewScore(entry.timeToAnswer)
    return entry
  })

  await tryCatch(
    LiveQuestion.updateOne(
      { cardId },
      { $set: {
          answers: newAnswers,
          userPoints: newUserPoints
        }
      }
    ).exec()
  )
}

export async function issueAnswerCorrection(req) {
  const {
    body: {
      cardId: rawCardId,
      wrongAnswer: rawWrongAnswer,
      newHint: rawNewHint
    }
  } = req

  if (!rawCardId || !rawWrongAnswer || !rawNewHint) {
    throw new Error('Form fields must not be empty. Please try again.')
  }

  const cardId = rawCardId.replace(/QID/i, '').trim()
  const wrongAnswer = rawWrongAnswer.trim()
  const newHint = rawNewHint.trim()

  const cardToCorrect = await getLiveQuestion(cardId)
  if (!cardToCorrect) {
    throw new Error(`QID${cardId} was not found in live questions. Please check the QID and try again.`)
  }

  const usersToNotify = getUsersToNotify(cardToCorrect, wrongAnswer)

  await sendCorrectionDMs(usersToNotify, cardId, wrongAnswer, newHint)
  await postCorrectionReply(newHint, cardToCorrect.questionId, cardId)
  await updateLiveQuestion(newHint, wrongAnswer, cardToCorrect, usersToNotify)
}

// private functions

function calculateNewScore(secondsToAnswer) {
  const hoursToAnswer = Math.floor(
    secondsToAnswer / 3600
  )
  const deduction = Math.max(hoursToAnswer, 0)
  const score = 24 - deduction

  return Math.max(score, 0)
}

function postCorrectionReply(newHint, questionId, cardId) {
  const correctionStatus = `@${TWITTER_ACCOUNT} NOTE: After this question (QID${cardId}) went live, we were made aware of another possible answer that wasn't ruled out.` +
    `\nA better hint would have been "${newHint}"`

  const params = {
    status: correctionStatus,
    in_reply_to_status_id: questionId
  }

  return tryCatch(
    Twitter.post('statuses/update', params)
  )
}

async function sendCorrectionDMs(userIds, cardId, wrongAnswer, newHint) {
  const correctionTextDM = `Your guess for QID${cardId} (${wrongAnswer}) was perfectly possible given the context and criteria, ` +
    "but it's not the word the game used, and we failed to rule it out in the hints beforehand." +
    "\n\nTo make up for it, we're giving you another guess so that you might still get some points." +
    `\n\nA better hint would have been "${newHint}".` +
    '\n\nThank you for helping us! Good luck guessing again!'

  let currentUser
  for (let i = 0; i < userIds.length; i++) {
    currentUser = userIds[i]

    const params = {
      event: {
        type: 'message_create',
        message_create: {
          target: {
            recipient_id: currentUser
          },
          message_data: {
            text: correctionTextDM
          }
        }
      }
    }
    await tryCatch(
      Twitter.post('direct_messages/events/new', params)
    )
  }
}

function updateLiveQuestion(newHint, wrongAnswer, cardToCorrect, userIds) {
  const newHintLine = `Hint: ${newHint}`
  let newQuestionText = cardToCorrect.questionText.split('\n')
  const replaceHintIfPresent = newQuestionText[1].startsWith('Hint:')
    ? 1
    : 0

  newQuestionText.splice(1, replaceHintIfPresent, newHintLine)
  newQuestionText = newQuestionText.join('\n')

  const newAlreadyAnswered = cardToCorrect.alreadyAnswered.filter(
    userId => userIds.indexOf(userId) === -1
  )
  const newUserPoints = cardToCorrect.userPoints.filter(
    submission => submission.answer !== wrongAnswer
  )

  return tryCatch(
    LiveQuestion.updateOne(
      { cardId: cardToCorrect.cardId },
      { $set: {
          alreadyAnswered: newAlreadyAnswered,
          questionText: newQuestionText,
          userPoints: newUserPoints
        }
      }
    ).exec()
  )
}

function getLiveQuestion(cardId) {
  return tryCatch(
    LiveQuestion
      .findOne({ cardId })
      .select({
        _id: 0,
        alreadyAnswered: 1,
        answers:         1,
        cardId:          1,
        questionId:      1,
        questionText:    1,
        userPoints:      1
      })
      .lean()
      .exec()
  )
}

function getUsersToNotify(liveQuestion, wrongAnswer) {
  return liveQuestion
    .userPoints
    .filter(
      submission => submission.answer === wrongAnswer
    ).map(
      submission => submission.userId
    )
}
