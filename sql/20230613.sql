-- --------------------------------------------------------
-- 호스트:                          127.0.0.1
-- 서버 버전:                        PostgreSQL 15.2, compiled by Visual C++ build 1914, 64-bit
-- 서버 OS:                        
-- HeidiSQL 버전:                  12.4.0.6670
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES  */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- 테이블 public.accounts 구조 내보내기
CREATE TABLE IF NOT EXISTS "accounts" (
	"id" INTEGER NOT NULL DEFAULT 'nextval(''accounts_id_seq''::regclass)',
	"provider" VARCHAR(255) NOT NULL,
	"type" VARCHAR(255) NOT NULL,
	"provider_account_id" VARCHAR(255) NOT NULL,
	"access_token" VARCHAR(255) NOT NULL,
	"token_type" VARCHAR(255) NOT NULL,
	"user_id" INTEGER NOT NULL,
	"refresh_token" VARCHAR(255) NOT NULL,
	PRIMARY KEY ("id")
);

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 public.car 구조 내보내기
CREATE TABLE IF NOT EXISTS "car" (
	"car_no" INTEGER NOT NULL DEFAULT 'nextval(''car_car_no_seq''::regclass)',
	"zone_no" INTEGER NOT NULL,
	"car_name" VARCHAR(255) NOT NULL,
	"car_brand" VARCHAR(255) NOT NULL,
	"car_plate" VARCHAR(255) NOT NULL,
	"car_class" VARCHAR(255) NOT NULL,
	"car_odo" INTEGER NULL DEFAULT '0',
	"car_price" INTEGER NULL DEFAULT '0',
	"car_is_active" BOOLEAN NULL DEFAULT 'true',
	"car_created_at" TIMESTAMPTZ NULL DEFAULT 'now()',
	"car_updated_at" TIMESTAMPTZ NULL DEFAULT 'now()',
	"car_image" VARCHAR(255) NOT NULL,
	"car_seat" INTEGER NOT NULL,
	PRIMARY KEY ("car_no")
);

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 public.reserve 구조 내보내기
CREATE TABLE IF NOT EXISTS "reserve" (
	"reserve_no" INTEGER NOT NULL DEFAULT 'nextval(''reserve_reserve_no_seq''::regclass)',
	"car_no" INTEGER NOT NULL,
	"user_no" INTEGER NOT NULL,
	"reserve_total_price" INTEGER NOT NULL,
	"reserve_status" VARCHAR NULL DEFAULT '예약중',
	"reserve_start_date" TIMESTAMP NOT NULL,
	"reserve_end_date" TIMESTAMP NOT NULL,
	"reserve_real_end_date" TIMESTAMP NULL DEFAULT NULL,
	"reserve_created_at" TIMESTAMP NOT NULL DEFAULT 'CURRENT_TIMESTAMP',
	"reserve_updated_at" TIMESTAMP NOT NULL DEFAULT 'CURRENT_TIMESTAMP',
	PRIMARY KEY ("reserve_no")
);

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 public.users 구조 내보내기
CREATE TABLE IF NOT EXISTS "users" (
	"id" INTEGER NOT NULL DEFAULT 'nextval(''users_id_seq''::regclass)',
	"email" VARCHAR NULL DEFAULT NULL,
	"password" VARCHAR NULL DEFAULT NULL,
	"name" VARCHAR NULL DEFAULT NULL,
	"mobile" VARCHAR NULL DEFAULT NULL,
	"zipcode" INTEGER NULL DEFAULT NULL,
	"address" VARCHAR NULL DEFAULT NULL,
	"detail_address" VARCHAR NULL DEFAULT NULL,
	"is_staff" BOOLEAN NOT NULL DEFAULT 'false',
	"is_active" BOOLEAN NOT NULL DEFAULT 'true',
	"created_at" TIMESTAMPTZ NULL DEFAULT 'now()',
	"updated_at" TIMESTAMPTZ NULL DEFAULT 'now()',
	PRIMARY KEY ("id")
);

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 public.zone 구조 내보내기
CREATE TABLE IF NOT EXISTS "zone" (
	"zone_no" INTEGER NOT NULL DEFAULT 'nextval(''zone_zone_no_seq''::regclass)',
	"zone_zipcode" INTEGER NULL DEFAULT NULL,
	"zone_address" TEXT NULL DEFAULT NULL,
	"zone_detail_address" TEXT NULL DEFAULT '',
	"zone_lat" NUMERIC NOT NULL,
	"zone_lng" NUMERIC NOT NULL,
	"zone_is_active" BOOLEAN NULL DEFAULT 'true',
	"zone_created_at" TIMESTAMPTZ NULL DEFAULT 'CURRENT_TIMESTAMP',
	"zone_updated_at" TIMESTAMPTZ NULL DEFAULT 'CURRENT_TIMESTAMP',
	PRIMARY KEY ("zone_no")
);

-- 내보낼 데이터가 선택되어 있지 않습니다.

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
