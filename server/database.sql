CREATE TABLE projects(
    id  bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name  varchar(255),
    background_color  varchar(255),
    elements  bigint[],
    images  bigint[],
    texts  bigint[],
    lines  bigint[]
);

CREATE TABLE elements(
    id  bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    project_id bigint,
    type  varchar(255),
    position_x  float,
    position_y  float,
    size_x  float,
    size_y  float,
    opacity  float,
    CONSTRAINT fk_url
      FOREIGN KEY(project_id)
	  REFERENCES projects(id)
);


CREATE TABLE images(
    id  bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    project_id bigint,
    name  varchar(255) UNIQUE,
    position_x  float,
    position_y  float,
    size_x  float,
    size_y  float,
    user_id  bigint,
    CONSTRAINT fk_url
      FOREIGN KEY(project_id)
	  REFERENCES projects(id)
);

CREATE TABLE texts(
    id  bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    project_id bigint,
    content  text,
    href  varchar(255),
    color  varchar(255),
    weight  int,
    is_italic  boolean,
    font_size  float,
    text_align  varchar(255),
    is_underlined  boolean,
    font_name  varchar(255),
    CONSTRAINT fk_url
      FOREIGN KEY(project_id)
	  REFERENCES projects(id)
);

CREATE TABLE users(
    id  bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name  varchar(255) UNIQUE
);

CREATE TABLE shapes(
    id  bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    project_id  bigint,
    subtype  varchar(255),
    color  varchar(255),
    CONSTRAINT fk_url
      FOREIGN KEY(project_id)
	  REFERENCES projects(id)
);

CREATE TABLE lines(
    id  bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    project_id  bigint,
    background_color  varchar(255),
    points  text,
    CONSTRAINT fk_url
      FOREIGN KEY(project_id)
	  REFERENCES projects(id)
);

