CREATE TABLE "user" (
"id" serial NOT NULL,
	"first_name" varchar(255) NOT NULL,
	"last_name" varchar(255) NOT NULL,
	"email" VARCHAR (320) UNIQUE NOT NULL,
	"password" varchar(255) NOT NULL,
	"created_at" DATE NOT NULL DEFAULT 'now()',
	"role" varchar(255) NOT NULL,
	"token" varchar(255)
    
);

CREATE TABLE "item"
(
	"id" serial NOT NULL,
	"email" varchar(320),
	"first_name" varchar(255),
	"last_name" varchar(255),
	"order_number" varchar(255) NOT NULL,
	"sku" varchar(255) NOT NULL,
	"product_length" TEXT,
	"product_options" TEXT,
	"qty" DECIMAL,
	"assigned" VARCHAR(255),
	"created_at" TEXT
);


