CREATE TABLE "tasks" (
	"id" serial primary key not null,
	"task" varchar (150) not null,
	"date" DATE not null,
	"time" TIME not null,
	"completed" boolean not null

);

INSERT INTO "tasks" ("task", "date", "time", "completed")
VALUES ('Sample Task', '2023-02-04', '4:30', false)