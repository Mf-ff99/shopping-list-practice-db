require('dotenv').config();
const ShoppingListService = require('../src/shopping-list-service');
const knex = require('knex');
const { expect } = require('chai');

describe(`Shopping List Service object`, function() {
  let db;

  let testItems = [
    {
      id: 1,
      name: 'test 1',
      price: "4.99",
      date_added: new Date('2020-09-22T21:17:20.463Z'),
      checked: false,
      category: 'Main'
    },
    {
      id: 2,
      name: 'test 2',
      price: "3.99",
      date_added: new Date('2020-09-21T21:17:20.463Z'),
      checked: false,
      category: 'Lunch'
    },
    {
      id: 3,
      name: 'test 3',
      price: "2.99",
      date_added: new Date('2020-09-20T21:17:20.463Z'),
      checked: false,
      category: 'Main'
    }
  ];

  before(() => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL
    });
  });

  before(() => db('shopping_list').truncate());

  afterEach(() => db('shopping_list').truncate());

  after(() => db.destroy());

  context(`'shopping_list' has data`, () => {
    beforeEach(() => {
      return db
        .into('shopping_list')
        .insert(testItems);
    });

    it(`'getAllItems()' returns all items from 'shopping_list'`, () => {
      return ShoppingListService.getAllItems(db)
        .then(actual => {
          expect(actual).to.eql(testItems);
        });
    });

  });

  context(`'shopping_list' has no data`, () => {
    it(`'getAllItems()' returns empty array`, () => {
      return ShoppingListService.getAllItems(db)
        .then(actual => {
          expect(actual).to.eql([]);
        });
    });
    it(`insertItem() should insert item and resolve it with id`, () => {
      const newItem = {
        name: 'toys',
        price: "2.99",
        date_added: new Date('2020-09-20T21:17:20.463Z'),
        checked: false,
        category: 'Snack'
      }
      return ShoppingListService.insertItem(db, newItem)
          .then(actual => {
            expect(actual).to.eql({
              id: 1,
              name: newItem.name,
              price: newItem.price,
              date_added: newItem.date_added,
              checked: newItem.checked,
              category: newItem.category
            })
          })
    })
  });
});