import Mongoose from 'mongoose';

const Schema = Mongoose.Schema;

const schema = new Schema({
  alreadyAnswered: [String],
  answerAltText: String,
  answerId: String,
  answerImages: [String],
  answerPostedAt: Number,
  answers: [String],
  answerText: String,
  cardId: String,
  game: String,
  mainImageSlice: [Number],
  mediaUrls: [{
    altText: String,
    image: String
  }],
  otherVisibleContext: String,
  prevLineAltText: String,
  prevLineImages: [String],
  questionAltText: String,
  questionId: String,
  questionImages: [String],
  questionPostedAt: Number,
  questionText: String,
  userPoints: [{
    userId: String,
    points: Number,
    timeToAnswer: Number
  }]
});

export default Mongoose.model('liveQuestions', schema);