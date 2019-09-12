DROP DATABASE IF EXISTS testdb;
CREATE DATABASE testdb;

-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- Link to schema: https://app.quickdatabasediagrams.com/#/d/G3fOQt
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


CREATE TABLE `User` (
    `UserID` int  NOT NULL ,
    -- FireBase ID
    `FBID` varchar(100)  NOT NULL ,
    `Name` varchar(200)  NOT NULL ,
    -- implement tenths place decimal for half stars
    `Rating` int  NOT NULL ,
    `Credits` int  NOT NULL ,
    PRIMARY KEY (`UserID`),
    CONSTRAINT `uc_User_FBID` UNIQUE (
        `FBID`
    ),
    CONSTRAINT `uc_User_Name` UNIQUE (
        `Name`
    )
);

CREATE TABLE `Post` (
    `PostID` int  NOT NULL ,
    `PosterID` int  NOT NULL ,
    `Name` varchar(200)  NOT NULL ,
    -- implement tenths place decimal for half stars
    `Rating` int  NOT NULL ,
    -- default false
    `Accepted` boolean  NOT NULL ,
    `AccepterID` int  NULL ,
    -- default false
    `Complete` boolean  NOT NULL ,
    PRIMARY KEY (
        `PostID`
    ),
    CONSTRAINT `uc_Post_Name` UNIQUE (
        `Name`
    )
);

CREATE TABLE `User2` (
    `UserID` int  NOT NULL ,
    -- FireBase ID
    `FBID` varchar(100)  NOT NULL ,
    `Name` varchar(200)  NOT NULL ,
    -- implement tenths place decimal for half stars
    `Rating` int  NOT NULL ,
    `Credits` int  NOT NULL ,
    PRIMARY KEY (
        `UserID`
    ),
    CONSTRAINT `uc_User2_FBID` UNIQUE (
        `FBID`
    ),
    CONSTRAINT `uc_User2_Name` UNIQUE (
        `Name`
    )
);

ALTER TABLE `Post` ADD CONSTRAINT `fk_Post_PosterID` FOREIGN KEY(`PosterID`)
REFERENCES `User` (`UserID`);

ALTER TABLE `Post` ADD CONSTRAINT `fk_Post_AccepterID` FOREIGN KEY(`AccepterID`)
REFERENCES `User2` (`UserID`);

