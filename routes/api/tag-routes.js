const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
// find all tags and include product data
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [
        {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock'],
        },
      ],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// get one tag by 'id', and include product data
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock'],
        },
      ],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// create a new tag
router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// update a tag by 'id'
router.put('/:id', async (req, res) => {
  try {
  const tagData = await Tag.update(
    {
      tag_name: req.body.tag_name,
    },
    {
      where: {
        id: req.params.id,
      },
    },
  );
  res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// delete a tag by 'id'
router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(tagData);
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router;
