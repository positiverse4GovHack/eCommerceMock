import test from 'ava'
import Actions, { reducer, INITIAL_STATE } from '../../App/Redux/RegisterRedux'

test('attempt', t => {
  const state = reducer(INITIAL_STATE, Actions.registerRequest('data'))

  t.true(state.fetching)
})

test('success', t => {
  const state = reducer(INITIAL_STATE, Actions.registerSuccess('hi'))

  t.is(state.payload, 'hi')
})

test('failure', t => {
  const state = reducer(INITIAL_STATE, Actions.registerFailure(99))

  t.false(state.fetching)
  t.true(state.error)
})
