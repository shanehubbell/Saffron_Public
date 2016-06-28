const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.APP,
    charset: 'utf8',
  },
});

// create connection
const db = require('bookshelf')(knex);

// crucial: handles circular dependencies of the join tables
db.plugin('registry');

// Define schema below. Relationships described in models.
db.knex.schema.hasTable('users').then((exists) => {
  if (!exists) {
    db.knex.schema.createTable('users', (user) => {
      user.increments('id').primary();
      user.string('email', 100).unique();
      user.string('password', 200);
    }).then((table) => {
      console.log('Created table `users`', table);
    });
  }
});


db.knex.schema.hasTable('recipes').then((exists) => {
  if (!exists) {
    db.knex.schema.createTable('recipes', (recipe) => {
      recipe.increments('id').primary();
      recipe.string('recipeTitle', 100);
      recipe.string('recipeUrl', 300).unique()
            .comment('Recipes must not be duplicated in db. Duplicate titles and images are okay.');
      recipe.string('recipeImgUrl', 300);
    }).then((table) => {
      console.log('Created table `recipes`', table);
    });
  }
});

db.knex

// want to know what's associated together

set.increments('id').primary();


db.knex.schema.hasTable('ingredients').then((exists) => {
  if (!exists) {
    db.knex.schema.createTable('ingredients', (ingredient) => {
      ingredient.increments('id').primary();
      ingredient.string('ingredient', 50).unique();
    }).then((table) => {
      console.log('Created table `ingredients`', table);
    });
  }
});

// Relationship between ingredients and recipes
db.knex.schema.hasTable('ingredients_recipes').then((exists) => {
  if (!exists) {
    db.knex.schema.createTable('ingredients_recipes', (ing_rec) => {
      ing_rec.increments('id').primary();
      ing_rec.integer('ingredient_id').unsigned().references('id')
             .inTable('ingredients');
      ing_rec.integer('recipe_id').unsigned().references('id')
             .inTable('recipes');
    }).then((table) => {
      console.log('Created table `ingredients_recipes`', table);
    });
  }
});

// Favorited recipes
db.knex.schema.hasTable('recipes_users').then((exists) => {
  if (!exists) {
    db.knex.schema.createTable('recipes_users', (rec_user) => {
      rec_user.increments('id').primary();
      rec_user.integer('recipe_id').unsigned().references('id')
              .inTable('recipes');
      rec_user.integer('user_id').unsigned().references('id')
              .inTable('users');
    }).then((table) => {
      console.log('Created table `recipes_users`', table);
    });
  }
});

// User's saved sets
db.knex.schema.hasTable('ingredients_users').then((exists) => {
  if (!exists) {
    db.knex.schema.createTable('ingredients_users', (rec_user) => {
      rec_user.increments('id').primary().comment('keep id in case needed in future');
      rec_user.integer('ingredient_id').unsigned().references('id')
              .inTable('ingredients');
      rec_user.integer('user_id').unsigned().references('id')
              .inTable('users');
      rec_user.integer('set_id').unique().notNullable();
    }).then((table) => {
      console.log('Created table `ingredients_users`', table);
    });
  }
});

module.exports = db;
