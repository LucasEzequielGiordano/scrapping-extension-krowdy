import Dexie from "dexie";

export const db = new Dexie('scrapping')
db.version(1).stores({
    profiles: '++id, contactInfo, experience'
})

export const db2 = new Dexie('profilesUrls')
db2.version(1).stores({
    profilesUrls: '++id'
})