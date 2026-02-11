import { MongoClient } from 'mongodb';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INPUT_FILE = path.join(__dirname, 'papers_normalized.json');
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/pyq_platform';

async function importToDB() {
  console.log('📦 Starting MongoDB import...');
  
  if (!fs.existsSync(INPUT_FILE)) {
    console.error('❌ papers_normalized.json not found. Run normalizeData.js first!');
    process.exit(1);
  }

  // Read normalized data
  const papers = JSON.parse(fs.readFileSync(INPUT_FILE, 'utf8'));
  console.log(`📥 Loaded ${papers.length} papers from file`);

  const client = new MongoClient(MONGO_URI);

  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');

    const db = client.db();
    const collection = db.collection('papers');

    // Drop existing collection for fresh import (optional)
    // await collection.drop().catch(() => {});
    // console.log('🗑️  Dropped existing collection');

    // Create indexes
    await collection.createIndex({ subject_code: 1, examid: 1 }, { unique: true });
    await collection.createIndex({ branch: 1 });
    await collection.createIndex({ semester: 1 });
    await collection.createIndex({ year: 1 });
    await collection.createIndex({ session: 1 });
    await collection.createIndex({ subject_name: 'text', subject_code: 'text' });
    console.log('✅ Created indexes');

    // Insert papers (handle duplicates)
    let inserted = 0;
    let skipped = 0;

    for (const paper of papers) {
      try {
        await collection.insertOne(paper);
        inserted++;
      } catch (error) {
        if (error.code === 11000) {
          skipped++;
        } else {
          console.error('Error inserting paper:', error.message);
        }
      }
    }

    console.log(`\n✅ IMPORT COMPLETE:`);
    console.log(`   ✓ Inserted: ${inserted}`);
    console.log(`   ⊘ Skipped (duplicates): ${skipped}`);

    // Show collection stats
    const count = await collection.countDocuments();
    console.log(`   📊 Total papers in DB: ${count}`);

  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  } finally {
    await client.close();
    console.log('🔌 Disconnected from MongoDB');
  }
}

importToDB();