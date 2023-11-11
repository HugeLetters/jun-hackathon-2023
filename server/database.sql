CREATE TABLE canvas(
    id  bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name  varchar(255) UNIQUE,
    user_id  bigint,
    CONSTRAINT fk_url
      FOREIGN KEY(user_id)
	  REFERENCES users(id)
);

CREATE TABLE element(
    id  bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    canvas_id bigint,
    name  varchar(255) UNIQUE,
    user_id  bigint,
    CONSTRAINT fk_url
      FOREIGN KEY(canvas_id)
	  REFERENCES canvas(id)
);

CREATE TABLE users(
    id  bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name  varchar(255) UNIQUE
);

