import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
const { ipcRenderer } = require('electron');

// Custom APIs for renderer
const api = {}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)

    contextBridge.exposeInMainWorld('electronAPI', {
      getUsers: () => ipcRenderer.invoke('get-users'),
      addUser: (user) => ipcRenderer.invoke('add-user', user),
      deleteUser: (id) => ipcRenderer.invoke('delete-user', id),
      updateUser: (user) => ipcRenderer.invoke('update-user', user),
    })

  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
