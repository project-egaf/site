import { db, Members, Works } from 'astro:db';



// https://astro.build/db/seed
export default async function seed() {
	await db.insert(Members).values({
		id: 1,
		profilePicture: '',
		name: 'gingerchew',
		role: [0,1,2]
	});

	await db.insert(Works).values({
		id: 1,
		name: '#DRCL Midnight Children (Manga)',
		lastUpdated: new Date(),
		requested: false,
		requestedTimes: 0,
		category: 0,
		qty: 1,
	});

	await db.insert(Works).values({
		id: 2,
		name: 'Chicchana Mune no Tokimeki (Anime)',
		lastUpdated: new Date(),
		requested: false,
		requestedTimes: 0,
		category: 0,
		qty: 1,
		description: '# Chicchana Mune Tokimeki (Anime)\n An anime series with 1 work'
	});

	await db.insert(Works).values({
		id: 3,
		name: 'Musashi No. 9',
		lastUpdated: new Date(),
		requested: false,
		requestedTimes: 0,
		category: 0,
		qty: 1,
		description: ''
	})
}
