CREATE TABLE IF NOT EXISTS customers (
  customer_id UUID NOT NULL,
  customers_name VARCHAR(40) DEFAULT NULL,
  customers_email VARCHAR(40) NOT NULL,
  login VARCHAR(40) UNIQUE NOT NULL,
  user_password VARCHAR(40) NOT NULL,
  PRIMARY KEY (customer_id)
);
