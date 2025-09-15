import { Router } from 'express';
const router = Router();
import { getContainer } from '../services/cosmosClient';
import { v4 as uuidv4 } from 'uuid';

// CREATE
router.post('/', async (req, res) => {
  try {
    const container = await getContainer();
    const invoice = req.body;
    invoice.id = uuidv4();
    invoice.createdAt = new Date().toISOString();
    const { resource } = await container.items.create(invoice);
    res.status(201).json(resource);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// READ all
router.get('/', async (req, res) => {
  try {
    const container = await getContainer();
    const querySpec = { query: 'SELECT * FROM c ORDER BY c.createdAt DESC' };
    const { resources } = await container.items.query(querySpec).fetchAll();
    res.json(resources);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// READ one
router.get('/:id', async (req, res) => {
  try {
    const container = await getContainer();
    const { resource } = await container.item(req.params.id, req.params.id).read();
    if (!resource) return res.status(404).json({ error: 'Not found' });
    res.json(resource);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// UPDATE
router.put('/:id', async (req, res) => {
  try {
    const container = await getContainer();
    const id = req.params.id;
    const updated = req.body;
    updated.id = id;
    const { resource } = await container.items.upsert(updated);
    res.json(resource);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    const container = await getContainer();
    const id = req.params.id;
    await container.item(id, id).delete();
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
