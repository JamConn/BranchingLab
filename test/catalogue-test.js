import chai from "chai";
import {Catalogue} from "../src/productCatalogue.js";
import {Product} from "../src/product.js";
const expect = chai.expect;

let cat = null;
let batch = null;

// Setup
cat = new Catalogue("Test Catalogue");
cat.addProduct(new Product("A123", "Product 1", 100, 10, 10.0));
cat.addProduct(new Product("A124", "Product 2", 100, 10.0));
cat.addProduct(new Product("A125", "Product 3", 100, 10, 10.0));

describe("Catalogue", () => {
  beforeEach(() => {   // NEW CODE
    cat = new Catalogue("Test Catalogue");
    cat.addProduct(new Product("A123", "Product 1", 100, 10, 10.0, 10));
    cat.addProduct(new Product("A124", "Product 2", 100, 10.0, 10));
    cat.addProduct(new Product("A125", "Product 3", 100, 10, 10.0, 10));
  });
  describe("findProductById", function () {
    it("should find a valid product id", function () {
      const result = cat.findProductById("A123");
      expect(result.name).to.equal("Product 1");
    });
    it("should return undefined for invalid product id", function () {
      const result = cat.findProductById("A321");
      expect(result).to.be.undefined;
    });
  });
  describe("removeProductById", () => {
    it("should remove product with a valid id", function () {
      let result = cat.removeProductById("A123");
      expect(result.id).to.equal("A123");
      // Check object state
      result = cat.findProductById("A123");
      expect(result).to.be.undefined;
    });
    it("should return undefined when asked to remove invalid product", function () {
      const result = cat.removeProductById("A321");
      expect(result).to.be.undefined;
    });
    describe("batchAddProducts", () => {
      beforeEach(function () {
        batch = {
           type: 'Batch',
          products: [
            new Product("A126", "Product 6", 100, 10, 10.0, 10),
            new Product("A127", "Product 7", 100, 10, 10.0, 10),
          ],
        };
      });
      it("should add products for a normal request and return the correct no. added", () => {
        const result = cat.batchAddProducts(batch);
        expect(result).to.equal(2);
        let addedProduct = cat.findProductById("A126");
        expect(addedProduct).to.not.be.undefined;
        addedProduct = cat.findProductById("A126");
        expect(addedProduct).to.not.be.undefined;
      });
      it("should only add products with a non-zero quantity in stock", () => {
        batch.products.push(new Product("A128", "Product 8", 0, 10, 10.0, 10));
        const result = cat.batchAddProducts(batch);
        expect(result).to.equal(2);
        const rejectedProduct = cat.findProductById("A128");
        expect(rejectedProduct).to.be.undefined;
      });
    });
  });
});