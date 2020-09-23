const ShoppingListService = {
  getAllItems(db) {
    // left select empty to test for defaulting to '*'
    return db.select('*').from('shopping_list');
  }
};

module.exports = ShoppingListService;