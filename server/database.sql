CREATE TABLE canvas(
    id  bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name  varchar(255) UNIQUE,
    background_color  varchar(255)
);

CREATE TABLE imgages(
    id  bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    canvas_id bigint,
    name  varchar(255) UNIQUE,
    width  float,
    height  float,
    user_id  bigint,
    CONSTRAINT fk_url
      FOREIGN KEY(canvas_id)
	  REFERENCES canvas(id)
);

CREATE TABLE texts(
    id  bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    font_name  varchar(255),
    font_size  float,
    is_bold  boolean,
    is_underlined  boolean,
    color  varchar(255),
    text_align  varchar(255),
    content  text
);

CREATE TABLE users(
    id  bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name  varchar(255) UNIQUE
);