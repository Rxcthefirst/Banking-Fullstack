CREATE TABLE IF NOT EXISTS accounts (
  account_id UUID NOT NULL,
  account_name VARCHAR(40),
  account_balance NUMERIC,
  customer_id UUID,
  PRIMARY KEY (account_id),
  CONSTRAINT fk_customer
  FOREIGN KEY (customer_id)
  REFERENCES customers (customer_id)
);