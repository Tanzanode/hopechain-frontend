import Array "mo:base/Array";
import Float "mo:base/Float";

actor HopeChain {

  // Mutable state variables
  var totalPrice : Float = 0.0;
  stable var totalCharityAmount : Float = 0.0;

  type User = {
    name: Text;
  };

  type Product = {
    productName: Text;
    shortDescription: Text;
    longDescription: Text;
    price: Float;
    currency: Text;
    productImage: Text;
    inventory: Nat;
    dateAdded: Text;
  };

  var users: [User] = [];
  var products: [Product] = [];

  // Public functions
  public func registerUser(name: Text) : async ?User {
    if (userExists(name)) {
      return null; // Return null if user already exists
    };
    
    let newUser = { name = name };
    users := Array.append(users, [newUser]);
    return ?newUser; // Return the new user
  };

  public query func getUser(name: Text) : async ?User {
    if (userExists(name)) {
      return Array.find<User>(users, func (user: User) : Bool {
        user.name == name
      });
    };
    return null;
  };

  // Function to deposit an amount and cut 10% for charity
  public func deposit(amount: Float) : async Float {
    let charity = amount / 10; // Calculate 10% charity
    let remaining = amount - charity; // Calculate the remaining amount after charity
    
    totalPrice += remaining; // Add remaining amount to the main balance
    totalCharityAmount += charity; // Update the total deducted amount
    
    return remaining; // Return the remaining balance after deduction
  };

  // Query functions
  public query func getTotalPrice() : async Float {
    return totalPrice;
  };

  public query func getTotalCharityAmount() : async Float {
    return totalCharityAmount;
  };

  // Function to add a product
  public func addProduct(
    productName: Text,
    shortDescription: Text,
    longDescription: Text,
    price: Float,
    currency: Text,
    productImage: Text,
    inventory: Nat,
    dateAdded: Text
  ) : async () {
    let newProduct = {
      productName = productName;
      shortDescription = shortDescription;
      longDescription = longDescription;
      price = price;
      currency = currency;
      productImage = productImage;
      inventory = inventory;
      dateAdded = dateAdded;
    };
    
    products := Array.append(products, [newProduct]);
  };

  // Function to get all products
  public query func getProducts() : async [Product] {
    return products;
  };

  // Helper function to check if a user already exists
  private func userExists(name: Text) : Bool {
    Array.find<User>(users, func (user: User) : Bool {
      user.name == name
    }) != null
  };
}
