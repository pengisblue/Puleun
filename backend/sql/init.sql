create database pliends;

use pliends;

CREATE TABLE `user` (
	`user_id`	bigint	NOT NULL	DEFAULT 0	COMMENT 'Auto Increment',
	`nickname`	varchar(10)	NOT NULL,
	`birth_DT`	date	NOT NULL,
	`gender`	CHAR(1)	NOT NULL,
	`profile_img_url`	varchar(200)	NOT NULL,
	`parent_id`	bigint	NULL	DEFAULT 0	COMMENT 'self reference'
);

CREATE TABLE `pot` (
	`pot_id`	BIGINT	NOT NULL	COMMENT 'Auto Increment',
	`pot_name`	varchar(10)	NOT NULL,
	`pot_species`	varchar(10)	NOT NULL,
	`min_temperature`	double	NOT NULL,
	`max_temperature`	double	NOT NULL,
	`min_moisture`	double	NOT NULL,
	`max_moisture`	double	NOT NULL,
	`created_DT`	date	NOT NULL,
	`end_DT`	date	NULL,
	`pot_img_url`	varchar(200)	NOT NULL,
	`kid_id`	bigint	NOT NULL	DEFAULT 0	COMMENT 'Auto Increment',
	`happy_cnt`	int	NOT NULL,
	`collection_FG`	tinyint	NOT NULL
);

CREATE TABLE `species` (
	`species_id`	bigint	NOT NULL	COMMENT 'Auto Increment',
	`species_name`	varchar(20)	NOT NULL,
	`min_temperature`	double	NOT NULL,
	`max_temperature`	double	NOT NULL,
	`min_moisture`	double	NOT NULL,
	`max_moisture`	double	NOT NULL
);

CREATE TABLE `user_login` (
	`user_id`	bigint	NOT NULL	DEFAULT 0	COMMENT 'Auto Increment',
	`user_name`	varchar(10)	NOT NULL,
	`user_email`	varchar(30)	NOT NULL,
	`user_password`	varchar(30)	NOT NULL
);

CREATE TABLE `device` (
	`device_id`	char(36)	NOT NULL	DEFAULT (UUID())	COMMENT 'Auto Increment',
	`pot_id`	BIGINT	NOT NULL,
	`empty_FG`	tinyint	NOT NULL,
	`user_id`	bigint	NOT NULL	DEFAULT 0	COMMENT 'Auto Increment'
);

CREATE TABLE `pot_state` (
	`pot_state_id`	BIGINT	NOT NULL	COMMENT 'Auto Increment',
	`temprature`	double	NOT NULL,
	`measure_DT`	datetime	NOT NULL,
	`moisture`	double	NOT NULL,
	`pot_id`	BIGINT	NOT NULL
);

CREATE TABLE `calender` (
	`calender_id`	BIGINT	NOT NULL	COMMENT 'Auto Increment',
	`date`	date	NOT NULL,
	`pot_id`	BIGINT	NOT NULL,
	`code`	VARCHAR(255)	NOT NULL	COMMENT '"W" or "T"'
);

CREATE TABLE `talk` (
	`talk_id`	BIGINT	NOT NULL	COMMENT 'Auto Increment',
	`talk_title`	VARCHAR(30)	NOT NULL	DEFAULT "0월0일 대화",
	`talk_DT`	datetime	NOT NULL,
	`read_FG`	tinyint	NOT NULL,
	`user_id`	bigint	NOT NULL	DEFAULT 0	COMMENT 'Auto Increment',
	`pot_id`	BIGINT	NOT NULL
);

CREATE TABLE `sentence` (
	`sentence_id`	BIGINT	NOT NULL	COMMENT 'Auto Increment',
	`content`	VARCHAR(100)	NOT NULL,
	`audio`	VARCHAR(255)	NOT NULL,
	`sentence_DTN`	datetime	NOT NULL,
	`talk_id`	BIGINT	NOT NULL,
	`talker_FG`	tinyint	NOT NULL
);

CREATE TABLE `alarm` (
	`alarm_id`	BIGINT	NOT NULL	COMMENT 'Auto Increment',
	`alarm_name`	VARCHAR(30)	NULL,
	`alarm_content`	varchar(100)	NOT NULL,
	`active_FG`	tinyint	NOT NULL,
	`pot_id`	BIGINT	NOT NULL,
	`alarm_date`	datetime	NOT NULL,
	`routine`	tinyint	NOT NULL
);

CREATE TABLE `calender_code` (
	`code`	CHAR(1)	NOT NULL	COMMENT '"W" or "T"',
	`code_detail`	varchar(20)	NOT NULL
);

ALTER TABLE `user` ADD CONSTRAINT `PK_USER` PRIMARY KEY (
	`user_id`
);

ALTER TABLE `pot` ADD CONSTRAINT `PK_POT` PRIMARY KEY (
	`pot_id`
);

ALTER TABLE `species` ADD CONSTRAINT `PK_SPECIES` PRIMARY KEY (
	`species_id`
);

ALTER TABLE `user_login` ADD CONSTRAINT `PK_USER_LOGIN` PRIMARY KEY (
	`user_id`
);

ALTER TABLE `device` ADD CONSTRAINT `PK_DEVICE` PRIMARY KEY (
	`device_id`
);

ALTER TABLE `pot_state` ADD CONSTRAINT `PK_POT_STATE` PRIMARY KEY (
	`pot_state_id`
);

ALTER TABLE `calender` ADD CONSTRAINT `PK_CALENDER` PRIMARY KEY (
	`calender_id`
);

ALTER TABLE `talk` ADD CONSTRAINT `PK_TALK` PRIMARY KEY (
	`talk_id`
);

ALTER TABLE `sentence` ADD CONSTRAINT `PK_SENTENCE` PRIMARY KEY (
	`sentence_id`
);

ALTER TABLE `alarm` ADD CONSTRAINT `PK_ALARM` PRIMARY KEY (
	`alarm_id`
);

ALTER TABLE `calender_code` ADD CONSTRAINT `PK_CALENDER_CODE` PRIMARY KEY (
	`code`
);

ALTER TABLE `user` ADD CONSTRAINT `FK_user_TO_user_1` FOREIGN KEY (
	`parent_id`
)
REFERENCES `user` (
	`user_id`
);

ALTER TABLE `pot` ADD CONSTRAINT `FK_user_TO_pot_1` FOREIGN KEY (
	`kid_id`
)
REFERENCES `user` (
	`user_id`
);

ALTER TABLE `user_login` ADD CONSTRAINT `FK_user_TO_user_login_1` FOREIGN KEY (
	`user_id`
)
REFERENCES `user` (
	`user_id`
);

ALTER TABLE `device` ADD CONSTRAINT `FK_pot_TO_device_1` FOREIGN KEY (
	`pot_id`
)
REFERENCES `pot` (
	`pot_id`
);

ALTER TABLE `device` ADD CONSTRAINT `FK_user_login_TO_device_1` FOREIGN KEY (
	`user_id`
)
REFERENCES `user_login` (
	`user_id`
);

ALTER TABLE `pot_state` ADD CONSTRAINT `FK_pot_TO_pot_state_1` FOREIGN KEY (
	`pot_id`
)
REFERENCES `pot` (
	`pot_id`
);

ALTER TABLE `calender` ADD CONSTRAINT `FK_pot_TO_calender_1` FOREIGN KEY (
	`pot_id`
)
REFERENCES `pot` (
	`pot_id`
);

ALTER TABLE `calender` ADD CONSTRAINT `FK_calender_code_TO_calender_1` FOREIGN KEY (
	`code`
)
REFERENCES `calender_code` (
	`code`
);

ALTER TABLE `talk` ADD CONSTRAINT `FK_user_TO_talk_1` FOREIGN KEY (
	`user_id`
)
REFERENCES `user` (
	`user_id`
);

ALTER TABLE `talk` ADD CONSTRAINT `FK_pot_TO_talk_1` FOREIGN KEY (
	`pot_id`
)
REFERENCES `pot` (
	`pot_id`
);

ALTER TABLE `sentence` ADD CONSTRAINT `FK_talk_TO_sentence_1` FOREIGN KEY (
	`talk_id`
)
REFERENCES `talk` (
	`talk_id`
);

ALTER TABLE `alarm` ADD CONSTRAINT `FK_pot_TO_alarm_1` FOREIGN KEY (
	`pot_id`
)
REFERENCES `pot` (
	`pot_id`
);