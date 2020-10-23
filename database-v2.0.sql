CREATE TABLE "user" (
	"id" SERIAL PRIMARY KEY,
    "lcf_id" int,
    "admin_id" int,
    "email" varchar,
    "password" varchar,
    "role" varchar,
    "last_login" TIMESTAMPTZ,
	"token" varchar(255)
    
);



CREATE TABLE "admin" (
	"id" serial NOT NULL,
	"first_name" varchar(255) NOT NULL,
	"last_name" varchar(255) NOT NULL,
	"email" VARCHAR (320) UNIQUE NOT NULL,
	"password" varchar(255) NOT NULL,
	"created_at" DATE NOT NULL DEFAULT 'now()',
	"role" varchar(255) NOT NULL,
	"token" varchar(255)
	CONSTRAINT "admin_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "student" (
	"id" serial NOT NULL,
	"lcf_id" integer NOT NULL UNIQUE,
	"first_name" varchar(255) NOT NULL,
	"last_name" varchar(255) NOT NULL,
	"school_attend" varchar(255) NOT NULL,
	"school_id" integer,
	"student_email" varchar(255) NOT NULL UNIQUE,
	"password" varchar(255) NOT NULL,
	"grade" integer NOT NULL,
	"grad_year" integer NOT NULL,
	"last_login" TIMESTAMPTZ,
	"created_at" DATE NOT NULL,
	"lcf_start_date" DATE NOT NULL,
	"role" varchar(255) NOT NULL,
	"pif_amount" NUMERIC(10,2) NOT NULL,
	"savings" DECIMAL,
	"strikes" integer,
	"inactive" varchar(255) DEFAULT 'no',
	"balance_due" NUMERIC(10,2) NOT NULL DEFAULT 0,
	"trip" VARCHAR(5),
	"token" varchar(255)
	CONSTRAINT "student_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "entry" (
	"id" serial NOT NULL,
	"lcf_id" integer NOT NULL,
	"pay_day" DATE,
	"previous_pay_day" DATE,
	"date_submitted" DATE NOT NULL,
	"gpa" NUMERIC(10,2) NOT NULL,
	"clean_attend" integer NOT NULL,
	"pass_class" varchar(255) NOT NULL,
	"detent_hours" varchar(255) NOT NULL,
	"act_or_job" varchar(255) NOT NULL,
	"passed_ua" varchar(255) NOT NULL,
	"current_service_hours" integer NOT NULL,
	"hw_rm_attended" varchar(255) NOT NULL,
	"comments" varchar(255) ,
	"bonus_amount" NUMERIC(10,2) NOT NULL DEFAULT 0,
	"bonus_comments" varchar(255),
	CONSTRAINT "entry_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "open_transaction" (
	"id" serial NOT NULL,
	"lcf_id" integer NOT NULL,
	"first_name" varchar(255) NOT NULL,
	"last_name" varchar(255) NOT NULL,
	"grade" int NOT NULL,
	"pay_day" DATE NOT NULL,
	"date_submitted" DATE NOT NULL DEFAULT NOW(),
	"pass_class" varchar(255) NOT NULL,
	"gpa" NUMERIC(10,2) NOT NULL,
	"clean_attend" integer NOT NULL,
	"detent_hours" varchar(255) NOT NULL,
	"act_or_job" varchar(255) NOT NULL,
	"passed_ua" varchar(255) NOT NULL,
	"current_service_hours" integer NOT NULL,
	"hw_rm_attended" varchar(255) NOT NULL,
	"comments" varchar(255),
	"attend_payment" NUMERIC(10,2) NOT NULL,
	"pif_donations" NUMERIC(10,2) NOT NULL,
	"bonus_amount" NUMERIC(10,2),
	"bonus_comments" varchar(255),
	"gpa_bonus" NUMERIC(10,2) NOT NULL,
	"amt_to_savings" NUMERIC(10,2) NOT NULL,
	"money_to_student" NUMERIC(10,2) NOT NULL,
    "student_debt" NUMERIC(10,2) NOT NULL,
    "student_debt_payment" NUMERIC(10,2) NOT NULL DEFAULT 0,
    "student_debt_remaining" NUMERIC(10,2) NOT NULL DEFAULT 0,
	"total" NUMERIC(10,2) NOT NULL,
	CONSTRAINT "open_transaction_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "gpa_rates" (
	"id" serial NOT NULL,
	"gpa" NUMERIC(10,2) NOT NULL,
	"amount" NUMERIC(10,2) NOT NULL,
	CONSTRAINT "gpa_rates_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "daily_rates" (
	"id" serial NOT NULL,
	"school_year" integer NOT NULL,
	"amount" NUMERIC(10,2) NOT NULL,
	CONSTRAINT "daily_rates_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "charge_student" (
	"id" serial NOT NULL,
	"lcf_id" integer NOT NULL,
	"admin_id" integer NOT NULL,
	"date" DATE NOT NULL,
	"type" varchar(255),
	"description" varchar(255),
	"amount" NUMERIC(10,2) NOT NULL,
	CONSTRAINT "charge_student_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "history" (
	"id" serial NOT NULL,
	"lcf_id" integer NOT NULL,
	"first_name" varchar(255) NOT NULL,
	"last_name" varchar(255) NOT NULL,
	"pay_day" DATE NOT NULL,
	"date_submitted" DATE NOT NULL DEFAULT NOW(),
	"pass_class" varchar(255) NOT NULL,
	"gpa" NUMERIC(10,2) NOT NULL,
	"clean_attend" integer NOT NULL,
	"detent_hours" varchar(255) NOT NULL,
	"act_or_job" varchar(255) NOT NULL,
	"passed_ua" varchar(255) NOT NULL,
	"current_service_hours" integer NOT NULL,
	"hw_rm_attended" varchar(255) NOT NULL,
	"comments" varchar(255),
	"attend_payment" NUMERIC(10,2) NOT NULL,
	"pif_donations" NUMERIC(10,2) NOT NULL,
	"bonus_amount" NUMERIC(10,2),
	"bonus_comments" varchar(255),
	"gpa_bonus" NUMERIC(10,2) NOT NULL,
	"amt_to_savings" NUMERIC(10,2) NOT NULL,
	"money_to_student" NUMERIC(10,2) NOT NULL,
    "student_debt" NUMERIC(10,2) NOT NULL,
    "student_debt_payment" NUMERIC(10,2) NOT NULL DEFAULT 0,
    "student_debt_remaining" NUMERIC(10,2) NOT NULL DEFAULT 0,
	"total" NUMERIC(10,2) NOT NULL,
	"did_we_pay" VARCHAR(5),
	CONSTRAINT "history_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

INSERT INTO gpa_rates(gpa, amount)
VALUES
( 2, 0 ),
( 2.1, 0 ),
( 2.2, 0 ),
( 2.3, 0 ),
( 2.4, 0 ),
( 2.5, 20 ),
( 2.6, 20 ),
( 2.7, 20 ),
( 2.8, 20 ),
( 2.9, 20 ),
( 3, 40 ),
( 3.1, 40 ),
( 3.2, 40 ),
( 3.3, 40 ),
( 3.4, 40 ),
( 3.5, 60 ),
( 3.6, 60 ),
( 3.7, 60 ),
( 3.8, 60 ),
( 3.9, 60 ),
( 4, 80 );


INSERT INTO daily_rates(school_year, amount)
VALUES
( 6, 5 ),
( 7, 5 ),
( 8, 5 ),
( 9, 10 ),
( 10, 10 ),
( 11, 10 ),
( 12, 10 );


