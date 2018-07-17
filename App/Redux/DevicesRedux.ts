import { createAction, ActionType, getType } from 'typesafe-actions'
import * as TextileTypes from '../Models/TextileTypes'

const actions = {
  addDeviceRequest: createAction('ADD_DEVICE_REQUEST', resolve => {
    return (deviceItem: TextileTypes.DeviceItem) => resolve({ deviceItem })
  }),
  addDeviceSuccess: createAction('ADD_DEVICE_SUCCESS', resolve => {
    return (deviceId: string) => resolve({ deviceId })
  }),
  addDeviceError: createAction('ADD_DEVICE_ERROR', resolve => {
    return (deviceId: string, error: Error) => resolve({ deviceId, error })
  }),
  removeDeviceRequest: createAction('REMOVE_DEVICE_REQUEST', resolve => {
    return (deviceId: string) => resolve({ deviceId })
  }),
  removeDeviceSuccess: createAction('REMOVE_DEVICE_SUCCESS', resolve => {
    return (deviceId: string) => resolve({ deviceId })
  }),
  removeDeviceError: createAction('REMOVE_DEVICE_ERROR', resolve => {
    return (deviceId: string, error: Error) => resolve({ deviceId, error })
  }),
  refreshDevicesRequest: createAction('REFRESH_DEVICES_REQUEST', resolve => {
    return () => resolve()
  }),
  refreshDevicesSuccess: createAction('REFRESH_DEVICES_SUCCESS', resolve => {
    return (devices: TextileTypes.Devices) => resolve({ devices })
  }),
  refreshDevicesError: createAction('REFRESH_DEVICES_ERROR', resolve => {
    return (error: Error) => resolve({ error })
  })
}

export type DevicesAction = ActionType<typeof actions>

export type Device = {
  readonly state: 'adding' | 'added' | 'removing'
  readonly error?: Error
  readonly deviceItem: TextileTypes.DeviceItem
}

export type DevicesState = {
  readonly refreshing: boolean
  readonly refreshError?: Error
  readonly devices: ReadonlyArray<Device>
}

export const initialState: DevicesState = {
  refreshing: false,
  devices: []
}

export function reducer (state: DevicesState = initialState, action: DevicesAction): DevicesState {
  switch (action.type) {
    case getType(actions.addDeviceRequest): {
      const { deviceItem } = action.payload
      const devices = state.devices.concat([{ state: 'adding', deviceItem }])
      return { ...state, devices }
    }
    case getType(actions.addDeviceSuccess): {
      const { deviceId } = action.payload
      const devices = state.devices.map(device => {
        if (device.deviceItem.id === deviceId) {
          const updatedDevice: Device = { ...device, state: 'added' }
          return updatedDevice
        } else {
          return device
        }
      })
      return { ...state, devices }
    }
    case getType(actions.addDeviceError): {
      const { deviceId, error } = action.payload
      const devices = state.devices.map(device => {
        if (device.deviceItem.id === deviceId) {
          const updatedDevice: Device = { ...device, error }
          return updatedDevice
        } else {
          return device
        }
      })
      return { ...state, devices }
    }
    case getType(actions.removeDeviceRequest): {
      const { deviceId } = action.payload
      const devices = state.devices.map(device => {
        if (device.deviceItem.id === deviceId) {
          const updatedDevice: Device = { ...device, state: 'removing' }
          return updatedDevice
        } else {
          return device
        }
      })
      return { ...state, devices }
    }
    case getType(actions.removeDeviceSuccess): {
      const { deviceId } = action.payload
      const devices = state.devices.filter(device => device.deviceItem.id !== deviceId )
      return { ...state, devices }
    }
    case getType(actions.removeDeviceError): {
      const { deviceId, error } = action.payload
      const devices = state.devices.map(device => {
        if (device.deviceItem.id === deviceId) {
          const updatedDevice: Device = { ...device, error }
          return updatedDevice
        } else {
          return device
        }
      })
      return { ...state, devices }
    }
    case getType(actions.refreshDevicesRequest):
      return { ...state, refreshing: true, refreshError: undefined }
    case getType(actions.refreshDevicesSuccess):
      const devices = action.payload.devices.items.map(deviceItem => {
        const device: Device = { state: 'added', deviceItem }
        return device
      })
      return { ...state, refreshing: false, refreshError: undefined, devices }
    case getType(actions.refreshDevicesError):
      return { ...state, refreshing: false, refreshError: action.payload.error }
    default:
      return state
  }
}

export default actions