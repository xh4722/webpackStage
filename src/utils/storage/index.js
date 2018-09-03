import StorageClass from './storage'
import DatabaseClass from './database/'

export const Storage = new StorageClass()
export const Database = new DatabaseClass()

export default {
  Storage,
  Database,
}
