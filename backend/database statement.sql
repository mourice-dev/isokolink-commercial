CREATE SCHEMA "public";
CREATE ROLE "cloud_admin" WITH SUPERUSER CREATEDB CREATEROLE LOGIN REPLICATION BYPASSRLS;
CREATE ROLE "neon_service" WITH CREATEDB CREATEROLE LOGIN REPLICATION BYPASSRLS;
CREATE ROLE "neon_superuser" WITH CREATEDB CREATEROLE REPLICATION BYPASSRLS;
CREATE ROLE "neondb_owner" WITH CREATEDB CREATEROLE LOGIN REPLICATION BYPASSRLS;
CREATE ROLE "pg_checkpoint";
CREATE ROLE "pg_create_subscription";
CREATE ROLE "pg_database_owner";
CREATE ROLE "pg_execute_server_program";
CREATE ROLE "pg_maintain";
CREATE ROLE "pg_monitor";
CREATE ROLE "pg_read_all_data";
CREATE ROLE "pg_read_all_settings";
CREATE ROLE "pg_read_all_stats";
CREATE ROLE "pg_read_server_files";
CREATE ROLE "pg_signal_autovacuum_worker";
CREATE ROLE "pg_signal_backend";
CREATE ROLE "pg_stat_scan_tables";
CREATE ROLE "pg_use_reserved_connections";
CREATE ROLE "pg_write_all_data";
CREATE ROLE "pg_write_server_files";
CREATE ROLE "token_roles";
GRANT INSERT ON "accounts" TO "neondb_owner" WITH GRANT OPTION;
GRANT SELECT ON "accounts" TO "neondb_owner" WITH GRANT OPTION;
GRANT UPDATE ON "accounts" TO "neondb_owner" WITH GRANT OPTION;
GRANT DELETE ON "accounts" TO "neondb_owner" WITH GRANT OPTION;
GRANT TRUNCATE ON "accounts" TO "neondb_owner" WITH GRANT OPTION;
GRANT REFERENCES ON "accounts" TO "neondb_owner" WITH GRANT OPTION;
GRANT TRIGGER ON "accounts" TO "neondb_owner" WITH GRANT OPTION;
GRANT INSERT ON "community_comments" TO "neondb_owner" WITH GRANT OPTION;
GRANT TRIGGER ON "community_comments" TO "neondb_owner" WITH GRANT OPTION;
GRANT REFERENCES ON "community_comments" TO "neondb_owner" WITH GRANT OPTION;
GRANT TRUNCATE ON "community_comments" TO "neondb_owner" WITH GRANT OPTION;
GRANT DELETE ON "community_comments" TO "neondb_owner" WITH GRANT OPTION;
GRANT UPDATE ON "community_comments" TO "neondb_owner" WITH GRANT OPTION;
GRANT SELECT ON "community_comments" TO "neondb_owner" WITH GRANT OPTION;
GRANT INSERT ON "community_messages" TO "neondb_owner" WITH GRANT OPTION;
GRANT TRIGGER ON "community_messages" TO "neondb_owner" WITH GRANT OPTION;
GRANT REFERENCES ON "community_messages" TO "neondb_owner" WITH GRANT OPTION;
GRANT TRUNCATE ON "community_messages" TO "neondb_owner" WITH GRANT OPTION;
GRANT DELETE ON "community_messages" TO "neondb_owner" WITH GRANT OPTION;
GRANT UPDATE ON "community_messages" TO "neondb_owner" WITH GRANT OPTION;
GRANT SELECT ON "community_messages" TO "neondb_owner" WITH GRANT OPTION;
GRANT INSERT ON "community_post_likes" TO "neondb_owner" WITH GRANT OPTION;
GRANT SELECT ON "community_post_likes" TO "neondb_owner" WITH GRANT OPTION;
GRANT UPDATE ON "community_post_likes" TO "neondb_owner" WITH GRANT OPTION;
GRANT DELETE ON "community_post_likes" TO "neondb_owner" WITH GRANT OPTION;
GRANT TRUNCATE ON "community_post_likes" TO "neondb_owner" WITH GRANT OPTION;
GRANT REFERENCES ON "community_post_likes" TO "neondb_owner" WITH GRANT OPTION;
GRANT TRIGGER ON "community_post_likes" TO "neondb_owner" WITH GRANT OPTION;
GRANT INSERT ON "community_posts" TO "neondb_owner" WITH GRANT OPTION;
GRANT SELECT ON "community_posts" TO "neondb_owner" WITH GRANT OPTION;
GRANT UPDATE ON "community_posts" TO "neondb_owner" WITH GRANT OPTION;
GRANT DELETE ON "community_posts" TO "neondb_owner" WITH GRANT OPTION;
GRANT TRUNCATE ON "community_posts" TO "neondb_owner" WITH GRANT OPTION;
GRANT REFERENCES ON "community_posts" TO "neondb_owner" WITH GRANT OPTION;
GRANT TRIGGER ON "community_posts" TO "neondb_owner" WITH GRANT OPTION;
GRANT INSERT ON "contact_messages" TO "neondb_owner" WITH GRANT OPTION;
GRANT SELECT ON "contact_messages" TO "neondb_owner" WITH GRANT OPTION;
GRANT UPDATE ON "contact_messages" TO "neondb_owner" WITH GRANT OPTION;
GRANT DELETE ON "contact_messages" TO "neondb_owner" WITH GRANT OPTION;
GRANT TRUNCATE ON "contact_messages" TO "neondb_owner" WITH GRANT OPTION;
GRANT REFERENCES ON "contact_messages" TO "neondb_owner" WITH GRANT OPTION;
GRANT TRIGGER ON "contact_messages" TO "neondb_owner" WITH GRANT OPTION;
GRANT INSERT ON "orders" TO "neondb_owner" WITH GRANT OPTION;
GRANT SELECT ON "orders" TO "neondb_owner" WITH GRANT OPTION;
GRANT UPDATE ON "orders" TO "neondb_owner" WITH GRANT OPTION;
GRANT DELETE ON "orders" TO "neondb_owner" WITH GRANT OPTION;
GRANT TRUNCATE ON "orders" TO "neondb_owner" WITH GRANT OPTION;
GRANT REFERENCES ON "orders" TO "neondb_owner" WITH GRANT OPTION;
GRANT TRIGGER ON "orders" TO "neondb_owner" WITH GRANT OPTION;
GRANT INSERT ON "products" TO "neondb_owner" WITH GRANT OPTION;
GRANT TRIGGER ON "products" TO "neondb_owner" WITH GRANT OPTION;
GRANT REFERENCES ON "products" TO "neondb_owner" WITH GRANT OPTION;
GRANT TRUNCATE ON "products" TO "neondb_owner" WITH GRANT OPTION;
GRANT DELETE ON "products" TO "neondb_owner" WITH GRANT OPTION;
GRANT UPDATE ON "products" TO "neondb_owner" WITH GRANT OPTION;
GRANT SELECT ON "products" TO "neondb_owner" WITH GRANT OPTION;
GRANT TRIGGER ON "session" TO "neondb_owner" WITH GRANT OPTION;
GRANT REFERENCES ON "session" TO "neondb_owner" WITH GRANT OPTION;
GRANT TRUNCATE ON "session" TO "neondb_owner" WITH GRANT OPTION;
GRANT DELETE ON "session" TO "neondb_owner" WITH GRANT OPTION;
GRANT UPDATE ON "session" TO "neondb_owner" WITH GRANT OPTION;
GRANT SELECT ON "session" TO "neondb_owner" WITH GRANT OPTION;
GRANT INSERT ON "session" TO "neondb_owner" WITH GRANT OPTION;
CREATE TABLE "accounts" (
	"id" bigserial PRIMARY KEY,
	"role" text NOT NULL,
	"email" text NOT NULL,
	"full_name" text DEFAULT '' NOT NULL,
	"phone" text DEFAULT '' NOT NULL,
	"district" text DEFAULT '' NOT NULL,
	"avatar_url" text DEFAULT '' NOT NULL,
	"details" jsonb DEFAULT '{}' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"password_hash" text,
	CONSTRAINT "accounts_role_email_key" UNIQUE("role","email"),
	CONSTRAINT "accounts_role_check" CHECK ((role = ANY (ARRAY['farmer'::text, 'buyer'::text])))
);
CREATE TABLE "community_comments" (
	"id" text PRIMARY KEY,
	"post_id" text NOT NULL,
	"user_id" bigint NOT NULL,
	"user_name" text DEFAULT '' NOT NULL,
	"user_avatar" text DEFAULT '' NOT NULL,
	"text" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
CREATE TABLE "community_messages" (
	"id" bigserial PRIMARY KEY,
	"user_id" bigint NOT NULL,
	"contact_id" text NOT NULL,
	"text" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
CREATE TABLE "community_post_likes" (
	"post_id" text,
	"user_id" bigint,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "community_post_likes_pkey" PRIMARY KEY("post_id","user_id")
);
CREATE TABLE "community_posts" (
	"id" text PRIMARY KEY,
	"author_name" text DEFAULT '' NOT NULL,
	"post_type" text DEFAULT '' NOT NULL,
	"content" text DEFAULT '' NOT NULL,
	"details" jsonb DEFAULT '{}' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
CREATE TABLE "contact_messages" (
	"id" bigserial PRIMARY KEY,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"message" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
CREATE TABLE "orders" (
	"id" text PRIMARY KEY,
	"product_id" text NOT NULL,
	"product_name" text NOT NULL,
	"buyer_name" text NOT NULL,
	"buyer_phone" text NOT NULL,
	"quantity_kg" numeric NOT NULL,
	"price_per_kg" numeric NOT NULL,
	"total_amount" numeric NOT NULL,
	"delivery_type" text DEFAULT '' NOT NULL,
	"payment_method" text DEFAULT '' NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"details" jsonb DEFAULT '{}' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"buyer_email" text DEFAULT '' NOT NULL
);
CREATE TABLE "products" (
	"id" text PRIMARY KEY,
	"name" text NOT NULL,
	"category" text DEFAULT '' NOT NULL,
	"district" text DEFAULT '' NOT NULL,
	"cooperative" text DEFAULT '' NOT NULL,
	"farmer_name" text DEFAULT '' NOT NULL,
	"farmer_phone" text DEFAULT '' NOT NULL,
	"quantity_available" numeric DEFAULT '0' NOT NULL,
	"unit" text DEFAULT 'kg' NOT NULL,
	"min_order" text DEFAULT '' NOT NULL,
	"price_per_kg" numeric DEFAULT '0' NOT NULL,
	"grade" text DEFAULT '' NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"image" text DEFAULT '' NOT NULL,
	"data" jsonb DEFAULT '{}' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
CREATE TABLE "session" (
	"sid" varchar PRIMARY KEY,
	"sess" json NOT NULL,
	"expire" timestamp NOT NULL
);
CREATE UNIQUE INDEX "accounts_pkey" ON "accounts" ("id");
CREATE UNIQUE INDEX "accounts_role_email_key" ON "accounts" ("role","email");
CREATE UNIQUE INDEX "community_comments_pkey" ON "community_comments" ("id");
CREATE UNIQUE INDEX "community_messages_pkey" ON "community_messages" ("id");
CREATE UNIQUE INDEX "community_post_likes_pkey" ON "community_post_likes" ("post_id","user_id");
CREATE UNIQUE INDEX "community_posts_pkey" ON "community_posts" ("id");
CREATE UNIQUE INDEX "contact_messages_pkey" ON "contact_messages" ("id");
CREATE UNIQUE INDEX "orders_pkey" ON "orders" ("id");
CREATE UNIQUE INDEX "products_pkey" ON "products" ("id");
CREATE INDEX "IDX_session_expire" ON "session" ("expire");
CREATE UNIQUE INDEX "session_pkey" ON "session" ("sid");