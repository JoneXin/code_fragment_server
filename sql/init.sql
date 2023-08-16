CREATE DATABASE
    IF NOT EXISTS `code_fragment` DEFAULT CHARSET utf8 COLLATE utf8_general_ci;

CREATE TABLE
    IF NOT EXISTS `code_fragment`.`fragment` (
        `uid` int(11) NOT NULL AUTO_INCREMENT,
        `category` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '分类',
        `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '标题',
        `desc` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '描述',
        `content` mediumtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '内容',
        PRIMARY KEY (`uid`) USING BTREE,
        UNIQUE INDEX `title`(`title`) USING BTREE
    ) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;