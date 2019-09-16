DROP DATABASE IF EXISTS SLR_DB;
CREATE DATABASE SLR_DB;
USE SLR_DB;

CREATE TABLE `User` (
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
    CONSTRAINT `uc_User_FBID` UNIQUE (
        `FBID`
    ),
    CONSTRAINT `uc_User_Name` UNIQUE (
        `Name`
    )
);

CREATE TABLE `UserPost` (
    `ID` int  NOT NULL ,
    `UserID` int  NOT NULL ,
    `PostID` int  NOT NULL ,
    PRIMARY KEY (
        `ID`
    )
);

-- CREATE TABLE `UserPostAccepter` (
--     `ID` int  NOT NULL ,
--     `UserID` int  NOT NULL ,
--     `PostID` int  NOT NULL ,
--     PRIMARY KEY (
--         `ID`
--     )
-- );

CREATE TABLE `Post` (
    `PostID` int  NOT NULL ,
    `Task` varchar(200)  NOT NULL ,
    -- Rating int
    -- default false
    `Accepted` boolean  NOT NULL ,
    -- default false
    `Complete` boolean  NOT NULL ,
    PRIMARY KEY (
        `PostID`
    )
);

ALTER TABLE `UserPost` ADD CONSTRAINT `fk_UserPost_UserID` FOREIGN KEY(`UserID`)
REFERENCES `User` (`UserID`);

ALTER TABLE `UserPost` ADD CONSTRAINT `fk_UserPost_PostID` FOREIGN KEY(`PostID`)
REFERENCES `Post` (`PostID`);

-- ALTER TABLE `UserPostAccepter` ADD CONSTRAINT `fk_UserPostAccepter_UserID` FOREIGN KEY(`UserID`)
-- REFERENCES `User` (`UserID`);

-- ALTER TABLE `UserPostAccepter` ADD CONSTRAINT `fk_UserPostAccepter_PostID` FOREIGN KEY(`PostID`)
-- REFERENCES `Post` (`PostID`);