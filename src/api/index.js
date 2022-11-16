import axios from 'axios'
import Vue from 'vue'
import VueAxios from 'vue-axios'

import Auth from './auth'
import Level from './level'
import QuestType from './quest_type'
import Game from './game'
import Score from './score'
import Question from './question'
import Choice from './choice'
import Player from './player'
import Answer from './answer'

// Configure axios instance

const instance = axios.create({
  baseURL: 'http://localhost:3000/',
  withCredentials: false,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json'
  }
})
Vue.use(VueAxios, instance)

// Declare $api as global

const factories = {
 auth: Auth(Vue.axios),
 level: Level(Vue.axios),
 questType: QuestType(Vue.axios),
 game: Game(Vue.axios),
 score: Score(Vue.axios),
 question: Question(Vue.axios),
 choice: Choice(Vue.axios),
 player: Player(Vue.axios),
 answer: Answer(Vue.axios)
}
Vue.prototype.$api = factories
