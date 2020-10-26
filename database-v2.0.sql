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
	"brand" varchar(255) NOT NULL,
	"sku" varchar(255) NOT NULL,
	"sku_description" VARCHAR (320) NOT NULL,
	"qty" DECIMAL NOT NULL,
	"created_at" DATE NOT NULL DEFAULT 'now()'
);


