import { fetchLastMonth, fetchOnOffShow, fetchSomeday } from '@/services/timeline';

const DayOnlineDetailsModel = {
  namespace: 'timeline',
  state: {
    somedayDetails: {},
    lastMonth: {}
  },
  effects: {
    * getSomeday({ payload }, { call, put }) {
      const response = yield call(fetchSomeday, payload.date);
      yield put({
        type: 'saveSomedayDetail',
        payload: response.result
      })
    },
    * getLastMonth({ payload }, { call, put }) {
      const response = yield call(fetchLastMonth, payload.id);
      yield put({
        type: 'saveLastMonth',
        payload: response.result
      })
    },
    * getOnOffShow(_, {call, put}){
      const response = yield call(fetchOnOffShow);
      yield put({
        type: 'saveOnOffShow',
        payload: response.result
      })
    }
  },
  reducers: {
    saveSomedayDetail(state, { payload }) {
      return {
        ...state,
        somedayDetails: payload
      }
    },
    saveLastMonth(state, { payload }) {
      return {
        ...state,
        lastMonth: payload
      }
    },
    saveOnOffShow(state, {payload}){
      return{
        ...state,
        onOffShow: payload.sort((user1, user2) => user2['department'] - user1['department'])
      }
    }
  }
};

export default DayOnlineDetailsModel
