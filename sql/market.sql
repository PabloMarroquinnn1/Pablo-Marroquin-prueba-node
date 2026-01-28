CREATE DATABASE IF NOT EXISTS market
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE market;

SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS pedidos_productos;
DROP TABLE IF EXISTS pedidos;
DROP TABLE IF EXISTS tiendas_promociones;
DROP TABLE IF EXISTS promociones;
DROP TABLE IF EXISTS productos_stocks;
DROP TABLE IF EXISTS productos_categorias;
DROP TABLE IF EXISTS categorias;
DROP TABLE IF EXISTS productos;
DROP TABLE IF EXISTS tiendas;

SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE tiendas (
  id SMALLINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  estado TINYINT UNSIGNED NOT NULL,
  nombre VARCHAR(30) NOT NULL,
  descripcion VARCHAR(500),
  telefono VARCHAR(20),
  direccion VARCHAR(120),
  direccion_anexo VARCHAR(40),
  direccion_barrio VARCHAR(25),
  calificacion DECIMAL(3,2),
  calificacion_cantidad MEDIUMINT UNSIGNED,
  impuestos TINYINT UNSIGNED,
  dias_trabajo VARCHAR(21)
) ENGINE=InnoDB;

CREATE TABLE productos (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  estado TINYINT UNSIGNED NOT NULL,
  kit TINYINT UNSIGNED,
  barcode VARCHAR(30),
  nombre VARCHAR(60) NOT NULL,
  presentacion VARCHAR(25),
  descripcion VARCHAR(500),
  foto VARCHAR(120),
  peso DECIMAL(6,2)
) ENGINE=InnoDB;

CREATE TABLE categorias (
  id SMALLINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(30) NOT NULL,
  adultos TINYINT UNSIGNED
) ENGINE=InnoDB;

CREATE TABLE productos_categorias (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  id_categoria SMALLINT UNSIGNED NOT NULL,
  id_producto INT UNSIGNED NOT NULL,
  CONSTRAINT fk_pc_categoria FOREIGN KEY (id_categoria) REFERENCES categorias(id),
  CONSTRAINT fk_pc_producto  FOREIGN KEY (id_producto)  REFERENCES productos(id)
) ENGINE=InnoDB;

CREATE TABLE productos_stocks (
  id MEDIUMINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  cantidad DECIMAL(8,3) NOT NULL,
  id_tienda SMALLINT UNSIGNED NOT NULL,
  id_producto INT UNSIGNED NOT NULL,
  fecha_ingreso DATE,
  CONSTRAINT fk_ps_tienda   FOREIGN KEY (id_tienda)  REFERENCES tiendas(id),
  CONSTRAINT fk_ps_producto FOREIGN KEY (id_producto) REFERENCES productos(id)
) ENGINE=InnoDB;

CREATE TABLE promociones (
  id MEDIUMINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  estado TINYINT UNSIGNED NOT NULL,
  nombre VARCHAR(40) NOT NULL,
  imagen VARCHAR(120),
  porcentaje TINYINT UNSIGNED,
  dias_semana VARCHAR(21)
) ENGINE=InnoDB;

CREATE TABLE tiendas_promociones (
  id MEDIUMINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  estado TINYINT UNSIGNED NOT NULL,
  inicio DATE NOT NULL,
  fin DATE NOT NULL,
  id_tienda SMALLINT UNSIGNED NOT NULL,
  id_promocion MEDIUMINT UNSIGNED NOT NULL,
  CONSTRAINT fk_tp_tienda    FOREIGN KEY (id_tienda) REFERENCES tiendas(id),
  CONSTRAINT fk_tp_promocion FOREIGN KEY (id_promocion) REFERENCES promociones(id)
) ENGINE=InnoDB;

CREATE TABLE pedidos (
  id MEDIUMINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  instrucciones VARCHAR(500),
  entrega_fecha DATE,
  valor_productos DECIMAL(12,3) UNSIGNED,
  valor_envio DECIMAL(10,3) UNSIGNED,
  valor_descuento DECIMAL(11,3) UNSIGNED,
  valor_cupon DECIMAL(11,3) UNSIGNED,
  impuestos TINYINT UNSIGNED,
  valor_impuestos DECIMAL(11,3) UNSIGNED,
  valor_final DECIMAL(12,3) UNSIGNED,
  calificacion DECIMAL(3,2),
  id_tienda SMALLINT UNSIGNED,
  direccion VARCHAR(160),
  valor_comision DECIMAL(11,3),
  id_user MEDIUMINT UNSIGNED,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_pedido_tienda FOREIGN KEY (id_tienda) REFERENCES tiendas(id)
) ENGINE=InnoDB;

CREATE TABLE pedidos_productos (
  id MEDIUMINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  cantidad DECIMAL(9,4) UNSIGNED NOT NULL,
  valor_unitario DECIMAL(11,3) UNSIGNED,
  valor_unitario_promocion DECIMAL(11,3) UNSIGNED,
  total_teorico DECIMAL(12,3) UNSIGNED,
  total_final DECIMAL(12,3) UNSIGNED,
  id_promocion MEDIUMINT UNSIGNED,
  id_producto INT UNSIGNED NOT NULL,
  id_pedido MEDIUMINT UNSIGNED NOT NULL,
  CONSTRAINT fk_pp_promocion FOREIGN KEY (id_promocion) REFERENCES promociones(id),
  CONSTRAINT fk_pp_producto  FOREIGN KEY (id_producto)  REFERENCES productos(id),
  CONSTRAINT fk_pp_pedido    FOREIGN KEY (id_pedido)    REFERENCES pedidos(id)
) ENGINE=InnoDB;

INSERT INTO tiendas (id, estado, nombre, descripcion, telefono, direccion, direccion_barrio, calificacion, calificacion_cantidad, impuestos, dias_trabajo) VALUES
(1, 1, 'Market Central', 'Tienda principal', '555-0001', 'Calle Principal 123', 'Centro', 4.50, 150, 19, '1,1,1,1,1,1,0'),
(2, 1, 'Market Norte', 'Sucursal norte', '555-0002', 'Av. Norte 456', 'Zona Norte', 4.20, 98, 19, '1,1,1,1,1,1,1');

INSERT INTO categorias (id, nombre, adultos) VALUES
(1, 'Frutas y Verduras', 0),
(2, 'Lácteos', 0),
(3, 'Licores', 1);

INSERT INTO productos (id, estado, kit, barcode, nombre, presentacion, descripcion, peso) VALUES
(1, 1, 0, '7501234567890', 'Manzana Roja', '1 kg', 'Manzanas rojas frescas', 1.00),
(2, 1, 0, '7501234567891', 'Leche Entera', '1 litro', 'Leche entera pasteurizada', 1.03),
(3, 1, 0, '7501234567897', 'Cerveza Premium', '355ml', 'Cerveza artesanal', 0.36);

INSERT INTO productos_categorias (id_categoria, id_producto) VALUES
(1, 1),
(2, 2),
(3, 3);

INSERT INTO productos_stocks (cantidad, id_tienda, id_producto, fecha_ingreso) VALUES
(50.000, 1, 1, '2026-01-20'),
(30.000, 1, 2, '2026-01-20'),
(10.000, 2, 1, '2026-01-21'),
(25.000, 2, 3, '2026-01-21');

INSERT INTO promociones (id, estado, nombre, porcentaje, dias_semana) VALUES
(1, 1, 'Promo Martes', 10, '0,1,0,0,0,0,0'),
(2, 1, 'Fin de semana 2x1', 50, '0,0,0,0,0,1,1');

INSERT INTO tiendas_promociones (estado, inicio, fin, id_tienda, id_promocion) VALUES
(1, '2026-01-01', '2026-12-31', 1, 1),
(1, '2026-01-01', '2026-12-31', 2, 2);

INSERT INTO pedidos (id, valor_productos, valor_envio, valor_final, id_tienda, id_user, created_at) VALUES
(1, 100.000, 10.000, 110.000, 1, 1, '2026-01-15'),
(2, 60.000, 10.000, 70.000, 2, 2, '2026-01-16');

INSERT INTO pedidos_productos (cantidad, valor_unitario, total_final, id_producto, id_pedido) VALUES
(5.0000, 15.000, 75.000, 1, 1),
(2.0000, 20.000, 40.000, 2, 1),
(3.0000, 18.000, 54.000, 3, 2),
(4.0000, 15.000, 60.000, 1, 2);
