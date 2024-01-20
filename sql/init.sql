create schema pliends;

use pliends;

create table users (
  user_seq int not null auto_increment,
  user_name varchar(100) not null,
  user_password varchar(50) not null,
  user_email varchar(100) not null,
  user_profile_image_url varchar(500) default '/img/noprofile.png',
  user_register_date date default null,
  primary key (user_seq),
  unique key user_email_unique (user_email)
);

create table board (
  board_id int not null auto_increment,
  user_seq int not null,
  title varchar(500) default null,
  content text,
  reg_dt datetime default null,
  read_count int default '0',
  primary key (board_id),
  key fk_user_idx (user_seq),
  constraint fk_user foreign key (user_seq) references users (user_seq)
) ;


CREATE TABLE board_file (
  FILE_ID int NOT NULL AUTO_INCREMENT,
  BOARD_ID int NOT NULL,
  FILE_NAME varchar(500) NOT NULL,
  FILE_SIZE int NOT NULL,
  FILE_CONTENT_TYPE varchar(500) NOT NULL,
  FILE_URL varchar(500) NOT NULL,
  REG_DT datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (FILE_ID),
  KEY BOARD_FILE_FK_idx (BOARD_ID),
  CONSTRAINT BOARD_FILE_FK FOREIGN KEY (BOARD_ID) REFERENCES board (BOARD_ID)
) ;

CREATE TABLE board_user_read (
  board_id int NOT NULL,
  user_seq int NOT NULL,
  KEY BOARD_USER_READ_FK_02_idx (user_seq),
  KEY BOARD_USER_READ_FK_01_idx (board_id),
  CONSTRAINT BOARD_USER_READ_FK_01 FOREIGN KEY (board_id) REFERENCES board (BOARD_ID),
  CONSTRAINT BOARD_USER_READ_FK_02 FOREIGN KEY (user_seq) REFERENCES users (USER_SEQ)
) ;