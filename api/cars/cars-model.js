const db = require("../../data/db-config");

const getAll = () => {
  // HOKUS POKUS
  return db("cars");
};

const getById = (id) => {
  // HOKUS POKUS
  return db("cars").where("id", id).first(); //first burada aynı idli veriyi çekersek array olarak dönmesi yerine ilk elemanı yani rowu verir.
};

const getByVin = (vin) => {
  return db("cars").where("vin", vin).first();
};

const create = async (cars) => {
  // HOKUS POKUS
  let [id] = await db("cars").insert(cars); // Burada da yine array olarak döneceğine arrayin ilk elemanı olarak dönmesi için bu şekilde yazılır.
  //let id = await db("cars").insert(cars); // Bu kullanım ise array olarak döner fakat return getById(id[0]) olarak alınırsa ilk eleman alınır.
  return getById(id);
};

module.exports = {
  getAll,
  getById,
  create,
  getByVin,
};
