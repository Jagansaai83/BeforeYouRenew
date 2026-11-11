CREATE TABLE `plans` (
	`id` text PRIMARY KEY NOT NULL,
	`owner` text NOT NULL,
	`data` text NOT NULL,
	`mode` text NOT NULL,
	`state` text NOT NULL,
	`paypal` text,
	`approval` text,
	`created` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `plans_owner_created` ON `plans` (`owner`,`created`);--> statement-breakpoint
CREATE TABLE `quotas` (
	`id` text PRIMARY KEY NOT NULL,
	`count` integer NOT NULL,
	`expires` integer NOT NULL
);
