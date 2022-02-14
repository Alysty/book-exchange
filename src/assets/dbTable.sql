CREATE TABLE IF NOT EXISTS Book(ID INTEGER PRIMARY KEY AUTOINCREMENT,
                                TITLE varchar(255), SYNOPSIS TEXT, PRICE INTEGER, BEING_TRADED BOOLEAN, IMAGE varchar(255));
CREATE TABLE IF NOT EXISTS BookInTrade(ID INTEGER PRIMARY KEY AUTOINCREMENT,
                                TITLE varchar(255), SYNOPSIS TEXT, PRICE INTEGER, IMAGE varchar(255));
