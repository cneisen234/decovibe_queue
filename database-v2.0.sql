CREATE TABLE "user" (
"id" serial NOT NULL,
	"first_name" varchar(255) NOT NULL,
	"last_name" varchar(255) NOT NULL,
	"email" VARCHAR (320) UNIQUE NOT NULL,
	"password" varchar(255) NOT NULL,
	"created_at" DATE NOT NULL DEFAULT 'now()',
	"last_login" DATE,
	"role" varchar(10)
    
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
	"created_at" TEXT,
	"description" TEXT,
	"priority" VARCHAR(5) DEFAULT 'low'
);

CREATE TABLE "customitem"
(
	"id" serial NOT NULL,
	"email" varchar(320),
	"first_name" varchar(255),
	"last_name" varchar(255),
	"order_number" varchar(255) NOT NULL UNIQUE,
	"sku" varchar(255) NOT NULL,
	"qty" DECIMAL,
	"assigned" VARCHAR(255),
	"upload_url" TEXT,
	"comments" TEXT,
	"created_at" TEXT,
	"description" TEXT,
	"priority" VARCHAR(5) DEFAULT 'low'
);

CREATE TABLE "customerconfirm"
(
	"id" serial NOT NULL,
	"email" varchar(320),
	"first_name" varchar(255),
	"last_name" varchar(255),
	"order_number" varchar(255) NOT NULL,
	"sku" varchar(255) NOT NULL,
	"qty" DECIMAL,
	"assigned" VARCHAR(255),
	"upload_url1" TEXT,
	"upload_url2" TEXT,
	"upload_url3" TEXT,
	"upload_url4" TEXT,
	"upload_url5" TEXT,
	"upload_url6" TEXT,
	"upload_url7" TEXT,
	"upload_url8" TEXT,
	"upload_url9" TEXT,
	"upload_url10" TEXT,
	"upload_url11" TEXT,
	"upload_url12" TEXT,
	"upload_url13" TEXT,
	"upload_url14" TEXT,
	"upload_url15" TEXT,
	"upload_url16" TEXT,
	"upload_url17" TEXT,
	"upload_url18" TEXT,
	"upload_url19" TEXT,
	"upload_url20" TEXT,
	"comments" TEXT,
	"created_at" TEXT,
	"token" TEXT,
	"description" TEXT,
	"priority" VARCHAR(5),
	"payment_link" TEXT
);

CREATE TABLE "customerrespond"
(
	"id" serial NOT NULL,
	"email" varchar(320),
	"first_name" varchar(255),
	"last_name" varchar(255),
	"order_number" varchar(255) NOT NULL,
	"sku" varchar(255) NOT NULL,
	"qty" VARCHAR(10),
	"assigned" VARCHAR(255),
	"approve" VARCHAR(10),
	"comments" TEXT,
	"created_at" TEXT,
	"token" TEXT,
	"description" TEXT,
	"priority" VARCHAR(5),
	"upload_url" TEXT
);

CREATE TABLE "customerapproved"
(
	"id" serial NOT NULL,
	"email" varchar(320),
	"first_name" varchar(255),
	"last_name" varchar(255),
	"order_number" varchar(255) NOT NULL,
	"sku" varchar(255) NOT NULL,
	"qty" VARCHAR(10),
	"assigned" VARCHAR(255),
	"approve" VARCHAR(10),
	"comments" TEXT,
	"created_at" TEXT,
	"token" TEXT,
	"description" TEXT,
	"priority" VARCHAR(5),
	"upload_url" TEXT
);

CREATE TABLE "history"
(
	"id" serial NOT NULL,
	"email" varchar(320),
	"first_name" varchar(255),
	"last_name" varchar(255),
	"order_number" varchar(255) NOT NULL,
	"sku" varchar(255) NOT NULL,
	"qty" VARCHAR(10),
	"assigned" VARCHAR(255),
	"approve" VARCHAR(10),
	"admincomments" TEXT,
	"customercomments" TEXT,
	"comment_made_at" TEXT,
	"timestamp" DATE NOT NULL DEFAULT NOW()

);

CREATE TABLE "complete"
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
	"created_at" TEXT,
	"timestamp" DATE NOT NULL DEFAULT NOW(),
	"description" TEXT,
	"priority" VARCHAR(5)
);

CREATE TABLE "customcomplete"
(
	"id" serial NOT NULL,
	"email" varchar(320),
	"first_name" varchar(255),
	"last_name" varchar(255),
	"order_number" varchar(255) NOT NULL,
	"sku" varchar(255) NOT NULL,
	"qty" DECIMAL,
	"assigned" VARCHAR(255),
	"upload_url1" TEXT,
	"upload_url2" TEXT,
	"upload_url3" TEXT,
	"upload_url4" TEXT,
	"upload_url5" TEXT,
	"upload_url6" TEXT,
	"upload_url7" TEXT,
	"upload_url8" TEXT,
	"upload_url9" TEXT,
	"upload_url10" TEXT,
	"upload_url11" TEXT,
	"upload_url12" TEXT,
	"upload_url13" TEXT,
	"upload_url14" TEXT,
	"upload_url15" TEXT,
	"upload_url16" TEXT,
	"upload_url17" TEXT,
	"upload_url18" TEXT,
	"upload_url19" TEXT,
	"upload_url20" TEXT,
	"comments" TEXT,
	"created_at" TEXT,
	"token" TEXT,
	"description" TEXT,
	"priority" VARCHAR(5),
	"payment_link" TEXT,
	"item_type" TEXT
);

CREATE TABLE "replies" (
	"id" serial NOT NULL,
	"reply" TEXT
);


