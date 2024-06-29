import { defineDb, defineTable, column } from 'astro:db';

const Works = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    name: column.text({ unique: true }),
    created: column.date({ default: new Date() }),
    lastUpdated: column.date(),
    requested: column.boolean(),
    requestedTimes: column.number(),
    qty: column.number(),
    description: column.text({ optional: true }),
  },
  indexes: [
    { on: ['id'], unique: true }
  ]
});

const Members = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    profilePicture: column.text(),
    name: column.text(),
    role: column.json(), // [0:'developer',1:'writer',2:'maintainer']
  }
});

// https://astro.build/db/config
export default defineDb({
  tables: { Works, Members }
});
