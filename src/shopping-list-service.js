const ShoppingListService = {
  getAllItems(db) {
    // left select empty to test for defaulting to '*'
    return db.select('*').from('shopping_list');
  },
  insertItem(db, newItem) {
    return db
      .insert(newItem)
      .into('shopping_list')
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },
  getById(db, id) {
    return db('shopping_list')
      .select('*')
      .where('id', id)
      .first();
  },
  updateItem(db, id, newItemData) {
    return db('shopping_list')
      .where({ id })
      .update(newItemData);
  }
};

module.exports = ShoppingListService;