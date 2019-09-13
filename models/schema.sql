DROP DATABASE IF EXISTS SLR_DB;
CREATE DATABASE SLR_DB;
USE SLR_DB;

CREATE TABLE `User` (
    `UserID` int  NOT NULL ,
    -- FireBase ID
    `FBID` varchar(100)  NOT NULL ,
    `Name` varchar(200)  NOT NULL ,
    -- implement tenths place decimal for half stars
    -- `Rating` int  NOT NULL ,
    -- `Credits` int  NOT NULL ,
    PRIMARY KEY (
        `UserID`
    ),
    CONSTRAINT `uc_User_FBID` UNIQUE (
        `FBID`
    )
);

CREATE TABLE `Post` (
    `PostID` int  NOT NULL ,
    `PosterID` int  NOT NULL ,
    `Task` varchar(200)  NOT NULL ,
    -- Rating int
    -- default false
    `Accepted` boolean  NOT NULL ,
    `AccepterID` int  NULL ,
    -- default false
    `Complete` boolean  NOT NULL ,
    PRIMARY KEY (
        `PostID`
    )
);

-- ALTER TABLE `User` ADD CONSTRAINT `fk_User_UserID` FOREIGN KEY(`UserID`)
-- REFERENCES `Post` (`PosterID`);

ALTER TABLE `Post` ADD CONSTRAINT `fk_Post_AccepterID` FOREIGN KEY(`AccepterID`)
REFERENCES `User` (`UserID`);

ALTER TABLE `Post` ADD CONSTRAINT `fk_Post_PosterID` FOREIGN KEY(`PosterID`)
REFERENCES `User` (`UserID`);