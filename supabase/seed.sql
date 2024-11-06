SET
	session_replication_role = replica;

--
-- PostgreSQL database dump
--
-- Dumped from database version 15.6
-- Dumped by pg_dump version 15.7 (Ubuntu 15.7-1.pgdg20.04+1)
SET
	statement_timeout = 0;

SET
	lock_timeout = 0;

SET
	idle_in_transaction_session_timeout = 0;

SET
	client_encoding = 'UTF8';

SET
	standard_conforming_strings = on;

SELECT
	pg_catalog.set_config ('search_path', '', false);

SET
	check_function_bodies = false;

SET
	xmloption = content;

SET
	client_min_messages = warning;

SET
	row_security = off;

--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--
INSERT INTO
	"auth"."flow_state" (
		"id",
		"user_id",
		"auth_code",
		"code_challenge_method",
		"code_challenge",
		"provider_type",
		"provider_access_token",
		"provider_refresh_token",
		"created_at",
		"updated_at",
		"authentication_method",
		"auth_code_issued_at"
	)
VALUES
	(
		'8a45696e-a0e1-4844-bdbe-42997469fe93',
		'8ab72056-6030-4db9-aca3-2470fa13d766',
		'1948bb2a-700a-4d79-9a90-a9524042e0c5',
		's256',
		'KBtv-WHKlbQm9BXwhaefr2P1Fs07elu-xIqUgVAWkoA',
		'google',
		'ya29.a0AeDClZDTBbw2V9LWC_X6cciV0rRo2nAZQHfhbL8W8I6yv4BpM5Dz4_ID7Pjqq0df5TObLxmOQuYsAJRGkKHwCmVQGeVb3EVQF0wVCmko0YjQ-vLznmIF_Co2xHs9e_otkW406V2AmScaTPEoPgfv1mdMMcGopCs_a38aCgYKASQSARESFQHGX2MiCAz9CowRB_bZMvtE5MlP-Q0170',
		'',
		'2024-11-04 15:05:22.420067+00',
		'2024-11-04 15:05:24.923974+00',
		'oauth',
		'2024-11-04 15:05:24.923922+00'
	),
	(
		'1c323e35-bf3f-47bb-90ac-4cc7ce5a3af9',
		'8ab72056-6030-4db9-aca3-2470fa13d766',
		'f080dca3-8342-4ebc-be19-7e16afc3bfb6',
		's256',
		'WQz04CuVEj_08TFZZPQJgEC45gmvPN_cwHJ3xMhKwIU',
		'google',
		'ya29.a0AeDClZBIW4VP3QYXbTqan2wIF5W9DAnN1cqvg0HZ_zaZxcONX8LY4cNcJiYooKYK73ATdtqEChJSUUKwRpXn5ZnYVmxxfiYdoyOPhh_3daZoABs1rVKWtLvJ7h06xCrHFPJMegDtNX2v6ioQxQ_K1zwqf57HqkeeYv8aCgYKAcQSARESFQHGX2MiP4hHmOaEatlhxTAO9OUiZQ0170',
		'',
		'2024-11-04 15:05:32.598816+00',
		'2024-11-04 15:05:40.404452+00',
		'oauth',
		'2024-11-04 15:05:40.404396+00'
	),
	(
		'ae6a15d8-dd65-4c05-8797-1944bfb2e842',
		'e79d46c0-8e59-42e6-93b6-67b43db1f86a',
		'bccadf12-06e5-4261-8394-72e8a970466f',
		's256',
		'_QsEionCE_kwJojZez5ATN0Us3VHgauXVWXVzPWe3k8',
		'email',
		'',
		'',
		'2024-11-04 16:05:13.021771+00',
		'2024-11-04 16:05:13.021771+00',
		'email/signup',
		NULL
	),
	(
		'b8afae6b-3bd2-4566-a0a2-05e70a70a97b',
		'e79d46c0-8e59-42e6-93b6-67b43db1f86a',
		'191e1c0f-a77f-46a4-80d1-8385bcf02275',
		's256',
		'C3TcJqTx-D8hKTxszqUZGkoQJ_NFI49I5oSXQG9H6Is',
		'email',
		'',
		'',
		'2024-11-04 16:05:13.428115+00',
		'2024-11-04 16:05:13.428115+00',
		'email/signup',
		NULL
	),
	(
		'5f65b92f-375e-4377-8ed9-a3b0914fb719',
		'e79d46c0-8e59-42e6-93b6-67b43db1f86a',
		'451b60f2-5ff7-4d0e-b609-b72c806a3b00',
		's256',
		'BXpHnZv8ufi7K1Knvc9RByfBMlslyZ1w8aWcYqvfqW0',
		'discord',
		'XofziFD9dHplsWRPjX1ZsoIMRZb72y',
		'aUFIsGvNGqZwFheSBbPUlyoA3P63th',
		'2024-11-04 16:08:31.131362+00',
		'2024-11-04 16:08:54.214002+00',
		'oauth',
		'2024-11-04 16:08:54.213952+00'
	);

--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--
INSERT INTO
	"auth"."users" (
		"instance_id",
		"id",
		"aud",
		"role",
		"email",
		"encrypted_password",
		"email_confirmed_at",
		"invited_at",
		"confirmation_token",
		"confirmation_sent_at",
		"recovery_token",
		"recovery_sent_at",
		"email_change_token_new",
		"email_change",
		"email_change_sent_at",
		"last_sign_in_at",
		"raw_app_meta_data",
		"raw_user_meta_data",
		"is_super_admin",
		"created_at",
		"updated_at",
		"phone",
		"phone_confirmed_at",
		"phone_change",
		"phone_change_token",
		"phone_change_sent_at",
		"email_change_token_current",
		"email_change_confirm_status",
		"banned_until",
		"reauthentication_token",
		"reauthentication_sent_at",
		"is_sso_user",
		"deleted_at",
		"is_anonymous"
	)
VALUES
	(
		'00000000-0000-0000-0000-000000000000',
		'43831627-add7-4e7b-be06-4c187cb7f10c',
		'authenticated',
		'authenticated',
		'test_camper1@campi.com',
		'$2a$10$.8kDUiSmZlECViadnPZV/eGMklJDJO.XRmk/XW5WXKVEmjRbpxpBa',
		'2024-11-05 01:55:18.073302+00',
		NULL,
		'',
		NULL,
		'',
		NULL,
		'',
		'',
		NULL,
		NULL,
		'{"provider": "email", "providers": ["email"]}',
		'{}',
		NULL,
		'2024-11-05 01:55:18.069273+00',
		'2024-11-05 01:55:18.073505+00',
		NULL,
		NULL,
		'',
		'',
		NULL,
		'',
		0,
		NULL,
		'',
		NULL,
		false,
		NULL,
		false
	),
	(
		'00000000-0000-0000-0000-000000000000',
		'7df4cf0b-b77f-41d1-af12-8b69c5f2358d',
		'authenticated',
		'authenticated',
		'test_camper2@campi.com',
		'$2a$10$GRwDuSzzKb4ZdFu7RO3eTOEpRaTY.u4bk292X1KqzJLmhlSDRhoC6',
		'2024-11-05 01:57:42.822465+00',
		NULL,
		'',
		NULL,
		'',
		NULL,
		'',
		'',
		NULL,
		NULL,
		'{"provider": "email", "providers": ["email"]}',
		'{}',
		NULL,
		'2024-11-05 01:57:42.816592+00',
		'2024-11-05 01:57:42.822682+00',
		NULL,
		NULL,
		'',
		'',
		NULL,
		'',
		0,
		NULL,
		'',
		NULL,
		false,
		NULL,
		false
	),
	(
		'00000000-0000-0000-0000-000000000000',
		'35bd302a-af13-41ca-9b86-22b4e9568739',
		'authenticated',
		'authenticated',
		'test_camper3@campi.com',
		'$2a$10$nL6NIegHUYMqD8Cz5/4BhuDQrYsbFr.ZZ0TlJaQwF7jAGmW/iuOby',
		'2024-11-05 01:59:09.682585+00',
		NULL,
		'',
		NULL,
		'',
		NULL,
		'',
		'',
		NULL,
		NULL,
		'{"provider": "email", "providers": ["email"]}',
		'{}',
		NULL,
		'2024-11-05 01:59:09.678824+00',
		'2024-11-05 01:59:09.682804+00',
		NULL,
		NULL,
		'',
		'',
		NULL,
		'',
		0,
		NULL,
		'',
		NULL,
		false,
		NULL,
		false
	);

--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--
INSERT INTO
	"auth"."identities" (
		"provider_id",
		"user_id",
		"identity_data",
		"provider",
		"last_sign_in_at",
		"created_at",
		"updated_at",
		"id"
	)
VALUES
	(
		'43831627-add7-4e7b-be06-4c187cb7f10c',
		'43831627-add7-4e7b-be06-4c187cb7f10c',
		'{"sub": "43831627-add7-4e7b-be06-4c187cb7f10c", "email": "test_camper1@campi.com", "email_verified": false, "phone_verified": false}',
		'email',
		'2024-11-05 01:55:18.070962+00',
		'2024-11-05 01:55:18.071019+00',
		'2024-11-05 01:55:18.071019+00',
		'ea6135f8-7140-4d4d-94c8-0e4e1dc4294b'
	),
	(
		'7df4cf0b-b77f-41d1-af12-8b69c5f2358d',
		'7df4cf0b-b77f-41d1-af12-8b69c5f2358d',
		'{"sub": "7df4cf0b-b77f-41d1-af12-8b69c5f2358d", "email": "test_camper2@campi.com", "email_verified": false, "phone_verified": false}',
		'email',
		'2024-11-05 01:57:42.818324+00',
		'2024-11-05 01:57:42.818372+00',
		'2024-11-05 01:57:42.818372+00',
		'b179770d-6a82-4129-982b-22c307ede42f'
	),
	(
		'35bd302a-af13-41ca-9b86-22b4e9568739',
		'35bd302a-af13-41ca-9b86-22b4e9568739',
		'{"sub": "35bd302a-af13-41ca-9b86-22b4e9568739", "email": "test_camper3@campi.com", "email_verified": false, "phone_verified": false}',
		'email',
		'2024-11-05 01:59:09.680225+00',
		'2024-11-05 01:59:09.680274+00',
		'2024-11-05 01:59:09.680274+00',
		'5d79eb9e-f97c-4437-a328-c1b1a7fca4b7'
	);

--
-- Data for Name: countries; Type: TABLE DATA; Schema: public; Owner: supabase
--
INSERT INTO
	"public"."Country" (iso, iso3, continent_code, phone_code, name)
VALUES
	('AF', 'AFG', 'AS', 93, 'Afghanistan'),
	('AL', 'ALB', 'EU', 355, 'Albania'),
	('DZ', 'DZA', 'AF', 13, 'Algeria'),
	('AD', 'AND', 'EU', 376, 'Andorra'),
	('AO', 'AGO', 'AF', 44, 'Angola'),
	('AG', 'ATG', 'NA', 1, 'Antigua and Barbuda'),
	('AR', 'ARG', 'SA', 54, 'Argentina'),
	('AM', 'ARM', 'AS', 374, 'Armenia'),
	('AU', 'AUS', 'OC', 61, 'Australia'),
	('AT', 'AUT', 'EU', 43, 'Austria'),
	('AZ', 'AZE', 'AS', 994, 'Azerbaijan'),
	('BS', 'BHS', 'NA', 1, 'Bahamas'),
	('BH', 'BHR', 'AS', 973, 'Bahrain'),
	('BD', 'BGD', 'AS', 880, 'Bangladesh'),
	('BB', 'BRB', 'NA', 1, 'Barbados'),
	('BY', 'BLR', 'EU', 375, 'Belarus'),
	('BE', 'BEL', 'EU', 3, 'Belgium'),
	('BZ', 'BLZ', 'NA', 501, 'Belize'),
	('BJ', 'BEN', 'AF', 9, 'Benin'),
	('BT', 'BTN', 'AS', 975, 'Bhutan'),
	(
		'BO',
		'BOL',
		'SA',
		591,
		'Bolivia (Plurinational State of)'
	),
	('BA', 'BIH', 'EU', 387, 'Bosnia and Herzegovina'),
	('BW', 'BWA', 'AF', 67, 'Botswana'),
	('BR', 'BRA', 'SA', 55, 'Brazil'),
	('BN', 'BRN', 'AS', 673, 'Brunei Darussalam'),
	('BG', 'BGR', 'EU', 359, 'Bulgaria'),
	('BF', 'BFA', 'AF', 6, 'Burkina Faso'),
	('BI', 'BDI', 'AF', 57, 'Burundi'),
	('CV', 'CPV', 'AF', 38, 'Cabo Verde'),
	('KH', 'KHM', 'AS', 855, 'Cambodia'),
	('CM', 'CMR', 'AF', 37, 'Cameroon'),
	('CA', 'CAN', 'NA', 1, 'Canada'),
	('CF', 'CAF', 'AF', 36, 'Central African Republic'),
	('TD', 'TCD', 'AF', 35, 'Chad'),
	('CL', 'CHL', 'SA', 56, 'Chile'),
	('CN', 'CHN', 'AS', 86, 'China'),
	('CO', 'COL', 'SA', 57, 'Colombia'),
	('KM', 'COM', 'AF', 69, 'Comoros'),
	('CG', 'COG', 'AF', 4, 'Congo'),
	(
		'CD',
		'COD',
		'AF',
		43,
		'Congo, Democratic Republic of the'
	),
	('CR', 'CRI', 'NA', 506, 'Costa Rica'),
	('HR', 'HRV', 'EU', 385, 'Croatia'),
	('CY', 'CYP', 'AS', 357, 'Cyprus'),
	('CZ', 'CZE', 'EU', 40, 'Czech Republic'),
	('CI', 'CIV', 'AF', 5, 'Côte d''Ivoire'),
	('DK', 'DNK', 'EU', 45, 'Denmark'),
	('DJ', 'DJI', 'AF', 53, 'Djibouti'),
	('DM', 'DMA', 'NA', 1, 'Dominica'),
	('DO', 'DOM', 'NA', 1, 'Dominican Republic'),
	('EC', 'ECU', 'SA', 593, 'Ecuador'),
	('EG', 'EGY', 'AF', 0, 'Egypt'),
	('SV', 'SLV', 'NA', 503, 'El Salvador'),
	('GQ', 'GNQ', 'AF', 40, 'Equatorial Guinea'),
	('ER', 'ERI', 'AF', 91, 'Eritrea'),
	('EE', 'EST', 'EU', 37, 'Estonia'),
	('SZ', 'SWZ', 'AF', 68, 'Eswatini (Swaziland)'),
	('ET', 'ETH', 'AF', 51, 'Ethiopia'),
	('FJ', 'FJI', 'OC', 679, 'Fiji'),
	('FI', 'FIN', 'EU', 358, 'Finland'),
	('FR', 'FRA', 'EU', 33, 'France'),
	('GA', 'GAB', 'AF', 41, 'Gabon'),
	('GM', 'GMB', 'AF', 0, 'Gambia'),
	('GE', 'GEO', 'AS', 995, 'Georgia'),
	('DE', 'DEU', 'EU', 49, 'Germany'),
	('GH', 'GHA', 'AF', 33, 'Ghana'),
	('GR', 'GRC', 'EU', 30, 'Greece'),
	('GD', 'GRD', 'NA', 1, 'Grenada'),
	('GT', 'GTM', 'NA', 50, 'Guatemala'),
	('GN', 'GIN', 'AF', 4, 'Guinea'),
	('GW', 'GNB', 'AF', 45, 'Guinea-Bissau'),
	('GY', 'GUY', 'SA', 59, 'Guyana'),
	('HT', 'HTI', 'NA', 509, 'Haiti'),
	('HN', 'HND', 'NA', 504, 'Honduras'),
	('HU', 'HUN', 'EU', 36, 'Hungary'),
	('IS', 'ISL', 'EU', 354, 'Iceland'),
	('IN', 'IND', 'AS', 91, 'India'),
	('ID', 'IDN', 'AS', 6, 'Indonesia'),
	('IR', 'IRN', 'AS', 98, 'Iran'),
	('IQ', 'IRQ', 'AS', 964, 'Iraq'),
	('IE', 'IRL', 'EU', 353, 'Ireland'),
	('IL', 'ISR', 'AS', 97, 'Israel'),
	('IT', 'ITA', 'EU', 39, 'Italy'),
	('JM', 'JAM', 'NA', 1, 'Jamaica'),
	('JP', 'JPN', 'AS', 81, 'Japan'),
	('JO', 'JOR', 'AS', 96, 'Jordan'),
	('KZ', 'KAZ', 'AS', 7, 'Kazakhstan'),
	('KE', 'KEN', 'AF', 54, 'Kenya'),
	('KI', 'KIR', 'OC', 686, 'Kiribati'),
	('KR', 'KOR', 'AS', 8, 'Korea, South'),
	('KW', 'KWT', 'AS', 965, 'Kuwait'),
	('KG', 'KGZ', 'AS', 996, 'Kyrgyzstan'),
	(
		'LA',
		'LAO',
		'AS',
		856,
		'Lao People''s Democratic Republic'
	),
	('LV', 'LVA', 'EU', 371, 'Latvia'),
	('LB', 'LBN', 'AS', 961, 'Lebanon'),
	('LS', 'LSO', 'AF', 66, 'Lesotho'),
	('LR', 'LBR', 'AF', 31, 'Liberia'),
	('LY', 'LBY', 'AF', 18, 'Libya'),
	('LI', 'LIE', 'EU', 43, 'Liechtenstein'),
	('LT', 'LTU', 'EU', 370, 'Lithuania'),
	('LU', 'LUX', 'EU', 35, 'Luxembourg'),
	('MK', 'MKD', 'EU', 389, 'Macedonia North'),
	('MG', 'MDG', 'AF', 61, 'Madagascar'),
	('MW', 'MWI', 'AF', 65, 'Malawi'),
	('MY', 'MYS', 'AS', 60, 'Malaysia'),
	('MV', 'MDV', 'AS', 960, 'Maldives'),
	('ML', 'MLI', 'AF', 3, 'Mali'),
	('MT', 'MLT', 'EU', 356, 'Malta'),
	('MH', 'MHL', 'OC', 69, 'Marshall Islands'),
	('MR', 'MRT', 'AF', 22, 'Mauritania'),
	('MU', 'MUS', 'AF', 23, 'Mauritius'),
	('MX', 'MEX', 'NA', 52, 'Mexico'),
	('FM', 'FSM', 'OC', 691, 'Micronesia'),
	('MD', 'MDA', 'EU', 37, 'Moldova'),
	('MC', 'MCO', 'EU', 37, 'Monaco'),
	('MN', 'MNG', 'AS', 976, 'Mongolia'),
	('ME', 'MNE', 'EU', 382, 'Montenegro'),
	('MA', 'MAR', 'AF', 212, 'Morocco'),
	('MZ', 'MOZ', 'AF', 25, 'Mozambique'),
	('MM', 'MMR', 'AS', 95, 'Myanmar'),
	('NA', 'NAM', 'AF', 64, 'Namibia'),
	('NR', 'NRU', 'OC', 67, 'Nauru'),
	('NP', 'NPL', 'AS', 977, 'Nepal'),
	('NL', 'NLD', 'EU', 31, 'Netherlands'),
	('NZ', 'NZL', 'OC', 64, 'New Zealand'),
	('NI', 'NIC', 'NA', 505, 'Nicaragua'),
	('NE', 'NER', 'AF', 22, 'Niger'),
	('NG', 'NGA', 'AF', 23, 'Nigeria'),
	('NO', 'NOR', 'EU', 47, 'Norway'),
	('OM', 'OMN', 'AS', 968, 'Oman'),
	('PK', 'PAK', 'AS', 92, 'Pakistan'),
	('PW', 'PLW', 'OC', 680, 'Palau'),
	('PS', 'PSE', 'AS', 97, 'Palestine, State of'),
	('PA', 'PAN', 'NA', 507, 'Panama'),
	('PG', 'PNG', 'OC', 675, 'Papua New Guinea'),
	('PY', 'PRY', 'SA', 595, 'Paraguay'),
	('PE', 'PER', 'SA', 51, 'Peru'),
	('PH', 'PHL', 'AS', 63, 'Philippines'),
	('PL', 'POL', 'EU', 48, 'Poland'),
	('PT', 'PRT', 'EU', 351, 'Portugal'),
	('QA', 'QAT', 'AS', 974, 'Qatar'),
	('RO', 'ROU', 'EU', 40, 'Romania'),
	('RU', 'RUS', 'EU', 7, 'Russian Federation'),
	('RW', 'RWA', 'AF', 250, 'Rwanda'),
	('KN', 'KNA', 'NA', 1, 'Saint Kitts and Nevis'),
	('LC', 'LCA', 'NA', 1, 'Saint Lucia'),
	(
		'VC',
		'VCT',
		'NA',
		1,
		'Saint Vincent and the Grenadines'
	),
	('WS', 'WSM', 'OC', 685, 'Samoa'),
	('SM', 'SMR', 'EU', 378, 'San Marino'),
	('ST', 'STP', 'AF', 239, 'Sao Tome and Principe'),
	('SA', 'SAU', 'AS', 966, 'Saudi Arabia'),
	('SN', 'SEN', 'AF', 221, 'Senegal'),
	('RS', 'SRB', 'EU', 381, 'Serbia'),
	('SC', 'SYC', 'AF', 248, 'Seychelles'),
	('SL', 'SLE', 'AF', 232, 'Sierra Leone'),
	('SG', 'SGP', 'AS', 65, 'Singapore'),
	('SK', 'SVK', 'EU', 421, 'Slovakia'),
	('SI', 'SVN', 'EU', 386, 'Slovenia'),
	('SB', 'SLB', 'OC', 677, 'Solomon Islands'),
	('SO', 'SOM', 'AF', 252, 'Somalia'),
	('ZA', 'ZAF', 'AF', 27, 'South Africa'),
	('SS', 'SSD', 'AF', 211, 'South Sudan'),
	('ES', 'ESP', 'EU', 34, 'Spain'),
	('LK', 'LKA', 'AS', 94, 'Sri Lanka'),
	('SD', 'SDN', 'AF', 249, 'Sudan'),
	('SR', 'SUR', 'SA', 597, 'Suriname'),
	('SE', 'SWE', 'EU', 46, 'Sweden'),
	('CH', 'CHE', 'EU', 41, 'Switzerland'),
	('SY', 'SYR', 'AS', 963, 'Syria'),
	('TW', 'TWN', 'AS', 886, 'Taiwan'),
	('TJ', 'TJK', 'AS', 992, 'Tajikistan'),
	('TZ', 'TZA', 'AF', 255, 'Tanzania'),
	('TH', 'THA', 'AS', 66, 'Thailand'),
	('TL', 'TLS', 'AS', 670, 'Timor-Leste'),
	('TG', 'TGO', 'AF', 228, 'Togo'),
	('TO', 'TON', 'OC', 676, 'Tonga'),
	('TT', 'TTO', 'NA', 1, 'Trinidad and Tobago'),
	('TN', 'TUN', 'AF', 216, 'Tunisia'),
	('TR', 'TUR', 'AS', 90, 'Turkey (Türkiye)'),
	('TM', 'TKM', 'AS', 993, 'Turkmenistan'),
	('TV', 'TUV', 'OC', 688, 'Tuvalu'),
	('UG', 'UGA', 'AF', 256, 'Uganda'),
	('UA', 'UKR', 'EU', 380, 'Ukraine'),
	('AE', 'ARE', 'AS', 971, 'United Arab Emirates'),
	('GB', 'GBR', 'EU', 44, 'United Kingdom'),
	('US', 'USA', 'NA', 1, 'United States'),
	('UY', 'URY', 'SA', 598, 'Uruguay'),
	('UZ', 'UZB', 'AS', 998, 'Uzbekistan'),
	('VU', 'VUT', 'OC', 678, 'Vanuatu'),
	('VA', 'VAT', 'EU', 39, 'Vatican City Holy See'),
	('VE', 'VEN', 'SA', 58, 'Venezuela'),
	('VN', 'VNM', 'AS', 84, 'Vietnam'),
	('YE', 'YEM', 'AS', 967, 'Yemen'),
	('ZW', 'ZWE', 'AF', 263, 'Zimbabwe'),
	('ZM', 'ZMB', 'AF', 260, 'Zambia');

--
-- Data for Name: "UserProfile"; Type: TABLE DATA; Schema: public; Owner: supabase
--
INSERT INTO
	public."UserProfile" (
		id,
		first_name,
		last_name,
		username,
		default_avatar_type,
		country_id,
		created_at,
		updated_at,
		birthday
	)
Values
	(
		'35bd302a-af13-41ca-9b86-22b4e9568739',
		'John',
		'Doe',
		'johndoe',
		"ring",
		23,
		'2023-03-05 02:34:09.682585+00',
		'2024-06-08 05:59:09.682585+00',
		'1992-05-23'
	),
	(
		'43831627-add7-4e7b-be06-4c187cb7f10c',
		'Mary',
		'Jane',
		'Bloody Mary',
		"sunset",
		123,
		'2023-03-05 02:34:09.682585+00',
		'2024-06-08 05:59:09.682585+00',
		'1994-12-14'
	),
	(
		'7df4cf0b-b77f-41d1-af12-8b69c5f2358d',
		'John',
		'Smith',
		'LuckyJohny77',
		"beam",
		41,
		'2023-03-05 02:34:09.682585+00',
		'2024-06-08 05:59:09.682585+00',
		'1998-04-30'
	);

--
-- Data for Name: Month; Type: TABLE DATA; Schema: public; Owner: postgres
--
INSERT INTO
	"public"."Month" ("name")
VALUES
	('January'),
	('February'),
	('March'),
	('April'),
	('May'),
	('June'),
	('July'),
	('August'),
	('September'),
	('October'),
	('November'),
	('December');

--
-- Data for Name: Condition; Type: TABLE DATA; Schema: public; Owner: postgres
--
INSERT INTO
	"public"."Condition" ("name", "created_at", "icon", "description")
VALUES
	(
		'Flood Risk',
		'2024-09-10 19:11:35.599777+00',
		'🌊',
		'Area prone to flooding, especially during rainy seasons'
	),
	(
		'Wildfire Risk',
		'2024-09-10 19:11:35.599777+00',
		'🔥',
		'High risk of wildfires, especially during dry periods'
	),
	(
		'Steep Cliffs',
		'2024-09-10 19:11:35.599777+00',
		'🧗',
		'Steep or dangerous cliffs in the area, be cautious near edges'
	),
	(
		'Rockfall',
		'2024-09-10 19:11:35.599777+00',
		'🪨',
		'Potential for falling rocks, particularly near mountains or hillsides'
	),
	(
		'Avalanche Risk',
		'2024-09-10 19:11:35.599777+00',
		'🏔️',
		'Risk of avalanches in winter or snow-heavy regions'
	),
	(
		'Unstable Ground',
		'2024-09-10 19:11:35.599777+00',
		'🌍',
		'Ground may be unstable or prone to landslides'
	),
	(
		'Remote Area',
		'2024-09-10 19:11:35.599777+00',
		'🗺️',
		'Far from civilization, limited access to emergency services'
	),
	(
		'Poisonous Plants',
		'2024-09-10 19:11:35.599777+00',
		'🌿',
		'Presence of dangerous or poisonous plants, avoid direct contact'
	),
	(
		'High Altitude',
		'2024-09-10 19:11:35.599777+00',
		'🗻',
		'High elevation, be prepared for altitude sickness or cold temperatures'
	),
	(
		'Limited Water Supply',
		'2024-09-10 19:11:35.599777+00',
		'🚱',
		'Water sources may be scarce, bring enough water with you'
	),
	(
		'Dense Forest',
		'2024-09-10 19:11:35.599777+00',
		'🌲',
		'Dense vegetation, limited visibility, and potential for getting lost'
	),
	(
		'No Cell Signal',
		'2024-09-10 19:11:35.599777+00',
		'📵',
		'No mobile signal, make plans accordingly for communication and navigation'
	),
	(
		'Rough Terrain',
		'2024-09-10 19:11:35.599777+00',
		'⛰️',
		'Challenging or difficult terrain to navigate, appropriate footwear required'
	),
	(
		'Bears',
		'2024-09-10 19:11:35.599777+00',
		'🐻',
		'Presence of bears in the area, take precautions and store food safely'
	),
	(
		'Harsh Weather',
		'2024-09-10 19:11:35.599777+00',
		'🌪️',
		'Extreme weather conditions such as strong winds, snow, or heavy rain'
	),
	(
		'Cold Weather',
		'2024-09-10 19:11:35.599777+00',
		'❄️',
		'Low temperatures, be prepared with appropriate clothing and gear'
	),
	(
		'Hot Weather',
		'2024-09-10 19:11:35.599777+00',
		'☀️',
		'High temperatures, stay hydrated and take sun protection measures'
	),
	(
		'Thunderstorms',
		'2024-09-10 19:11:35.599777+00',
		'⛈️',
		'Frequent thunderstorms, be cautious of lightning and seek shelter'
	),
	(
		'Bugs',
		'2024-09-10 19:11:35.599777+00',
		'🦟',
		'High presence of insects, bring repellents and protective gear'
	),
	(
		'Snakes',
		'2024-09-10 19:11:35.599777+00',
		'🐍',
		'Snakes might be in the area, exercise caution while walking'
	),
	(
		'Dangerous Area',
		'2024-09-10 19:11:35.599777+00',
		'⚠️',
		'This area is known for potentially hazardous conditions'
	),
	(
		'Deadly Area',
		'2024-09-10 19:11:35.599777+00',
		'💀',
		'Extremely dangerous, entering this area is not recommended for safety reasons'
	);

--
-- Data for Name: EntityType; Type: TABLE DATA; Schema: public; Owner: postgres
--
INSERT INTO
	"public"."EntityType" ("name")
VALUES
	('Location'),
	('Equipment'),
	('Guide'),
	('Event'),
	('Trip'),
	('Post'),
	('Journal');

--
-- Data for Name: Equipment; Type: TABLE DATA; Schema: public; Owner: postgres
--
INSERT INTO
	"public"."Equipment" (
		"id",
		"created_at",
		"name",
		"description",
		"image"
	)
VALUES
	(
		'b593ba74-6fae-11ef-a8b3-e3202ee5c2c4',
		'2024-09-10 19:56:03.300087+00',
		'Tent',
		'A portable shelter made of fabric, supported by poles and ropes.',
		'tent_image.jpg'
	),
	(
		'b593dff4-6fae-11ef-a8b4-9b13f082e75f',
		'2024-09-10 19:56:03.300087+00',
		'Sleeping Bag',
		'An insulated covering for sleeping outdoors, protecting against cold weather.',
		'sleeping_bag_image.jpg'
	),
	(
		'b593e080-6fae-11ef-a8b5-af7510dcb3fe',
		'2024-09-10 19:56:03.300087+00',
		'Camping Stove',
		'A small portable stove used for cooking while camping.',
		'camping_stove_image.jpg'
	),
	(
		'b593e0c6-6fae-11ef-a8b6-5770b5eb4994',
		'2024-09-10 19:56:03.300087+00',
		'Lantern',
		'A portable light source powered by batteries or fuel, ideal for nighttime use.',
		'lantern_image.jpg'
	),
	(
		'b593e10c-6fae-11ef-a8b7-173330b989bd',
		'2024-09-10 19:56:03.300087+00',
		'Backpack',
		'A large, sturdy bag worn on the back, used for carrying camping gear.',
		'backpack_image.jpg'
	),
	(
		'b593e152-6fae-11ef-a8b8-330c6c31afc5',
		'2024-09-10 19:56:03.300087+00',
		'Water Bottle',
		'A reusable bottle used for carrying water on camping trips.',
		'water_bottle_image.jpg'
	),
	(
		'b593e18e-6fae-11ef-a8b9-1bb4935f4b00',
		'2024-09-10 19:56:03.300087+00',
		'First Aid Kit',
		'A set of supplies and equipment used to treat minor injuries and emergencies.',
		'first_aid_kit_image.jpg'
	),
	(
		'b593e1ca-6fae-11ef-a8ba-df3c6d2af7c0',
		'2024-09-10 19:56:03.300087+00',
		'Camping Chair',
		'A foldable, lightweight chair for seating at campsites.',
		'camping_chair_image.jpg'
	),
	(
		'b593e206-6fae-11ef-a8bb-d317a7ac9007',
		'2024-09-10 19:56:03.300087+00',
		'Multitool',
		'A small handheld tool combining multiple functions, like a knife, screwdriver, and scissors.',
		'multitool_image.jpg'
	),
	(
		'b593e242-6fae-11ef-a8bc-7b34aace0c4d',
		'2024-09-10 19:56:03.300087+00',
		'Cooler',
		'An insulated container to keep food and beverages cold.',
		'cooler_image.jpg'
	),
	(
		'b593e27e-6fae-11ef-a8bd-1f6a7041b09f',
		'2024-09-10 19:56:03.300087+00',
		'Hiking Boots',
		'Sturdy footwear designed for long-distance hiking on rough terrain.',
		'hiking_boots_image.jpg'
	),
	(
		'b593e2ba-6fae-11ef-a8be-8feb9e0ac23f',
		'2024-09-10 19:56:03.300087+00',
		'Portable Shower',
		'A compact, portable device for washing when camping.',
		'portable_shower_image.jpg'
	),
	(
		'b593e2f6-6fae-11ef-a8bf-fbefb4fd064e',
		'2024-09-10 19:56:03.300087+00',
		'Fire Starter',
		'A tool for easily creating a flame, used to start campfires.',
		'fire_starter_image.jpg'
	),
	(
		'b593e328-6fae-11ef-a8c0-ef2a6c7a7371',
		'2024-09-10 19:56:03.300087+00',
		'Sleeping Pad',
		'A lightweight mat that provides cushioning and insulation for sleeping on the ground.',
		'sleeping_pad_image.jpg'
	),
	(
		'b593e364-6fae-11ef-a8c1-7f411045e0af',
		'2024-09-10 19:56:03.300087+00',
		'Camping Table',
		'A foldable table used for cooking or dining at campsites.',
		'camping_table_image.jpg'
	),
	(
		'b593e3a0-6fae-11ef-a8c2-374f995690df',
		'2024-09-10 19:56:03.300087+00',
		'Headlamp',
		'A hands-free light worn on the head, ideal for nighttime activities.',
		'headlamp_image.jpg'
	),
	(
		'b593e3dc-6fae-11ef-a8c3-57e6c55232d6',
		'2024-09-10 19:56:03.300087+00',
		'Compass',
		'A navigational tool for finding direction, especially useful in the wilderness.',
		'compass_image.jpg'
	),
	(
		'b593e418-6fae-11ef-a8c4-a715f340038a',
		'2024-09-10 19:56:03.300087+00',
		'Binoculars',
		'Optical devices used to view distant objects.',
		'binoculars_image.jpg'
	),
	(
		'b593e454-6fae-11ef-a8c5-2f25aa44a5cb',
		'2024-09-10 19:56:03.300087+00',
		'Water Filter',
		'A portable device used to purify water from natural sources.',
		'water_filter_image.jpg'
	),
	(
		'b593e490-6fae-11ef-a8c6-c743cfe1ec4c',
		'2024-09-10 19:56:03.300087+00',
		'Rain Jacket',
		'A waterproof jacket that protects against rain and wind.',
		'rain_jacket_image.jpg'
	),
	(
		'b593f5c0-6fae-11ef-a8c7-8fe885b0f138',
		'2024-09-10 19:56:03.300087+00',
		'Insect Repellent',
		'A spray or lotion used to keep insects like mosquitoes away.',
		'insect_repellent_image.jpg'
	),
	(
		'b593f700-6fae-11ef-a8c8-f3ac510cba76',
		'2024-09-10 19:56:03.300087+00',
		'Tarp',
		'A large sheet of waterproof material used for shelter or ground cover.',
		'tarp_image.jpg'
	),
	(
		'b593f75a-6fae-11ef-a8c9-470be5de43a3',
		'2024-09-10 19:56:03.300087+00',
		'Climbing Rope',
		'A strong rope used for climbing and securing gear.',
		'climbing_rope_image.jpg'
	),
	(
		'b593f796-6fae-11ef-a8ca-6b5e231cd1a8',
		'2024-09-10 19:56:03.300087+00',
		'Mess Kit',
		'A portable set of cookware and utensils used for eating and cooking outdoors.',
		'mess_kit_image.jpg'
	),
	(
		'b593f7dc-6fae-11ef-a8cb-a747baa64890',
		'2024-09-10 19:56:03.300087+00',
		'Hiking Poles',
		'Adjustable poles used to provide stability while hiking.',
		'hiking_poles_image.jpg'
	),
	(
		'b593f818-6fae-11ef-a8cc-7372651e1fae',
		'2024-09-10 19:56:03.300087+00',
		'Whistle',
		'A small tool used to signal for help or alert others.',
		'whistle_image.jpg'
	),
	(
		'b593f85e-6fae-11ef-a8cd-8fbc3440eee2',
		'2024-09-10 19:56:03.300087+00',
		'Duct Tape',
		'A strong, adhesive tape used for quick repairs in the field.',
		'duct_tape_image.jpg'
	),
	(
		'b593f89a-6fae-11ef-a8ce-1333ceab6055',
		'2024-09-10 19:56:03.300087+00',
		'Emergency Blanket',
		'A lightweight, reflective blanket used to retain body heat in emergencies.',
		'emergency_blanket_image.jpg'
	),
	(
		'b593f958-6fae-11ef-a8cf-2fe67690b228',
		'2024-09-10 19:56:03.300087+00',
		'Hatchet',
		'A small axe used for chopping wood or clearing brush.',
		'hatchet_image.jpg'
	),
	(
		'b593f9a8-6fae-11ef-a8d0-ab7ef3bd781c',
		'2024-09-10 19:56:03.300087+00',
		'Tent Footprint',
		'A protective sheet placed under a tent to prevent damage to the tent floor.',
		'tent_footprint_image.jpg'
	),
	(
		'b593f9ee-6fae-11ef-a8d1-2b96b2b694eb',
		'2024-09-10 19:56:03.300087+00',
		'Bear Spray',
		'A spray used to deter bears in case of an encounter.',
		'bear_spray_image.jpg'
	),
	(
		'b593fa2a-6fae-11ef-a8d2-73d40c081669',
		'2024-09-10 19:56:03.300087+00',
		'Dry Bags',
		'Waterproof bags used to keep gear and clothes dry.',
		'dry_bags_image.jpg'
	),
	(
		'b593fa66-6fae-11ef-a8d3-b39c6fa7eb19',
		'2024-09-10 19:56:03.300087+00',
		'Portable Grill',
		'A small, portable grill for cooking over an open flame.',
		'portable_grill_image.jpg'
	),
	(
		'b593faa2-6fae-11ef-a8d4-7ba7a509c2ec',
		'2024-09-10 19:56:03.300087+00',
		'Gaiters',
		'Protective coverings worn over boots to keep out debris and water.',
		'gaiters_image.jpg'
	),
	(
		'b593fade-6fae-11ef-a8d5-9fc05badd60a',
		'2024-09-10 19:56:03.300087+00',
		'Sleeping Bag Liner',
		'A lightweight liner placed inside a sleeping bag for extra warmth.',
		'sleeping_bag_liner_image.jpg'
	),
	(
		'b593fb1a-6fae-11ef-a8d6-f749a3a2a41c',
		'2024-09-10 19:56:03.300087+00',
		'Camp Axe',
		'A small axe for cutting wood or other campsite tasks.',
		'camp_axe_image.jpg'
	),
	(
		'b593fb56-6fae-11ef-a8d7-e33e221d8b61',
		'2024-09-10 19:56:03.300087+00',
		'Solar Charger',
		'A portable device that charges electronics using solar power.',
		'solar_charger_image.jpg'
	),
	(
		'b593fbc4-6fae-11ef-a8d8-27319d3b6217',
		'2024-09-10 19:56:03.300087+00',
		'Camping Mug',
		'A durable, reusable mug for drinking hot or cold beverages.',
		'camping_mug_image.jpg'
	),
	(
		'b593fc0a-6fae-11ef-a8d9-e3d23f78e525',
		'2024-09-10 19:56:03.300087+00',
		'Paracord',
		'A strong, versatile cord used for a variety of camping tasks.',
		'paracord_image.jpg'
	);

--
-- Data for Name: EquipmentCategory; Type: TABLE DATA; Schema: public; Owner: postgres
--
--
-- Data for Name: EquipmentTag; Type: TABLE DATA; Schema: public; Owner: postgres
--
--
-- Data for Name: Location; Type: TABLE DATA; Schema: public; Owner: postgres
--
--
-- Data for Name: Event; Type: TABLE DATA; Schema: public; Owner: postgres
--
--
-- Data for Name: EventTag; Type: TABLE DATA; Schema: public; Owner: postgres
--
--
-- Data for Name: Feature; Type: TABLE DATA; Schema: public; Owner: postgres
--
INSERT INTO
	"public"."Feature" ("name", "created_at", "description", "icon")
VALUES
	(
		'Showers',
		'2024-09-10 19:19:47.357636+00',
		'Available shower facilities.',
		'showers.png'
	),
	(
		'Toilet',
		'2024-09-10 19:19:47.357636+00',
		'Public or private toilet facilities.',
		'toilet.png'
	),
	(
		'Shops',
		'2024-09-10 19:19:47.357636+00',
		'Nearby convenience or general stores.',
		'shops.png'
	),
	(
		'Picnic Area',
		'2024-09-10 19:19:47.357636+00',
		'Designated area for picnics with tables and benches.',
		'picnic_area.png'
	),
	(
		'BBQ Grill',
		'2024-09-10 19:19:47.357636+00',
		'Access to BBQ or grilling stations.',
		'bbq_grill.png'
	),
	(
		'Water Supply',
		'2024-09-10 19:19:47.357636+00',
		'On-site clean drinking water.',
		'water_supply.png'
	),
	(
		'Fire Pit',
		'2024-09-10 19:19:47.357636+00',
		'Designated fire pits for campfires.',
		'fire_pit.png'
	),
	(
		'Parking',
		'2024-09-10 19:19:47.357636+00',
		'Vehicle parking area.',
		'parking.png'
	),
	(
		'Electricity',
		'2024-09-10 19:19:47.357636+00',
		'Electric hook-up for campers or RVs.',
		'electricity.png'
	),
	(
		'Wifi',
		'2024-09-10 19:19:47.357636+00',
		'Wireless internet access.',
		'wifi.png'
	),
	(
		'Trash Bins',
		'2024-09-10 19:19:47.357636+00',
		'Waste disposal facilities.',
		'trash_bins.png'
	),
	(
		'Playground',
		'2024-09-10 19:19:47.357636+00',
		'Playground area for children.',
		'playground.png'
	),
	(
		'Boat Ramp',
		'2024-09-10 19:19:47.357636+00',
		'Boat ramp for lake or river access.',
		'boat_ramp.png'
	),
	(
		'Swimming Pool',
		'2024-09-10 19:19:47.357636+00',
		'Swimming pool available on-site.',
		'swimming_pool.png'
	),
	(
		'Hiking Trails',
		'2024-09-10 19:19:47.357636+00',
		'Nearby hiking trails accessible from the site.',
		'hiking_trails.png'
	),
	(
		'Bike Rentals',
		'2024-09-10 19:19:47.357636+00',
		'Bike rental services.',
		'bike_rentals.png'
	),
	(
		'Laundry',
		'2024-09-10 19:19:47.357636+00',
		'Access to laundry facilities.',
		'laundry.png'
	),
	(
		'First Aid Station',
		'2024-09-10 19:19:47.357636+00',
		'Medical assistance or first aid facilities.',
		'first_aid_station.png'
	),
	(
		'Pets Allowed',
		'2024-09-10 19:19:47.357636+00',
		'Camping spot allows pets.',
		'pets_allowed.png'
	),
	(
		'Rest Area',
		'2024-09-10 19:19:47.357636+00',
		'Area to rest with benches or shelters.',
		'rest_area.png'
	),
	(
		'Fishing Area',
		'2024-09-10 19:19:47.357636+00',
		'Designated area for fishing.',
		'fishing_area.png'
	),
	(
		'Campfire Ban',
		'2024-09-10 19:19:47.357636+00',
		'Restrictions on campfires due to safety or environmental concerns.',
		'campfire_ban.png'
	),
	(
		'Sheltered Area',
		'2024-09-10 19:19:47.357636+00',
		'Covered area for protection against weather.',
		'sheltered_area.png'
	),
	(
		'Nature Reserve',
		'2024-09-10 19:19:47.357636+00',
		'Located within or near a protected natural reserve.',
		'nature_reserve.png'
	),
	(
		'Wildlife Watching',
		'2024-09-10 19:19:47.357636+00',
		'Area popular for observing wildlife.',
		'wildlife_watching.png'
	),
	(
		'Climbing Area',
		'2024-09-10 19:19:47.357636+00',
		'Rock climbing area available.',
		'climbing_area.png'
	),
	(
		'Horse Riding',
		'2024-09-10 19:19:47.357636+00',
		'Horse riding opportunities nearby.',
		'horse_riding.png'
	),
	(
		'Kayak Rentals',
		'2024-09-10 19:19:47.357636+00',
		'Rentals for kayaking equipment available.',
		'kayak_rentals.png'
	),
	(
		'Hot Springs',
		'2024-09-10 19:19:47.357636+00',
		'Access to natural hot springs.',
		'hot_springs.png'
	),
	(
		'Dump Station',
		'2024-09-10 19:19:47.357636+00',
		'Waste dumping station for RVs.',
		'dump_station.png'
	);

--
-- Data for Name: Guide; Type: TABLE DATA; Schema: public; Owner: postgres
--
--
-- Data for Name: GuideCategory; Type: TABLE DATA; Schema: public; Owner: postgres
--
--
-- Data for Name: LocationCategory; Type: TABLE DATA; Schema: public; Owner: postgres
--
INSERT INTO
	"public"."LocationCategory" ("created_at", "name")
VALUES
	('2024-09-10 16:04:00.827117+00', 'Campground'),
	('2024-09-10 16:04:00.827117+00', 'National Park'),
	('2024-09-10 16:04:00.827117+00', 'RV Park'),
	(
		'2024-09-10 16:04:00.827117+00',
		'Wilderness Area'
	),
	('2024-09-10 16:04:00.827117+00', 'Beach Camp'),
	('2024-09-10 16:04:00.827117+00', 'Forest Reserve'),
	('2024-09-10 16:04:00.827117+00', 'Lakefront Camp'),
	('2024-09-10 16:04:00.827117+00', 'Mountain Camp'),
	(
		'2024-09-10 16:04:00.827117+00',
		'Urban Campground'
	),
	('2024-09-10 16:04:00.827117+00', 'Glamping Site');

--
-- Data for Name: LocationSize; Type: TABLE DATA; Schema: public; Owner: postgres
--
INSERT INTO
	"public"."LocationSize" (
		"name",
		"description",
		"display_order",
		"number_of_people_info"
	)
VALUES
	(
		'big',
		'For a large group or groups of people',
		3,
		'10+'
	),
	('medium', 'For a group of people', 2, '4-10'),
	('small', 'For couple of people', 1, '1-4');

--
-- Data for Name: LocationTag; Type: TABLE DATA; Schema: public; Owner: postgres
--
--
-- Data for Name: LocationType; Type: TABLE DATA; Schema: public; Owner: postgres
--
INSERT INTO
	"public"."LocationType" ("name", "description")
VALUES
	(
		'Tent Camping',
		'Basic tent pitches with minimal amenities.'
	),
	(
		'RV Camping',
		'Camping areas for recreational vehicles, often with hook-ups.'
	),
	(
		'Backpacking',
		'Sites suited for hikers carrying their gear.'
	),
	(
		'Glamping',
		'Luxury camping with modern amenities such as beds and bathrooms.'
	),
	(
		'Wild Camping',
		'Camping in nature with no designated amenities or facilities.'
	),
	(
		'Group Camping',
		'Sites designed for large groups, often with shared facilities.'
	),
	(
		'Beach Camping',
		'Camping near or directly on a beach or coastal area.'
	),
	(
		'Forest Camping',
		'Campgrounds located in wooded or forested areas.'
	),
	(
		'Lake Camping',
		'Campsites located near or around lakes.'
	),
	(
		'Mountain Camping',
		'High-altitude camping spots, often with scenic views.'
	);

--
-- Data for Name: Post; Type: TABLE DATA; Schema: public; Owner: postgres
--
--
-- Data for Name: Tag; Type: TABLE DATA; Schema: public; Owner: postgres
--
--
-- Data for Name: Tagging; Type: TABLE DATA; Schema: public; Owner: postgres
--
--
-- Data for Name: Trip; Type: TABLE DATA; Schema: public; Owner: postgres
--
--
-- Data for Name: UserProfile; Type: TABLE DATA; Schema: public; Owner: postgres
--
--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--
--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--
--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--
--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--
--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: supabase_admin
--
--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--
SELECT
	pg_catalog.setval ('"auth"."refresh_tokens_id_seq"', 35, true);

--
-- Name: key_key_id_seq; Type: SEQUENCE SET; Schema: pgsodium; Owner: supabase_admin
--
SELECT
	pg_catalog.setval ('"pgsodium"."key_key_id_seq"', 1, false);

--
-- Name: Tag_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--
SELECT
	pg_catalog.setval ('"public"."Tag_id_seq"', 1, false);

--
-- Name: Tagging_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--
SELECT
	pg_catalog.setval ('"public"."Tagging_id_seq"', 1, false);

--
-- PostgreSQL database dump complete
--
RESET ALL;