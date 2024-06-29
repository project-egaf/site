import { defineDb, defineTable, column } from 'astro:db';

const Works = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    name: column.text({ unique: true }),
    createdon: column.date({ default: new Date() }),
    lastUpdated: column.date(),
    requested: column.boolean(),
    requestedTimes: column.number(),
    qty: column.number(),
    category: column.number({ default: 0 }), // 0: Anime/Manga, 1:Books, 2: Cartoons/Comics, 3: Celeb & RP, 4: Movies, 5: Music & Bands, 6: Other, 7: Theater, 8: TV Show, 9 Video Games, 10: Uncategorized
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
