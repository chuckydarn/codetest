const request = require("request");
const server = require("../server");
const base = "http://localhost:9000/dogs/";
const sequelize = require("../src/db/models/index").sequelize;
const Dog = require("../src/db/models").Dog;

describe("routes : dogs", () => {
  beforeEach((done) => {
    this.dog;
    sequelize.sync({force: true}).then((res) => {
      Dog.create({
        name: "Poppy"
      })
      .then((dog) => {
        this.dog = dog;
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });
  });

  describe("GET /dogs", () => {
    it("should return a status code 200 and all dogs", (done) => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(err).toBeNull();
        expect(body).toContain("Poppy");
        done();
      });
    });
  });
});
