import { delay, Task } from 'redux-saga'
import { all, take, call, put, fork, cancelled, race, select } from 'redux-saga/effects'
import { ActionType, getType } from 'typesafe-actions'
import RNFS from 'react-native-fs'
import Config from 'react-native-config'
import BackgroundTimer from 'react-native-background-timer'
import BackgroundFetch from 'react-native-background-fetch'
import RNPushNotification from 'react-native-push-notification'

import StorageActions from '../Redux/StorageRedux'
import TextileNodeActions from '../Redux/TextileNodeRedux'
import PreferencesActions, { PreferencesSelectors } from '../Redux/PreferencesRedux'
import { RootAction } from '../Redux/Types'
import {
  newTextile,
  migrateRepo,
  start,
  newWallet,
  walletAccountAt,
  initRepo,
  stop,
  WalletAccount } from '../NativeModules/Textile'
import {logNewEvent} from './DeviceLogs'

const REPO_PATH = RNFS.DocumentDirectoryPath
const MIGRATION_NEEDED_ERROR = 'repo needs migration'
const INIT_NEEDED_ERROR = 'repo does not exist, initialization is required'

export function * manageNode () {
  while (true) {
    try {
      // Block until we get an active or background app state
      const action: ActionType<typeof TextileNodeActions.appStateChange> =
        yield take((action: RootAction) =>
          action.type === getType(TextileNodeActions.appStateChange) && (action.payload.newState === 'active' || action.payload.newState === 'background')
        )

      if (yield select(PreferencesSelectors.verboseUi)) {
        yield call(displayNotification, 'App State Change: ' + action.payload.newState)
      }
      yield call(logNewEvent, 'State Change', action.payload.newState)

      // Reqest to create and start the node no matter what, createAndStartNode below deals with ignoring simultaneious requests.
      yield put(TextileNodeActions.createNodeRequest())

      // If we got a background app state, start a background task and schedule the node to be stopped in 20 seconds
      //
      // This background state can come from a active > background transition
      // or by launching into the background because of a trigger.
      if (action.payload.newState === 'background') {
        yield fork(backgroundTaskRace)
      }
    } catch (error) {
      if (yield select(PreferencesSelectors.verboseUi)) {
        yield call(displayNotification, error, 'Error')
      }
      yield put(TextileNodeActions.nodeError(error))
    }
  }
}

export function * handleCreateNodeRequest () {
  while (true) {
    // We take a request to create and start the node.
    // While we're processing that request, any additional requests will be ignored.
    yield take(getType(TextileNodeActions.createNodeRequest))

    // Fork the call to create and start the node so we don't block upstream saga manageNode
    const task: Task = yield fork(createAndStartNode)

    // Don't take any other createNodeRequests until the forked task is done
    yield call(() => task.done)
  }
}

function * createAndStartNode(): any {
  try {
    yield put(TextileNodeActions.creatingNode())
    yield call(newTextile, REPO_PATH)
    yield put(TextileNodeActions.createNodeSuccess())
    yield put(TextileNodeActions.startingNode())
    yield call(start)
    yield put(TextileNodeActions.startNodeSuccess())
  } catch (error) {
    try {
      if (error.message === MIGRATION_NEEDED_ERROR) {
        yield put(TextileNodeActions.migrationNeeded())
        yield take(getType(TextileNodeActions.migrateNode))
        yield all([
          call(migrateRepo, REPO_PATH),
          delay(3000)
        ])
        yield put(TextileNodeActions.migrationSuccess())
        yield call(createAndStartNode)
      } else if (error.message === INIT_NEEDED_ERROR) {
        yield put(TextileNodeActions.creatingWallet())
        const recoveryPhrase: string = yield call(newWallet, 12)
        yield put(PreferencesActions.updateRecoveryPhrase(recoveryPhrase))
        yield put(TextileNodeActions.derivingAccount())
        const walletAccount: WalletAccount = yield call(walletAccountAt, recoveryPhrase, 0, '')
        const logLevel = (__DEV__ ? 'DEBUG' : 'INFO')
        const logToDisk = !__DEV__
        yield put(TextileNodeActions.initializingRepo())
        yield call(initRepo, walletAccount.Seed, REPO_PATH, logLevel, logToDisk)
        yield call(createAndStartNode)
      } else {
        yield put(TextileNodeActions.nodeError(error))
      }
    } catch (error) {
      yield put(TextileNodeActions.nodeError(error))
    }
  }
}

function * backgroundTaskRace () {
  // This race cancels whichever effect looses the race, so a foreground event will cancel stopping the node
  //
  // Using the race effect, if we get a foreground event while we're waiting
  // to stop the node, cancel the stop and let it keep running
  yield call(BackgroundTimer.start)
  yield race({
    delayAndStopNode: call(stopNodeAfterDelay, 20000),
    foregroundEvent: take(
      (action: RootAction) =>
        action.type === getType(TextileNodeActions.appStateChange) && action.payload.newState === 'active'
    )
  })
  yield all([
    call(BackgroundTimer.stop),
    call(BackgroundFetch.finish, BackgroundFetch.FETCH_RESULT_NEW_DATA)
  ])

}

function * stopNodeAfterDelay (ms: number) {
  try {
    if (yield select(PreferencesSelectors.verboseUi)) {
      yield call(displayNotification, 'Running the node for 20 sec. in the background')
    }
    yield delay(ms)
  } finally {
    if (yield cancelled()) {
      // Let it keep running
      if (yield select(PreferencesSelectors.verboseUi)) {
        yield call(displayNotification, 'Delayed stop of node canceled because of foreground event')
      }
      // Check for new photos in case user left app and came back after taking one
      yield put(StorageActions.refreshLocalImagesRequest())
    } else {
      if (yield select(PreferencesSelectors.verboseUi)) {
        yield call(displayNotification, 'Stopping node')
      }
      yield put(TextileNodeActions.stoppingNode())
      yield call(stop)
      if (yield select(PreferencesSelectors.verboseUi)) {
        yield call(displayNotification, 'Node stopped')
      }
      yield put(TextileNodeActions.stopNodeSuccess())
      yield delay(500)
    }
  }
}

export function * backgroundFetch () {
  yield call(logNewEvent, 'Background fetch trigger', 'Check new content')
}

export function * locationUpdate () {
  yield call(logNewEvent, 'Location trigger', 'Check new content')
}

function displayNotification (message: string, title?: string) {
  RNPushNotification.localNotification({
    title,
    message,
    playSound: false,
    vibrate: false
  })
}
