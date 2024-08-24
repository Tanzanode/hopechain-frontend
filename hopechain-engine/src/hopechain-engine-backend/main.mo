import Array "mo:base/Array";
import Float "mo:base/Float";
import Time "mo:base/Time";

actor HopeChain {

  // Mutable state variables
  var totalPrice : Float = 0.0;
  stable var totalCharityAmount : Float = 0.0;
  stable var startTime : Time.Time = Time.now(); // Initialize startTime

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
    users := Array.append<User>(users, [newUser]);
    return ?newUser; // Return the new user
  };

  public query func getUser(name: Text) : async ?User {
    return Array.find<User>(users, func (user: User) : Bool {
      user.name == name
    });
  };

  // Function to deposit an amount and cut 10% for charity
  public func deposit(amount: Float, currency: Text) : async Float {
    let currentTime = Time.now();
    let elapsedTime = (currentTime - startTime) / 1000000000; 
    let reminderTime = (elapsedTime % 60);

    // Convert amount to ICP based on the currency and reminderTime logic
    let amountInICP = switch (currency) {
      // USD conversion rates based on reminderTime
      case ("USD") {
        if (reminderTime < 20) {
          amount * 0.14;
        } else if (reminderTime >= 20 and reminderTime < 50) {
          amount * 0.16;
        } else {
          amount * 1.2;
        }
      };

      // GBP conversion rates based on reminderTime
      case ("GBP") {
        if (reminderTime < 20) {
          amount * 0.179;
        } else if (reminderTime >= 20 and reminderTime < 50) {
          amount * 0.18;
        } else {
          amount * 0.2;
        }
      };

      // EUR conversion rates based on reminderTime
      case ("EUR") {
        if (reminderTime < 20) {
          amount * 0.143764;
        } else if (reminderTime >= 20 and reminderTime < 50) {
          amount * 0.14444;
        } else {
          amount * 0.145;
        }
      };

      // ETH conversion rates based on reminderTime
      case ("ETH") {
        if (reminderTime < 20) {
          amount * 329.83412;
        } else if (reminderTime >= 20 and reminderTime < 50) {
          amount * 329.99;
        } else {
          amount * 329.8355;
        }
      };

      // BTC conversion rates based on reminderTime
      case ("BTC") {
        if (reminderTime < 20) {
          amount * 7725.0;
        } else if (reminderTime >= 20 and reminderTime < 50) {
          amount * 7725.12;
        } else {
          amount * 7725.01;
        }
      };

      // No conversion needed for ICP or other currencies
      case _ { amount };
    };

    let charity = amountInICP / 10.0; // Calculate 10% charity in ICP
    let remaining = amountInICP - charity; // Calculate the remaining amount after charity in ICP
    
    totalPrice += remaining; // Add remaining amount to the main balance
    totalCharityAmount += charity; // Update the total charity amount
    
    return remaining; // Return the remaining balance in ICP
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
    
    products := Array.append<Product>(products, [newProduct]);
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
