import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();

// helpers
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Simple health route
router.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Root route
router.get('/', (req, res) => {
  res.send('WebSocket + Express server running');
});

// GET /api/blocks - returns blockchain data if available, otherwise a safe stub
router.get('/api/blocks', async (req, res) => {
  try {
    // If the server/data/blocks.json file exists, return it (allows persistence during dev)
    const dataPath = path.join(__dirname, 'data', 'blocks.json');
    if (fs.existsSync(dataPath)) {
      const raw = await fs.promises.readFile(dataPath, 'utf8');
      const parsed = JSON.parse(raw);
      return res.json({ source: 'file', ...parsed });
    }

    // Otherwise return a safe empty-stub response. Importing the app's TypeScript
    // blockchain implementation at runtime is intentionally skipped because the
    // server runs in plain Node (no TS compilation). This stub is safe and can be
    // replaced later with a real adapter that reads compiled code or an exported
    // JSON snapshot.
    const stub = {
      source: 'stub',
      chain: [],
      pendingTransactions: []
    };

    return res.json(stub);
  } catch (err) {
    console.error('Error serving /api/blocks:', err);
    return res.status(500).json({ error: 'failed to load blocks' });
  }
});

export default router;

console.log(":✔adfadsfasdfasdfasdf");

