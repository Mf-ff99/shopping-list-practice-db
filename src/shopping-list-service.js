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
};

module.exports = ShoppingListService;