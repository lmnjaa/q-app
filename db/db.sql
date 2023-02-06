CREATE SCHEMA IF NOT EXISTS `q-app` DEFAULT CHARACTER SET utf8;

USE `q-app`;

-- -----------------------------------------------------
-- Table `q-app`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `q-app`.`User` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(45) NOT NULL,
    `lastName` VARCHAR(45) NOT NULL,
    `email` VARCHAR(45) NOT NULL,
    `isAdmin` TINYINT NOT NULL,
    `username` VARCHAR(45) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `active` TINYINT NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `q-app`.`Book`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `q-app`.`Book` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(45) NOT NULL,
    `publisher` VARCHAR(45) NOT NULL,
    `User_id` INT NOT NULL,
    PRIMARY KEY (`id`),
    INDEX `fk_Book_User_idx` (`User_id` ASC) VISIBLE,
    CONSTRAINT `fk_Book_User` FOREIGN KEY (`User_id`) REFERENCES `q-app`.`User` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB;

SET
    SQL_MODE = @OLD_SQL_MODE;

SET
    FOREIGN_KEY_CHECKS = @OLD_FOREIGN_KEY_CHECKS;

SET
    UNIQUE_CHECKS = @OLD_UNIQUE_CHECKS;