import DB from './dbOps';
const { TWITTER_ACCOUNT } = process.env;
import {
  calculateScore,
  calculateTimeToAnswer,
  contains,
  extractAnswer,
  tryCatch
} from 'Utils';
import { getFollowing } from 'Utils/twitter'


export function evaluateResponse({
  in_reply_to_status_id_str: questionId,
  created_at: replyPostedAt,
  text,
  user: {
    id_str: userId,
    name,
    screen_name: handle,
    profile_image_url_https: avatar,
    profile_banner_url: profileBanner
  }
}) {
  return new Promise(async (resolve, reject) => {
    const liveQuestions = await tryCatch(DB.getLiveQuestions());
    const foundQuestion = liveQuestions.find(
      questionCard => questionCard.questionId === questionId
    );

    if (foundQuestion) {
      const {
        alreadyAnswered,
        answers: acceptedAnswers
      } = foundQuestion;
      if (contains(userId, alreadyAnswered)) {
        resolve();
        return;
      }

      const following = await tryCatch(getFollowing(userId));
      const newUser = {
        userId,
        name,
        handle,
        avatar,
        profileBanner,
        following,
        allTimeStats: {
          attempts: 0,
          correct: [],
          incorrect: [],
          totalPossible: 0,
          rank: 0,
          score: 0,
          avgTimeToAnswer: 0
        },
        monthlyStats: {
          attempts: 0,
          correct: 0,
          totalPossible: 0,
          rank: 0,
          score: 0,
          avgTimeToAnswer: 0,
          average: {
            n: 0,
            value: 0
          }
        },
        weeklyStats: {
          attempts: 0,
          correct: 0,
          totalPossible: 0,
          rank: 0,
          score: 0,
          avgTimeToAnswer: 0,
          average: {
            n: 0,
            value: 0
          }
        },
        dailyStats: {
          attempts: 0,
          correct: 0,
          totalPossible: 0,
          score: 0,
          avgTimeToAnswer: 0,
          average: {
            n: 0,
            value: 0
          }
        }
      };
      await tryCatch(DB.addOrUpdateUser(newUser));

      replyPostedAt = new Date(replyPostedAt).getTime();
      const timeToAnswer = calculateTimeToAnswer(replyPostedAt, foundQuestion);

      const userAnswer = extractAnswer(text);
      if (contains(userAnswer, acceptedAnswers)) {
        const points = calculateScore(replyPostedAt, foundQuestion);
        if (points >= 0) {
          await tryCatch(
            DB.cachePoints(
              questionId,
              { userId, points, timeToAnswer }
            )
          );
        }

      } else {
        await tryCatch(
          DB.cachePoints(
            questionId,
            { userId, points: 0, timeToAnswer }
          )
        );
      }
    }
    resolve();
  });
}
