CREATE TABLE `assessments` (
	`id` text PRIMARY KEY NOT NULL,
	`owner` text NOT NULL,
	`data` text NOT NULL,
	`created` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `assessments_owner_created` ON `assessments` (`owner`,`created`);--> statement-breakpoint
CREATE TABLE `renewal_events` (
	`id` text PRIMARY KEY NOT NULL,
	`owner` text NOT NULL,
	`renewal` text NOT NULL,
	`kind` text NOT NULL,
	`data` text NOT NULL,
	`created` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `events_owner_created` ON `renewal_events` (`owner`,`created`);--> statement-breakpoint
CREATE TABLE `renewals` (
	`id` text PRIMARY KEY NOT NULL,
	`owner` text NOT NULL,
	`term` text NOT NULL,
	`assessment` text NOT NULL,
	`plan` text NOT NULL,
	`amount` integer NOT NULL,
	`state` text NOT NULL,
	`paypal` text,
	`approval` text,
	`capture` text,
	`created` integer NOT NULL,
	`updated` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `renewals_owner_term` ON `renewals` (`owner`,`term`);--> statement-breakpoint
CREATE UNIQUE INDEX `renewals_capture` ON `renewals` (`capture`);