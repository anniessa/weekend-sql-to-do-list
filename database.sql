CREATE TABLE "tasks" (
	"id" serial primary key not null,
	"task" varchar (150) not null,
	"date" DATE not null,
	"time" TIME not null,
	"completed" boolean not null

);
