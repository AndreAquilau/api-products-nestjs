module.exports = {
   "type": process.env.TYPEORM_TYPE_DATABASE,
   "url": process.env.DATABASE_URL,
   "synchronize": process.env.TYPEORM_SYNCHRONIZE,
   "logging": process.env.TYPEORM_LOGGING,
   "entities": [
      process.env.TYPEORM_ENTITIES,
   ],
   "migrations": [
      process.env.TYPEORM_MIGRATIONS,
   ],
   "subscribers": [
      process.env.TYPEORM_SUBCRIBERS,
   ],
   "cli": {
      "entitiesDir": process.env.TYPEORM_ENTITIES_DIR,
      "migrationsDir": process.env.TYPEORM_MIGRATIONS_DIR,
      "subscribersDir": process.env.TYPEORM_SUBCRIBERS_DIR
   }
}
