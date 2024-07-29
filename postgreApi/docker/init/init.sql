create table if not exists Results(
    id serial primary key,
    clearTime text,
    clearCount int,
    missCount int,
    average float,
    rate float,
);

insert into Results(clearTime,clearCount,missCount,average,rate) values("00:00:00",0,0,0,0);
