INSERT IGNORE INTO roles( id, name ) VALUES ( 1, 'ROLE_USER' );
INSERT IGNORE INTO roles( id, name ) VALUES ( 2, 'ROLE_MODERATOR' );
INSERT IGNORE INTO roles( id, name ) VALUES ( 3, 'ROLE_ADMIN' );
INSERT IGNORE INTO roles( id, name ) VALUES ( 4, 'ROLE_RECEPTIONIST' );
INSERT IGNORE INTO roles( id, name ) VALUES ( 5, 'ROLE_ACCOUNTANT' );
INSERT IGNORE INTO roles( id, name ) VALUES ( 6, 'ROLE_CLEANER' );
INSERT IGNORE INTO roles( id, name ) VALUES ( 7, 'ROLE_BUTLER' );
INSERT IGNORE INTO roles( id, name ) VALUES ( 8, 'ROLE_MANAGER' );
INSERT IGNORE INTO roles( id, name ) VALUES ( 9, 'ROLE_KITCHEN_MANAGER' );
INSERT IGNORE INTO roles( id, name ) VALUES ( 10, 'ROLE_REPAIRMAN' );

INSERT IGNORE INTO category_of_item (id, category) VALUES (1, 'CAT_FOOD');
INSERT IGNORE INTO category_of_item (id, category) VALUES (2, 'CAT_OFFICE');
INSERT IGNORE INTO category_of_item (id, category) VALUES (3, 'CAT_OTHER');

INSERT IGNORE INTO items ( item_id, item_name, current_quantity, min_quantity) VALUES (1, 'Banany', 10, 30);
INSERT IGNORE INTO items ( item_id, item_name, current_quantity, min_quantity) VALUES (2, 'Chleb', 20, 30);
INSERT IGNORE INTO items ( item_id, item_name, current_quantity, min_quantity) VALUES (3, 'Brukselka', 15, 30);
INSERT IGNORE INTO items ( item_id, item_name, current_quantity, min_quantity) VALUES (4, 'Papier do drukarki', 20, 30);
INSERT IGNORE INTO items ( item_id, item_name, current_quantity, min_quantity) VALUES (5, 'Długopisy', 10, 30);
INSERT IGNORE INTO items ( item_id, item_name, current_quantity, min_quantity) VALUES (6, 'Spinacze', 30, 30);
INSERT IGNORE INTO items ( item_id, item_name, current_quantity, min_quantity) VALUES (7, 'Papier toaletowy', 200, 30);

INSERT IGNORE INTO item_category (item_id, category_id) VALUES (1, 1);
INSERT IGNORE INTO item_category (item_id, category_id) VALUES (2, 1);
INSERT IGNORE INTO item_category (item_id, category_id) VALUES (3, 1);
INSERT IGNORE INTO item_category (item_id, category_id) VALUES (4, 2);
INSERT IGNORE INTO item_category (item_id, category_id) VALUES (5, 2);
INSERT IGNORE INTO item_category (item_id, category_id) VALUES (6, 2);
INSERT IGNORE INTO item_category (item_id, category_id) VALUES (7, 3);