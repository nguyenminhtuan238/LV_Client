import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import Student from './Student'
import user from './user'
import list from './Subjectr'
import Teacher from './Teacher'
import Question from './Question'
import Class from './Class'
import Exam from './Exam'
import ListQ from './ListQ'
import answer from './answer'
import listClass from './listClass'
import test from './test'
import ListANST from './ListANST'
import Nhch from './Nhch'
import listNH from './listNH'
import point from './point'
const reducer = combineReducers({
    user,
    Student,
    list,
    Teacher,
    Question,
    Class,
    Exam,
    ListQ,
    answer,
    listClass,
    test,
    ListANST,
    Nhch,
    listNH,
    point
})
const store = configureStore({
  reducer,
})
export default store;