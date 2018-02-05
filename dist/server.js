!function(e){function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}var t={};n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},n.p="",n(n.s=5)}([function(e,n,t){function r(){return r=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e},r.apply(this,arguments)}var o=t(16),a=t(4);e.exports=r({},o,a)},function(e,n){e.exports=require("path")},function(e,n,t){function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=[],r=!0,o=!1,a=void 0;try{for(var i,c=e[Symbol.iterator]();!(r=(i=c.next()).done)&&(t.push(i.value),!n||t.length!==n);r=!0);}catch(e){o=!0,a=e}finally{try{r||null==c.return||c.return()}finally{if(o)throw a}}return t}function a(e,n){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return o(e,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}function i(e){return function(){var n=this,t=arguments;return new Promise(function(r,o){function a(e,n){try{var t=s[e](n),a=t.value}catch(e){return void o(e)}t.done?r(a):Promise.resolve(a).then(i,c)}function i(e){a("next",e)}function c(e){a("throw",e)}var s=e.apply(n,t);i()})}}function c(e,n,t){return s.apply(this,arguments)}function s(){return s=i(regeneratorRuntime.mark(function e(n,t,r){var o,a,i;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,w(f.connect(d));case 2:return o=e.sent,a=o.db(p).collection(r),e.next=6,w(a.find().project({_id:0}).toArray());case 6:i=e.sent,t.json(i),o.close();case 9:case"end":return e.stop()}},e,this)})),s.apply(this,arguments)}function u(e,n){return new Promise(function(){var t=i(regeneratorRuntime.mark(function t(r,o){var a,i;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return a=e.db(p).collection("liveQuestions"),t.next=3,w(a.findOne({cardId:n}));case 3:return i=t.sent,t.next=6,w(a.remove(i));case 6:return t.next=8,w(l(e,i));case 8:r();case 9:case"end":return t.stop()}},t,this)}));return function(e,n){return t.apply(this,arguments)}}())}function l(e,n){var t=n.cachedPoints,r=n.cardId;return new Promise(function(){var n=i(regeneratorRuntime.mark(function n(o,a){var i,c,s,u,l,f,d;return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:for(i=e.db(p).collection("scoreboard"),c=(new Date).getTime(),s=[],u=0;u<t.length;++u)l=t[u],f=l.userId,d=l.points,s.push({updateOne:{filter:{userId:f},update:{$inc:{score:d,weeklyScore:d,monthlyScore:d},$push:{correctAnswers:{answerPostedAt:c,cardId:r,points:d}}}}});if(0!==s.length){n.next=7;break}return o(),n.abrupt("return");case 7:return n.next=9,w(i.bulkWrite(s));case 9:o();case 10:case"end":return n.stop()}},n,this)}));return function(e,t){return n.apply(this,arguments)}}())}var f=t(11).MongoClient,d=process.env.MONGODB_URI,p=process.env.MONGO_DB,m=t(12),v=m.processUpload,h=t(0),w=(h.A_MONTH_AGO,h.A_WEEK_AGO,h.tryCatch);e.exports={getRandomQuestion:function(){return new Promise(function(){var e=i(regeneratorRuntime.mark(function e(n,t){var r,o,a,i;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,w(f.connect(d));case 2:return r=e.sent,o=r.db(p).collection("newCards"),a=r.db(p).collection("oldCards"),e.next=7,w(o.findOne());case 7:if(null!=(i=e.sent)){e.next=11;break}return t("Empty deck. Please Add More Cards to DB."),e.abrupt("return");case 11:return e.next=13,w(a.insert(i));case 13:return e.next=15,w(o.remove(i));case 15:n(i),r.close();case 17:case"end":return e.stop()}},e,this)}));return function(n,t){return e.apply(this,arguments)}}())},revealAnswerWorkflow:function(e){return new Promise(function(){var n=i(regeneratorRuntime.mark(function n(t,r){var o,a,i;return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,w(f.connect(d));case 2:return o=n.sent,a=o.db(p).collection("oldCards"),n.next=6,w(a.findOne({cardId:e}));case 6:return i=n.sent,t(i),n.next=10,w(u(o,e));case 10:o.close();case 11:case"end":return n.stop()}},n,this)}));return function(e,t){return n.apply(this,arguments)}}())},addLiveQuestion:function(){var e=i(regeneratorRuntime.mark(function e(n,t){var r,o,a,i;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return r=n.cardId,e.next=3,w(f.connect(d));case 3:return o=e.sent,a=o.db(p).collection("liveQuestions"),i=o.db(p).collection("oldCards"),e.next=8,w(a.insert(n));case 8:return e.next=10,w(i.updateOne({cardId:r},{$set:{mediaUrls:t},$unset:{questionImg:"",prevLineImg:""}}));case 10:o.close();case 11:case"end":return e.stop()}},e,this)}));return function(n,t){return e.apply(this,arguments)}}(),addMediaUrlsToCard:function(){var e=i(regeneratorRuntime.mark(function e(n,t){var r,o,i,c;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return r=a(t,1),o=r[0],e.next=3,w(f.connect(d));case 3:return i=e.sent,c=i.db(p).collection("oldCards"),e.next=7,w(c.updateOne({cardId:n},{$push:{mediaUrls:o},$unset:{answerImg:""}}));case 7:i.close();case 8:case"end":return e.stop()}},e,this)}));return function(n,t){return e.apply(this,arguments)}}(),updateLiveQuestion:function(){var e=i(regeneratorRuntime.mark(function e(n,t){var r,o,a,i,c;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,w(f.connect(d));case 2:return r=e.sent,o=r.db(p).collection("liveQuestions"),a=t.userId,i=t.points,c={$push:{alreadyAnswered:a}},i>0&&(c.$push.cachedPoints=t),e.next=9,w(o.update({questionId:n},c));case 9:r.close();case 10:case"end":return e.stop()}},e,this)}));return function(n,t){return e.apply(this,arguments)}}(),getLiveQuestions:function(){return new Promise(function(){var e=i(regeneratorRuntime.mark(function e(n,t){var r,o,a;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,w(f.connect(d));case 2:return r=e.sent,o=r.db(p).collection("liveQuestions"),e.next=6,w(o.find().toArray());case 6:a=e.sent,n(a),r.close();case 9:case"end":return e.stop()}},e,this)}));return function(n,t){return e.apply(this,arguments)}}())},addOrUpdateUser:function(){var e=i(regeneratorRuntime.mark(function e(n){var t,o,a,i,c,s,u,l,m,v;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,w(f.connect(d));case 2:return t=e.sent,o=t.db(p).collection("scoreboard"),a=n.userId,e.next=7,w(o.findOne({userId:a}));case 7:if(!(i=e.sent)){e.next=14;break}return s=n.name,u=n.handle,l=n.avatar,m=n.profileBanner,v=n.following,e.next=12,w(o.updateOne({userId:a},(c={$set:{name:s}},r(c,"$set",{handle:u}),r(c,"$set",{avatar:l}),r(c,"$set",{profileBanner:m}),r(c,"$set",{following:v}),c)));case 12:e.next=16;break;case 14:return e.next=16,w(o.insert(n));case 16:t.close();case 17:case"end":return e.stop()}},e,this)}));return function(n){return e.apply(this,arguments)}}(),adjustScore:function(e,n){},getScores:function(){var e=i(regeneratorRuntime.mark(function e(n,t){var r,o,a;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,w(f.connect(d));case 2:return r=e.sent,o=r.db(p).collection("scoreboard"),e.next=6,w(o.find().sort("score",-1).project({_id:0}).toArray());case 6:a=e.sent,t.json(a),r.close();case 9:case"end":return e.stop()}},e,this)}));return function(n,t){return e.apply(this,arguments)}}(),getScore:function(){var e=i(regeneratorRuntime.mark(function e(n,t){var r,o,a,i;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return r=n.params.handle,e.next=3,w(f.connect(d));case 3:return o=e.sent,a=o.db(p).collection("scoreboard"),e.next=7,w(a.findOne({handle:r}));case 7:i=e.sent,t.json(i),o.close();case 10:case"end":return e.stop()}},e,this)}));return function(n,t){return e.apply(this,arguments)}}(),addDeck:function(){var e=i(regeneratorRuntime.mark(function e(n,t){var r,o,a,i,c,s;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return r=n.file.path,e.next=3,w(v(r));case 3:return o=e.sent,e.next=6,w(f.connect(d));case 6:for(a=e.sent,i=a.db(p).collection("newCards"),c=i.initializeUnorderedBulkOp(),s=0;s<o.length;++s)c.insert(o[s]);return e.next=12,w(c.execute());case 12:a.close(),t.redirect("/");case 14:case"end":return e.stop()}},e,this)}));return function(n,t){return e.apply(this,arguments)}}(),getNewCards:function(e,n){c(e,n,"newCards")},getOldCards:function(e,n){c(e,n,"oldCards")},weeklyMonthlyReset:function(){var e=i(regeneratorRuntime.mark(function e(n,t){var o,a,i;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,w(f.connect(d));case 2:o=e.sent,a=o.db(p).collection("scoreboard"),i=n&&t?r({$set:{weeklyScore:0}},"$set",{monthlyScore:0}):n?{$set:{weeklyScore:0}}:{$set:{monthlyScore:0}},a.update({},i,{multi:!0}),o.close();case 7:case"end":return e.stop()}},e,this)}));return function(n,t){return e.apply(this,arguments)}}()}},function(e,n,t){var r=t(17),o=process.env,a=o.TWITTER_API_KEY,i=o.TWITTER_API_SECRET,c=o.TWITTER_TOKEN,s=o.TWITTER_TOKEN_SECRET,u=(o.TWITTER_ACCOUNT,{consumer_key:a,consumer_secret:i,access_token:c,access_token_secret:s});e.exports=new r(u)},function(e,n,t){function r(e){return Array.isArray(e)?e:Array.from(e)}function o(e){throw new Error('"'+e+'" is read-only')}function a(e,n){var t=[],r=!0,o=!1,a=void 0;try{for(var i,c=e[Symbol.iterator]();!(r=(i=c.next()).done)&&(t.push(i.value),!n||t.length!==n);r=!0);}catch(e){o=!0,a=e}finally{try{r||null==c.return||c.return()}finally{if(o)throw a}}return t}function i(e,n){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return a(e,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}function c(e){return-1!==e}function s(e){return 0!==e.replace(/\[\]/g,"").trim().length}function u(e){var n=/\[.*?\]/g;return(e.match(n)||[]).length+e.replace(n,"").replace(/[\s+\(\)]/g,"").length}function l(e){var n=(e.match(/\?/g)||[]).length;return u(e)-n}function f(e){return[l(e),u(e)]}function d(e){return x(h(v(m(p(e.match(/\:\:.+?\:\:(.+?)\}\}/)[1]))))).map(function(e){if("."===e)return"[]";if("-"===e)return"[] [] [] [] []";if(/\?/.test(e)){for(var n=[],t=Number(e.match(/\d+/)[0]),r=0;r<t;r++)n.push("[?]");return 1===n.length?"[?]":"("+n.join(" ")+")"}return/≠/.test(e)?"[≠".concat(e.replace(/≠/g,""),"]"):e}).join(" ")}function p(e){return e.replace(/(\?+)/g,function(e,n){return"(".concat(n.length,"?)")})}function m(e){return e.replace(/≠[^(]/g,"($&)")}function v(e){return e.replace(/≠\((.*)\)/g,"(≠$1)")}function h(e){return e.split(/[\(\)]/).map(function(e){return/\?|≠/.test(e)?e:e.split("")})}function w(e){return!Array.isArray(e)}function x(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];if(0===e.length)return n;var t=r(e),o=t[0],a=t.slice(1);return w(o)?x(a,n.concat(o)):x(a,n.concat(x(o)))}var g=t(18),y=process.env.TWITTER_ACCOUNT;e.exports={HOURS:36e5,formatQuestionAltText:function(e){var n=d(e),t=f(n),r=i(t,2),o=r[0],a=r[1],c=o===a?o:"".concat(o," to ").concat(a),s=a>1?"s":"",u="(".concat(c," character").concat(s,")");return e.replace(/\{\{.+?\}\}/g,u)},formatQuestionText:function(e,n,t,r){var o=d(e),a=f(o),c=i(a,2),u=c[0],l=c[1],p=u===l?u:"".concat(u,"-").concat(l),m="What ".concat(p,' character answer means "').concat(n,'"?');return s(o)&&(m+="\nHint: ".concat(o)),t&&(m+="\nNotes: ".concat(t)),m+="\nQID".concat(r)},formatAnswerAltText:function(e){return e.replace(/\{\{.*?\:\:(.+?)\:\:.*?\}\}/g,"$1")},formatAnswerText:function(e,n,t,r){var o=e.length>1?"s":"",a="Answer".concat(o,": ").concat(e.join(", "));return a+='\nEnglish Meaning: "'.concat(n,'"'),a+="\nDefinition: https://ejje.weblio.jp/content/"+g(t),a+="\nQID".concat(r)},addQuestionLink:function(e,n){var t="Question: twitter.com/".concat(y,"/status/").concat(n),r=e.split("\n");return r.splice(-1,0,t),r.join("\n")},getAnswers:function(e,n){var t=e.match(/\:\:(.+?)\:\:/)[1],r=[];return n&&n.length>0&&(r=n.split(",")),[t].concat(r)},calculateScore:function(e,n){var t=n.questionPostedAt,r=(n.alreadyAnswered,Math.floor((new Date(e)-new Date(t))/36e5)),o=24-r;return Math.max(o,0)},extractAnswer:function(e){return e.trim().slice(y.length+2)},getTimeUntil:function(e){var n=new Date,t=new Date(n.getFullYear(),n.getMonth(),n.getDate(),e,0,0,0)-n;return t<0&&(t+=(o("millisUntilTime"),864e5)),t},tryCatch:function(e){return e.then(function(e){return e}).catch(function(e){return console.error("Error:",e),{}})},contains:function(e,n){return c(n.indexOf(e))}}},function(e,n,t){t(6),e.exports=t(7)},function(e,n){e.exports=require("babel-polyfill")},function(e,n,t){var r=t(8),o=r(),a=t(1),i=t(9);t(10);o.set("port",process.env.PORT||3e3),o.use(r.static(a.resolve(__dirname,"../dist"))),o.use(i.json()),t(19)(o),o.listen(o.get("port"),function(){return console.log("Listening on port",o.get("port"))}),e.exports=o},function(e,n){e.exports=require("express")},function(e,n){e.exports=require("body-parser")},function(e,n,t){function r(e){return function(){var n=this,t=arguments;return new Promise(function(r,o){function a(e,n){try{var t=s[e](n),a=t.value}catch(e){return void o(e)}t.done?r(a):Promise.resolve(a).then(i,c)}function i(e){a("next",e)}function c(e){a("throw",e)}var s=e.apply(n,t);i()})}}function o(){return a.apply(this,arguments)}function a(){return a=r(regeneratorRuntime.mark(function e(){var n,t,r,o,a,c,s,l,f,d,p,m,v;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,w(u.getRandomQuestion());case 2:if(n=e.sent,t=n.cardId,r=n.questionText,o=n.questionImg,a=n.questionAltText,c=n.prevLineImg,s=n.prevLineAltText,l=n.answers,t){e.next=12;break}return e.abrupt("return");case 12:return e.next=14,w(h(r,o,a,c,s));case 14:f=e.sent,d=f.questionId,p=f.questionPostedAt,m=f.mediaUrls,v={cardId:t,questionId:d,answers:l,questionPostedAt:p,cachedPoints:[],alreadyAnswered:[]},u.addLiveQuestion(v,m),setTimeout(function(){return i(t,d)},y);case 21:case"end":return e.stop()}},e,this)})),a.apply(this,arguments)}function i(e,n){return c.apply(this,arguments)}function c(){return c=r(regeneratorRuntime.mark(function e(n,t){var r,o,a,i,c,s;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,w(u.revealAnswerWorkflow(n));case 2:return r=e.sent,o=r.answerText,a=r.answerImg,i=r.answerAltText,e.next=8,w(h(f(o,t),a,i));case 8:c=e.sent,s=c.mediaUrls,u.addMediaUrlsToCard(n,s);case 11:case"end":return e.stop()}},e,this)})),c.apply(this,arguments)}function s(){var e=x.stream("statuses/filter",{track:"@".concat(g)});e.on("tweet",function(){var e=r(regeneratorRuntime.mark(function e(n){var t,r,o,a,i,c,s,l,f,h,x,g,y,b,A,T,R;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=n.in_reply_to_status_id_str,r=n.created_at,o=n.text,a=n.user,i=a.id,c=a.name,s=a.screen_name,l=a.profile_image_url_https,f=a.profile_banner_url,e.next=3,w(u.getLiveQuestions());case 3:if(h=e.sent,!(x=h.filter(function(e){return e.questionId===t})[0])){e.next=21;break}if(g=x.alreadyAnswered,y=x.answers,!p(i,g)){e.next=9;break}return e.abrupt("return");case 9:if(b=m(o),!p(b,y)){e.next=20;break}return A=d(r,x),e.next=14,w(v(i));case 14:T=e.sent,R={userId:i,name:c,handle:s,avatar:l,profileBanner:f,following:T,score:0,monthlyScore:0,weeklyScore:0,correctAnswers:[]},u.addOrUpdateUser(R),u.updateLiveQuestion(t,{userId:i,points:A}),e.next=21;break;case 20:u.updateLiveQuestion(t,{userId:i,points:0});case 21:case"end":return e.stop()}},e,this)}));return function(n){return e.apply(this,arguments)}}()),e.on("disconnect",function(n){console.error("Tweet stream disconnected:",n),setTimeout(function(){return e.start()},100)})}var u=t(2),l=t(0),f=(l.HOURS,l.addQuestionLink),d=l.calculateScore,p=l.contains,m=l.extractAnswer,v=l.getFollowing,h=(l.getTimeUntil,l.postMedia),w=l.tryCatch,x=t(3),g=process.env.TWITTER_ACCOUNT,y=4e4,b=1e4;e.exports={start:function(){s(),setInterval(o,b)}}},function(e,n){e.exports=require("mongodb")},function(e,n,t){function r(e,n){var t=[],r=!0,o=!1,a=void 0;try{for(var i,c=e[Symbol.iterator]();!(r=(i=c.next()).done)&&(t.push(i.value),!n||t.length!==n);r=!0);}catch(e){o=!0,a=e}finally{try{r||null==c.return||c.return()}finally{if(o)throw a}}return t}function o(e,n){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return r(e,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}function a(e){return function(){var n=this,t=arguments;return new Promise(function(r,o){function a(e,n){try{var t=s[e](n),a=t.value}catch(e){return void o(e)}t.done?r(a):Promise.resolve(a).then(i,c)}function i(e){a("next",e)}function c(e){a("throw",e)}var s=e.apply(n,t);i()})}}function i(e){return new Promise(function(){var n=a(regeneratorRuntime.mark(function n(t,r){var o;return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:o=v.createReadStream(e).pipe(x.Extract({path:"uploads"})),o.on("close",a(regeneratorRuntime.mark(function e(){var n,r;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=v.readdirSync(g),e.next=3,_(c(g+"/media"));case 3:console.log("Finished optimizing images!"),r=s(n),p(n),t(r);case 7:case"end":return e.stop()}},e,this)})));case 2:case"end":return n.stop()}},n,this)}));return function(e,t){return n.apply(this,arguments)}}())}function c(e){return new Promise(function(n,t){var r=[];v.readdirSync(e).forEach(function(n){if(/.*\.png$/.test(n)){var t=e+"/"+n,o=v.readFileSync(t),a=v.createWriteStream(t),i=new Promise(function(e,n){return a.on("close",e)});r.push(i),new h({filterType:4,deflateLevel:1}).parse(o,function(e,n){n.data[3]-=1,n.pack().pipe(a)})}}),Promise.all(r).then(n)})}function s(e){var n=[],t=!0,r=!1,o=void 0;try{for(var a,i=e[Symbol.iterator]();!(t=(a=i.next()).done);t=!0){var c=a.value,s="".concat(g,"/").concat(c);if(v.statSync(s).isFile()&&c.match(/.+\.json$/)){var l=u(s);n=n.concat(l)}}}catch(e){r=!0,o=e}finally{try{t||null==i.return||i.return()}finally{if(r)throw o}}return n}function u(e){return JSON.parse(v.readFileSync(e,"utf8")).notes.map(function(e){var n=o(e.fields,14),t=n[0],r=n[3],a=n[5],i=n[6],c=n[8],s=n[9],u=n[10],f=n[11],p=n[12],m=n[13],v=[t,r,p].map(l),h=o(v,3);t=h[0],r=h[1],p=h[2];var w=k(t,u);return{cardId:m,questionText:A(t,r,p,m),questionImg:d(a),questionAltText:b(t),prevLineImg:d(c),prevLineAltText:s,answerText:R(w,r,f,m),answerImg:d(i),answerAltText:T(t),answers:w,mediaUrls:[]}})}function l(e){return e.replace(/<.*?>|&.*;/g,"")}function f(e){return(e.match(/src="(.+)"/)||[,])[1]}function d(e){if(e&&0!==e.length){var n;try{n=v.readFileSync("".concat(g,"/media/").concat(f(e)),{encoding:"base64"})}catch(e){}return n}}function p(e){var n=!0,t=!1,r=void 0;try{for(var o,a=e[Symbol.iterator]();!(n=(o=a.next()).done);n=!0){var i=o.value,c="".concat(g,"/").concat(i);v.lstatSync(c).isFile()?v.unlinkSync(c):v.lstatSync(c).isDirectory()&&m(c)}}catch(e){t=!0,r=e}finally{try{n||null==a.return||a.return()}finally{if(t)throw r}}}function m(e){v.existsSync(e)&&(v.readdirSync(e).forEach(function(n){var t=e+"/"+n;v.lstatSync(t).isDirectory()?m(t):v.unlinkSync(t)}),v.rmdirSync(e))}var v=t(13),h=t(14).PNG,w=t(1),x=t(15),g=w.resolve(__dirname,"../uploads"),y=t(0),b=y.formatQuestionAltText,A=y.formatQuestionText,T=y.formatAnswerAltText,R=y.formatAnswerText,k=y.getAnswers,_=y.tryCatch;e.exports={processUpload:i,parseAnkiJson:u,optimizeImages:c}},function(e,n){e.exports=require("fs")},function(e,n){e.exports=require("pngjs2")},function(e,n){e.exports=require("unzip-stream")},function(e,n,t){function r(e){return function(){var n=this,t=arguments;return new Promise(function(r,o){function a(e,n){try{var t=s[e](n),a=t.value}catch(e){return void o(e)}t.done?r(a):Promise.resolve(a).then(i,c)}function i(e){a("next",e)}function c(e){a("throw",e)}var s=e.apply(n,t);i()})}}function o(e,n){return new Promise(function(t,r){a.post("media/upload",{media_data:e},function(e,o,i){if(e)return console.error(e),void r("Media upload failed.");var c=o.media_id_string,s={media_id:c,alt_text:{text:n}};a.post("media/metadata/create",s,function(e,n,o){e&&(console.error(e),r("Media upload succeeded, media creation failed.")),t(c)})})})}var a=t(3),i=t(4),c=i.tryCatch;e.exports={postMedia:function(e,n,t,i,s){return new Promise(function(){var u=r(regeneratorRuntime.mark(function r(u,l){var f,d,p,m;return regeneratorRuntime.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,c(o(n,t));case 2:if(f=r.sent,d=[f],!i){r.next=9;break}return r.next=7,c(o(i,s));case 7:p=r.sent,d.unshift(p);case 9:m={status:e,media_ids:d,tweet_mode:"extended"},a.post("statuses/update",m,function(e,n,t){e&&(console.error(e),l("Posting status failed."));var r=n.extended_entities.media.map(function(e){return e.media_url_https}),o={questionId:n.id_str,questionPostedAt:n.created_at,mediaUrls:r};u(o)});case 11:case"end":return r.stop()}},r,this)}));return function(e,n){return u.apply(this,arguments)}}())},getFollowing:function(e){return new Promise(function(n,t){a.get("friends/ids",{userId:e},function(e,t,r){e&&console.error(e),n(t.ids)})})}}},function(e,n){e.exports=require("twit")},function(e,n){e.exports=require("urlencode")},function(e,n,t){var r=t(2),o=t(20)({dest:"uploads/"});e.exports=function(e){e.use(function(e,n,t){n.header("Access-Control-Allow-Origin","*"),n.header("Access-Control-Allow-Methods","GET, OPTIONS"),n.header("Access-Control-Max-Age","86400"),n.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept"),t()}),e.get("/api/scores",function(e,n){r.getScores(e,n)}),e.get("/api/score/:handle",function(e,n){r.getScore(e,n)}),e.get("/api/cards/old",function(e,n){r.getOldCards(e,n)}),e.post("/deck/new",o.single("zipfile"),function(e,n){r.addDeck(e,n)}),e.post("/scores/edit",function(e,n){r.adjustScore(e,n)}),e.get("/cards/new",function(e,n){r.getNewCards(e,n)})}},function(e,n){e.exports=require("multer")}]);
//# sourceMappingURL=server.js.map