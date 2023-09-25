CREATE TABLE IF NOT EXISTS transactions (
  transaction_id UUID NOT NULL,
  transaction_amount NUMERIC,
  other_details VARCHAR(40),
  account_id UUID,
  PRIMARY KEY (transaction_id),
  CONSTRAINT fk_account
  FOREIGN KEY (account_id)
  REFERENCES accounts (account_id)
);