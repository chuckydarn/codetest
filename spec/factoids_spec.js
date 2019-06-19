const request = require("request");
const server = require("../server");
const base = "http://localhost:9000/factoids/";
const sequelize = require("../src/db/models/index").sequelize;
const Dog = require("../src/db/models").Dog;
const Factoid = require("../src/db/models").Factoid;

describe("routes : factoids", () => {
  beforeEach((done) => {
    this.dog;
    this.factoid;
    sequelize.sync({force: true}).then((res) => {
      Dog.create({
        name: "Poppy"
      })
      .then((dog) => {
        this.dog = dog;
        Factoid.create({
          dogId: this.dog.id,
          factoid: "Just so freaking cute"
        })
        .then((factoid) => {
          this.factoid = factoid;
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        });
      })
    });
  });

  describe("GET /factoids", () => {
    it("should return a status code 200 and all factoids", (done) => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(err).toBeNull();
        expect(body).toContain("freaking cute");
        done();
      });
    });
  });

  describe("POST /factoids/create", () => {
    const options = {
      url: `${base}create`,
      form: {
        factoid: "also loves to snug",
        dogId: 1
      }
    };
    it("should create a new factoid", (done) => {
      request.post(options,
        (err, res, body) => {
          Factoid.findOne({where: {factoid: "also loves to snug"}})
          .then((list) => {
            expect(body).toContain("snug");
            done();
          })
          .catch((err) => {
            console.log(err);
            done();
          });
        }
      );
    });
  });

  describe("POST /factoids/:id/destroy", () => {
    it("should delete the factoid with the associated ID", (done) => {
      Factoid.all()
      .then((factoids) => {
        const factoidCountBeforeDelete = factoids.length;
        expect(factoidCountBeforeDelete).toBe(1);
        request.post(`${base}${this.factoid.id}/destroy`, (err, res, body) => {
          Factoid.all()
          .then((factoids) => {
            expect(err).toBeNull();
            expect(factoids.length).toBe(factoidCountBeforeDelete - 1);
            done();
          })
        });
      });
    });
  });
});
