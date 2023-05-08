from pathlib import Path

import os, json, sys

BASE_DIR = Path(__file__).resolve().parent.parent

# secrets.json 파일을 찾아준다.
SECRET_BASE_FILE = os.path.join(BASE_DIR, "secrets.json")

# secrets.json 파일을 읽고, json key/value 값들을 secrets에 할당한다.
secrets = json.load(open(SECRET_BASE_FILE))

# setattr을 이용해 key 값은 변수명, value 값은 값으로 각 변수에 할당한다.
for key, value in secrets.items():
    setattr(sys.modules[__name__], key, value)

DEBUG = True

ALLOWED_HOSTS = ['*']


# Application definition
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",

    'django_extensions',

    "corsheaders",

    # dj_rest_auth 의 registration 을 사용하려면 app에 추가해주어야 한다.
    "django.contrib.sites",

    # DRF
    "rest_framework",

    # dj_rest_auth 를 사용하려면 아래 app이 선행되어야 한다.
    "rest_framework.authtoken",

    # Social 로그인을 위한 app
    "allauth",
    "allauth.account",
    "allauth.socialaccount",
    
    # Naver
    "allauth.socialaccount.providers.naver",

    # dj_rest_auth
    "dj_rest_auth",
    "dj_rest_auth.registration",

    # token
    "rest_framework_simplejwt",
    
    "user",
]

# 사용자 모델 설정
AUTH_USER_MODEL = "user.User"

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",

    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

CORS_ORIGIN_ALLOW_ALL = True

ROOT_URLCONF = "setting.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "setting.wsgi.application"


# Database
# https://docs.djangoproject.com/en/4.1/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        'NAME' : 'electrip',
        'USER' : 'electrip',
        'PASSWORD' : 'electrip',
        'HOST' : 'localhost',
        'PORT' : '',
    }
}


# Password validation
# https://docs.djangoproject.com/en/4.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.1/topics/i18n/

LANGUAGE_CODE = "ko-kr"

TIME_ZONE = "Asia/Seoul"

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.1/howto/static-files/

STATIC_URL = "static/"

# Default primary key field type
# https://docs.djangoproject.com/en/4.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

from datetime import timedelta

# rest framework 에 대한 설정
REST_FRAMEWORK = {
    # 기본 인증에 대한 설정
    "DEFAULT_AUTHENTICATION_CLASSES" : (
        # dj_rest_auth 의 인증 절차 중 JWTCookieAuthentication을 사용
        "dj_rest_auth.jwt_auth.JWTCookieAuthentication",
    ),
    # 허가에 대한 설정
    "DEFAULT_PERMISSION_CLASSES" : (
        # 인증이 완료된 사용자에 한해서 접근 허가
        "rest_framework.permissions.IsAuthenticated",
    )
}

# cookie key 와 refresh cookie key의 이름을 설정
JWT_AUTH_COOKIE = "sociallogin-auth"
JWT_AUTH_REFRESH_COOKIE = "sociallogin-refresh-token"

# JWT 사용을 위한 설정
REST_USE_JWT = True

# simplejwt 에 대한 설정
SIMPLE_JWT = {
    # access token 의 유효기간
    'ACCESS_TOKEN_LIFETIME' : timedelta(minutes=60),
    # refresh token 의 유효기간
    'REFERSH_TOKEN_LIFETIME' : timedelta(days=2),
    # 토큰에 들어갈 알고리즘
    'ALGORITHM' : 'HS256',
    # 토큰을 만드는데 사용할 secret key
    'SIGNING_KEY' : SECRET_KEY,
}

REST_SESSION_LOGIN = False