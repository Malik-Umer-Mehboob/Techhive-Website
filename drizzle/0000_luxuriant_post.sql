CREATE TABLE `leads` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`first_name` text NOT NULL,
	`last_name` text NOT NULL,
	`email` text NOT NULL,
	`company` text,
	`service_interest` text NOT NULL,
	`message` text NOT NULL,
	`created_at` integer NOT NULL
);
