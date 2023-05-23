/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("cars", (table) => {
    table.increments(/*id yazmadan da kabu ediyor*/); // id isimli kolon oluşuyor. id 1-1 artan bir değer alıyor.
    table.string("vin", 17).notNullable().unique();
    table.string("make", 32).notNullable();
    table.string("model", 32).notNullable();
    table.integer("mileage").notNullable();
    table.string("title", 32);
    table.string("transmission", 32);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("cars");
};
