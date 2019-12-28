import {
  fetchAllUserLastMonth,
  fetchMyLastMonth,
  fetchOnOffShow,
  fetchSomeday
} from '@/services/timeline';

const DayOnlineDetailsModel = {
  namespace: 'timeline',
  state: {
    somedayDetails: {},
    allUserLastMonth: {}
  },
  effects: {
    * getSomeday({ payload }, { call, put }) {
      const response = yield call(fetchSomeday, payload.date);
      yield put({
        type: 'saveSomedayDetail',
        payload: response.result
      })
    },
    * getAllUserLastMonth({ payload }, { call, put }) {
      const response = yield call(fetchAllUserLastMonth, payload.id);
      yield put({
        type: 'saveAllUserLastMonth',
        payload: response.result
      })
    },
    * getMyLastMonth(_, { call, put }) {
      const response = yield call(fetchMyLastMonth);
      yield put({
        type: 'saveMyLastMonth',
        payload: response.result
      })
    },
    * getOnOffShow(_, { call, put }) {
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
    saveAllUserLastMonth(state, { payload }) {
      return {
        ...state,
        allUserLastMonth: payload
      }
    },
    saveMyLastMonth(state, { payload }) {
      return {
        ...state,
        myLastMonth: payload
      }
    },
    saveOnOffShow(state, { payload }) {
      return {
        ...state,
        onOffShow: payload.sort((user1, user2) => user2['department'] - user1['department'])
      }
    }
  }
};

export default DayOnlineDetailsModel
